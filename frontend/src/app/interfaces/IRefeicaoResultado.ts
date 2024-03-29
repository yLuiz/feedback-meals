export interface IRefeicaoResultadoRequest {
  rere_refe_id: number;
  rere_reav_id: number;
  rere_reho_id: number | null;
}

export interface IRefeicaoResultadoResponse {
  rere_id: number;
  rere_refe_id: number;
  rere_reav_id: number;
  rere_data_registro: Date;
  rere_status: number;
}

export interface IMotivos {
  rere_id: number,
  rere_reho_id: number,
  reav_tipo: string,
  ream_id: number,
  ream_motivo: string
}