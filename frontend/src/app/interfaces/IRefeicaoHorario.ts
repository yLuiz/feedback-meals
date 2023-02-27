export interface IRefeicaoHorario {
  reho_hora_fim: Date
  reho_hora_inicio: Date
  reho_id: number
  reho_refe_id: number
}

export interface IRefeicaoHorarioAtual {
  refe_id: number
  refe_refeicao: "almoco/janta"
  refe_status: "1"
  reho_hora_fim: Date
  reho_hora_inicio: Date
  reho_id: number
  reho_refe_id: number
}