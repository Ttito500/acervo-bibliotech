import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { GetEmprestimoResponse } from "./../../../interfaces/emprestimo";

interface CancelarEmprestimoProps {
  emprestimo: GetEmprestimoResponse
}

const DesistirEmprestimo: React.FC<CancelarEmprestimoProps> = ({ emprestimo }) => {
  return (
    <Form>
      <Row>
        <Col xs={3}>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Aluno: </strong>{emprestimo.nomeAluno}
            </Form.Label>
          </Form.Group>
        </Col>

        <Col xs={3}>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Livro: </strong>{emprestimo.tituloLivro}
            </Form.Label>
          </Form.Group>
        </Col>

        <Col xs={2}>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Exemplar: </strong>{emprestimo.numeroExemplar}
            </Form.Label>
          </Form.Group>
        </Col>

        <Col xs={2}>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Estante: </strong>TO DO
            </Form.Label>
          </Form.Group>
        </Col>

        <Col xs={2}>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Prateleira: </strong>TO DO
            </Form.Label>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={10}>
          <Form.Group className="mb-3">
            <Form.Label>
              Tem certeza que deseja desistir o empréstimo?
            </Form.Label>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default DesistirEmprestimo;
