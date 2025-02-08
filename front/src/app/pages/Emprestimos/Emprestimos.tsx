import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFileImport } from "@fortawesome/free-solid-svg-icons";
import ListagemEmprestimos from "./templates/ListagemEmprestimos";
import FiltrosEmprestimo from "./templates/FiltrosEmprestimo";
import Modal from "react-bootstrap/Modal";
import CadastrarEmprestimo from "./templates/CadastrarEmprestimo";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Emprestimo: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showToastError, setShowToastError] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);

  useEffect(() => {
    TelaEmprestimo();
  }, []);

  const TelaEmprestimo = async (): Promise<void> => {
    setLoading(true);

    try {
      /* empty */
    } catch (err) {
      setShowToastError(true);
    } finally {
      setLoading(false);
    }
  };

  const [showCadastrar, setShowCadastrar] = useState(false);
  const handleCloseCadastrar = () => setShowCadastrar(false);
  const handleShowCadastrar = () => setShowCadastrar(true);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    );
  }

  return (
    <section className="indentacaoPadrao">
      <div className="indentacaoPadrao-acoes">
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
              <strong className="me-auto">
                Operação realizada com sucesso!
              </strong>
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

        <Button
          variant="info"
          className="btn-blue"
          onClick={handleShowCadastrar}
        >
          <FontAwesomeIcon icon={faFileImport} /> Realizar Empréstimo
        </Button>

        <Modal
          show={showCadastrar}
          onHide={handleCloseCadastrar}
          size="lg"
          backdrop="static"
          centered
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Realizar Empréstimo</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <CadastrarEmprestimo />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCadastrar}>
              Cancelar
            </Button>
            <Button variant="success">
              <FontAwesomeIcon icon={faCheck} /> Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="w-100">
        <FiltrosEmprestimo />
      </div>

      <div className="w-100">
        <ListagemEmprestimos />
      </div>
    </section>
  );
};

export default Emprestimo;
