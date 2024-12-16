import React, { useState } from "react";
import { faFileImport, faClipboardList, faPenToSquare, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AcervoEditarLivro from "./AcervoEditarLivro";
import AcervoEmprestimosLivro from "./AcervoEmprestimosLivro";
import AcervoRealizarEmprestimo from "./AcervoRealizarEmprestimo";

const AcervoListagem: React.FC = () => {
    const [showEditar, setShowEditar] = useState(false);
	const handleCloseEditar = () => setShowEditar(false);
	const handleShowEditar = () => setShowEditar(true);

    const [showEmprestimos, setShowEmprestimos] = useState(false);
	const handleCloseEmprestimos = () => setShowEmprestimos(false);
	const handleShowEmprestimos = () => setShowEmprestimos(true);

    const [showRealizarEmprestimo, setShowRealizarEmprestimo] = useState(false);
	const handleCloseRealizarEmprestimo = () => setShowRealizarEmprestimo(false);
	const handleShowRealizarEmprestimo = () => setShowRealizarEmprestimo(true);

    const [showExcluirLivro, setShowExcluirLivro] = useState(false);
	const handleCloseExcluirLivro = () => setShowExcluirLivro(false);
	const handleShowExcluirLivro = () => setShowExcluirLivro(true);

    return (
        <>
            <Modal
                show={showEditar}
                onHide={handleCloseEditar}
                size="xl"
                backdrop="static"
                centered
                keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Editar Livro</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <AcervoEditarLivro />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditar}>Desistir</Button>
                    <Button variant="success"><FontAwesomeIcon icon={faCheck} /> Salvar</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showEmprestimos}
                onHide={handleCloseEmprestimos}
                size="xl"
                backdrop="static"
                centered
                keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Emprestimos do Livro: A Hora da Estrela - Clarice Lispector</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <AcervoEmprestimosLivro />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="info" className="btn-blue" onClick={handleCloseEmprestimos}>Ok</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showRealizarEmprestimo}
                onHide={handleCloseRealizarEmprestimo}
                size="xl"
                backdrop="static"
                centered
                keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Realizar Emprestimo do Livro: A Hora da Estrela - Clarice Lispector</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <AcervoRealizarEmprestimo />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRealizarEmprestimo}>Desistir</Button>
                    <Button variant="success"><FontAwesomeIcon icon={faCheck} /> Realizar Empréstimo</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showExcluirLivro}
                onHide={handleCloseExcluirLivro}
                size="lg"
                backdrop="static"
                centered
                keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Tem certeza que deseja excluir este livro?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseExcluirLivro}>Desistir</Button>
                    <Button variant="danger"><FontAwesomeIcon icon={faTrash} /> Excluir</Button>
                </Modal.Footer>
            </Modal>

            <Table striped className="tabela">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ISBN</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Gênero</th>
                        <th className="text-center">Local</th>
                        <th className="text-center">Total</th>
                        <th className="text-center">Empr.</th>
                        <th className="text-center">Atrasos</th>
                        <th className="text-center">Extrav.</th>
                        <th className="text-center">Disp.</th>
                        <th className="text-center">Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="tabela-tr">
                        <td className="text-center">1</td>
                        <td>123-12-12345-12-1</td>
                        <td>A Hora da Estrela</td>
                        <td>Clarice Lispector</td>
                        <td>Romance</td>
                        <td className="text-center">E3 / P1</td>
                        <td className="text-center">10</td>
                        <td className="text-center">3</td>
                        <td className="text-center">
                            <Badge className="bibliotech-badge" bg="danger">1</Badge>
                        </td>
                        <td className="text-center">0</td>
                        <td className="text-center">7</td>
                        <td className="text-center">
                            <Badge className="bibliotech-badge" bg="success">Disponível</Badge>
                        </td>
                        <td>
                            <ButtonGroup aria-label="Ações" className="tabela-acoes">
                                <Button variant="btn-outline-secondary" className="color-orange" onClick={handleShowRealizarEmprestimo}>
                                    <FontAwesomeIcon icon={faFileImport} />
                                </Button>

                                <Button variant="btn-outline-secondary" className="color-blue" onClick={handleShowEmprestimos}>
                                    <FontAwesomeIcon icon={faClipboardList} />
                                </Button>

                                <Button variant="btn-outline-secondary" className="color-green" onClick={handleShowEditar}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>
                                
                                <Button variant="btn-outline-secondary" className="color-red" onClick={handleShowExcluirLivro}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>	

                    <tr className="tabela-tr">
                        <td className="text-center">2</td>
                        <td>723-82-12345-12-3</td>
                        <td>A Hora da Moto</td>
                        <td>Clarice Lispector</td>
                        <td>Romance</td>
                        <td className="text-center">E1 / P2</td>
                        <td className="text-center">5</td>
                        <td className="text-center">4</td>
                        <td className="text-center">0</td>
                        <td className="text-center">
                            <Badge className="bibliotech-badge" bg="danger">1</Badge>
                        </td>
                        <td className="text-center">
                            <Badge className="bibliotech-badge" bg="danger">0</Badge>
                        </td>
                        <td className="text-center">
                            <Badge className="bibliotech-badge" bg="danger">Indisponível</Badge>
                        </td>
                        <td>
                            <ButtonGroup aria-label="Ações" className="tabela-acoes">
                                <Button variant="btn-outline-secondary" className="color-orange">
                                    <FontAwesomeIcon icon={faFileImport} />
                                </Button>

                                <Button variant="btn-outline-secondary" className="color-blue">
                                    <FontAwesomeIcon icon={faClipboardList} />
                                </Button>

                                <Button variant="btn-outline-secondary" className="color-green">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>
                                
                                <Button variant="btn-outline-secondary" className="color-red">
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>	
                </tbody>
            </Table>
        </>
    );
}

export default AcervoListagem;