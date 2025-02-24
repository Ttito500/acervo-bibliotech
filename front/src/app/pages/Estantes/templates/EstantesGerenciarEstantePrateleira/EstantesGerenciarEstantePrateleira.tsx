import React, { ChangeEvent } from "react";
import styles from "./EstantesGerenciarEstantePrateleira.module.css";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

interface EstantesGerenciarEstantePrateleiraProps {
  idEstantePrateleira: number;
  formData: {
    estante: string;
    prateleira: string;
  };
  onChange: (e: ChangeEvent<any>) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const SecoesGerenciarSecao: React.FC<EstantesGerenciarEstantePrateleiraProps> = ({
  idEstantePrateleira,
  formData,
  onChange,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <div className={styles.editar}>
        <div className={styles.editar_title}>Editar</div>

        <Form>
          <Row style={{ alignItems: "flex-end" }}>
            <Col xs={3}>
              <Form.Group>
                <Form.Label>
                  Letra da Estante onde a Prateleira está Localizada <span className="obgr">*</span>
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Digite a letra"
                  name="estante"
                  required
                  value={formData.estante}
                  onChange={onChange}
                />

                <Form.Control.Feedback type="invalid">
                  Campo obrigatório.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={5}>
              <Form.Group>
                <Form.Label>Número da Prateleira <span className="obgr">*</span></Form.Label>

                <Form.Control
                  type="text"
                  required
                  placeholder="Digite o número da prateleira"
                  name="prateleira"
                  value={formData.prateleira}
                  onChange={onChange}
                />

                <Form.Control.Feedback type="invalid">
                  Campo obrigatório.
                </Form.Control.Feedback>
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
              <FontAwesomeIcon icon={faTrash} /> Excluir Prateleira
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default SecoesGerenciarSecao;
