import React, { ChangeEvent } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface AlunosCadastrarAlunoProps {
  formData: {
    nome: string;
    telefone: string;
    email: string;
  };
  onChange: (e: ChangeEvent<any>) => void;
}

const AlunosCadastrarAluno: React.FC<AlunosCadastrarAlunoProps> = ({ formData, onChange }) => {

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Série <span className="obgr">*</span>
            </Form.Label>

            <Form.Select aria-label="Selecione" name="serie">
              <option>Selecione</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              Campo obrigatório.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Turma <span className="obgr">*</span>
            </Form.Label>
            <Form.Select aria-label="Selecione" name="turma">
              <option>Selecione</option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              Campo obrigatório.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Nome <span className="obgr">*</span>
            </Form.Label>

            <Form.Control type="text" placeholder="Digite o nome" name="nome" value={formData.nome} onChange={onChange} />

            <Form.Control.Feedback type="invalid">
              Campo obrigatório.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Email
            </Form.Label>
            <Form.Control type="email" placeholder="Digite o email" name="email" value={formData.email} onChange={onChange} />
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Telefone <span className="obgr">*</span>
            </Form.Label>
            
            <Form.Control type="text" placeholder="Digite o telefone" name="telefone" value={formData.telefone} onChange={onChange} />

            <Form.Control.Feedback type="invalid">
              Campo obrigatório.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col></Col>
      </Row>
    </Form>
  );
};

export default AlunosCadastrarAluno;
