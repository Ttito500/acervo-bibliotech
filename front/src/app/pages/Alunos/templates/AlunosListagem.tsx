import React from "react";
import {
  faClipboardList,
  faPenToSquare,
  faPowerOff
} from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { GetAlunoResponse } from "./../../../interfaces/aluno";
import { ResponsePagination } from "./../../../interfaces/pagination";
import Tooltip from "react-bootstrap/esm/Tooltip";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";

interface AlunosListagemProps {
  alunos: ResponsePagination<GetAlunoResponse>;
  onEdit: (aluno: GetAlunoResponse) => void;
  onActive: (id: number) => void;
  onInactive: (id: number) => void;
  onEmprestimos: (aluno: GetAlunoResponse) => void;
}

const AlunosListagem: React.FC<AlunosListagemProps> = ({ alunos, onEdit, onActive, onInactive, onEmprestimos }) => {

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

  const renderTooltipVerEmprestimos = (props: any) => (
    <Tooltip id="button-tooltip-3" {...props}>
      Ver Empréstimos
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
            <th className="text-center">Série</th>
            <th className="text-center">Turma</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th className="text-center">Situação</th>
            <th className="text-center">Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos?.content.map((aluno) => (
            <tr key={aluno.id} className="tabela-tr">
              <td>{aluno.turma.serie}ª</td>
              <td>{aluno.turma.turma}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.telefone}</td>
              <td className="text-center">

                {aluno.situacao == 'regular' &&
                  <Badge className="bibliotech-badge" bg="success">
                    Regular
                  </Badge>
                }

                {aluno.situacao == 'irregular' &&
                  <Badge className="bibliotech-badge" bg="warning">
                    Irregular
                  </Badge>
                }
                {aluno.situacao == 'debito' &&
                  <Badge className="bibliotech-badge" bg="danger">
                    Em Débito
                  </Badge>
                }
                
              </td>
              <td className="text-center">
                
                {aluno.ativo &&
                  <Badge className="bibliotech-badge" bg="success">
                    Ativo
                  </Badge>
                }

                {!aluno.ativo &&
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
                    overlay={renderTooltipVerEmprestimos}
                  >
                    <Button
                      variant="btn-outline-secondary"
                      className="color-blue"
                      onClick={() => onEmprestimos(aluno)}
                    >
                      <FontAwesomeIcon icon={faClipboardList} />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltipEditar}
                  >
                    <Button
                      variant="btn-outline-secondary"
                      className="color-green"
                      onClick={() => onEdit(aluno)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </OverlayTrigger>


                  { !aluno.ativo &&
                    <OverlayTrigger
                      placement="left"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltipAtivar}
                    >
                      <Button
                        variant="btn-outline-secondary"
                        className="color-green"
                        onClick={() => onActive(aluno.id)}
                      >
                        <FontAwesomeIcon icon={faPowerOff} />
                      </Button>
                    </OverlayTrigger>
                  }

                  { aluno.ativo &&
                    <OverlayTrigger
                      placement="left"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltipInativar}
                    >
                      <Button
                        variant="btn-outline-secondary"
                        className="color-red"
                        onClick={() => onInactive(aluno.id)}
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

export default AlunosListagem;
