import React, { useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/esm/Modal";
import ConfirmacaoOcorrencia from "./ConfirmacaoOcorrencia";

const ListagemOcorrencia:React.FC = () => {

    const [showConfirmar, setConfirmar] = useState(false);
    const handleCloseConfirmar = () => setConfirmar (false);
    const handleShowConfirmar = () => setConfirmar(true);


    return(
        <>
            <Table striped className="tabela">
                <thead>
                <tr>
                    <th className="th-center-size-eight">Série</th>
                    <th className="th-center-size-eight">Turma</th>
                    <th>Nome</th>
                    <th className="th-size-twenty">Ocorrência</th>
                    <th className="th-center-size-eight">Data</th>
                    <th className="th-center-size-eight">Ações</th>
                </tr>
                </thead>
                <tbody>
                <tr className="tabela-tr">
                    <td className="text-center">1</td>
                    <td className="text-center">A</td>
                    <td>João Silva</td>
                    <td>Estudando</td>
                    <td>07/02/2025</td>
                    <td className="text-center">
                        <ButtonGroup aria-label="Ações" className="tabela-acoes">
                            <Button variant="btn-outline-secondary" className="color-red" onClick={handleShowConfirmar}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
                <tr className="tabela-tr">
                    <td className="text-center">2</td>
                    <td className="text-center">B</td>
                    <td>Ana Oliveira</td>
                    <td>Descansando</td>
                    <td>07/02/2025</td>
                    <td className="text-center">
                        <ButtonGroup aria-label="Ações" className="tabela-acoes">
                            <Button variant="btn-outline-secondary" className="color-red" onClick={handleShowConfirmar}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
                <tr className="tabela-tr">
                    <td className="text-center">3</td>
                    <td className="text-center">C</td>
                    <td>Pedro Souza</td>
                    <td>Vivendo</td>
                    <td>07/02/2025</td>
                    <td className="text-center">
                        <ButtonGroup aria-label="Ações" className="tabela-acoes">
                            <Button variant="btn-outline-secondary" className="color-red" onClick={handleShowConfirmar}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
                <tr className="tabela-tr">
                    <td className="text-center">4</td>
                    <td className="text-center">D</td>
                    <td>Maria Santos</td>
                    <td>Estudando</td>
                    <td>07/02/2025</td>
                    <td className="text-center">
                        <ButtonGroup aria-label="Ações" className="tabela-acoes">
                            <Button variant="btn-outline-secondary" className="color-red" onClick={handleShowConfirmar}>
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
                    <ConfirmacaoOcorrencia />
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

export default ListagemOcorrencia