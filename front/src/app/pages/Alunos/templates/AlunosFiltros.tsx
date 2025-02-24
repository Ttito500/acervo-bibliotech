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
    serie: number;
    turma: string;
    situacao: string;
    ativo: boolean;
  };
  onChange: (e: ChangeEvent<any>) => void;
  onSearch: () => void;
}

const AlunosFiltros: React.FC<AlunosFitrosAlunoProps> = ({ formData, onChange, onSearch }) => {
  
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Filtros</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Série <span className="obgr">*</span>
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
                    Turma <span className="obgr">*</span>
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

              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Nome <span className="obgr">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="nome"
                    placeholder="Digite o nome do aluno"
                    value={formData.nome}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label as="legend" column sm={2}>
                    Situação
                  </Form.Label>
                  <Row className="m-0">
                    <Form.Check
                      className="alunos-filtros-radio"
                      type="radio"
                      label="Todos"
                      name="situacao"
                      value=""
                      checked={formData.situacao == ""}
                      onChange={onChange}
                    />
                    <Form.Check
                      className="alunos-filtros-radio"
                      type="radio"
                      label="Regular"
                      name="situacao"
                      value="regular"
                      checked={formData.situacao == "regular"}
                      onChange={onChange}
                    />
                    <Form.Check
                      className="alunos-filtros-radio"
                      type="radio"
                      label="Irregular"
                      name="situacao"
                      value="irregular"
                      checked={formData.situacao == "irregular"}
                      onChange={onChange}
                    />
                    <Form.Check
                      className="alunos-filtros-radio"
                      type="radio"
                      label="Em Débito"
                      name="situacao"
                      value="debito"
                      checked={formData.situacao == "debito"}
                      onChange={onChange}
                    />
                  </Row>
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

export default AlunosFiltros;
