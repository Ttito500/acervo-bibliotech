import React from "react";
import { Table, Badge, Button, ButtonGroup } from "react-bootstrap";
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

                  <Button
                    variant="btn-outline-secondary"
                    className="color-green"
                    onClick={() => onEdit(turma)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>

                  { !turma.ativo &&
                    <Button
                      variant="btn-outline-secondary"
                      className="color-green"
                      onClick={() => onActive(turma.id)}
                    >
                      <FontAwesomeIcon icon={faPowerOff} />
                    </Button>
                  }

                  { turma.ativo &&
                    <Button
                      variant="btn-outline-secondary"
                      className="color-red"
                      onClick={() => onInactive(turma.id)}
                    >
                      <FontAwesomeIcon icon={faPowerOff} />
                    </Button>
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
