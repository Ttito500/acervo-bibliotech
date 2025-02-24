import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { faCalendarDay, faFileExport, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListagemOcorrencias from "./ListagemOcorrencia";
import { OcorrenciaFiltros, GetOcorrenciaResponse } from "./../../../interfaces/ocorrencia";
import { deleteOcorrencia, getOcorrencias } from "./../../../api/OcorrenciaApi";

import { format } from "date-fns/format";
import { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import Modal from "react-bootstrap/esm/Modal";
import ConfirmacaoOcorrencia from "./ConfirmacaoOcorrencia";
import { showError } from './../../../shared/components/error-toast/ErrorToast';
import { showSuccess } from './../../../shared/components/success-toast/SuccessToast';

registerLocale('ptBR', ptBR);

const VerOcorrencias: React.FC = () => {

  const [showConfirmarDelete, setShowConfirmarDelete] = useState(false);
  const handleCloseConfirmarDelete = () => setShowConfirmarDelete(false);
  const handleShowConfirmarDelete = (id: number) => {
    setEditingOcorrenciaId(id);
    setShowConfirmarDelete(true);
  }

  const [editingOcorrenciaId, setEditingOcorrenciaId] = useState<number>(null);

  const handleSubmitDeletarOcorrencia = async () => {
    try {
      await deleteOcorrencia(editingOcorrenciaId);
      listarOcorrencias();
      handleCloseConfirmarDelete();
    } catch(err) {
      console.log(err)
    }
  }

  const [dataOcorrenciaInicial, setDataOcorrenciaInicial] = useState<Date | null>(new Date());
  const [dataOcorrenciaFim, setDataOcorrenciaFim] = useState<Date | null>(new Date());
  const [ocorrencias, setOcorrencias] = useState<GetOcorrenciaResponse[]>([]);
  
  const listarOcorrencias = async (): Promise<void> => {
    try {
      const filtros: OcorrenciaFiltros = {
        dataInicio: format(dataOcorrenciaInicial, "yyyy-MM-dd"),
        dataFim: format(dataOcorrenciaFim, "yyyy-MM-dd"),
      }
      const data = await getOcorrencias(filtros);
      setOcorrencias(data);
    } catch(err) {
      console.log(err)
    }
  };

  const handleExportar = async () => {
    const pdfUrl = `http://localhost:8090/ocorrencias/export/pdf?dataInicio=${format(dataOcorrenciaInicial, "yyyy-MM-dd")}&dataFim=${format(dataOcorrenciaFim, "yyyy-MM-dd")}`;

    try {
      await window.electron.savePdf(pdfUrl);
      showSuccess('PDF exportado com sucesso! Confira nos seus Downloads.');
    } catch (error) {
      console.error('Erro ao baixar o PDF:', error);
      showError('Não foi possível exportar o PDF, tente novamente.')
    }
  }

  useEffect(() => {
    listarOcorrencias()
  }, [dataOcorrenciaInicial, dataOcorrenciaFim]);

  return (
    <section className="Exemplar">
      <div className="Exemplar-acoes">
        <Form className="mt-0">
          <Row>
            <Col className="d-flex align-items-end">
              <Form.Group controlId="formData">
                <Form.Label>
                  Data Inicial <span className="obgr">*</span>
                </Form.Label>
                <InputGroup>
                  <DatePicker
                    selected={dataOcorrenciaInicial}
                    onChange={(date: Date) => setDataOcorrenciaInicial(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecione a data"
                    customInput={
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Selecione a data"
                          readOnly
                          value={format(dataOcorrenciaInicial, "dd/MM/yyyy")}
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
            <Col className="d-flex align-items-end">
              <Form.Group controlId="formData">
                <Form.Label>
                  Data Final <span className="obgr">*</span>
                </Form.Label>
                <InputGroup>
                  <DatePicker
                    selected={dataOcorrenciaFim}
                    onChange={(date: Date) => setDataOcorrenciaFim(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecione a data"
                    customInput={
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Selecione a data"
                          readOnly
                          value={format(dataOcorrenciaFim, "dd/MM/yyyy")}
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
            <ConfirmacaoOcorrencia />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmarDelete}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleSubmitDeletarOcorrencia}>
              <FontAwesomeIcon icon={faTrash} /> Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="w-100 list-scroll">
        <ListagemOcorrencias ocorrencias={ocorrencias} onDelete={handleShowConfirmarDelete} />
      </div>
    </section>
  );
};

export default VerOcorrencias;
