import React, { ChangeEvent, useEffect, useState } from "react";
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
import {InputGroup, ListGroup, Table} from "react-bootstrap";
import { CreateFrequenciaRequest } from "./../../interfaces/frequencia";
import { createFrequencia } from "./../../api/FrequenciaApi";
import { AlunoFiltros, GetAlunoResponse } from "./../../interfaces/aluno";
import { getAlunos } from "./../../api/AlunosApi";
import { showError } from "./../../shared/components/error-toast/ErrorToast";
import { createOcorrencia } from "./../../api/OcorrenciaApi";
import { CreateOcorrenciaRequest } from "./../../interfaces/ocorrencia";

const Inicio: React.FC = () => {

  const [showFrequencia, setFrequencia] = useState(false);
  const handleCloseFrequencia = () => setFrequencia(false);
  const handleShowFrequencia = () => setFrequencia(true);

  const [showOcorrencia, setOcorrencia] = useState(false);
  const handleCloseOcorrencia = () => setOcorrencia(false);
  const handleShowOcorrencia = () => setOcorrencia(true);

  const [formDataCadastrarFrequencia, setFormDataCadastrarFrequencia] = useState({
    idAluno: null as number,
    registradaPor: null as number,
    atividade: ''
  } as CreateFrequenciaRequest);

  const handleChangeCadastrarFrequencia = (e: ChangeEvent<any>): void => {
    const { name, value } = e.target;
    setFormDataCadastrarFrequencia({ ...formDataCadastrarFrequencia, [name]: value });
  };

  const handleSubmitCadastrarFrequencia = async (): Promise<void> => {
    const body: CreateFrequenciaRequest = {
      idAluno: Number(formDataCadastrarFrequencia.idAluno),
      registradaPor: 1, // TO DO
      atividade: formDataCadastrarFrequencia.atividade
    }

    if(body.atividade && body.idAluno && body.registradaPor) {
      try {
        await createFrequencia(body);
        setFormDataCadastrarFrequencia({
          idAluno: null as number,
          registradaPor: null as number,
          atividade: ''
        });
        handleClearSelectionAluno();
      } catch(err) {
        console.log(err)
      }
    } else {
      showError("Insira todos os dados necessários.")
    }

  };

  const [nomeAluno, setNomeAluno] = useState('');
  const [queryAluno, setQueryAluno] = useState('');
  const [suggestionsAlunos, setSuggestionsAlunos] = useState<GetAlunoResponse[]>([]);
  const [selectedAlunoId, setSelectedAlunoId] = useState<number | null>(null);

  const handleClearSelectionAluno = () => {
    setSelectedAlunoId(null);
    setQueryAluno('');
    setNomeAluno('');
  };

  const handleSelectAluno = (aluno: GetAlunoResponse) => {
    setNomeAluno(aluno.nome);
    setSelectedAlunoId(aluno.id);
    setSuggestionsAlunos([]);
  };

  useEffect(() => {
    formDataCadastrarFrequencia.idAluno = selectedAlunoId;
    const e: any = { target: { name: 'idAluno', value: selectedAlunoId } }
    handleChangeCadastrarFrequencia(e)
  }, [selectedAlunoId]);

  useEffect(() => {
    const listarAlunos = async () => {
      if (queryAluno.length > 2) {
        try {
          const filtros: AlunoFiltros = {
            nome: queryAluno,
            ativo: true
          }
          const response = await getAlunos(filtros)
          setSuggestionsAlunos(response.content);
        } catch (error) {
          console.error('Erro ao buscar alunos:', error);
        }
      } else {
        setSuggestionsAlunos([]);
      }
    };

    listarAlunos();
  }, [queryAluno]);



  const [formDataCadastrarOcorrencia, setFormDataCadastrarOcorrencia] = useState({
    idAluno: null as number,
    registradaPor: null as number,
    detalhes: ''
  } as CreateOcorrenciaRequest);

  const handleChangeCadastrarOcorrencia = (e: ChangeEvent<any>): void => {
    const { name, value } = e.target;
    setFormDataCadastrarOcorrencia({ ...formDataCadastrarOcorrencia, [name]: value });
  };

  const handleSubmitCadastrarOcorrencia = async (): Promise<void> => {
    const body: CreateOcorrenciaRequest = {
      idAluno: Number(formDataCadastrarOcorrencia.idAluno),
      registradaPor: 1, // TO DO
      detalhes: formDataCadastrarOcorrencia.detalhes
    }
    try {
      await createOcorrencia(body);
      setFormDataCadastrarOcorrencia({
        idAluno: null as number,
        registradaPor: null as number,
        detalhes: ''
      });
      handleClearSelectionAlunoOcorrencia();
    } catch(err) {
      console.log(err)
    }
  };

  const [nomeAlunoOcorrencia, setNomeAlunoOcorrencia] = useState('');
  const [queryAlunoOcorrencia, setQueryAlunoOcorrencia] = useState('');
  const [suggestionsAlunosOcorrencia, setSuggestionsAlunosOcorrencia] = useState<GetAlunoResponse[]>([]);
  const [selectedAlunoIdOcorrencia, setSelectedAlunoIdOcorrencia] = useState<number | null>(null);

  const handleClearSelectionAlunoOcorrencia = () => {
    setSelectedAlunoIdOcorrencia(null);
    setQueryAlunoOcorrencia('');
    setNomeAlunoOcorrencia('');
  };

  const handleSelectAlunoOcorrencia = (aluno: GetAlunoResponse) => {
    setNomeAlunoOcorrencia(aluno.nome);
    setSelectedAlunoIdOcorrencia(aluno.id);
    setSuggestionsAlunosOcorrencia([]);
  };

  useEffect(() => {
    formDataCadastrarOcorrencia.idAluno = selectedAlunoIdOcorrencia;
    const e: any = { target: { name: 'idAluno', value: selectedAlunoIdOcorrencia } }
    handleChangeCadastrarOcorrencia(e)
  }, [selectedAlunoIdOcorrencia]);

  useEffect(() => {
    const listarAlunos = async () => {
      if (queryAlunoOcorrencia.length > 2) {
        try {
          const filtros: AlunoFiltros = {
            nome: queryAlunoOcorrencia,
            ativo: true
          }
          const response = await getAlunos(filtros)
          setSuggestionsAlunosOcorrencia(response.content);
        } catch (error) {
          console.error('Erro ao buscar alunos:', error);
        }
      } else {
        setSuggestionsAlunosOcorrencia([]);
      }
    };

    listarAlunos();
  }, [queryAlunoOcorrencia]);

  useEffect(() => {
    null
  }, []);

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
                        Selecionar Aluno <span className="obgr">*</span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Digite o nome do aluno"
                          value={nomeAluno}
                          onChange={(e) => {
                            setNomeAluno(e.target.value);
                            setQueryAluno(e.target.value);
                            setSelectedAlunoId(null);
                          }}
                          required
                          readOnly={!!selectedAlunoId}
                          style={{
                            backgroundColor: selectedAlunoId ? '#e9ecef' : 'white',
                            cursor: selectedAlunoId ? 'not-allowed' : 'text',
                          }}
                        />
                          {selectedAlunoId && (
                            <Button variant="outline-secondary" onClick={handleClearSelectionAluno}>
                              Limpar
                            </Button>
                          )}
                      </InputGroup>
                      <Form.Control.Feedback type="invalid">
                        Campo obrigatório.
                      </Form.Control.Feedback>       
                    </Form.Group>
                    {suggestionsAlunos.length > 0 && (
                      <ListGroup style={{
                        position: 'absolute',
                        zIndex: 1000,
                        maxHeight: '200px',
                        overflowY: 'auto',
                      }}>
                        {suggestionsAlunos?.map((aluno) => (
                          <ListGroup.Item style={{cursor: 'pointer'}} key={aluno.id} onClick={() => handleSelectAluno(aluno)}>
                            {aluno.turma.serie}ª {aluno.turma.turma} - {aluno.nome}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </Col>
                  <Col xs={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Atividade <span className="obgr">*</span>
                      </Form.Label>
                      <Form.Select
                          aria-label="Selecione"
                          onChange={handleChangeCadastrarFrequencia}
                          name="atividade"
                          value={formDataCadastrarFrequencia.atividade}
                          required
                          className="custom-placeholder"
                      >
                        <option value="">
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
                      onClick={handleSubmitCadastrarFrequencia}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Registrar
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2} className="w-100 d-flex justify-content-end">
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
            <Button variant="info" onClick={handleCloseFrequencia}>
              Ok
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
                        Selecionar Aluno <span className="obgr">*</span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Digite o nome do aluno"
                          value={nomeAlunoOcorrencia}
                          onChange={(e) => {
                            setNomeAlunoOcorrencia(e.target.value);
                            setQueryAlunoOcorrencia(e.target.value);
                            setSelectedAlunoIdOcorrencia(null);
                          }}
                          required
                          readOnly={!!selectedAlunoIdOcorrencia}
                          style={{
                            backgroundColor: selectedAlunoIdOcorrencia ? '#e9ecef' : 'white',
                            cursor: selectedAlunoIdOcorrencia ? 'not-allowed' : 'text',
                          }}
                        />
                          {selectedAlunoIdOcorrencia && (
                            <Button variant="outline-secondary" onClick={handleClearSelectionAlunoOcorrencia}>
                              Limpar
                            </Button>
                          )}
                      </InputGroup>
                      <Form.Control.Feedback type="invalid">
                        Campo obrigatório.
                      </Form.Control.Feedback>       
                    </Form.Group>
                    {suggestionsAlunosOcorrencia.length > 0 && (
                      <ListGroup style={{
                        position: 'absolute',
                        zIndex: 1000,
                        maxHeight: '200px',
                        overflowY: 'auto',
                      }}>
                        {suggestionsAlunosOcorrencia?.map((aluno) => (
                          <ListGroup.Item style={{cursor: 'pointer'}} key={aluno.id} onClick={() => handleSelectAlunoOcorrencia(aluno)}>
                            {aluno.turma.serie}ª {aluno.turma.turma} - {aluno.nome}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </Col>
                  <Col xs={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Detalhes <span className="obgr">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="detalhes"
                        onChange={handleChangeCadastrarOcorrencia}
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
                      onClick={handleSubmitCadastrarOcorrencia}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Registrar Ocorrência
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2} className="w-100 d-flex justify-content-end">
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
            <Button variant="info" onClick={handleCloseOcorrencia}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
};

export default Inicio;
