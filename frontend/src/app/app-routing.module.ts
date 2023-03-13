import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackRefeicaoComponent } from './components/feedback-refeicao/feedback-refeicao.component';
import { GraficoComponent } from './components/grafico/grafico.component';

const routes: Routes = [
  { path: 'feedback', component: FeedbackRefeicaoComponent },
  { path: 'grafico', component: GraficoComponent },
  { path: '**', redirectTo: '/feedback' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
