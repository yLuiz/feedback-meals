export const refeicaoOpcao = {
  desjejum: "Desjejum",
  almoco: "Almoço / Janta",
  lanche: "Lanche",
  aguardando: "Aguardando Refeição"
}

export interface IRefeicao {
  refe_id: number;
  refe_refeicao: string;
  refe_status: string;
}