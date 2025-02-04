import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import {
  CreateSecaoRequest,
  Estante,
  GetSecaoEstantePrateleiraResponse,
  GetSecaoResponse,
  UpdateSecaoRequest,
  UpdateSecaoResponse,
} from "./../../interfaces/secao";
import {
  createSecao,
  deleteSecao,
  deleteSecaoEstantePrateleira,
  getSecaoEstantePrateleiras,
  getSecoes,
  updateSecao,
} from "./../../api/SecoesApi";
import Spinner from "react-bootstrap/Spinner";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import SecoesListagem from "./templates/SecoesListagem/SecoesListagem";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import styles from "./Secoes.module.css";
import SecoesGerenciarSecao from "./templates/SecoesGerenciarSecao/SecoesGerenciarSecao";

const Secoes: React.FC = () => {
  const [secoes, setSecoes] = useState<GetSecaoResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [showToastError, setShowToastError] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);

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
    try {
      const body: UpdateSecaoRequest = {
        nome: formDataEditarSecao.nome,
        descricao: formDataEditarSecao.descricao,
      };
      const secaoUpdated: UpdateSecaoResponse = await updateSecao(editingSecao.id, body);

      listarSecoes();
      setShowToastSuccess(true);
      setFormDataEditarSecao({
        nome: secaoUpdated.nome,
        descricao: secaoUpdated.descricao,
      });
      setEditingSecao(secaoUpdated)
    } catch (err) {
      setShowToastError(true);
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
      setShowToastSuccess(true);
      handleCloseExcluirSecao();
      handleCloseGerenciar();
    } catch (err) {
      setShowToastError(true);
    }
  };

  useEffect(() => {
    listarSecoes();
  }, []);

  const listarSecoes = async (): Promise<void> => {
    setLoading(true);

    try {
      const data = await getSecoes();
      setSecoes(data);
    } catch (err) {
      setShowToastError(true);
    } finally {
      setLoading(false);
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
    try {
      const body: CreateSecaoRequest = {
        descricao: formDataCadastrarSecao.descricao,
        nome: formDataCadastrarSecao.nome,
      };

      await createSecao(body);

      listarSecoes();
      setShowToastSuccess(true);
      setFormDataCadastrarSecao({
        nome: "",
        descricao: "",
      });
    } catch (err) {
      setShowToastError(true);
    }
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    );
  }

  return (
    <section className={styles.secoes}>
      <ToastContainer
        className="p-3"
        position="bottom-center"
        style={{ zIndex: 10 }}
      >
        <Toast
          bg="success"
          onClose={() => setShowToastSuccess(false)}
          show={showToastSuccess}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Operação realizada com sucesso!</strong>
          </Toast.Header>
        </Toast>
      </ToastContainer>

      <ToastContainer
        className="p-3"
        position="bottom-center"
        style={{ zIndex: 10 }}
      >
        <Toast
          bg="danger"
          onClose={() => setShowToastError(false)}
          show={showToastError}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              Não foi possível concluir a operação. Tente novamente.
            </strong>
          </Toast.Header>
        </Toast>
      </ToastContainer>

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
        size="sm"
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>

        <Modal.Body>Tem certeza que deseja excluir esta Seção?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExcluirSecao}>
            Desistir
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
