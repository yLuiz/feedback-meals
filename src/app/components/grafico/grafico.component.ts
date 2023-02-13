import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { StoreService } from 'src/app/store/store.service';
import { MealsOption, MealsText } from 'src/app/types/types';

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

  mealsOption = {
    desjejum: "Desjejum",
    almoco: "Almoço / Janta",
    lanche: "Lanche"
  }

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

  constructor(
    private router: Router,
    private socket: Socket,
    private store: StoreService
  ) {
    // Chart Configuration
    this.dataSource = {
      chart: {
        caption: this.store.refeicao.nome,
        showValues: true,
        subCaption: '',
        xAxisName: 'Avaliações',
        yAxisName: 'Percentual',
        numberSuffix: '',
        palettecolors: `${this.avalicaoColor.otimo}, ${this.avalicaoColor.bom}, ${this.avalicaoColor.regular}`,
        theme: 'fusion',
      },
      data: this.chartData,
    };
  }

  ngOnInit(): void {
    this.socket.on("atualizarGrafico", (response: SocketResposne) => {
      this.chartData[response.reav_id - 1].value += 1
    });

    this.socket.on("limparGrafico", (payload: { refeicao: MealsOption }) => {

      console.log(this.mealsOption[payload.refeicao])
      this.store.refeicao.nome = this.mealsOption[payload.refeicao] as MealsText;
      this.dataSource.chart.caption = this.mealsOption[payload.refeicao]

      this.chartData.forEach(data => {
        data.value = 0;
      })
    });
  }
}
