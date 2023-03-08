import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service';
import { MessageService } from '../message/message.service';
import { FeedbackRefeicaoService } from './feedback-refeicao.service';
import { refeicao_avaliacao } from '../../references/refeicao';
import { MotivoAvaliacaoService } from '../motivo-avaliacao/motivo-avaliacao.service';
import { AvaliacaoOpcoes, RefeicaoOpcoes, RefeicaoTexto, RefeicaoType } from 'src/app/types/types';
import { refeicaoOpcao } from 'src/app/interfaces/IRefeicao';
import { Socket } from 'ngx-socket-io';
import { IRefeicaoHorario } from 'src/app/interfaces/IRefeicaoHorario';
import { RefeicaoService } from 'src/app/references/refeicao.service';
import { IPegarRefeicaoEvent } from 'src/app/interfaces/Socket.interfaces';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';


@Component({
  selector: 'app-feedback-refeicao',
  templateUrl: './feedback-refeicao.component.html',
  styleUrls: ['./feedback-refeicao.component.scss']
})
export class FeedbackRefeicaoComponent implements OnInit {
  constructor(
    private socket: Socket,
    public store: StoreService,
    private router: Router,
    private messageService: MessageService,
    private feedbackRefeicaoService: FeedbackRefeicaoService,
    public motivoAvaliacaoService: MotivoAvaliacaoService,
    private refeicaoService: RefeicaoService,
    public errorDialogService: ErrorDialogService
  ) { }

  horarios: IRefeicaoHorario[] = [];
  title!: string;
  loadingMotivos: boolean = false;
  avaliacaoHabilitada: boolean = false;
  refeicao!: RefeicaoType;

  async submitFeedback(feedbackKey: AvaliacaoOpcoes) {

    if (this.store.refeicao.id === 0) return;
    if (this.motivoAvaliacaoService.visibility) return;

    // if (feedbackKey !== 'otimo') this.loadingMotivos = true;

    this.loadingMotivos = true;

    this.messageService.show();
    setTimeout(() => {
      this.messageService.hide();
    }, 800);
        
    this.store.feedback = {
      refeicao: this.store.refeicao,
      avaliacao: {
        ...this.store.feedback.avaliacao,
        [feedbackKey]: this.store.feedback.avaliacao[feedbackKey] + 1,
      }
    }

    this.feedbackRefeicaoService.submitFeedback({ 
      rere_reav_id: refeicao_avaliacao[feedbackKey],
      rere_refe_id: this.store.feedback.refeicao.id,
      rere_reho_id: this.store.refeicao.horarioId
    }).then(response => {
        this.loadingMotivos = false;
        if(feedbackKey !== "otimo") {
          this.motivoAvaliacaoService.mostrar(response.data.rere_id);
          

          setTimeout(() => {
            if (!this.motivoAvaliacaoService.motivosEnviados) {
              this.motivoAvaliacaoService.esconder(1000);
            }

            this.motivoAvaliacaoService.motivosEnviados = false;
          }, 12000);
        }
      });
  }

  goToMenu() {
    this.router.navigate(['grafico']);
  }

  async ngOnInit(): Promise<void> {

    // this.refeicao = { desjejum: 1, almoco: 2, lanche: 3 };
    this.refeicao = await this.refeicaoService.consultarRefeicoes();

    this.title = this.store.refeicao.nome
    if (!this.store.refeicao.id) {
      const container = document.getElementById('feedback-buttons');
      if (container) {
        container.style.display = 'none';
        document.getElementById('section-feedback')!.style.justifyContent = 'center';
      }
    }

    this.socket.on('pegarRefeicao', (response: IPegarRefeicaoEvent) => {
      const refeicaoPropriedades = {
        nome: refeicaoOpcao[response.refeicao] as RefeicaoTexto,
        id: this.refeicao[response.refeicao],
        horarioId: response.horarioId,
      }

      if (response.refeicao === 'aguardando') {
        const container = document.getElementById('feedback-buttons');
        if (container) {
          container.style.display = 'none';
          document.getElementById('section-feedback')!.style.justifyContent = 'center';
        }
      } else {

        this.store.avaliacaoHabilitada = true;

        const container = document.getElementById('feedback-buttons');
        if (container) {
          container.style.display = 'flex';
          document.getElementById('section-feedback')!.style.justifyContent = 'flex-start';
        }
      }
  
      this.store.refeicao = refeicaoPropriedades;
      this.store.feedback.refeicao = refeicaoPropriedades;

      this.title = refeicaoOpcao[response.refeicao];
    });
  }

}
