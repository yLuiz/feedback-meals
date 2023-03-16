import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class GraficoComponent implements OnInit, OnDestroy {

  avalicaoColor = {
    otimo: "1AAE9E",
    bom: "2C89D9",
    regular: "D3455D"
  }

  avaliacoes: any;
  refeicao!: RefeicaoType;
  mensagemError: string = '';
  
  dataSource!: IDadosFusionChartScrollColumn2D;
  dataSourceMotivos!: IDadosFusionChartScrollColumn2D;
  chartData: Array<{ label: string, value: number}> = [];
  
  carregandoGraficos: boolean = true;
  conexaoFeita: boolean = false;

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
        rotatelabels: '0',
        showYAxisValues: "0",
      },
      dataset: [],
      data: this.chartData,
    };

    this.dataSourceMotivos = {
      chart: {
        caption: `O que pode melhorar`,
        showValues: true,
        subCaption: 'Case demore para carregar os dados, recarregue a página...🔃',
        xAxisName: '',
        yAxisName: '',
        numberSuffix: '',
        numberPrefix: '',
        formatNumber: "1",
        plotToolText: "<b>$dataValue</b> votos $label em <b>$seriesName</b>",
        palettecolors: `${this.avalicaoColor.bom}, ${this.avalicaoColor.regular}`,
        theme: 'fusion',
        rotatelabels: '0',
        labelFontSize: 11,
        showYAxisValues: "0"
      },
      categories: [{
        category: [{ label: "Carregando...⏳" }]
      }],
      dataset: [
        {
          seriesname: "Bom",
          data: [{ value: 0 }]
        },
        {
          seriesname: "Regular",
          data: [{ value: 0 }]
        },
      ],
    };
  }

  primeiraPalavraDeMotivos(value: string) {
    return value.split(' ')[0].split('(')[0];
  };

  filtrarLabel(motivo: string) {
    if(motivo === "Sem refeição")
      return {
        label: motivo
      }

    return {
      label: this.primeiraPalavraDeMotivos(motivo)
    }
  }

  setDadosDeGraficoAvaliacao(captionChart: string, reho_id: number): void {
    this.dataSource.chart.caption = captionChart;
    this.graficoService.pegarAvaliacoesPorRefeicao(reho_id).then((response) => {
      this.chartData.forEach(data => data.value = 0);
      response.data.map(avaliacao => {
        this.incrementarValoresGrafico(avaliacao.rere_reav_id);
      });
      this.dataSource.data = this.chartData;

      this.carregandoGraficos = false;
    });
  }

  async setLabelsDeGraficoMotivos() {
    const motivos: IAvaliacaoMotivo[] = (await api.get<IAvaliacaoMotivo[]>('refeicao-avaliacao-motivo')).data;
    const refeicaoReference = await this.refeicaoService.consultarRefeicoes();
    
    let categorias: { label: string }[] = [];

    if (this.store.ultimaRefeicao.id !== refeicaoReference['almoco']) {
      categorias = motivos.map(motivo => {
        const objetoLabel = this.filtrarLabel(motivo.ream_motivo);
  
        if (motivo.ream_refe_id === this.store.ultimaRefeicao.id || motivo.ream_refe_id === null)
          return {
            label: objetoLabel.label
          }

        return { label: "" };
      }).filter(item => item.label !== "")
    } 
    else {
      categorias = motivos.map(motivo => {
        return this.filtrarLabel(motivo.ream_motivo);
      })
    }

    this.dataSourceMotivos = {
      ...this.dataSourceMotivos,
      categories: [
        {
          category: [...categorias]
        }
      ]
    }

    this.dataSourceMotivos.dataset?.forEach(dataset => {
      this.dataSourceMotivos.categories?.forEach(categoria => {
        dataset.data = [];
        categoria.category.forEach(item => {
          dataset.data = [
            ...dataset.data,
            { value: 0 }
          ]
        })
      })
    });

  }

  async setDadosDeGraficoMotivos(motivos?: IMotivos[]) {

    let motivosResultado: IMotivos[] = [];
    if (!motivos) {
      motivosResultado = (await this.graficoService.pegarMotivosAvaliacaoPorDataHora(new Date(), this.store.ultimaRefeicao.horarioId)).data;
    }
    else
      motivosResultado = motivos;


    this.dataSourceMotivos.dataset?.forEach(dataset => {
      this.dataSourceMotivos.categories?.forEach(categoria => {
        dataset.data = [];
        categoria.category.forEach(item => {
          dataset.data = [
            ...dataset.data,
            { value: 0 }
          ]
        })
      })
    });

    let dadosCarregados = true;
    motivosResultado.map(motivo => {
      let motivoFiltrado = motivo.ream_motivo === 'Sem refeição' ? motivo.ream_motivo : this.primeiraPalavraDeMotivos(motivo.ream_motivo);

      this.dataSourceMotivos.categories?.forEach(categories => {
        let index = categories.category.map((item, index) => item.label === motivoFiltrado ? index : -1).filter(indice => indice !== -1)[0];

        this.dataSourceMotivos.dataset?.forEach(dataset => {
          if(motivo.reav_tipo === dataset.seriesname && index !== undefined) {
            dataset.data[+index].value += 1;
          } 
          else if (index === undefined) {
            console.log('Erro ao fazer requisição para o backend');
            dadosCarregados = false;
          }
        })
      })
    })

    this.dataSourceMotivos.chart.subCaption = dadosCarregados ? "" : "Houve um error ao tentar carregar os dados do gráfico... 🙁";
    
  }

  async ngOnInit(): Promise<void> {

    this.refeicao = await this.refeicaoService.consultarRefeicoes();
    if (this.refeicao) {
      this.conexaoFeita = true;
    }

    const tipos = await api.get<ITipoAvaliacao[]>('refeicao-avaliacao');

    this.chartData = tipos.data.map(tipo => {
      return {
        label: tipo.reav_tipo,
        value: 0
      }
    });
    
    let socketResponseCounter = 0;

    this.setDadosDeGraficoAvaliacao(this.store.ultimaRefeicao.nome, this.store.ultimaRefeicao.horarioId);
    this.socket.on("pegarRefeicao", async (payload: IPegarRefeicaoEvent) => {

      const refeicaoDiferenteDaUltima = payload.refeicao !== 'aguardando' && payload.horarioId !== this.store.ultimaRefeicaoGrafico.horarioId;

      if (!socketResponseCounter || refeicaoDiferenteDaUltima) {

        await this.setLabelsDeGraficoMotivos();
        await this.setDadosDeGraficoMotivos();

        this.carregandoGraficos = refeicaoDiferenteDaUltima;
        socketResponseCounter = refeicaoDiferenteDaUltima ? 0 : 1;

      }

      if (payload.refeicao !== 'aguardando') {
        this.store.ultimaRefeicao = payload.ultimaRefeicao;
        this.setDadosDeGraficoAvaliacao(refeicaoOpcao[payload.refeicao], payload.horarioId);

      } else {
        this.setDadosDeGraficoAvaliacao(payload.ultimaRefeicao.nome, payload.ultimaRefeicao.horarioId);
      }
    });

    this.socket.on('atualizarGraficoMotivos', async (payload: { motivos: IMotivos[] }) => {
      await this.setDadosDeGraficoMotivos();
    });

    this.socket.on("atualizarValorGrafico", async (response: SocketResponse) => {
      await this.graficoService.pegarAvaliacoesPorRefeicao(this.store.refeicao.horarioId)
        .then(response => {

          this.chartData.forEach(data => data.value = 0);
          response.data.map(avaliacao => {
            this.incrementarValoresGrafico(avaliacao.rere_reav_id);
            this.dataSource.data = this.chartData;
          })
        });      
    });

    await this.setLabelsDeGraficoMotivos();
    await this.setDadosDeGraficoMotivos();
  }

  ngOnDestroy() {} 
}