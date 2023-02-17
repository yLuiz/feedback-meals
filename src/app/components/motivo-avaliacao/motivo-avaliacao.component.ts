import { Component, OnInit } from '@angular/core';
import { IAvaliacaoMotivo, ICadastroMotivo } from 'src/app/interfaces/IRefeicaoAvaliacaoMotivo';
import { MotivoAvaliacaoService } from './motivo-avaliacao.service';

@Component({
  selector: 'app-motivo-avaliacao',
  templateUrl: './motivo-avaliacao.component.html',
  styleUrls: ['./motivo-avaliacao.component.scss']
})
export class MotivoAvaliacaoComponent implements OnInit {

  constructor(
    public motivoAvaliacaoService: MotivoAvaliacaoService
  ) { }

  enviandoMotivos = false;
  motivosSelecionados: IAvaliacaoMotivo[] = [];
  avaliacaoMotivos: IAvaliacaoMotivo[] = [];

  fecharPopUp() {
    this.motivoAvaliacaoService.esconder(500);
    this.motivosSelecionados = [];
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

  setMotivos() {
    this.motivoAvaliacaoService.pegarMotivosAvaliacao()
      .then(response => {
        this.avaliacaoMotivos = response.data;
      })
  }

  enviarMotivos() {

    if (this.enviandoMotivos) return;

    this.enviandoMotivos = true;

    const motivosCadastro = this.motivosSelecionados.map(motivo => {
      return {
        rerm_ream_id: motivo.ream_id,
        rerm_rere_id: this.motivoAvaliacaoService.rereId
      } as ICadastroMotivo;
    })
    this.motivoAvaliacaoService.cadastrarMotivoAvaliacao({ motivos: motivosCadastro })
      .then((response) => {
        this.motivoAvaliacaoService.esconder(500);
        this.motivosSelecionados = [];
        setTimeout(() => {
          this.enviandoMotivos = false;
        }, 500);
      });
  }

  ngOnInit(): void {
    this.setMotivos();
  }
}
