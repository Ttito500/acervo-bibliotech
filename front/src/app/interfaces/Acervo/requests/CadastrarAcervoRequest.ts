export interface CadastrarAcervoRequest {
  isbn: string;
  titulo: string;
  autor: string;
  id_estante_prateleira: number;
  id_secao: number;
  generos: number[];
  qtd_exemplares: number;
}