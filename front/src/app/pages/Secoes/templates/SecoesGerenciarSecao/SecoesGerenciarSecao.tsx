import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./SecoesGerenciarSecao.module.css";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {
  Estante,
  GetSecaoEstantePrateleiraResponse,
} from "./../../../../interfaces/secao";
import Spinner from "react-bootstrap/Spinner";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import {
  addSecaoEstantePrateleira,
  deleteSecaoEstantePrateleira,
  getSecaoEstantePrateleiras,
} from "./../../../../api/SecoesApi";
import { GetEstantePrateleiraResponse } from "./../../../../interfaces/estante-prateleira";
import { getEstantePrateleiras } from "./../../../../api/EstantePrateleiraApi";

function transformEstantes(lista: GetEstantePrateleiraResponse[] | GetSecaoEstantePrateleiraResponse[]): Estante[] {
  const mapa = new Map<string, Estante>();

  lista.forEach(({ id, estante, prateleira }) => {
    if (!mapa.has(estante)) {
      mapa.set(estante, { estante, prateleiras: [] });
    }
    mapa.get(estante)!.prateleiras.push({ id, prateleira });
  });

  return Array.from(mapa.values());
}

interface SecoesGerenciarSecaoProps {
  idSecao: number;
  formData: {
    nome: string;
    descricao: string;
  };
  onChange: (e: ChangeEvent<any>) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const SecoesGerenciarSecao: React.FC<SecoesGerenciarSecaoProps> = ({
  idSecao,
  formData,
  onChange,
  onEdit,
  onDelete,
}) => {
  const [estantesPorSecao, setEstantesPorSecao] = useState<Estante[]>([]);
  const [estantes, setEstantes] = useState<Estante[]>([]);

  const [selectedEstantePrateleira, setSelectedEstantePrateleira] = useState("");
  const [validatedFormEstantePrateleira, setValidatedFormEstantePrateleira] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [showToastError, setShowToastError] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);

  const handleSubmitExcluirPrateleira = async (
    idEstantePrateleira: number
  ): Promise<void> => {
    try {
      await deleteSecaoEstantePrateleira(idSecao, idEstantePrateleira);

      listarEstantesPorSecao();
      setShowToastSuccess(true);
    } catch (err) {
      setShowToastError(true);
    }
  };

  const listarEstantes = async (): Promise<void> => {
    setLoading(true);

    try {
      const data = await getEstantePrateleiras();
      const dataTransform = transformEstantes(data);
      console.log(dataTransform)
      setEstantes(dataTransform);
    } catch (err) {
      setShowToastError(true);
    } finally {
      setLoading(false);
    }
  };

  const listarEstantesPorSecao = async (): Promise<void> => {
    setLoading(true);

    try {
      const data = await getSecaoEstantePrateleiras(idSecao);
      const dataTransform = transformEstantes(data);
      setEstantesPorSecao(dataTransform);
    } catch (err) {
      setShowToastError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSelectEstantePrateleira = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEstantePrateleira(event.target.value);
  };
  
  const handleSubmitFormAdicionarEstantePrateleira = async () => {
    setLoading(true);

    try {
      if (!selectedEstantePrateleira) {
        setValidatedFormEstantePrateleira(true);
      } else {
        setValidatedFormEstantePrateleira(false);
        console.log("Prateleira selecionada:", selectedEstantePrateleira);
  
        if(selectedEstantePrateleira && !isNaN(Number(selectedEstantePrateleira))) {
          await addSecaoEstantePrateleira(idSecao, Number(selectedEstantePrateleira));
          setShowToastSuccess(true);
        }
      }
    } catch (err) {
      setShowToastError(true);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    listarEstantesPorSecao();
    listarEstantes();
  }, []);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    );
  }

  return (
    <>
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

      <div className={styles.editar}>
        <div className={styles.editar_title}>Editar</div>

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
                  value={formData.nome}
                  onChange={onChange}
                />

                <Form.Control.Feedback type="invalid">
                  Campo obrigatório.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={5}>
              <Form.Group>
                <Form.Label>Descrição</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Digite uma descrição para a seção"
                  name="descricao"
                  value={formData.descricao}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>

            <Button
              variant="success"
              onClick={onEdit}
              style={{ width: "auto" }}
            >
              <FontAwesomeIcon icon={faCheck} /> Salvar
            </Button>

            <Button
              variant="danger"
              onClick={onDelete}
              style={{ width: "auto", marginLeft: "16px" }}
            >
              <FontAwesomeIcon icon={faTrash} /> Excluir Seção
            </Button>
          </Row>
        </Form>
      </div>

      <div className={styles.estantes}>
        <div className={styles.estantes_title}>
          Estantes e prateleiras desta seção
        </div>

        <Form validated={validatedFormEstantePrateleira}>
          <Row style={{ alignItems: "flex-end" }}>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>
                  Selecione uma prateleira para adicionar na seção{" "}
                  <span className="obgr">*</span>
                </Form.Label>

                <Form.Select
                  aria-label="Selecione uma prateleira de uma estante"
                  name="prateleira"
                  value={selectedEstantePrateleira}
                  onChange={handleChangeSelectEstantePrateleira}
                  required
                >
                  <option value="">Selecione</option>
                  {estantes.map((estante) => (
                    estante.prateleiras.map((prateleira) => (
                      <option key={prateleira.id} value={prateleira.id}>
                        Estante {estante.estante} / Prateleira {prateleira.prateleira}
                      </option>
                    ))
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  Campo obrigatório.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Button
              className="btn-orange"
              onClick={handleSubmitFormAdicionarEstantePrateleira}
              style={{ width: "auto" }}
            >
              <FontAwesomeIcon icon={faPlus} /> Adicionar
            </Button>
          </Row>
        </Form>

        <div className={styles.estantes_listagem}>
          {estantesPorSecao.map((estante) => (
            <div key={estante.estante} className={styles.estantes_listagem_item}>
              <div className={styles.estantes_listagem_item_estante}>
                Estante {estante.estante}
              </div>

              {estante.prateleiras.map((prateleira) => (
                <div
                  key={prateleira.prateleira}
                  className={styles.estantes_listagem_item_prateleira}
                >
                  Prateleira {prateleira.prateleira}
                  <Button
                    variant="btn-outline-secondary"
                    className="color-red"
                    onClick={() => handleSubmitExcluirPrateleira(prateleira.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SecoesGerenciarSecao;
