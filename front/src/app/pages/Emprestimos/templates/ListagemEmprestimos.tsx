import React from "react";
import {
  faCalendarPlus,
  faCircleXmark,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { ResponsePagination } from "./../../../interfaces/pagination";
import { GetEmprestimoResponse } from "./../../../interfaces/emprestimo";
import FormatDate from "./../../../shared/components/format-date/FormatDate";

interface ListagemEmprestimosProps {
  emprestimos: ResponsePagination<GetEmprestimoResponse>;
  onConcluir: (emprestimo: GetEmprestimoResponse) => void;
  onRenovar: (emprestimo: GetEmprestimoResponse) => void;
  onCancelar: (emprestimo: GetEmprestimoResponse) => void;
}

const ListagemEmprestimos: React.FC<ListagemEmprestimosProps> = ({ emprestimos, onConcluir, onRenovar, onCancelar }) => {
  return (
    <>
      <Table striped className="tabela">
        <thead>
          <tr>
            <th>ISBN</th>
            <th className="text-center">Exemplar</th>
            <th>Título</th>
            <th>Aluno</th>
            <th>Emprestado Por</th>
            <th>Concluído Por</th>
            <th>Observações</th>
            <th className="text-center">Data Empr.</th>
            <th className="text-center">Prazo</th>
            <th className="text-center">Devolução</th>
            <th className="text-center">Renovações</th>
            <th className="text-center">Status</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos?.content.map((emprestimo) => (
            <tr key={emprestimo.id} className="tabela-tr">
              <td>{emprestimo.isbn}</td>
              <td className="text-center">{emprestimo.numeroExemplar}</td>
              <td>{emprestimo.tituloLivro}</td>
              <td>{emprestimo.nomeAluno}</td>
              <td>{emprestimo.realizadoPor}</td>
              <td>{emprestimo.concluidoPor}</td>
              <td>{emprestimo.observacao}</td>
              <td className="text-center"><FormatDate dateString={emprestimo.dataEmprestimo} /></td>
              <td className="text-center"><FormatDate dateString={emprestimo.dataPrazo} /></td>
              <td className="text-center"><FormatDate dateString={emprestimo.dataConclusao} /></td>
              <td className="text-center">{emprestimo.qtdRenovacao}</td>
              <td className="text-center">

                {emprestimo.situacao == 'entregue' &&
                  <Badge className="bibliotech-badge" bg="success">
                    Entregue
                  </Badge>
                }
                {emprestimo.situacao == 'pendente' &&
                  <Badge className="bibliotech-badge" bg="info">
                    Pendente
                  </Badge>
                }
                {emprestimo.situacao == 'atrasado' &&
                  <Badge className="bibliotech-badge" bg="warning">
                    Atrasado
                  </Badge>
                }
                {emprestimo.situacao == 'cancelado' &&
                  <Badge className="bibliotech-badge" bg="danger">
                    Cancelado
                  </Badge>
                }
                {emprestimo.situacao == 'extraviado' &&
                  <Badge className="bibliotech-badge" bg="danger">
                    Extraviado
                  </Badge>
                }
                
              </td>
              <td>
                <ButtonGroup aria-label="Ações" className="tabela-acoes">

                  <Button
                    variant="btn-outline-secondary"
                    className="color-orange"
                    onClick={() => onConcluir(emprestimo)}
                  >
                    <FontAwesomeIcon icon={faClipboardCheck} />
                  </Button>

                  <Button
                    variant="btn-outline-secondary"
                    className="color-blue"
                    onClick={() => onRenovar(emprestimo)}
                  >
                    <FontAwesomeIcon icon={faCalendarPlus} />
                  </Button>

                  <Button
                    variant="btn-outline-secondary"
                    className="color-red"
                    onClick={() => onCancelar(emprestimo)}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
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

export default ListagemEmprestimos;
