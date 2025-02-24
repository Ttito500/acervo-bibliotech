import React from "react";
import { GetSecaoResponse } from "../../../../interfaces/secao";
import styles from './SecoesListagem.module.css'

interface SecoesListagemProps {
  secoes: GetSecaoResponse[];
  onGerenciar: (secao: GetSecaoResponse) => void;
}

const SecoesListagem: React.FC<SecoesListagemProps> = ({ secoes, onGerenciar }) => {
  return (
    <>
      <div className={styles.secoes_listagem}>
        {secoes?.map((secao) => (
            <div key={secao.id} className={styles.secoes_listagem_item} onClick={() => onGerenciar(secao)}>
              <div className={styles.secoes_listagem_item_nome}>{secao.nome}</div>
              <div className={styles.secoes_listagem_item_descricao}>{secao.descricao}</div>
            </div>
        ))}
      </div>
    </>
  );
};

export default SecoesListagem;
