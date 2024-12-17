import React, { ChangeEvent } from "react";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";

interface AlunosFitrosAlunoProps {
  formData: {
    nome: string;
    serie: string;
    turma: string;
    situacai: string;
  };
  onChange: (e: ChangeEvent<any>) => void;
}

const AlunosFiltros: React.FC = () => {
  
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Filtros</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                
                >
                  <Form.Label>
                    Série <span className="obgr">*</span>
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

              <Col>
                <Form.Group
                  className="mb-3"
                
                >
                  <Form.Label>
                    Turma <span className="obgr">*</span>
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

              <Col xs={6}>
                <Form.Group
                  className="mb-3"
                
                >
                  <Form.Label>
                    Nome <span className="obgr">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Digite o nome do aluno"
                  />

                  <Form.Control.Feedback type="invalid">
                    Campo obrigatório.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label as="legend" column sm={2}>
                    Status
                  </Form.Label>

                  <Row className="m-0">
                    <Form.Check
                      className="alunos-filtros-radio"
                      type="radio"
                      label="Todos"
                      checked
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                    />
                    <Form.Check
                      className="alunos-filtros-radio"
                      type="radio"
                      label="Regular"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios2"
                    />
                    <Form.Check
                      className="alunos-filtros-radio"
                      type="radio"
                      label="Em Débito"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios3"
                    />
                  </Row>
                </Form.Group>
              </Col>

              <Col>
                <div className="w-100 h-100 d-flex justify-content-end align-items-end">
                  <Button type="submit" className="btn-orange">
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

export default AlunosFiltros;
