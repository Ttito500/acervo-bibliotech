import React from "react";
import { Table, Button, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { GetFrequenciaResponse } from "./../../../interfaces/frequencia";

interface ListagemFrequenciasProps {
  frequencias: GetFrequenciaResponse[];
  onDelete: (id: number) => void;
}

const ListagemFrequencias: React.FC<ListagemFrequenciasProps> = ({ frequencias, onDelete }) => {

  const renderTooltipDeletar = (props: any) => (
    <Tooltip id="button-tooltip-5" {...props}>
      Deletar
    </Tooltip>
  );

  return (
    <>
      <Table striped className="tabela">
        <thead>
          <tr>
            <th className="th-center-size-eight">Série</th>
            <th className="th-center-size-eight">Turma</th>
            <th>Nome</th>
            <th className="th-size-twenty">Atividade</th>
            <th className="th-center-size-eight">Ações</th>
          </tr>
        </thead>
        <tbody>
          {frequencias?.map((frequencia) => (
            <tr key={frequencia.id} className="tabela-tr">
              <td className="text-center">{frequencia.aluno.turma.serie}ª</td>
              <td className="text-center">{frequencia.aluno.turma.turma}</td>
              <td>{frequencia.aluno.nome}</td>
              <td>
                {frequencia.atividade === 'lendo' && <span>Lendo</span>}
                {frequencia.atividade === 'celula_de_estudo' && <span>Célula de Estudo</span>}
                {frequencia.atividade === 'estudo_individual' && <span>Estudo Individual</span>}
                {frequencia.atividade === 'descansando' && <span>Descansando</span>}
                {frequencia.atividade === 'outros' && <span>Outros</span>}
              </td>
              <td>
                <ButtonGroup aria-label="Ações" className="tabela-acoes">
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltipDeletar}
                  >
                    <Button
                      variant="btn-outline-secondary"
                      className="color-red"
                      onClick={() => onDelete(frequencia.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </OverlayTrigger>
                </ButtonGroup>
              </td>
            </tr>
					))}
        </tbody>
      </Table>
    </>
  );
};

export default ListagemFrequencias;
