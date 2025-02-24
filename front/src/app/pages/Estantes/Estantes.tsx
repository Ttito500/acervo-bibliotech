import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import styles from "./Estantes.module.css";
import { Estante, GetEstantePrateleiraResponse, UpdateEstantePrateleiraRequest, UpdateEstantePrateleiraResponse, CreateEstantePrateleiraRequest } from "./../../interfaces/estante-prateleira";
import { createEstantePrateleira, deleteEstantePrateleira, getEstantePrateleiras, updateEstantePrateleira } from "./../../api/EstantePrateleiraApi";
import EstantesListagem from "./templates/EstantesListagem/EstantesListagem";
import EstantesGerenciarEstantePrateleira from "./templates/EstantesGerenciarEstantePrateleira/EstantesGerenciarEstantePrateleira";

function transformEstantes(lista: GetEstantePrateleiraResponse[]): Estante[] {
  const mapa = new Map<string, Estante>();

  lista.forEach(({ id, estante, prateleira }) => {
    if (!mapa.has(estante)) {
      mapa.set(estante, { estante, prateleiras: [] });
    }
    mapa.get(estante)!.prateleiras.push({ id, prateleira });
  });

  return Array.from(mapa.values());
}

const Estantes: React.FC = () => {
  const [estantes, setEstantes] = useState<Estante[]>([]);

  const [showGerenciar, setShowGerenciar] = useState(false);
  const handleCloseGerenciar = () => setShowGerenciar(false);

  const handleShowGerenciar = (estantePrateleira: GetEstantePrateleiraResponse) => {
    setEditingEstantePrateleira(estantePrateleira);
    setFormDataEditarEstantePrateleira({...estantePrateleira, prateleira: String(estantePrateleira.prateleira)});
    setShowGerenciar(true);
  };

  const [editingEstantePrateleira, setEditingEstantePrateleira] = useState<GetEstantePrateleiraResponse | null>(null);
  const [deletingEstantePrateleira, setDeletingEstantePrateleira] = useState<number | null>(null);

  const [formDataEditarEstantePrateleira, setFormDataEditarEstantePrateleira] = useState({
    estante: "",
    prateleira: "",
  });

  const handleChangeEditarEstantePrateleira = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataEditarEstantePrateleira({ ...formDataEditarEstantePrateleira, [name]: value });
  };

  const handleSubmitEditarEstantePrateleira = async (): Promise<void> => {
      const body: UpdateEstantePrateleiraRequest = {
        estante: formDataEditarEstantePrateleira.estante,
        prateleira: Number(formDataEditarEstantePrateleira.prateleira),
      };

      try {
        const estantePrateleiraUpdated: UpdateEstantePrateleiraResponse = await updateEstantePrateleira(editingEstantePrateleira.id, body);
  
        listarEstantes();
        setFormDataEditarEstantePrateleira({
          estante: estantePrateleiraUpdated.estante,
          prateleira: String(estantePrateleiraUpdated.prateleira),
        });
        setEditingEstantePrateleira(estantePrateleiraUpdated);
      } catch(err) {
        console.log(err)
      }
  };

  const [showExcluirEstantePrateleira, setShowExcluirEstantePrateleira] = useState(false);
  const handleCloseExcluirEstantePrateleira = () => setShowExcluirEstantePrateleira(false);
  const handleShowExcluirEstantePrateleira = () => {
    setDeletingEstantePrateleira(editingEstantePrateleira.id);
    setShowExcluirEstantePrateleira(true);
  };

  const handleSubmitExcluirEstantePrateleira = async (): Promise<void> => {
    try {
      await deleteEstantePrateleira(deletingEstantePrateleira);
  
      listarEstantes();
      handleCloseExcluirEstantePrateleira();
      handleCloseGerenciar();
		} catch(err) {
			console.log(err)
		}
  };

  useEffect(() => {
    listarEstantes();
  }, []);

  const listarEstantes = async (): Promise<void> => {
    try {
      const data = await getEstantePrateleiras();
      const estantesTransfom = transformEstantes(data);
      setEstantes(estantesTransfom);
		} catch(err) {
			console.log(err)
		}
  };

  const [formDataCadastrarEstantePrateleira, setFormDataCadastrarEstantePrateleira] = useState({
    estante: "",
    prateleira: "",
  });

  const handleChangeCadastrarEstantePrateleira = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormDataCadastrarEstantePrateleira({ ...formDataCadastrarEstantePrateleira, [name]: value });
  };

  const handleSubmitCadastrarEstantePrateleira = async (): Promise<void> => {
    const body: CreateEstantePrateleiraRequest = {
      estante: formDataCadastrarEstantePrateleira.estante,
      prateleira: Number(formDataCadastrarEstantePrateleira.prateleira),
    };

    try {
      await createEstantePrateleira(body);
  
      listarEstantes();
      setFormDataCadastrarEstantePrateleira({
        estante: "",
        prateleira: "",
      });
		} catch(err) {
			console.log(err)
		}

  };

  return (
    <section className={styles.estantes}>
      <Modal
        show={showGerenciar}
        onHide={handleCloseGerenciar}
        size="xl"
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Gerenciar Prateleira</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EstantesGerenciarEstantePrateleira
            idEstantePrateleira={editingEstantePrateleira?.id}
            formData={formDataEditarEstantePrateleira}
            onChange={handleChangeEditarEstantePrateleira}
            onEdit={handleSubmitEditarEstantePrateleira}
            onDelete={handleShowExcluirEstantePrateleira}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="info" className="btn-blue" onClick={handleCloseGerenciar}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showExcluirEstantePrateleira}
        onHide={handleCloseExcluirEstantePrateleira}
        size="lg"
        backdrop="static"
        centered
        keyboard={false}
        className="Modais-Confirmacao-Custon"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>

        <Modal.Body>Tem certeza que deseja excluir esta prateleira?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExcluirEstantePrateleira}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleSubmitExcluirEstantePrateleira}>
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
                  Estante (Letra) <span className="obgr">*</span>
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Letra da estante"
                  name="estante"
                  required
                  value={formDataCadastrarEstantePrateleira.estante}
                  onChange={handleChangeCadastrarEstantePrateleira}
                />

                <Form.Control.Feedback type="invalid">
                  Campo obrigatório.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={4}>
              <Form.Group>
                <Form.Label>Número da Prateleira <span className="obgr">*</span></Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Número da prateleira"
                  name="prateleira"
                  required
                  value={formDataCadastrarEstantePrateleira.prateleira}
                  onChange={handleChangeCadastrarEstantePrateleira}
                />

                <Form.Control.Feedback type="invalid">
                  Campo obrigatório.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Button variant="success" onClick={handleSubmitCadastrarEstantePrateleira}>
                <FontAwesomeIcon icon={faPlus} /> Cadastrar
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="w-100">
        <EstantesListagem estantes={estantes} onGerenciar={handleShowGerenciar} />
      </div>
    </section>
  );
};

export default Estantes;
