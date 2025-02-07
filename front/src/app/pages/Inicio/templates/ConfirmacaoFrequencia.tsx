import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";

const ConfirmacaoFrequencia: React.FC = () => {
    return (
        <Form>
            <Row>
                <Col xs={10}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tem certeza que deseja excluir este aluno da frequência?</Form.Label>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default ConfirmacaoFrequencia;
