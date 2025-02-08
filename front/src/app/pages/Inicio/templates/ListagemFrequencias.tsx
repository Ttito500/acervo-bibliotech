import React, { useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/esm/Modal";
import ConfirmacaoFrequencia from "./ConfirmacaoFrequencia";

const ListagemFrequencias: React.FC = () => {

    const [showConfirmar, setConfirmar] = useState(false);
    const handleCloseConfirmar = () => setConfirmar (false);
    const handleShowConfirmar = () => setConfirmar(true);


    return (
        <>
            <Table striped className="tabela">
                <thead>
                <tr>
                    <th className="th-center-size-eight">Série</th>
                    <th className="th-center-size-eight">Turma</th>
                    <th>Nome</th>
                    <th className="th-size-twenty">Atividade</th>
                    <th className="th-center-size-eight">Ações</th>
                </tr>
                </thead>
                <tbody>
                <tr className="tabela-tr">
                    <td className="text-center">1</td>
                    <td className="text-center">A</td>
                    <td>João Silva</td>
                    <td>Outros</td>
                    <td className="text-center">
                        <ButtonGroup aria-label="Ações" className="tabela-acoes">
                            <Button variant="btn-outline-secondary" className="color-red"
                                    onClick={handleShowConfirmar}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
                <tr className="tabela-tr">
                    <td className="text-center">2</td>
                    <td className="text-center">B</td>
                    <td >Ana Oliveira</td>
                    <td>Célula de Estudo</td>
                    <td className="text-center">
                        <ButtonGroup aria-label="Ações" className="tabela-acoes">
                            <Button variant="btn-outline-secondary" className="color-red"
                                    onClick={handleShowConfirmar}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
                <tr className="tabela-tr">
                    <td className="text-center">3</td>
                    <td className="text-center">C</td>
                    <td>Pedro Souza</td>
                    <td>Estudo Individual</td>
                    <td className="text-center">
                        <ButtonGroup aria-label="Ações" className="tabela-acoes">
                            <Button variant="btn-outline-secondary" className="color-red"
                                    onClick={handleShowConfirmar}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
                <tr className="tabela-tr">
                    <td className="text-center">4</td>
                    <td className="text-center">D</td>
                    <td>Maria Santos</td>
                    <td>Descansando</td>
                    <td className="text-center">
                        <ButtonGroup aria-label="Ações" className="tabela-acoes">
                            <Button variant="btn-outline-secondary" className="color-red"
                                    onClick={handleShowConfirmar}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
                </tbody>
            </Table>

            <Modal
                show={showConfirmar}
                onHide={handleCloseConfirmar}
                size="lg"
                backdrop="static"
                centered
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ConfirmacaoFrequencia />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmar}>
                        Cancelar
                    </Button>
                    <Button variant="danger">
                        <FontAwesomeIcon icon={faTrash} /> Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ListagemFrequencias;
