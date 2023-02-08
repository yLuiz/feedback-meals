import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss'],
})
export class GraficoComponent implements OnInit {

  avalicaoColor = {
    otimo: "1AAE9E",
    bom: "2C89D9",
    regular: "E88439",
    ruim: "D3455D"
  }

  dataSource!: Object;

  goToFeedback() {
    this.router.navigate(['/feedback'])
  }

  constructor(
    private store: StoreService,
    private router: Router
  ) {
    const chartData = [
      {
        label: 'Ótimo',
        value: this.store.feedback.avaliacao.otimo,
      },
      {
        label: 'Bom',
        value: this.store.feedback.avaliacao.bom,
      },
      {
        label: 'Regular',
        value: this.store.feedback.avaliacao.regular,
      },
      {
        label: 'Ruim',
        value: this.store.feedback.avaliacao.ruim,
      },
    ];

    // Chart Configuration
    const dataSource = {
      chart: {
        caption: 'Avaliação da refeição', //Set the chart caption
        subCaption: '', //Set the chart subcaption
        xAxisName: 'Avaliações', //Set the x-axis name
        yAxisName: 'Percentual', //Set the y-axis name
        numberSuffix: '',
        palettecolors: `${this.avalicaoColor.otimo}, ${this.avalicaoColor.bom}, ${this.avalicaoColor.regular}, ${this.avalicaoColor.ruim}`,
        theme: 'fusion', //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chartData,
    };

    this.dataSource = dataSource;
  }

  ngOnInit(): void {}
}
