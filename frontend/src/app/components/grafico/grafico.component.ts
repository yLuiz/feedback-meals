import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import api from 'src/api/api';
import { IDadosFusionChartScrollColumn2D } from 'src/app/interfaces/IFusionChart';
import { refeicaoOpcao } from 'src/app/interfaces/IRefeicao';
import { IAvaliacaoMotivo } from 'src/app/interfaces/IRefeicaoAvaliacaoMotivo';
import { IMotivos } from 'src/app/interfaces/IRefeicaoResultado';
import { ITipoAvaliacao } from 'src/app/interfaces/ITipoAvaliacao';
import { IPegarRefeicaoEvent } from 'src/app/interfaces/Socket.interfaces';
import { RefeicaoService } from 'src/app/references/refeicao.service';
import { StoreService } from 'src/app/store/store.service';
import { RefeicaoType } from 'src/app/types/types';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { GraficoService } from './grafico.service';

interface SocketResponse {
  refe_id: number;
  reav_id: number;
}

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss'],
})
export class GraficoComponent implements OnInit {

  avalicaoColor = {
    otimo: "1AAE9E",
    bom: "2C89D9",
    regular: "D3455D"
  }

  avaliacoes: any;
  refeicao!: RefeicaoType;
  
  dataSource!: IDadosFusionChartScrollColumn2D;
  dataSourceMotivos!: IDadosFusionChartScrollColumn2D;
  chartData: Array<{ label: string, value: number}> = [];
  chartDataAv: Array<{ label: string, value: number}> = [];
  
  carregandoGraficos: boolean = true;
  conexaoFeita: boolean = false;
  // motivosResultado!: AxiosResponse<IMotivos[], any>;

  goToFeedback() {
    this.router.navigate(['/feedback'])
  }

  incrementarValoresGrafico(rere_reav_id: number) {
    this.chartData[rere_reav_id - 1].value += 1;
  }

  constructor(
    private router: Router,
    private socket: Socket,
    private graficoService: GraficoService,
    private refeicaoService: RefeicaoService,
    public store: StoreService,
    public errorDialogService: ErrorDialogService

  ) {
    // Chart Configuration
    this.dataSource = {
      chart: {
        caption: `Refeição ${ this.store.refeicao.nome }`,
        showValues: true,
        subCaption: '',
        xAxisName: 'Avaliações',
        yAxisName: '',
        numberSuffix: '',
        palettecolors: `${this.avalicaoColor.otimo}, ${this.avalicaoColor.bom}, ${this.avalicaoColor.regular}`,
        theme: 'fusion',
        rotatelabels: '0'
      },
      data: this.chartData,
    };

    this.dataSourceMotivos = {
      chart: {
        caption: `O que pode melhorar`,
        showValues: true,
        subCaption: '',
        xAxisName: '',
        yAxisName: '',
        numberSuffix: '',
        palettecolors: `${this.avalicaoColor.otimo}, ${this.avalicaoColor.bom}, ${this.avalicaoColor.regular}`,
        theme: 'fusion',
        rotatelabels: '0',
        labelFontSize: 11
      },
      data: this.chartData,
    };
  }

  primeiraPalavraDeMotivos(value: string) {
    return value.split(' ')[0].split('(')[0];
  }

  setDadosGrafico(captionChart: string, refe_id: number): void {

    this.dataSource.chart.caption = captionChart;
    this.graficoService.pegarAvaliacoesPorRefeicao(refe_id).then((response) => {
      this.chartData.forEach(data => data.value = 0);
      response.data.map(avaliacao => {
        this.incrementarValoresGrafico(avaliacao.rere_reav_id);
      });
      this.dataSource.data = this.chartData;
    });
  }

  async setDadosGraficoMotivos(motivos?: IMotivos[]) {

    let motivosResultado: IMotivos[] = [];
    if (!motivos)
      motivosResultado = (await this.graficoService.pegarMotivosAvaliacaoPorDataHora(new Date(), this.store.ultimaRefeicao.horarioId)).data;
    else
      motivosResultado = motivos;

    this.chartDataAv.forEach(motivo => {
      motivo.value = 0;
      motivosResultado.forEach(resultado => {

        let resultadoFiltrado: string;

        if(resultado.ream_motivo === 'Sem refeição') {
          resultadoFiltrado = 'Sem refeição'
        } else {
          resultadoFiltrado = this.primeiraPalavraDeMotivos(resultado.ream_motivo)
        }

        if (motivo.label.includes(resultadoFiltrado)) motivo.value += 1;
      })
    })

  }

  async ngOnInit(): Promise<void> {

    this.socket.on('atualizarMotivos', (payload: { motivos: IMotivos[] }) => {
      this.setDadosGraficoMotivos(payload.motivos)
    })

    this.refeicao = await this.refeicaoService.consultarRefeicoes();
    if (this.refeicao) {
      this.conexaoFeita = true;
      this.carregandoGraficos = false;
    }

    const tipos = await api.get<ITipoAvaliacao[]>('refeicao-avaliacao');
    this.chartData = tipos.data.map(tipo => {
      return {
        label: tipo.reav_tipo,
        value: 0
      }
    });
    
    const motivos = await api.get<IAvaliacaoMotivo[]>('refeicao-avaliacao-motivo');
    this.chartDataAv = motivos.data.map(motivo => {

      if (motivo.ream_motivo === 'Sem refeição') {
        return {
          label: motivo.ream_motivo,
          value: 0
        }
      }

      return {
        label: this.primeiraPalavraDeMotivos(motivo.ream_motivo),
        value: 0
      }
    });
    

    this.socket.on("pegarRefeicao", (payload: IPegarRefeicaoEvent) => {

      // console.log(this.store.ultimaRefeicao);

      if (payload.refeicao !== 'aguardando') {
        this.store.ultimaRefeicao = payload.ultimaRefeicao;
        this.setDadosGrafico(refeicaoOpcao[payload.refeicao], this.refeicao[payload.refeicao]);
      } else {
        this.setDadosGrafico(payload.ultimaRefeicao.nome, payload.ultimaRefeicao.id);
      }
    });
    
    this.setDadosGrafico(this.store.ultimaRefeicao.nome, this.store.ultimaRefeicao.id);

    await this.setDadosGraficoMotivos();

    this.socket.on("atualizarValorGrafico", async (response: SocketResponse) => {
      await this.graficoService.pegarAvaliacoesPorRefeicao(this.store.refeicao.id)
        .then(response => {
          this.chartData.forEach(data => data.value = 0);
          response.data.map(avaliacao => {
            this.incrementarValoresGrafico(avaliacao.rere_reav_id);
            this.dataSource.data = this.chartData;
          })
        });      
    });

    this.dataSourceMotivos.data = this.chartDataAv;
  }

  
}
