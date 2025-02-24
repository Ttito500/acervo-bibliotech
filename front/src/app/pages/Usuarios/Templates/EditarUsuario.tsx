import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";

const EditarUsuario: React.FC = () =>{
    return(
        <Form>
            <Row>
                <Col xs={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Nome
                        </Form.Label>
                        <Form.Control type="text" placeholder="Nome do Usuário" required />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col xs={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control type="email" placeholder="Email do usuario" required />
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Senha
                        </Form.Label>
                        <Form.Control type="password" placeholder="**********" required />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default EditarUsuario;