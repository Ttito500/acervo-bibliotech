import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import {
  CreateSecaoRequest,
  GetSecaoResponse,
  UpdateSecaoRequest,
  UpdateSecaoResponse,
} from "./../../interfaces/secao";
import {
  createSecao,
  deleteSecao,
  getSecoes,
  updateSecao,
} from "./../../api/SecoesApi";
import SecoesListagem from "./templates/SecoesListagem/SecoesListagem";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import styles from "./Secoes.module.css";
import SecoesGerenciarSecao from "./templates/SecoesGerenciarSecao/SecoesGerenciarSecao";

const Secoes: React.FC = () => {
  const [secoes, setSecoes] = useState<GetSecaoResponse[]>([]);

  const [showGerenciar, setShowGerenciar] = useState(false);
  const handleCloseGerenciar = () => setShowGerenciar(false);

  const handleShowGerenciar = (secao: GetSecaoResponse) => {
    setEditingSecao(secao);
    setFormDataEditarSecao(secao);
    setShowGerenciar(true);
  };

  const [editingSecao, setEditingSecao] = useState<GetSecaoResponse | null>(null);
  const [deletingSecao, setDeletingSecao] = useState<number | null>(null);

  const [formDataEditarSecao, setFormDataEditarSecao] = useState({
    nome: "",
    descricao: "",
  });

  const handleChangeEditarSecao = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataEditarSecao({ ...formDataEditarSecao, [name]: value });
  };

  const handleSubmitEditarSecao = async (): Promise<void> => {
    const body: UpdateSecaoRequest = {
      nome: formDataEditarSecao.nome,
      descricao: formDataEditarSecao.descricao,
    };

    try {
      const secaoUpdated: UpdateSecaoResponse = await updateSecao(editingSecao.id, body);
  
      listarSecoes();
      setFormDataEditarSecao({
        nome: secaoUpdated.nome,
        descricao: secaoUpdated.descricao,
      });
      setEditingSecao(secaoUpdated)
		} catch(err) {
			console.log(err)
		}
  };

  const [showExcluirSecao, setShowExcluirSecao] = useState(false);
  const handleCloseExcluirSecao = () => setShowExcluirSecao(false);
  const handleShowExcluirSecao = () => {
    setDeletingSecao(editingSecao.id);
    setShowExcluirSecao(true);
  };

  const handleSubmitExcluirSecao = async (): Promise<void> => {
    try {
      await deleteSecao(deletingSecao);
  
      listarSecoes();
      handleCloseExcluirSecao();
      handleCloseGerenciar();
		} catch(err) {
			console.log(err)
		}
  };

  useEffect(() => {
    listarSecoes();
  }, []);

  const listarSecoes = async (): Promise<void> => {
    try {
      const data = await getSecoes();
      setSecoes(data);
		} catch(err) {
			console.log(err)
		}
  };

  const [formDataCadastrarSecao, setFormDataCadastrarSecao] = useState({
    nome: "",
    descricao: "",
  });

  const handleChangeCadastrarSecao = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormDataCadastrarSecao({ ...formDataCadastrarSecao, [name]: value });
  };

  const handleSubmitCadastrarSecao = async (): Promise<void> => {
    const body: CreateSecaoRequest = {
      descricao: formDataCadastrarSecao.descricao,
      nome: formDataCadastrarSecao.nome,
    };

    try {
      await createSecao(body);
  
      listarSecoes();
      setFormDataCadastrarSecao({
        nome: "",
        descricao: "",
      });
		} catch(err) {
			console.log(err)
		}

  };

  return (
    <section className={styles.secoes}>
      <Modal
        show={showGerenciar}
        onHide={handleCloseGerenciar}
        size="xl"
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Gerenciar Seção</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <SecoesGerenciarSecao
            idSecao={editingSecao?.id}
            formData={formDataEditarSecao}
            onChange={handleChangeEditarSecao}
            onEdit={handleSubmitEditarSecao}
            onDelete={handleShowExcluirSecao}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="info" className="btn-blue" onClick={handleCloseGerenciar}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showExcluirSecao}
        onHide={handleCloseExcluirSecao}
        size="lg"
        backdrop="static"
        centered
        keyboard={false}
        className="Modais-Confirmacao-Custon"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>

        <Modal.Body>Tem certeza que deseja excluir esta Seção?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExcluirSecao}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleSubmitExcluirSecao}>
            <FontAwesomeIcon icon={faTrash} /> Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="w-100">
        <Form>
          <Row style={{ alignItems: "flex-end" }}>
            <Col xs={3}>
              <Form.Group>
                <Form.Label>
                  Nome <span className="obgr">*</span>
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Digite o nome da seção"
                  name="nome"
                  value={formDataCadastrarSecao.nome}
                  onChange={handleChangeCadastrarSecao}
                />

                <Form.Control.Feedback type="invalid">
                  Campo obrigatório.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={4}>
              <Form.Group>
                <Form.Label>Descrição</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Digite uma descrição para a seção"
                  name="descricao"
                  value={formDataCadastrarSecao.descricao}
                  onChange={handleChangeCadastrarSecao}
                />
              </Form.Group>
            </Col>

            <Col>
              <Button variant="success" onClick={handleSubmitCadastrarSecao}>
                <FontAwesomeIcon icon={faPlus} /> Cadastrar Nova Seção
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="w-100">
        <SecoesListagem secoes={secoes} onGerenciar={handleShowGerenciar} />
      </div>
    </section>
  );
};

export default Secoes;
