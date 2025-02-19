import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faPlus,
  faBullhorn,
  faCheck,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/esm/Accordion";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Modal from "react-bootstrap/esm/Modal";
import VerFrequencias from "./templates/VerFrequencias";
import VerOcorrencias from "./templates/VerOcorrencias";
import AlunosCadastrarAluno from "../Alunos/templates/AlunosCadastrarAluno";
import {Table} from "react-bootstrap";

const Inicio: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showToastError, setShowToastError] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);

  const [showFrequencia, setFrequencia] = useState(false);
  const handleCloseFrequencia = () => setFrequencia(false);
  const handleShowFrequencia = () => setFrequencia(true);

  const [showOcorrencia, setOcorrencia] = useState(false);
  const handleCloseOcorrencia = () => setOcorrencia(false);
  const handleShowOcorrencia = () => setOcorrencia(true);

  const [showCadastrar, setShowCadastrar] = useState(false);
  const handleCloseCadastrar = () => setShowCadastrar(false);
  const handleShowCadastrar = () => setShowCadastrar(true);

  const [formDataCadastrarAluno, setFormDataCadastrarAluno] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  const handleChangeCadastrarAluno = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormDataCadastrarAluno((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    TelaInicio();
  }, []);

  const TelaInicio = async (): Promise<void> => {
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

      <div className="w-100">

        <h2 className="cronograma-titulo">Cronograma de Alunos Monitores</h2>

        <Table striped className="cronograma">
          <thead>
          <tr>
            <th className="text-center">Segunda</th>
            <th className="text-center">Terça</th>
            <th className="text-center">Quarta</th>
            <th className="text-center">Quinta</th>
            <th className="text-center">Sexta</th>
          </tr>
          </thead>
          <tbody>
          <tr className="cronograma-tr">
            <td className="text-center">
              Pedro Rivaldo <br/> Gabriel Alves
            </td>
            <td className="text-center">
              Kauan Pereira <br/> Luis King
            </td>
            <td className="text-center">
              Tiago Tito <br/> Lucas Tito
            </td>
            <td className="text-center">
              Robson José <br/> Gustavo Fernandes
            </td>
            <td className="text-center">
              Gustavo Henrique <br/> Daniel Lucas
            </td>
          </tr>
          </tbody>
        </Table>
      </div>

      <div className="w-100">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="custon-accordion-header-green">
              Frequência
            </Accordion.Header>
            <Accordion.Body className="accordion-body-expanded">
              <Form className="mt-0">
                <Row>
                  <Col xs={6}>
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
                        Atividade <span className="obgr">*</span>
                      </Form.Label>
                      <Form.Select
                          aria-label="Selecione"
                          required
                          className="custom-placeholder"
                      >
                        <option value="" disabled selected hidden>
                          Atividade que o aluno está fazendo
                        </option>
                        <option value="lendo">Lendo</option>
                        <option value="celula_de_estudo">
                          Célula de Estudo
                        </option>
                        <option value="estudo_individual">
                          Estudo Individual
                        </option>
                        <option value="descansando">Descansando</option>
                        <option value="outros">Outros</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Campo obrigatório.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col
                    xs={2}
                    className="d-flex justify-content-end"
                    style={{ marginTop: "30px" }}
                  >
                    <Button
                      variant="info"
                      className="btn-orange resizable-button"
                    >
                      <FontAwesomeIcon icon={faPlus} /> Registrar
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col className="justify-content-start">
                    <Button
                      variant="info"
                      className="btn-blue"
                      onClick={handleShowCadastrar}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Cadastrar Novo Aluno
                    </Button>
                  </Col>
                  <Col xs={2} className="d-flex justify-content-end">
                    <Button
                      variant="info"
                      className="btn-blue resizable-button"
                      onClick={handleShowFrequencia}
                    >
                      <FontAwesomeIcon icon={faClipboardList} /> Ver Frequências
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Modal
          show={showFrequencia}
          onHide={handleCloseFrequencia}
          size="xl"
          backdrop="static"
          centered
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Frequências</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <VerFrequencias />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFrequencia}>
              Voltar
            </Button>
            <Button variant="success">
              <FontAwesomeIcon icon={faFileExport} /> Exportar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="w-100">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="custon-accordion-header-red">
              Ocorrência
            </Accordion.Header>
            <Accordion.Body className="accordion-body-expanded">
              <Form className="mt-0">
                <Row>
                  <Col xs={6}>
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
                  <Col
                    xs={2}
                    className="d-flex justify-content-end"
                    style={{ marginTop: "30px" }}
                  >
                    <Button
                      variant="info"
                      className="btn-danger resizable-button"
                    >
                      <FontAwesomeIcon icon={faPlus} /> Registrar Ocorrência
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col className="justify-content-start">
                    <Button
                      variant="info"
                      className="btn-blue"
                      onClick={handleShowCadastrar}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Cadastrar Novo Aluno
                    </Button>
                  </Col>
                  <Col xs={2} className="d-flex justify-content-end">
                    <Button
                      variant="info"
                      className="btn-blue resizable-button"
                      onClick={handleShowOcorrencia}
                    >
                      <FontAwesomeIcon icon={faBullhorn} /> Ver Ocorrências
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Modal
          show={showOcorrencia}
          onHide={handleCloseOcorrencia}
          size="xl"
          backdrop="static"
          centered
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Ocorrências</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <VerOcorrencias />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseOcorrencia}>
              Voltar
            </Button>
            <Button variant="success">
              <FontAwesomeIcon icon={faFileExport} /> Exportar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showCadastrar}
          onHide={handleCloseCadastrar}
          size="xl"
          backdrop="static"
          centered
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar Novo Aluno</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* <AlunosCadastrarAluno
              formData={formDataCadastrarAluno}
              onChange={handleChangeCadastrarAluno}
            /> */}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCadastrar}>
              Cancelar
            </Button>
            <Button variant="success">
              {" "}
              <FontAwesomeIcon icon={faCheck} /> Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
};

export default Inicio;
