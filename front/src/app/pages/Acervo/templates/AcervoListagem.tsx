import React from "react";
import {
  faFileImport,
  faClipboardList,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { GetLivroResponse } from "./../../../interfaces/acervo";

interface AcervoListagemProps {
  livros: GetLivroResponse[];
  onEdit: (livro: GetLivroResponse) => void;
  onDelete: (id: number) => void;
  onEmprestimos: (livro: GetLivroResponse) => void;
  onRealizarEmprestimo: (livro: GetLivroResponse) => void;
}

const AcervoListagem: React.FC<AcervoListagemProps> = ({ livros, onEdit, onDelete, onEmprestimos, onRealizarEmprestimo }) => {

  return (
    <>
      <Table striped className="tabela">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th>ISBN</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Gênero</th>
            <th className="text-center">Local</th>
            <th className="text-center">Total</th>
            <th className="text-center">Empr.</th>
            <th className="text-center">Atrasos</th>
            <th className="text-center">Extrav.</th>
            <th className="text-center">Disp.</th>
            <th className="text-center">Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro.id} className="tabela-tr">
              <td className="text-center">{livro.id}</td>
              <td>{livro.isbn}</td>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>Romance</td>
              <td className="text-center">E{livro.idEstantePrateleira.estante} / P{livro.idEstantePrateleira.prateleira}</td>
              <td className="text-center">4</td>
              <td className="text-center">0</td>
              <td className="text-center">
                <Badge className="bibliotech-badge" bg="danger">
                  1
                </Badge>
              </td>
              <td className="text-center">0</td>
              <td className="text-center">3</td>
              <td className="text-center">
                <Badge className="bibliotech-badge" bg={livro.situacao == 'disponivel' ? 'success' : 'danger'}>
                  {livro.situacao == 'disponivel' ? 'Disponível' : 'Indisponível'}
                </Badge>
              </td>
              <td>
                <ButtonGroup aria-label="Ações" className="tabela-acoes">
                  <Button
                    variant="btn-outline-secondary"
                    className="color-orange"
                    onClick={() => onRealizarEmprestimo(livro)}
                  >
                    <FontAwesomeIcon icon={faFileImport} />
                  </Button>

                  <Button
                    variant="btn-outline-secondary"
                    className="color-blue"
                    onClick={() => onEmprestimos(livro)}
                  >
                    <FontAwesomeIcon icon={faClipboardList} />
                  </Button>

                  <Button
                    variant="btn-outline-secondary"
                    className="color-green"
                    onClick={() => onEdit(livro)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>

                  <Button
                    variant="btn-outline-secondary"
                    className="color-red"
                    onClick={() => onDelete(livro.id)}
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

export default AcervoListagem;
