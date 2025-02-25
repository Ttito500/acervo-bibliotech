import React, { ChangeEvent } from "react";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { UsuarioFiltros } from "./../../../interfaces/usuario";

interface FitrosUsuarioProps {
	formData: UsuarioFiltros
	onChange: (e: ChangeEvent<any>) => void;
	onSearch: () => void;
}

const FiltrosUsuarios: React.FC<FitrosUsuarioProps> = ({ formData, onChange, onSearch }) => {
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
                  <Form.Select 
										aria-label="Selecione" 
										name="cargo"
										value={formData.cargo}
										onChange={onChange}
									>
										<option value="">Todos</option>
										<option value="aluno_monitor">Aluno Monitor</option>
										<option value="bibliotecario">Bibliotecária(o)</option>
									</Form.Select>
                </Form.Group>
              </Col>
              <Col xs={8}>
                <Form.Group className="mb-3" controlId="nomeInput">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control 
										type="text" 
										placeholder="Digite o nome"
										name="nome"
										value={formData.nome}
										onChange={onChange}
									/>
                </Form.Group>
              </Col>
              <Col xs={2}>
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
            </Row>

            <Row>
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

export default FiltrosUsuarios;
