import React, { ChangeEvent } from "react";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { LivroFiltros } from "./../../../interfaces/acervo";

interface AcervoFiltrosProps {
  formData: LivroFiltros;
  onChange: (e: ChangeEvent<any>) => void;
  onSearch: () => void;
}

const AcervoFiltros: React.FC<AcervoFiltrosProps> = ({ formData, onChange, onSearch }) => {
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
                  <Form.Control 
                    type="text" 
                    placeholder="Digite o ISBN"
                    name="isbn"
                    value={formData.isbn}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Título</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Digite o título" 
                    name="titulo"
                    value={formData.titulo}
                    onChange={onChange}
                  />
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
                    name="autor"
                    value={formData.autor}
                    onChange={onChange}
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
                  <Form.Control
                    type="text"
                    placeholder="Digite o gênero"
                    name="genero"
                    value={formData.genero}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label as="legend" column sm={2}>
                    Ativo
                  </Form.Label>

                  <Row className="m-0">
                  <Form.Check
                      className="alunos-filtros-radio"
                      type="radio"
                      label="Todos"
                      name="ativo"
                      value="null"
                      checked={formData.ativo === null}
                      onChange={onChange}
                    />
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
  );
};

export default AcervoFiltros;
