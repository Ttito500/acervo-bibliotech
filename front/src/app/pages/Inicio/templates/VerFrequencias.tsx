import React, { useState, useEffect, ChangeEvent } from "react";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { faCalendarDay, faFileExport, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListagemFrequencias from "./ListagemFrequencias";
import { CreateFrequenciaRequest, FrequenciaFiltros, GetFrequenciaResponse } from "./../../../interfaces/frequencia";
import { createFrequencia, deleteFrequencia, getFrequencias } from "./../../../api/FrequenciaApi";

import { format } from "date-fns/format";
import { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import Modal from "react-bootstrap/esm/Modal";
import ConfirmacaoFrequencia from "./ConfirmacaoFrequencia";
import { showError } from './../../../shared/components/error-toast/ErrorToast';
import { showSuccess } from './../../../shared/components/success-toast/SuccessToast';

registerLocale('ptBR', ptBR);

const VerFrequencias: React.FC = () => {

  const [showConfirmarDelete, setShowConfirmarDelete] = useState(false);
  const handleCloseConfirmarDelete = () => setShowConfirmarDelete(false);
  const handleShowConfirmarDelete = (id: number) => {
    setEditingFrequenciaId(id);
    setShowConfirmarDelete(true);
  }

  const [editingFrequenciaId, setEditingFrequenciaId] = useState<number>(null);

  const handleSubmitDeletarFrequencia = async () => {
    try {
      await deleteFrequencia(editingFrequenciaId);
      listarFrequencias();
      handleCloseConfirmarDelete();
    } catch(err) {
      console.log(err)
    }
  }

  const [dataFrequencia, setDataFrequencia] = useState<Date | null>(new Date());
  const [frequencias, setFrequencias] = useState<GetFrequenciaResponse[]>([]);
  
  const listarFrequencias = async (): Promise<void> => {
    try {
      const filtros: FrequenciaFiltros = {
        data: format(dataFrequencia, "yyyy-MM-dd")
      }
      const data = await getFrequencias(filtros);
      setFrequencias(data);
    } catch(err) {
      console.log(err)
    }
  };

  const handleExportar = async () => {
    const pdfUrl = `http://localhost:8090/frequencia-alunos/export/pdf?data=${format(dataFrequencia, "yyyy-MM-dd")}`;

    try {
      await window.electron.savePdf(pdfUrl);
      showSuccess('PDF exportado com sucesso! Confira nos seus Downloads.');
    } catch (error) {
      console.error('Erro ao baixar o PDF:', error);
      showError('Não foi possível exportar o PDF, tente novamente.')
    }
  }

  useEffect(() => {
    listarFrequencias()
  }, [dataFrequencia]);

  return (
    <section className="Exemplar">
      <div className="Exemplar-acoes">
        <Form className="mt-0">
          <Row>
            <Col className="d-flex align-items-end">
              <Form.Group controlId="formData">
                <Form.Label>
                  Data da Frequência <span className="obgr">*</span>
                </Form.Label>
                <InputGroup>
                  <DatePicker
                    selected={dataFrequencia}
                    onChange={(date: Date) => setDataFrequencia(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecione a data"
                    customInput={
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Selecione a data"
                          readOnly
                          value={format(dataFrequencia, "dd/MM/yyyy")}
                          style={{ cursor: "pointer" }}
                          className="no-border-radius-right"
                        />
                        <InputGroup.Text className="btn-orange">
                          <FontAwesomeIcon icon={faCalendarDay} />
                        </InputGroup.Text>
                      </InputGroup>
                    }
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col className="d-flex w-100 align-items-end justify-content-end">
              <Button variant="success" onClick={handleExportar}>
                <FontAwesomeIcon icon={faFileExport} /> Exportar
              </Button>
            </Col>
          </Row>
        </Form>

        <Modal
          show={showConfirmarDelete}
          onHide={handleCloseConfirmarDelete}
          size="lg"
          backdrop="static"
          centered
          keyboard={false}
          className="Modais-Confirmacao-Custon"
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmação</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ConfirmacaoFrequencia />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmarDelete}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleSubmitDeletarFrequencia}>
              <FontAwesomeIcon icon={faTrash} /> Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="w-100 list-scroll">
        <ListagemFrequencias frequencias={frequencias} onDelete={handleShowConfirmarDelete} />
      </div>
    </section>
  );
};

export default VerFrequencias;
