import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const AcervoFiltros: React.FC = () => {
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
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control type="text" placeholder="Digite o ISBN" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Título</Form.Label>
                  <Form.Control type="text" placeholder="Digite o título" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Autor</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome do autor"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Gênero</Form.Label>
                  <Form.Select aria-label="Selecione um gênero">
                    <option>Todos</option>
                    <option value="1">Romance</option>
                    <option value="2">Drama</option>
                    <option value="3">Terror</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label as="legend" column sm={2}>
                    Status
                  </Form.Label>

                  <Row className="m-0">
                    <Form.Check
                      className="acervo-filtros-radio"
                      type="radio"
                      label="Todos"
                      checked
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                    />
                    <Form.Check
                      className="acervo-filtros-radio"
                      type="radio"
                      label="Disponível"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios2"
                    />
                    <Form.Check
                      className="acervo-filtros-radio"
                      type="radio"
                      label="Indisponível"
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

export default AcervoFiltros;
