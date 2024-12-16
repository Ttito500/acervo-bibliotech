import React from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AlunosEmprestimosAluno: React.FC = () => {
  return (
    <>
      <Row>
        <Col>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Período</Form.Label>
            <Form.Select aria-label="Selecione um gênero">
              <option>Até 1 mês</option>
              <option value="1">Até 2 meses</option>
              <option value="2">Até 3 meses</option>
              <option value="3">Até 12 meses</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Table striped className="tabela">
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Gênero</th>
            <th className="text-center">Status da Entrega</th>
            <th>Data Entrega</th>
          </tr>
        </thead>
        <tbody>
          <tr className="tabela-tr">
            <td>123-12-12345-12-1</td>
            <td>A Hora da Estrela</td>
            <td>Clarice Lispector</td>
            <td>Romance</td>
            <td className="text-center">
              <Badge className="bibliotech-badge" bg="info">Pendente</Badge>
            </td>
            <td></td>
          </tr>

          <tr className="tabela-tr">
            <td>523-32-12345-12-1</td>
            <td>A Hora da Estrela</td>
            <td>Clarice Lispector</td>
            <td>Romance</td>
            <td className="text-center">
              <Badge className="bibliotech-badge" bg="warning">Em Atraso</Badge>
            </td>
            <td></td>
          </tr>

          <tr className="tabela-tr">
            <td>321-12-54321-12-9</td>
            <td>A Hora da Estrela</td>
            <td>Clarice Lispector</td>
            <td>Romance</td>
            <td className="text-center">
              <Badge className="bibliotech-badge" bg="danger">Extraviado</Badge>
            </td>
            <td></td>
          </tr>

          <tr className="tabela-tr">
            <td>321-12-54321-12-9</td>
            <td>A Hora da Estrela</td>
            <td>Clarice Lispector</td>
            <td>Romance</td>
            <td className="text-center">
              <Badge className="bibliotech-badge" bg="success">Entregue</Badge>
            </td>
            <td>22/11/2024</td>
          </tr>
          
        </tbody>
      </Table>
    </>
  );
};

export default AlunosEmprestimosAluno;
