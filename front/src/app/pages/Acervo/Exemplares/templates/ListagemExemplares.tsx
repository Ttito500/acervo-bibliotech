import React, { useState } from "react";
import { Table, Badge, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/esm/Modal";
import EditarExemplar from "./EditarExemplar";
import ConfirmarStatus from "./ConfirmarStatus";

const ListagemExemplares: React.FC = () => {

    const [showEditar, setShowEditar] = useState(false);
    const handleCloseEditar = () => setShowEditar(false);
    const handleShowEditar = () => setShowEditar(true);


    const [ShowConfirmar, setShowConfirmar] = useState(false);
    const handleCloseConfirma = () => setShowConfirmar(false);
    const handleShowConfirmar = () => setShowConfirmar(true);

    return(
      <>
          <p className="fw-bold">Exemplares do Livro:</p>

          <Table striped className="tabela">
              <thead>
              <tr>
                  <th className="th-center-size-eight">Exemplar</th>
                  <th className="th-center-size-eight">Estante</th>
                  <th className="th-center-size-eight">Prateleira</th>
                  <th>Seção</th>
                  <th>Observações</th>
                  <th className="th-center-size-fifteen">Situação</th>
                  <th className="th-center-size-eight">Ações</th>
              </tr>
              </thead>
              <tbody>
              <tr className="tabela-tr">
                  <td className="text-center">1</td>
                  <td className="text-center">A</td>
                  <td className="text-center">2</td>
                  <td>Romance</td>
                  <td>Bom estado</td>
                  <td className="text-center">
                      <Badge className="bibliotech-badge" bg="green">
                          Disponível
                      </Badge>
                  </td>
                  <td className="text-center">
                      <ButtonGroup aria-label="Ações" className="tabela-acoes">
                          <Button
                              onClick={handleShowEditar}
                              variant="btn-outline-secondary"
                              className="color-green"
                          >
                              <FontAwesomeIcon icon={faEdit} />
                          </Button>
                      </ButtonGroup>
                  </td>
              </tr>
              <tr className="tabela-tr">
                  <td className="text-center">2</td>
                  <td className="text-center">A</td>
                  <td className="text-center">2</td>
                  <td>Romance</td>
                  <td>Pequenos desgastes</td>
                  <td className="text-center">
                      <Badge className="bibliotech-badge" bg="blue">
                          Emprestado
                      </Badge>
                  </td>
                  <td className="text-center">
                      <ButtonGroup aria-label="Ações" className="tabela-acoes">
                          <Button
                              onClick={handleShowEditar}
                              variant="btn-outline-secondary"
                              className="color-green"
                          >
                              <FontAwesomeIcon icon={faEdit} />
                          </Button>
                      </ButtonGroup>
                  </td>
              </tr>
              <tr className="tabela-tr">
                  <td className="text-center">3</td>
                  <td className="text-center">A</td>
                  <td className="text-center">2</td>
                  <td>Romance</td>
                  <td>Danificado</td>
                  <td className="text-center">
                      <Badge className="bibliotech-badge" bg="red">
                          Extraviado
                      </Badge>
                  </td>
                  <td className="text-center">
                      <ButtonGroup aria-label="Ações" className="tabela-acoes">
                          <Button
                              onClick={handleShowEditar}
                              variant="btn-outline-secondary"
                              className="color-green"
                          >
                              <FontAwesomeIcon icon={faEdit} />
                          </Button>
                      </ButtonGroup>
                  </td>
              </tr>
              </tbody>
          </Table>

          <Modal
              show={showEditar}
              onHide={handleCloseEditar}
              size="lg"
              backdrop="static"
              centered
              keyboard={false}
          >
              <Modal.Header closeButton>
                  <Modal.Title>Editar Exemplar</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <EditarExemplar />
              </Modal.Body>

              <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseEditar}>
                      Cancelar
                  </Button>
                  <Button variant="success">
                      <FontAwesomeIcon icon={faCheck} /> Salvar
                  </Button>
              </Modal.Footer>
          </Modal>

          <Modal
              show={ShowConfirmar}
              onHide={handleCloseConfirma}
              size="lg"
              backdrop="static"
              centered
              keyboard={false}
          >
              <Modal.Header closeButton>
                  <Modal.Title>Confirmação</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <ConfirmarStatus />
              </Modal.Body>

              <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseConfirma}>
                      Cancelar
                  </Button>
                  <Button variant="danger">
                      <FontAwesomeIcon icon={faCheck} /> Sim
                  </Button>
              </Modal.Footer>
          </Modal>
      </>
  );
};

export default ListagemExemplares;