import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

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
import { environment } from 'src/environments/environment';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

const config: SocketIoConfig = { url: environment.api_url, options: {
  reconnection: false
}};

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
    MotivoAvaliacaoComponent,
    ErrorDialogComponent,
  ],
  providers: [
    StoreService,
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
