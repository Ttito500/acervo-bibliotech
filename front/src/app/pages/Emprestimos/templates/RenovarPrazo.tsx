import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { GetEmprestimoResponse } from "./../../../interfaces/emprestimo";

interface RenovarEmprestimoProps {
  emprestimo: GetEmprestimoResponse
}

const RenovarPrazo: React.FC<RenovarEmprestimoProps> = ({ emprestimo }) => {
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
      </Row>

      <Row>
        <Col xs={10}>
          <Form.Group className="mb-3">
            <Form.Label>
              Tem certeza que deseja renovar o prazo do empréstimo para mais 7
              dias?
            </Form.Label>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default RenovarPrazo;
