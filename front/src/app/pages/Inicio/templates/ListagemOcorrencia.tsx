import React from "react";
import { Table, Button, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { GetOcorrenciaResponse } from "./../../../interfaces/ocorrencia";
import { format } from "date-fns/format";

interface ListagemOcorrenciasProps {
  ocorrencias: GetOcorrenciaResponse[];
  onDelete: (id: number) => void;
}

const ListagemOcorrencias: React.FC<ListagemOcorrenciasProps> = ({ ocorrencias, onDelete }) => {

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
            <th>Detalhes</th>
            <th className="align-center">Data</th>
            <th className="th-center-size-eight">Ações</th>
          </tr>
        </thead>
        <tbody>
          {ocorrencias?.map((ocorrencia) => (
            <tr key={ocorrencia.id} className="tabela-tr">
              <td className="text-center">{ocorrencia.aluno.turma.serie}ª</td>
              <td className="text-center">{ocorrencia.aluno.turma.turma}</td>
              <td>{ocorrencia.aluno.nome}</td>
              <td>{ocorrencia.detalhes}</td>
              <td>{format(ocorrencia.data, "dd/MM/yyyy")}</td>
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
                      onClick={() => onDelete(ocorrencia.id)}
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

export default ListagemOcorrencias;
