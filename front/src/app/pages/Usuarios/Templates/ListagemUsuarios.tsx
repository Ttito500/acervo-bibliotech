import React, { useState } from "react";
import { Table, Badge, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/esm/Modal";
import EditarUsuario from "./EditarUsuario";
import InativarUsuario from "./InativarUsuario";
import AtivarUsuario from "./AtivarUsuario";

const ListagemUsuarios: React.FC = () => {

    const [showEditar, setShowEditar] = useState(false);
    const handleCloseEditar = () => setShowEditar(false);
    const handleShowEditar = () => setShowEditar(true);

    const [showInativar, setShowInativar] = useState(false);
    const handleCloseInativar = () => setShowInativar(false);
    const handleShowInativar = () => setShowInativar(true);

    const [showAtivar, setShowAtivar] = useState(false);
    const handleCloseAtivar = () => setShowAtivar(false);
    const handleShowAtivar = () => setShowAtivar(true);

    return (
        <>
            <Table striped className="tabela">
                <thead>
                <tr>
                    <th className="th-size-ten">Cargo</th>
                    <th className="th-size-fifteen">Nome</th>
                    <th className="th-size-ten text-center">Data de Último Acesso</th>
                    <th>Email</th>
                    <th className="th-center-size-eight">Ativo</th>
                    <th className="th-center-size-eight">Ações</th>
                </tr>
                </thead>
                <tbody>
                <tr className="tabela-tr">
                    <td className="th-size-ten">Bibliotecária(o)</td>
                    <td className="th-size-fifteen">Pedro Rivaldo</td>
                    <td className="text-center">10/02/2025 12:53:99</td>
                    <td>pr@email.com</td>
                    <td className="th-center-size-eight">
                        <Badge className="bibliotech-badge" bg="green">
                            Ativo
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
                            <Button
                                onClick={handleShowAtivar}
                                variant="btn-outline-secondary"
                                className="color-red"
                            >
                                <FontAwesomeIcon icon={faPowerOff} />
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
                <tr className="tabela-tr">
                    <td className="th-size-ten">Aluno Monitor</td>
                    <td className="th-size-fifteen">Kauan</td>
                    <td className="th-center-size-fifteen">09/14/2025 12:83:20</td>
                    <td>kauan@email.com</td>
                    <td className="th-center-size-eight">
                        <Badge className="bibliotech-badge" bg="green">
                            Ativo
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
                            <Button
                                onClick={handleShowAtivar}
                                variant="btn-outline-secondary"
                                className="color-red"
                            >
                                <FontAwesomeIcon icon={faPowerOff} />
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
                <tr className="tabela-tr">
                    <td className="th-size-ten">Aluno Monitor</td>
                    <td className="th-size-fifteen">Gabriel Alves</td>
                    <td className="th-center-size-fifteen">05/02/2025 12:53:40</td>
                    <td>gabrielalves@email.com</td>
                    <td className="th-center-size-eight">
                        <Badge className="bibliotech-badge" bg="red">
                            Inativo
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
                            <Button
                                onClick={handleShowInativar}
                                variant="btn-outline-secondary"
                                className="color-green"
                            >
                                <FontAwesomeIcon icon={faPowerOff} />
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
                    <Modal.Title>Editar Usuário</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditarUsuario />
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
                show={showInativar}
                onHide={handleCloseInativar}
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
                    <InativarUsuario />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseInativar}>
                        Cancelar
                    </Button>
                    <Button variant="danger">
                        <FontAwesomeIcon icon={faCheck} /> Inativar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showAtivar}
                onHide={handleCloseAtivar}
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
                    <AtivarUsuario />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAtivar}>
                        Cancelar
                    </Button>
                    <Button variant="success">
                        <FontAwesomeIcon icon={faCheck} /> Ativar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

};

export default ListagemUsuarios;