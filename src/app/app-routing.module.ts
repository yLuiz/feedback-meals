import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackRefeicaoComponent } from './components/feedback-refeicao/feedback-refeicao.component';
import { MenuRefeicaoComponent } from './components/menu-refeicao/menu-refeicao.component';

const routes: Routes = [
  { path: 'feedback', component: FeedbackRefeicaoComponent },
  { path: 'menu', component: MenuRefeicaoComponent },
  { path: '**', component: MenuRefeicaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
