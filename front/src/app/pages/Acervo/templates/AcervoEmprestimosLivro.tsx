import React from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

const AcervoEmprestimosLivro: React.FC = () => {
  return (
    <>
      <Table striped className="tabela">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Série</th>
            <th>Turma</th>
            <th>Data Empréstimo</th>
            <th>Prazo</th>
          </tr>
        </thead>
        <tbody>
          <tr className="tabela-tr">
            <td>Pedro Rivaldo</td>
            <td>1ª</td>
            <td>A</td>
            <td>12/11/2024</td>
            <td className="text-center">
              <Badge className="bibliotech-badge" bg="danger">11/11/2024</Badge>
            </td>
          </tr>

          <tr className="tabela-tr">
            <td>Pedro</td>
            <td>1ª</td>
            <td>A</td>
            <td>18/12/2024</td>
            <td className="text-center">
              <Badge className="bibliotech-badge" bg="success">20/12/2024</Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default AcervoEmprestimosLivro;
