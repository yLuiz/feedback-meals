import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuRefeicaoComponent } from './components/menu-refeicao/menu-refeicao.component';
import { FeedbackRefeicaoComponent } from './components/feedback-refeicao/feedback-refeicao.component';
import { StoreService } from './store/store.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuRefeicaoComponent,
    FeedbackRefeicaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
