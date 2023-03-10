import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { IAvaliacaoMotivo, ICadastroMotivo } from 'src/app/interfaces/IRefeicaoAvaliacaoMotivo';
import { IPegarRefeicaoEvent } from 'src/app/interfaces/Socket.interfaces';
import { RefeicaoService } from 'src/app/references/refeicao.service';
import { StoreService } from 'src/app/store/store.service';
import { RefeicaoType } from 'src/app/types/types';
import { MotivoAvaliacaoService } from './motivo-avaliacao.service';

@Component({
  selector: 'app-motivo-avaliacao',
  templateUrl: './motivo-avaliacao.component.html',
  styleUrls: ['./motivo-avaliacao.component.scss']
})
export class MotivoAvaliacaoComponent implements OnInit {

  constructor(
    public motivoAvaliacaoService: MotivoAvaliacaoService,
    private store: StoreService,
    private socket: Socket,
    private refeicaoService: RefeicaoService
  ) { }

  motivoPopupSubscribe!: Subscription;
  enviandoMotivos = false;
  motivosEnviados = false;
  podeEnviarMotivos = true;
  refeicoes!: RefeicaoType;

  motivosSelecionados: IAvaliacaoMotivo[] = [];
  avaliacaoMotivos: IAvaliacaoMotivo[] = [];

  fecharPopUp() {
    this.motivoAvaliacaoService.esconder(50);
    this.motivosSelecionados = [];
    this.motivoAvaliacaoService.motivosEnviados = true;
  };

  selecionarMotivo(motivo: IAvaliacaoMotivo) {
    if (this.motivosSelecionados.includes(motivo)) {
      const spanSelecionado = document.getElementById(`motivo_${motivo.ream_id}`);
      spanSelecionado?.classList.remove('selecionado');
      
      this.motivosSelecionados = this.motivosSelecionados.filter(item => item.ream_id !== motivo.ream_id);

    } else {
      this.motivosSelecionados.push(motivo);

      this.motivosSelecionados.forEach(motivo => {
        const spanSelecionado = document.getElementById(`motivo_${motivo.ream_id}`);
        spanSelecionado?.classList.add('selecionado');
      });
    }
  }

  async setMotivos() {
    this.refeicoes = await this.refeicaoService.consultarRefeicoes();

    this.socket.on('pegarRefeicao', (payload: IPegarRefeicaoEvent) => {
      this.motivoAvaliacaoService.pegarMotivosAvaliacao()
        .then(response => {
          this.avaliacaoMotivos = response.data.filter(motivo => {
            return motivo.ream_refe_id === this.refeicoes[payload.refeicao] || motivo.ream_refe_id === null;
          });
        })
        .catch(err => console.log(err));
    });  
  }

  enviarMotivos() {
    if (!this.podeEnviarMotivos) return;

    this.podeEnviarMotivos = false;
    this.enviandoMotivos = true;

    const motivosCadastro = this.motivosSelecionados.map(motivo => {
      return {
        rerm_ream_id: motivo.ream_id,
        rerm_rere_id: this.motivoAvaliacaoService.rereId
      } as ICadastroMotivo;
    })
    this.motivoAvaliacaoService.cadastrarMotivoAvaliacao({ motivos: motivosCadastro })
      .then(() => {
        const time = 50;

        this.enviandoMotivos = false;
        this.motivosEnviados = true;
        this.motivoAvaliacaoService.motivosEnviados = true;

        setTimeout(() => {
          this.motivoAvaliacaoService.esconder(time);
          setTimeout(() => {
            this.motivosEnviados = false;
            this.podeEnviarMotivos = true;
          }, 500);
        }, time);
      });
  }

  async ngOnInit(): Promise<void> {

    this.motivoPopupSubscribe = this.motivoAvaliacaoService.eventPopupEscondida.subscribe(popupEscondida => {      
      popupEscondida ? this.motivosSelecionados = [] : null;
    });

    this.socket.emit('pegarRefeicao');
    await this.setMotivos();
  }

  ngOnDestroy() {
    this.motivoPopupSubscribe.unsubscribe();
  }
}
