import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { mealsOption } from 'src/app/interfaces/IRefeicao';
import { refeicao, refeicao_avaliacao } from 'src/app/references/refeicao';
import { StoreService } from 'src/app/store/store.service';
import { MealsOption, MealsText } from 'src/app/types/types';
import { GraficoService } from './grafico.service';

interface SocketResposne {
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

  dataSource!: any;
  chartData: Array<any> = [
    {
      label: 'Ótimo',
      value: 0,
    },
    {
      label: 'Bom',
      value: 0,
    },
    {
      label: 'Regular',
      value: 0,
    },
  ];

  goToFeedback() {
    this.router.navigate(['/feedback'])
  }

  setValoresGrafico(rere_reav_id: number) {
    this.chartData[rere_reav_id - 1].value += 1;
  }

  constructor(
    private router: Router,
    private socket: Socket,
    public store: StoreService,
    private graficoService: GraficoService
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

  ngOnInit(): void {

    this.graficoService.pegarAvaliacoesPorRefeicao(this.store.refeicao.id)
      .then(response => {
        response.data.map(avaliacao => {
          this.setValoresGrafico(avaliacao.rere_reav_id);
        })
    });

    this.socket.on("atualizarValorGrafico", (response: SocketResposne) => {
      this.graficoService.pegarAvaliacoesPorRefeicao(this.store.refeicao.id)
        .then(response => {
          this.chartData.forEach(data => data.value = 0);
          response.data.map(avaliacao => {
            this.setValoresGrafico(avaliacao.rere_reav_id);
            this.dataSource.data = this.chartData;
          })
        });
    });

    this.socket.on("pegarRefeicao", (payload: { refeicao: MealsOption }) => {

      this.store.refeicao.nome = mealsOption[payload.refeicao] as MealsText;
      this.store.refeicao.id = refeicao[payload.refeicao];
      this.dataSource.chart.caption = mealsOption[payload.refeicao];      

      this.graficoService.pegarAvaliacoesPorRefeicao(this.store.refeicao.id).then((response) => {
        this.chartData.forEach(data => data.value = 0);
        response.data.map(avaliacao => {
          this.setValoresGrafico(avaliacao.rere_reav_id);
          this.dataSource.data = this.chartData;
        })
      });
    });
  }
}
