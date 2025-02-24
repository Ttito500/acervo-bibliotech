import { Button, Form, Row, Col, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { ChangeEvent } from "react";

interface TurmaFitrosAlunoProps {
  formData: {
    serie: number;
    turma: string;
    anoDeEntrada: number;
    ativo: boolean;
  };
  onChange: (e: ChangeEvent<any>) => void;
  onSearch: () => void;
}

const FiltrosTurma: React.FC<TurmaFitrosAlunoProps> = ({ formData, onChange, onSearch }) => {
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filtros</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Série
                    </Form.Label>
  
                    <Form.Select 
                      aria-label="Selecione" 
                      name="serie"
                      value={formData.serie}
                      onChange={onChange}
                    >
                      <option value="">Selecione</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Turma
                    </Form.Label>
                    <Form.Select 
                      aria-label="Selecione" 
                      name="turma"
                      value={formData.turma}
                      onChange={onChange}
                    >
                      <option value="">Selecione</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Ano de Entrada
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Digite o ano de entrada"
                      name="anoDeEntrada"
                      value={formData.anoDeEntrada}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>
                      Ativo
                    </Form.Label>
  
                    <Row className="m-0">
                      <Form.Check
                        className="alunos-filtros-radio"
                        type="radio"
                        label="Sim"
                        name="ativo"
                        value="true"
                        checked={formData.ativo === true}
                        onChange={onChange}
                      />
                      <Form.Check
                        className="alunos-filtros-radio"
                        type="radio"
                        label="Não"
                        name="ativo"
                        value="false"
                        checked={formData.ativo === false}
                        onChange={onChange}
                      />
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <div className="w-100 h-100 d-flex justify-content-end align-items-end">
                    <Button className="btn-orange" onClick={onSearch}>
                      <FontAwesomeIcon icon={faMagnifyingGlass} /> Filtrar
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default FiltrosTurma;
