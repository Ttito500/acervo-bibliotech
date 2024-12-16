import React, { useState } from "react";
import {
  faFileImport,
  faClipboardList,
  faPenToSquare,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AlunosEditarAluno from "./AlunosEditarAluno";
import AlunosEmprestimosAluno from "./AlunosEmprestimosAluno";

const AlunosListagem: React.FC = () => {
  const [showEditar, setShowEditar] = useState(false);
  const handleCloseEditar = () => setShowEditar(false);
  const handleShowEditar = () => setShowEditar(true);

  const [showExcluirAluno, setShowExcluirAluno] = useState(false);
  const handleCloseExcluirAluno = () => setShowExcluirAluno(false);
  const handleShowExcluirAluno = () => setShowExcluirAluno(true);

  const [showEmprestimosAluno, setShowEmprestimosAluno] = useState(false);
  const handleCloseEmprestimosAluno = () => setShowEmprestimosAluno(false);
  const handleShowEmprestimosAluno = () => setShowEmprestimosAluno(true);

  return (
    <>
      <Modal
        show={showEditar}
        onHide={handleCloseEditar}
        size="xl"
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Aluno</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AlunosEditarAluno />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditar}>
            Desistir
          </Button>
          <Button variant="success">
            <FontAwesomeIcon icon={faCheck} /> Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEmprestimosAluno}
        onHide={handleCloseEmprestimosAluno}
        size="xl"
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Empréstimos do Aluno</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AlunosEmprestimosAluno />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="info" className="btn-blue" onClick={handleCloseEmprestimosAluno}>Ok</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showExcluirAluno}
        onHide={handleCloseExcluirAluno}
        size="lg"
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>

        <Modal.Body>Tem certeza que deseja excluir este aluno?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExcluirAluno}>
            Desistir
          </Button>
          <Button variant="danger">
            <FontAwesomeIcon icon={faTrash} /> Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped className="tabela">
        <thead>
          <tr>
            <th className="text-center">Série</th>
            <th className="text-center">Turma</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th className="text-center">Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr className="tabela-tr">
            <td className="text-center">1ª</td>
            <td className="text-center">A</td>
            <td>Pedro Rivaldo</td>
            <td>pedro@gmail.com</td>
            <td>(85) 996455555</td>
            <td className="text-center">
              <Badge className="bibliotech-badge" bg="danger">Em débito</Badge>
            </td>
            <td>
              <ButtonGroup aria-label="Ações" className="tabela-acoes">
                <Button
                  variant="btn-outline-secondary"
                  className="color-blue"
                  onClick={handleShowEmprestimosAluno}
                >
                  <FontAwesomeIcon icon={faClipboardList} />
                </Button>

                <Button
                  variant="btn-outline-secondary"
                  className="color-green"
                  onClick={handleShowEditar}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>

                <Button
                  variant="btn-outline-secondary"
                  className="color-red"
                  onClick={handleShowExcluirAluno}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </ButtonGroup>
            </td>
          </tr>

          <tr className="tabela-tr">
            <td className="text-center">1ª</td>
            <td className="text-center">A</td>
            <td>Pedro</td>
            <td>pedro2@gmail.com</td>
            <td>(85) 986455425</td>
            <td className="text-center">
              <Badge className="bibliotech-badge" bg="success">Regular</Badge>
            </td>
            <td>
              <ButtonGroup aria-label="Ações" className="tabela-acoes">
                <Button
                  variant="btn-outline-secondary"
                  className="color-blue"
                  onClick={handleShowEmprestimosAluno}
                >
                  <FontAwesomeIcon icon={faClipboardList} />
                </Button>

                <Button
                  variant="btn-outline-secondary"
                  className="color-green"
                  onClick={handleShowEditar}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>

                <Button
                  variant="btn-outline-secondary"
                  className="color-red"
                  onClick={handleShowExcluirAluno}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default AlunosListagem;
