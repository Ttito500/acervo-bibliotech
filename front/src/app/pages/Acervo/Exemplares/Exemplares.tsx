import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import Accordion from "react-bootstrap/esm/Accordion";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListagemExemplares from "./templates/ListagemExemplares";
import { GetSecaoResponse } from "./../../../interfaces/secao";
import { GetEstantePrateleiraResponse } from "./../../../interfaces/estante-prateleira";
import { getEstantePrateleirasPorSecao } from "./../../../api/EstantePrateleiraApi";
import { getSecoes } from "./../../../api/SecoesApi";
import { GetLivroResponse } from "./../../../interfaces/acervo";
import { CreateExemplarRequest, GetExemplarResponse, UpdateExemplarRequest } from "./../../../interfaces/exemplar";
import { createExemplar, getExemplares, updateExemplar } from "./../../../api/AcervoApi";
import Modal from "react-bootstrap/esm/Modal";
import EditarExemplar from "./templates/EditarExemplar";
import ConfirmarStatus from "./templates/ConfirmarStatus";

interface ExemplaresProps {
	livro: GetLivroResponse;
}

const Exemplares: React.FC<ExemplaresProps> = ({ livro }) => {

	const [formDataCadastrarExemplar, setFormDataCadastrarExemplar] = useState<CreateExemplarRequest>({
		idEstanteprateleira: null as number,
		idSecao: null as number,
		idLivro: null as number,
		qtdExemplares: null as number
	});

	const handleChangeCadastrarExemplar = (e: ChangeEvent<any>): void => {
		const { name, value } = e.target;
		setFormDataCadastrarExemplar({ ...formDataCadastrarExemplar, [name]: value });
	};

	const handleSubmitCadastrarExemplar = async () => {
		const body: CreateExemplarRequest = {
			idLivro: Number(livro.id),
			idEstanteprateleira: Number(formDataCadastrarExemplar.idEstanteprateleira),
			idSecao: Number(formDataCadastrarExemplar.idSecao),
			qtdExemplares: Number(formDataCadastrarExemplar.qtdExemplares)
		}
		try {
			await createExemplar(body);
			listarExemplares();
			setFormDataCadastrarExemplar({
				idEstanteprateleira: null as number,
				idSecao: null as number,
				idLivro: null as number,
				qtdExemplares: null as number
			});
		} catch(err) {
			console.log(err)
		}
	}

	const [exemplares, setExemplares] = useState<GetExemplarResponse[]>([]);

	const listarExemplares = async (): Promise<void> => {
		try {
			const data = await getExemplares(livro.id);
			setExemplares(data);
		} catch(err) {
			console.log(err)
		}
	};

	const [secoes, setSecoes] = useState<GetSecaoResponse[]>([]);
	const [selectedSecao, setSelectedSecao] = useState<string>('');

	const listarSecoes = async (): Promise<void> => {
		try {
			const data = await getSecoes();
			setSecoes(data);
		} catch(err) {
			console.log(err)
		}
	};

	const [estantesPrateleiras, setEstantesPrateleiras] = useState<GetEstantePrateleiraResponse[]>([]);

	const listarEstantePrateleirasPorSecao = async (idSecao: number): Promise<void> => {
		try {
			const data = await getEstantePrateleirasPorSecao(idSecao);
			setEstantesPrateleiras(data);
		} catch(err) {
			console.log(err)
		}
	};

	const [showConfirmar, setShowConfirmar] = useState(false);
	const handleCloseConfirmar = () => setShowConfirmar(false);

	const [showEditarExemplar, setShowEditarExemplar] = useState(false);
	const handleCloseEditarExemplar = () => setShowEditarExemplar(false);
	const handleShowEditarExemplar = (exemplar: GetExemplarResponse) => {
		setEditingExemplar(exemplar);
		setFormDataEditarExemplar({
			idEstantePrateleira: exemplar.estanteprateleira.id,
			idLivro: livro.id,
			idSecao: exemplar.secao.id,
			observacao: exemplar.observacao,
			situacao: exemplar.situacao
		});
		setShowEditarExemplar(true);
	}

	const [editingExemplar, setEditingExemplar] = useState<GetExemplarResponse | null>(null);

	const [formDataEditarExemplar, setFormDataEditarExemplar] = useState<UpdateExemplarRequest>({
		idEstantePrateleira: null as number,
		idLivro: null as number,
		idSecao: null as number,
		observacao: '',
		situacao: ''
	});

	const handleChangeEditarExemplar = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormDataEditarExemplar({ ...formDataEditarExemplar, [name]: value });
	};

	const handleSubmitEditarExemplar = async (confirmado?: boolean): Promise<void> => {

		if((formDataEditarExemplar.situacao != editingExemplar.situacao) && !confirmado) {
			setShowConfirmar(true);
			return
		}

		const body: UpdateExemplarRequest = {
			idEstantePrateleira: Number(formDataEditarExemplar.idEstantePrateleira),
			idLivro: Number(formDataEditarExemplar.idLivro),
			idSecao: Number(formDataEditarExemplar.idSecao),
			observacao: formDataEditarExemplar.observacao,
			situacao: formDataEditarExemplar.situacao
		}

		try {
			await updateExemplar(editingExemplar.id, body);
			listarExemplares();
			setFormDataEditarExemplar({
				idEstantePrateleira: null as number,
				idLivro: null as number,
				idSecao: null as number,
				observacao: '',
				situacao: ''
			});
			handleCloseEditarExemplar();
			handleCloseConfirmar();
		} catch(err) {
			console.log(err)
		}
	};

	useEffect(() => {
		if(selectedSecao) listarEstantePrateleirasPorSecao(Number(selectedSecao));
	}, [selectedSecao]);

	useEffect(() => {
		listarSecoes();
		listarExemplares();
	}, []);

  return (
    <section className="Exemplar">
      <div className="Exemplar-acoes">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Body className="accordion-body-expanded">
              <strong>Cadastro de Exemplares do Livro: { livro.titulo }</strong>
              <Form className="mt-3">
                <Row>
									<Col>
										<Form.Group className="mb-3">
											<Form.Label>
												Seção <span className="obgr">*</span>
											</Form.Label>
											<Form.Select
												aria-label="Selecione uma Seção"
												name="idSecao"
												value={formDataCadastrarExemplar.idSecao}
												onChange={(e) => {handleChangeCadastrarExemplar(e); setSelectedSecao(e.target.value)}}
												required
											>
												<option value="">Selecione</option>
												{secoes?.map((secao) => (
													<option key={secao.id} value={secao.id}>
														{secao.nome}
													</option>
												))}
											</Form.Select>
											<Form.Control.Feedback type="invalid">
                        Campo obrigatório.
                      </Form.Control.Feedback>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group className="mb-3">
											<Form.Label>
												Estante e Prateleira<span className="obgr">*</span>
											</Form.Label>
											<Form.Select
												aria-label="Selecione uma prateleira de uma estante"
												name="idEstanteprateleira"
												value={formDataCadastrarExemplar.idEstanteprateleira}
												onChange={handleChangeCadastrarExemplar}
												required
											>
												<option value="">Selecione</option>
												{estantesPrateleiras?.map((estantePrateleira) => (
													<option key={estantePrateleira.id} value={estantePrateleira.id}>
														Estante {estantePrateleira.estante} / Prateleira {estantePrateleira.prateleira}
													</option>
												))}
											</Form.Select>
											<Form.Control.Feedback type="invalid">
                        Campo obrigatório.
                      </Form.Control.Feedback>
										</Form.Group>
									</Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Quantidade de Exemplares a ser Cadastrada{" "}
                        <span className="obgr">*</span>
                      </Form.Label>
                      <Form.Control
												type="text"
												placeholder="Digite a qtd. de exemplares"
												name="qtdExemplares"
												required
												value={formDataCadastrarExemplar.qtdExemplares}
												onChange={handleChangeCadastrarExemplar}
											/>
                      <Form.Control.Feedback type="invalid">
                        Campo obrigatório.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div
                      className="w-100 h-100 d-flex justify-content-end align-items-center"
                      style={{ marginTop: "9px" }}
                    >
                      <Button variant="success" onClick={handleSubmitCadastrarExemplar}>
                        <FontAwesomeIcon icon={faPlus} /> Cadastrar Novo(s)
                        Exemplar(es)
                      </Button>
                    </div>
                  </Col>

                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

			<Modal
        show={showEditarExemplar}
        onHide={handleCloseEditarExemplar}
        size="lg"
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Exemplar</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditarExemplar formData={formDataEditarExemplar} onChange={handleChangeEditarExemplar} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditarExemplar}>
            Cancelar
          </Button>
          <Button variant="success" onClick={() => handleSubmitEditarExemplar(false)}>
            <FontAwesomeIcon icon={faCheck} /> Salvar
          </Button>
        </Modal.Footer>
      </Modal>

			<Modal
        show={showConfirmar}
        onHide={handleCloseConfirmar}
        size="sm"
        backdrop="static"
        centered
        keyboard={false}
        className="Modais-Confirmacao-Custon"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ConfirmarStatus />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleSubmitEditarExemplar(true)}>
            <FontAwesomeIcon icon={faCheck} /> Sim
          </Button>
        </Modal.Footer>
      </Modal>

      <p className="fw-bold">Exemplares do Livro: { livro.titulo }</p>
      <div className="w-100 list-scroll">
        <ListagemExemplares 
					exemplares={exemplares}  
					onEdit={handleShowEditarExemplar} 
				/>
      </div>
    </section>
  );
};

export default Exemplares;
