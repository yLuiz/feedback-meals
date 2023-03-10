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