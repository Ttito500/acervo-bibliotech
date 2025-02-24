import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const CadastrarUsuarios: React.FC = () => {
    return (
        <Form>
            <Row>
                <Col xs={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Cargo <span className="obgr">*</span>
                        </Form.Label>
                        <Form.Select aria-label="Selecione" required>
                            <option value="">Selecione</option>
                            <option value="1">Aluno Monitor</option>
                            <option value="2">Bibliotecária(o)</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={9}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Nome <span className="obgr">*</span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Digite o nome" required />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col xs={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Email <span className="obgr">*</span>
                        </Form.Label>
                        <Form.Control type="email" placeholder="Digite o email" required />
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Senha <span className="obgr">*</span>
                        </Form.Label>
                        <Form.Control type="password" placeholder="Digite a senha" required />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );

};

export default CadastrarUsuarios