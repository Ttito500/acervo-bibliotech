import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const CadastrarEmprestimo: React.FC = () => {
  return (
    <Form>
      {/* Primeira Linha - Seleção de Livro e Exemplar */}
      <Row>
        <Col xs={8}>
          <Form.Group className="mb-3">
            <Form.Label>
              Livro <span className="obgr">*</span>
            </Form.Label>
            <Form.Select aria-label="Digite o título de um livro">
              <option>Digite o título do livro</option>
              <option value="1">Livro 1</option>
              <option value="2">Livro 2</option>
              <option value="3">Livro 3</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={4}>
          <Form.Group className="mb-3">
            <Form.Label>
              Exemplar <span className="obgr">*</span>
            </Form.Label>
            <Form.Select aria-label="Selecione">
              <option>Selecione</option>
              <option value="1">Exemplar 1</option>
              <option value="2">Exemplar 2</option>
              <option value="3">Exemplar 3</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Segunda Linha - Seleção de Série, Turma e Aluno */}
      <Row>
        <Col xs={2}>
          <Form.Group className="mb-3">
            <Form.Label>
              Série <span className="obgr">*</span>
            </Form.Label>
            <Form.Select aria-label="Selecione">
              <option>Selecione</option>
              <option value="1">Série 1</option>
              <option value="2">Série 2</option>
              <option value="3">Série 3</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={2}>
          <Form.Group className="mb-3">
            <Form.Label>
              Turma <span className="obgr">*</span>
            </Form.Label>
            <Form.Select aria-label="Selecionar">
              <option>Selecione</option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={8}>
          <Form.Group className="mb-3">
            <Form.Label>
              Selecionar Aluno <span className="obgr">*</span>
            </Form.Label>
            <Form.Select aria-label="Selecione um aluno">
              <option>Digite o nome do aluno</option>
              <option value="1">Aluno 1</option>
              <option value="2">Aluno 2</option>
              <option value="3">Aluno 3</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Terceira Linha - Observação (opcional, ocupa a linha inteira) */}
      <Row>
        <Col xs={12}>
          <Form.Group className="mb-3">
            <Form.Label>Observação</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Digite uma observação (opcional)"
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Quarta Linha - Prazo Calculado Para Devolução */}
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Prazo Calculado Para Devolução <span className="obgr">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o prazo de devolução"
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default CadastrarEmprestimo;
