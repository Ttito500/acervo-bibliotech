import React, { ChangeEvent } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

interface EditarTurmaProps {
  formData: {
    serie: number;
    turma: string;
    anoDeEntrada: number;
  };
  onChange: (e: ChangeEvent<any>) => void;
}

const EditarTurma: React.FC<EditarTurmaProps> = ({ formData, onChange }) => {

  return (
    <>
      <Form>
        <Row>
          <Col xs={3}>
            <Form.Group className="mb-3">
              <Form.Label>
                Série(número) <span className="obgr">*</span>
              </Form.Label>
              <Form.Select 
                aria-label="Selecione" 
                name="serie"
                value={formData.serie}
                onChange={onChange}
                required
              >
                <option value="">Selecione</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Campo obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={3}>
            <Form.Group className="mb-3">
              <Form.Label>
                Turma(letra) <span className="obgr">*</span>
              </Form.Label>
              <Form.Select 
                aria-label="Selecione" 
                name="turma"
                value={formData.turma}
                onChange={onChange}
                required 
              >
                <option value="">Selecione</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Campo obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Ano de Entrada <span className="obgr">*</span>
              </Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Digite o ano de entrada da turma"
                name="anoDeEntrada"
                value={formData.anoDeEntrada}
                onChange={onChange}
                required 
                min={0}
                max={9999}
              />

              <Form.Control.Feedback type="invalid">
                Campo obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EditarTurma;
