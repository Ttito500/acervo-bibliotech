import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListagemOcorrencia from "./ListagemOcorrencia";

const VerOcorrencias:React.FC = () => {
    return (
        <section className="Exemplar">
            <div>
                <Form className="mt-0">
                    <Row>
                        <Col xs={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Data da Ocorrência
                                </Form.Label>
                                <Form.Select aria-label="Selecione" required className="custom-placeholder">
                                    <option value="1">Últimos 30 dias</option>
                                    <option value="2">Últimos 60 dias</option>
                                    <option value="3">Últimos 90 dias</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Nome <span className="obgr">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Busque pelo nome do aluno"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Detalhes <span className="obgr">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite os detalhes da ocorrência"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={3} className="d-flex justify-content-end" style={{marginTop: "30px"}}>
                            <Button variant="info" className="btn-danger resizable-button">
                                <FontAwesomeIcon icon={faPlus}/> Registrar Ocorrência</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <ListagemOcorrencia/>
            <div className="w-100"></div>
        </section>
    );
};

export default VerOcorrencias;