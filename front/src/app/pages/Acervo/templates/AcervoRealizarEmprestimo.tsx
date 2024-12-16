import React from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const AcervoRealizarEmprestimo: React.FC = () => {
  return (
    <Form>
        <Row>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Série <span className="obgr">*</span></Form.Label>
                    <Form.Select aria-label="Selecione">
                        <option>Selecione</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Select>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Turma <span className="obgr">*</span></Form.Label>
                    <Form.Select aria-label="Selecione">
                        <option>Selecione</option>
                        <option value="1">A</option>
                        <option value="2">B</option>
                        <option value="3">C</option>
                    </Form.Select>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Aluno <span className="obgr">*</span></Form.Label>
                    <Form.Select aria-label="Selecione o aluno">
                        <option>Selecione o aluno</option>
                        <option value="1">Pedro Rivaldo</option>
                        <option value="2">João</option>
                        <option value="3">Gabriel</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            
        </Row>

        <Row>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Prazo para Devolução</Form.Label>
                    <Form.Control readOnly type="text" placeholder="Prazo para a devolução" value="03/12/2024" />
                </Form.Group>
            </Col>

            <Col></Col>
            <Col></Col>
            
        </Row>

    </Form>
  );
}

export default AcervoRealizarEmprestimo;