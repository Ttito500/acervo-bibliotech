import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const AlunosCadastrarAluno: React.FC = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Série <span className="obgr">*</span>
            </Form.Label>

            <Form.Select aria-label="Selecione">
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Turma <span className="obgr">*</span>
            </Form.Label>
            <Form.Select aria-label="Selecione">
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Nome <span className="obgr">*</span>
            </Form.Label>

            <Form.Control type="text" placeholder="Digite o nome" />

            <Form.Control.Feedback type="invalid">
              Campo obrigatório.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Email
            </Form.Label>
            <Form.Control type="email" placeholder="Digite o email" />
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Telefone <span className="obgr">*</span>
            </Form.Label>
            
            <Form.Control type="text" placeholder="Digite o telefone" />

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
