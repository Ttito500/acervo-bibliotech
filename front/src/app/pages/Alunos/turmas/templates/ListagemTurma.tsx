import React from "react";
import { Table, Badge, Button, ButtonGroup, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { GetTurmaResponse } from "./../../../../interfaces/turma";

interface TurmasListagemProps {
  turmas: GetTurmaResponse[];
  onEdit: (turma: GetTurmaResponse) => void;
  onActive: (id: number) => void;
  onInactive: (id: number) => void;
}

const ListagemTurma: React.FC<TurmasListagemProps> = ({ turmas, onEdit, onActive, onInactive }) => {

  const renderTooltipAtivar = (props: any) => (
    <Tooltip id="button-tooltip-1" {...props}>
      Ativar
    </Tooltip>
  );

  const renderTooltipInativar = (props: any) => (
    <Tooltip id="button-tooltip-2" {...props}>
      Inativar
    </Tooltip>
  );

  const renderTooltipEditar = (props: any) => (
    <Tooltip id="button-tooltip-4" {...props}>
      Editar
    </Tooltip>
  );
  
  return (
    <>
      <Table striped className="tabela">
        <thead>
          <tr>
            <th className="text-center th-center-size-fifteen">Série</th>
            <th className="text-center th-center-size-fifteen">Turma</th>
            <th>Ano de Entrada</th>
            <th className="text-center">Ativo</th>
            <th className="th-center-size-eight">Ações</th>
          </tr>
        </thead>
        <tbody>
          {turmas?.map((turma) => (
            <tr key={turma.id} className="tabela-tr">
              <td>{turma.serie}ª</td>
              <td>{turma.turma}</td>
              <td>{turma.anoDeEntrada}</td>
              <td className="text-center">
                
                {turma.ativo &&
                  <Badge className="bibliotech-badge" bg="success">
                    Ativo
                  </Badge>
                }

                {!turma.ativo &&
                  <Badge className="bibliotech-badge" bg="danger">
                    Inativo
                  </Badge>
                }
                
              </td>
              <td>
                <ButtonGroup aria-label="Ações" className="tabela-acoes">

                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltipEditar}
                  >
                    <Button
                      variant="btn-outline-secondary"
                      className="color-green"
                      onClick={() => onEdit(turma)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </OverlayTrigger>


                  { !turma.ativo &&
                    <OverlayTrigger
                      placement="left"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltipAtivar}
                    >
                      <Button
                        variant="btn-outline-secondary"
                        className="color-green"
                        onClick={() => onActive(turma.id)}
                      >
                        <FontAwesomeIcon icon={faPowerOff} />
                      </Button>
                    </OverlayTrigger>
                  }

                  { turma.ativo &&
                    <OverlayTrigger
                      placement="left"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltipInativar}
                    >
                      <Button
                        variant="btn-outline-secondary"
                        className="color-red"
                        onClick={() => onInactive(turma.id)}
                      >
                        <FontAwesomeIcon icon={faPowerOff} />
                      </Button>
                    </OverlayTrigger>
                  }

                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ListagemTurma;
