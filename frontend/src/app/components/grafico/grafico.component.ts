import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import api from 'src/api/api';
import { refeicaoOpcao } from 'src/app/interfaces/IRefeicao';
import { ITipoAvaliacao } from 'src/app/interfaces/ITipoAvaliacao';
import { IPegarRefeicaoEvent } from 'src/app/interfaces/Socket.interfaces';
import { RefeicaoService } from 'src/app/references/refeicao.service';
import { IRefeicaoStore, StoreService } from 'src/app/store/store.service';
import { RefeicaoOpcoes, RefeicaoTexto, RefeicaoType } from 'src/app/types/types';
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

  dataSource!: any;
  chartData: Array<{ label: string, value: number}> = [];

  goToFeedback() {
    this.router.navigate(['/feedback'])
  }

  incrementarValoresGrafico(rere_reav_id: number) {
    this.chartData[rere_reav_id - 1].value += 1;
  }

  constructor(
    private router: Router,
    private socket: Socket,
    public store: StoreService,
    private graficoService: GraficoService,
    private refeicaoService: RefeicaoService
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
      },
      data: this.chartData,
    };
  }

  setDadosGrafico(captionChart: string, refe_id: number): void {

    this.dataSource.chart.caption = captionChart;
    this.graficoService.pegarAvaliacoesPorRefeicao(refe_id).then((response) => {
      this.chartData.forEach(data => data.value = 0);
      response.data.map(avaliacao => {
        this.incrementarValoresGrafico(avaliacao.rere_reav_id);
        this.dataSource.data = this.chartData;
      });
    });
  }

  async ngOnInit(): Promise<void> {

    this.refeicao = await this.refeicaoService.consultarRefeicoes();

    const tipos = await api.get<ITipoAvaliacao[]>('refeicao-avaliacao');
    this.chartData = tipos.data.map(tipo => {
      return {
        label: tipo.reav_tipo,
        value: 0
      }
    });
    this.dataSource.data = this.chartData;

    this.socket.on("pegarRefeicao", (payload: IPegarRefeicaoEvent) => {

      console.log(this.store.ultimaRefeicao);

      if (payload.refeicao !== 'aguardando') {
        this.store.ultimaRefeicao = payload.ultimaRefeicao;
        this.setDadosGrafico(refeicaoOpcao[payload.refeicao], this.refeicao[payload.refeicao]);
      } else {
        this.setDadosGrafico(payload.ultimaRefeicao.nome, payload.ultimaRefeicao.id);
      }
    });

    this.setDadosGrafico(this.store.ultimaRefeicao.nome, this.store.ultimaRefeicao.id);

    this.socket.on("atualizarValorGrafico", (response: SocketResponse) => {
      this.graficoService.pegarAvaliacoesPorRefeicao(this.store.refeicao.id)
        .then(response => {
          this.chartData.forEach(data => data.value = 0);
          response.data.map(avaliacao => {
            this.incrementarValoresGrafico(avaliacao.rere_reav_id);
            this.dataSource.data = this.chartData;
          })
        });
    });
  }
}
