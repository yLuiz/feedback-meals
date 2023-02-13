export const refeicao = {
  desjejum: 1,
  almoco: 2,
  lanche: 3
}

export const refeicao_avaliacao = {
  otimo: 1,
  bom: 2,
  regular: 3
}

export interface IRefeicaoResultadoRequest {
  rere_refe_id: number;
  rere_reav_id: number;
}

export interface IRefeicaoResultadoResponse {
  rere_id: number;
  rere_refe_id: number;
  rere_reav_id: number;
  rere_data_registro: Date;
  rere_status: number;
}