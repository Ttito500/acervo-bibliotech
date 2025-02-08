import React, { useEffect, useState } from "react";
import ToastContainer from "react-bootstrap/esm/ToastContainer";
import Toast from "react-bootstrap/esm/Toast";
import Button from "react-bootstrap/esm/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/esm/Accordion";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListagemExemplares from "./templates/ListagemExemplares";

const Exemplares: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [showToastError, setShowToastError] = useState(false);
    const [showToastSuccess, setShowToastSuccess] = useState(false);

    useEffect(() => {
        telaTurmas();
    }, []);

    const telaTurmas = async (): Promise<void> => {
        setLoading(true);

        try {
            /* empty */
        } catch (err) {
            setShowToastError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="Exemplar">
            <div className="Exemplar-acoes">
                <ToastContainer
                    className="p-3"
                    position="bottom-center"
                    style={{zIndex: 10}}
                >
                    <Toast
                        bg="success"
                        onClose={() => setShowToastSuccess(false)}
                        show={showToastSuccess}
                        delay={3000}
                        autohide
                    >
                        <Toast.Header>
                            <strong className="me-auto">
                                Operação realizada com sucesso!
                            </strong>
                        </Toast.Header>
                    </Toast>
                </ToastContainer>

                <ToastContainer
                    className="p-3"
                    position="bottom-center"
                    style={{zIndex: 10}}
                >
                    <Toast
                        bg="danger"
                        onClose={() => setShowToastError(false)}
                        show={showToastError}
                        delay={3000}
                        autohide
                    >
                        <Toast.Header>
                            <strong className="me-auto">
                                Não foi possível concluir a operação. Tente novamente.
                            </strong>
                        </Toast.Header>
                    </Toast>
                </ToastContainer>

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Body className="accordion-body-expanded">
                            <strong>Cadastro de Exemplares do Livro:</strong>
                            <Form className="mt-3">
                                <Row>
                                    <Col xs={2}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                Estante <span className="obgr">*</span>
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
                                    <Col xs={2}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                Prateleira <span className="obgr">*</span>
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
                                    <Col xs={2}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                Seção <span className="obgr">*</span>
                                            </Form.Label>
                                            <Form.Select aria-label="Selecione">
                                                <option>Selecione</option>
                                                <option value="1">X</option>
                                                <option value="2">Y</option>
                                                <option value="3">Z</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Campo obrigatório.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                Quantidade de Exemplares a ser Cadastrada <span className="obgr">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Digite a quantidade"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Campo obrigatório.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Observação</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={1}
                                                placeholder="Digite uma observação"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <div className="w-100 h-100 d-flex justify-content-end align-items-center" style={{ marginTop: "9px" }}>
                                            <Button variant="success">
                                                <FontAwesomeIcon icon={faPlus} /> Cadastrar Novo(s) Exemplar(es)
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className="w-100">
                <ListagemExemplares/>
            </div>
        </section>
    );
};

export default Exemplares;