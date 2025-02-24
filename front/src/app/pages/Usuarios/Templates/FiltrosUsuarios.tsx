import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const FiltrosUsuarios: React.FC = () => {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Filtros</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Row>
                            <Col xs={2}>
                                <Form.Group className="mb-3" controlId="cargoSelect">
                                    <Form.Label>Cargo</Form.Label>
                                    <Form.Select aria-label="Selecione um cargo">
                                        <option>Selecione</option>
                                        <option value="1">Aluno Monitor</option>
                                        <option value="2">Bibliotecária(o)</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={8}>
                                <Form.Group className="mb-3" controlId="nomeInput">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" placeholder="Digite o nome" />
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group className="mb-3" controlId="ativoRadio">
                                    <Form.Label>Ativo</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            label="Sim"
                                            type="radio"
                                            name="ativo"
                                            value="sim"
                                            defaultChecked
                                        />
                                        <Form.Check
                                            inline
                                            label="Não"
                                            type="radio"
                                            name="ativo"
                                            value="nao"
                                        />
                                    </div>
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row>
                            <Col>
                                <div className="w-100 h-100 d-flex justify-content-end align-items-end">
                                    <Button className="btn-orange">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Filtrar
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default FiltrosUsuarios;