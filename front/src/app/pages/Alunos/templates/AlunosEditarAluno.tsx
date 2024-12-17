import React, { ChangeEvent, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface AlunosEditarAlunoProps {
  formData: {
    nome: string;
    telefone: string;
    email: string;
    situacao: string;
  };
  onChange: (e: ChangeEvent<any>) => void;
}

const AlunosEditarAluno: React.FC<AlunosEditarAlunoProps> = ({ formData, onChange }) => {

  return (
    <Form >
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Série <span className="obgr">*</span>
            </Form.Label>

            <Form.Select aria-label="Selecione" name="serie">
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
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Email
            </Form.Label>
            <Form.Control type="email" placeholder="Digite o email" name="email" value={formData.email} onChange={onChange} />
          </Form.Group>
        </Col>

        <Col>
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

        <Col>
					<Form.Group className="mb-3">
							<Form.Label>
								Status <span className="obgr">*</span>
							</Form.Label>
							<Form.Select aria-label="Selecione" name="situacao" value={formData.situacao} onChange={onChange}>
								<option value="regular">Regular</option>
								<option value="debito">Em Débito</option>
							</Form.Select>

							<Form.Control.Feedback type="invalid">
								Campo obrigatório.
							</Form.Control.Feedback>
						</Form.Group>
				</Col>
      </Row>
    </Form>
  );
};

export default AlunosEditarAluno;
