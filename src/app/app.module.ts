import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuRefeicaoComponent } from './components/menu-refeicao/menu-refeicao.component';
import { FeedbackRefeicaoComponent } from './components/feedback-refeicao/feedback-refeicao.component';
import { StoreService } from './store/store.service';
import { MessageComponent } from './components/message/message.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { FusionChartsModule } from "angular-fusioncharts";

import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MotivoAvaliacaoComponent } from './components/motivo-avaliacao/motivo-avaliacao.component';

const config: SocketIoConfig = { url: 'localhost:3000', options: {}};

FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme)
@NgModule({
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    FusionChartsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    MenuRefeicaoComponent,
    FeedbackRefeicaoComponent,
    MessageComponent,
    GraficoComponent,
    MotivoAvaliacaoComponent
  ],
  providers: [
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
