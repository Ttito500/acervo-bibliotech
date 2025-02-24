import React, { ChangeEvent, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { EmprestimosFiltros } from "./../../../interfaces/emprestimo";
import { format } from "date-fns/format";

import DatePicker, { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { formatarData } from "./../../../shared/components/format-date/FormatDate";

registerLocale('ptBR', ptBR);

interface FiltrosEmprestimoProps {
  formData: EmprestimosFiltros;
  onChange: (e: ChangeEvent<any>) => void;
  onSearch: () => void;
}

const FiltrosEmprestimo: React.FC<FiltrosEmprestimoProps> = ({ formData, onChange, onSearch }) => {

  const [dataEmprestimo, setDataEmprestimo] = useState<Date | null>(null);
  const [dataPrazo, setDataPrazo] = useState<Date | null>(null);
  const [dataConclusao, setDataConclusao] = useState<Date | null>(null);

  const handleChangeData = (name: string, value: Date): void => {
    if(!value) {
      const e: any = {
        target: {
          name,
          value: ""
        }
      }
      onChange(e)
    } else {
      const valueStr = format(value, "yyyy-MM-dd");
      const e: any = {
        target: {
          name,
          value: valueStr
        }
      }
      onChange(e)
    }

  };

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Filtros</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="isbnInput">
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
                <Form.Group className="mb-3" controlId="nomeAlunoInput">
                  <Form.Label>Nome do Aluno</Form.Label>
                  <Form.Control
                    type="text"
                    name="nomeAluno"
                    placeholder="Digite o nome do aluno"
                    value={formData.nomeAluno}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="tituloLivroInput">
                  <Form.Label>Título do Livro</Form.Label>
                  <Form.Control
                    type="text"
                    name="tituloLivro"
                    placeholder="Digite o título do livro"
                    value={formData.tituloLivro}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="situacaoSelect">
                  <Form.Label>Situação</Form.Label>
                  <Form.Select 
                    aria-label="Selecione uma situação"
                    name="situacao"
                    value={formData.situacao}
                    onChange={onChange}
                  >
                    <option value="">Todos</option>
                    <option value="entregue">Entregue</option>
                    <option value="pendente">Pendente</option>
                    <option value="atrasado">Atrasado</option>
                    <option value="cancelado">Cancelado</option>
                    <option value="extraviado">Extraviado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="campo1Input">
                  <Form.Label>Emprestado Por</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nomeRealizadoPor"
                    placeholder="Digite o nome" 
                    value={formData.nomeRealizadoPor}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="campo2Input">
                  <Form.Label>Concluído Por</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nomeConcluidoPor"
                    placeholder="Digite o nome" 
                    value={formData.nomeConcluidoPor}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="campo3Input">
                  <Form.Label>Data do Empréstimo</Form.Label>
                  <div className="w-100 datepicker-w">
                    <DatePicker
                      className="w-100"
                      isClearable={true}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Selecione a data"
                      selected={dataEmprestimo}
                      value={formatarData(formData.dataEmprestimo)}
                      onChange={(date: Date) => {setDataEmprestimo(date); handleChangeData("dataEmprestimo", date)}}
                      showPopperArrow={false}
                      locale="ptBR"
                      customInput={
                        <Form.Control
                          type="text"
                          value={formData.dataEmprestimo}
                          style={{ cursor: "pointer" }}
                        />
                      }
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="campo4Input">
                  <Form.Label>Data do Prazo</Form.Label>
                  <div className="w-100 datepicker-w">
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      isClearable={true}
                      selected={dataPrazo}
                      placeholderText="Selecione a data"
                      value={formatarData(formData.dataPrazo)}
                      onChange={(date: Date) => {setDataPrazo(date); handleChangeData("dataPrazo", date)}}
                      showPopperArrow={false}
                      locale="ptBR"
                      customInput={
                        <Form.Control
                          type="text"
                          value={formData.dataPrazo}
                          style={{ cursor: "pointer" }}
                        />
                      }
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="campo5Input">
                  <Form.Label>Data da Devolução</Form.Label>
                  <div className="w-100 datepicker-w">
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      isClearable={true}
                      className="w-100"
                      selected={dataConclusao}
                      value={formatarData(formData.dataConclusao)}
                      onChange={(date: Date) => {setDataConclusao(date); handleChangeData("dataConclusao", date)}}
                      showPopperArrow={false}
                      placeholderText="Selecione a data"
                      locale="ptBR"
                      customInput={
                        <Form.Control
                          type="text"
                          value={formData.dataConclusao}
                          style={{ cursor: "pointer" }}
                        />
                      }
                    />
                  </div>
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

export default FiltrosEmprestimo;
