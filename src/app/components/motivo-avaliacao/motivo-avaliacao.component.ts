import { Component, OnInit } from '@angular/core';
import { MotivoAvaliacaoService } from './motivo-avaliacao.service';

interface IMotivo {
  id: number;
  nome: string;
  descricao: string;
}

@Component({
  selector: 'app-motivo-avaliacao',
  templateUrl: './motivo-avaliacao.component.html',
  styleUrls: ['./motivo-avaliacao.component.scss']
})
export class MotivoAvaliacaoComponent implements OnInit {

  constructor(
    public motivoAvaliacaoService: MotivoAvaliacaoService
  ) { }

  motivosSelecionados: string[] = [];
  motivos: IMotivo[] = [
    {
      id: 1,
      nome: 'proteina',
      descricao: 'Proteína (Carne, Frango, Peixe e etc)'
      
    },
    {
      id: 2,
      nome: 'complemento',
      descricao: 'Complemento (Arroz, Feijão, Macarrão e etc)'
    },
    {
      id: 3,
      nome: 'organizacao',
      descricao: 'Organização & Limpeza'
    },
    {
      id: 4,
      nome: 'dieta',
      descricao: 'Dieta'
      
    },
    {
      id: 5,
      nome: 'salada',
      descricao: 'Salada'
      
    },
    {
      id: 6,
      nome: 'suco',
      descricao: 'Suco/Café'
      
    },
    {
      id: 7,
      nome: 'sobremesa',
      descricao: 'Sobremesa'
      
    },
    {
      id: 8,
      nome: 'lanche',
      descricao: 'Lanche'
      
    }
  ]

  selecionarMotivo(motivo: IMotivo) {
    if (this.motivosSelecionados.includes(motivo.nome)) {
      const spanSelecionado = document.getElementById(motivo.nome);
      spanSelecionado?.classList.remove('selecionado');
      
      this.motivosSelecionados = this.motivosSelecionados.filter(item => item !== motivo.nome);

    } else {
      this.motivosSelecionados.push(motivo.nome);

      this.motivosSelecionados.forEach(motivo => {
        const spanSelecionado = document.getElementById(motivo);
        spanSelecionado?.classList.add('selecionado');
      });
    }   
  }

  enviarMotivos() {
    this.motivosSelecionados = [];
    this.motivoAvaliacaoService.esconder(500);
    console.log("enviarMotivos");
  }

  ngOnInit(): void {
    this.motivoAvaliacaoService.mostrar();
  }

}
