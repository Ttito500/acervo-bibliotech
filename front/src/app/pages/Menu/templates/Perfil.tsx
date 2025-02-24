import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";

const Perfil: React.FC = () =>{
    return (
        <Form>
            <Row>
                <Col xs={10}>
                    <Form.Group className="mb-0">
                        <Form.Label>
                            <strong>Nome:</strong> Pedro Rivaldo
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-0">
                        <Form.Label>
                            <strong>Email:</strong> pedrorivaldo.dev@gmail.com
                        </Form.Label>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default Perfil;