import React from "react";
import {
  faClipboardList,
  faPenToSquare,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { GetAlunoResponse } from "./../../../interfaces/aluno";

interface AlunosListagemProps {
  alunos: GetAlunoResponse[];
  onEdit: (aluno: GetAlunoResponse) => void;
  onDelete: (id: number) => void;
  onEmprestimos: (aluno: GetAlunoResponse) => void;
}

const AlunosListagem: React.FC<AlunosListagemProps> = ({ alunos, onEdit, onDelete, onEmprestimos }) => {

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
            <th className="text-center">Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id} className="tabela-tr">
              <td>{aluno.idTurma.serie}ª</td>
              <td>{aluno.idTurma.turma}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.telefone}</td>
              <td className="text-center">
                <Badge className="bibliotech-badge" bg={aluno.situacao == 'regular' ? 'success' : 'danger'}>
                  {aluno.situacao == 'regular' ? 'Regular' : 'Em Débito'}
                </Badge>
              </td>
              <td>
                <ButtonGroup aria-label="Ações" className="tabela-acoes">

                  <Button
                    variant="btn-outline-secondary"
                    className="color-blue"
                    onClick={() => onEmprestimos(aluno)}
                  >
                    <FontAwesomeIcon icon={faClipboardList} />
                  </Button>

                  <Button
                    variant="btn-outline-secondary"
                    className="color-green"
                    onClick={() => onEdit(aluno)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>

                  <Button
                    variant="btn-outline-secondary"
                    className="color-red"
                    onClick={() => onDelete(aluno.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
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
