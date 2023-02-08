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

FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme)
@NgModule({
  declarations: [
    AppComponent,
    MenuRefeicaoComponent,
    FeedbackRefeicaoComponent,
    MessageComponent,
    GraficoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FusionChartsModule,
    ReactiveFormsModule,
  ],
  providers: [
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
