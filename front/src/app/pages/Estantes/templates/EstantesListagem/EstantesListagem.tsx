import React from "react";
import styles from "./EstantesListagem.module.css";
import {
  Estante,
  GetEstantePrateleiraResponse,
} from "./../../../../interfaces/estante-prateleira";

interface EstantesListagemProps {
  estantes: Estante[];
  onGerenciar: (estantePrateleira: GetEstantePrateleiraResponse) => void;
}

const EstantesListagem: React.FC<EstantesListagemProps> = ({
  estantes,
  onGerenciar,
}) => {
  return (
    <>
      <div className={styles.estantes_listagem}>
        {estantes?.map((estante) => (
          <div key={estante.estante} className={styles.estantes_listagem_item}>
            <div className={styles.estantes_listagem_item_estante}>
              Estante {estante.estante}
            </div>

            {estante.prateleiras?.map((prateleira) => (
              <div
                key={prateleira.prateleira}
                className={styles.estantes_listagem_item_prateleira}
                onClick={() =>
                  onGerenciar({
                    id: prateleira.id,
                    estante: estante.estante,
                    prateleira: prateleira.prateleira,
                  })
                }
              >
                <span className={styles.estantes_listagem_item_prateleira_nome}>Prateleira {prateleira.prateleira}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default EstantesListagem;
