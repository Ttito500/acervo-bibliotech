import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { faCalendarDay, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListagemFrequencias from "./ListagemFrequencias";

const VerFrequencias: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [showToastError, setShowToastError] = useState(false);
    const [showToastSuccess, setShowToastSuccess] = useState(false);

    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        TelaInicio();
    }, []);

    const TelaInicio = async (): Promise<void> => {
        setLoading(true);
        try {
            // Lógica de carregamento
        } catch (err) {
            setShowToastError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="Exemplar">
            <div className="Exemplar-acoes">
                <Form className="mt-0">
                    <Row>
                        <Col xs={4}>
                            <Form.Group controlId="formData" className="mb-3">
                                <Form.Label>
                                    Data da Frequência <span className="obgr">*</span>
                                </Form.Label>
                                <InputGroup>
                                    <DatePicker
                                        selected={date}
                                        onChange={(date: Date) => setDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        customInput={
                                            <Form.Control
                                                type="text"
                                                placeholder="Selecione a data"
                                                readOnly
                                                style={{ cursor: "pointer" }}
                                                className="no-border-radius-right"
                                            />
                                        }
                                    />
                                    <InputGroup.Text className="btn-orange">
                                        <FontAwesomeIcon icon={faCalendarDay} />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Nome <span className="obgr">*</span>
                                </Form.Label>
                                <Form.Control type="text" placeholder="Busque pelo nome do aluno" required />
                                <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Atividade <span className="obgr">*</span>
                                </Form.Label>
                                <Form.Select aria-label="Selecione" required className="custom-placeholder">
                                    <option value="" disabled selected hidden>
                                        Atividade que o aluno está fazendo
                                    </option>
                                    <option value="1">Estudando</option>
                                    <option value="2">Descansando</option>
                                    <option value="3">Lendo</option>
                                    <option value="4">Vivendo</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={2} className="d-flex justify-content-end" style={{ marginTop: "30px" }}>
                            <Button variant="info" className="btn-orange resizable-button">
                                <FontAwesomeIcon icon={faPlus} /> Registrar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <ListagemFrequencias />
            <div className="w-100"></div>
        </section>
    );
};

export default VerFrequencias;
