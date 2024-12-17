export interface ListarAcervoResponse {
  id: number;
  isbn: string;
  titulo: string;
  autor: string;
  local: {
    id_estante_prateleira: number;
    estante: number;
    prateleira: number;
  };
  secao: {
    id: number;
    nome: string;
  }
  generos: {
    id: number;
    genero: string;
  }[];
  qtd_total: number;
  qtd_emprestados: number;
  qtd_atrasos: number;
  qtd_extraviados: number;
  qtd_disponiveis: number;
  situacao: 'emprestado' | 'disponivel' | 'extraviado';
}