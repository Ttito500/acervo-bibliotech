import React, { ChangeEvent } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ConcluirEmprestimoRequest, GetEmprestimoResponse } from "./../../../interfaces/emprestimo";

interface ConcluirEmprestimoProps {
  emprestimo: GetEmprestimoResponse;
  formData: ConcluirEmprestimoRequest;
  onChange: (e: ChangeEvent<any>) => void;
}

const ConfirmarEntrega: React.FC<ConcluirEmprestimoProps> = ({ emprestimo, formData, onChange }) => {
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
        <Col xs={12}>
          <Form.Group className="mb-3">
            <Form.Label>O exemplar foi extraviado?</Form.Label>
            <Form.Check
              type="radio"
              label="Sim"
              name="extraviado"
              value="true"
              checked={formData.extraviado === true}
              onChange={onChange}
            />
            <Form.Check
              type="radio"
              label="Não"
              name="extraviado"
              value="false"
              checked={formData.extraviado === false}
              onChange={onChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Form.Group className="mb-3">
            <Form.Label>Observação</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Digite uma observação (opcional)"
              name="observacao"
              onChange={onChange}
              value={formData.observacao}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default ConfirmarEntrega;
