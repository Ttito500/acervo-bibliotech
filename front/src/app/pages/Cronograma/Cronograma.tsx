import React, { useState } from "react";
import { Table } from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import CadastraAlunoMonitor from "./Templates/CadastraAlunoMonitor";
import Confirmacao from "./Templates/Confirmacao";

const Cronograma: React.FC = () => {

    const [showCadastrar, setShowCadastrar] = useState(false);
    const handleCloseCadastrar = () => setShowCadastrar(false);
    const handleShowCadastrar = () => setShowCadastrar(true);


    const [showExcluir, setShowExcluir] = useState(false);
    const handleCloseExcluir = () => setShowExcluir(false);
    const handleShowExcluir = () => setShowExcluir(true);

    return (
        <section className="Exemplar">

            <div className="w-100">

                <h2 className="cronograma-titulo">Cronograma de Alunos Monitores</h2>

                <Button
                    variant="info"
                    className="btn-orange"
                    onClick={handleShowCadastrar}
                >
                    <FontAwesomeIcon icon={faPlus}/> Adicionar Monitor ao Cronograma
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
                        <Modal.Title>Adicionar Aluno</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <CadastraAlunoMonitor/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCadastrar}>
                            Cancelar
                        </Button>
                        <Button variant="success">
                            <FontAwesomeIcon icon={faCheck}/> Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className="w-100">
                <Table striped className="cronograma">
                    <thead>
                    <tr>
                        <th className="text-center">Segunda</th>
                        <th className="text-center">Terça</th>
                        <th className="text-center">Quarta</th>
                        <th className="text-center">Quinta</th>
                        <th className="text-center">Sexta</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="cronograma-tr">
                        <td className="text-center">
                            <div className="balao-monitor">
                                <div className="texto">Pedro Rivaldo</div>
                                <FontAwesomeIcon icon={faTrash} className="icone-lixo" onClick={handleShowExcluir} />
                            </div>
                            <div className="balao-monitor">
                                <div className="texto">Kauan</div>
                                <FontAwesomeIcon icon={faTrash} className="icone-lixo" onClick={handleShowExcluir} />
                            </div>
                            <div className="balao-monitor">
                                <div className="texto">Gabriel Alves</div>
                                <FontAwesomeIcon icon={faTrash} className="icone-lixo" onClick={handleShowExcluir} />
                            </div>
                        </td>
                        <td className="text-center">
                            <div className="balao-monitor">
                                <div className="texto">Luis</div>
                                <FontAwesomeIcon icon={faTrash} className="icone-lixo" onClick={handleShowExcluir} />
                            </div>
                        </td>
                        <td className="text-center">
                            <div className="balao-monitor">
                                <div className="texto">Tiago Tito</div>
                                <FontAwesomeIcon icon={faTrash} className="icone-lixo" onClick={handleShowExcluir} />
                            </div>
                            <div className="balao-monitor">
                                <div className="texto">Pedro Rivaldo</div>
                                <FontAwesomeIcon icon={faTrash} className="icone-lixo" onClick={handleShowExcluir} />
                            </div>
                            <div className="balao-monitor">
                                <div className="texto">Gabriel Alves</div>
                                <FontAwesomeIcon icon={faTrash} className="icone-lixo" onClick={handleShowExcluir} />
                            </div>
                        </td>
                        <td className="text-center">
                            <div className="balao-monitor">
                                <div className="texto">Robson José</div>
                                <FontAwesomeIcon icon={faTrash} className="icone-lixo" onClick={handleShowExcluir} />
                            </div>
                            <div className="balao-monitor">
                                <div className="texto">Daniel Lucas</div>
                                <FontAwesomeIcon icon={faTrash} className="icone-lixo" onClick={handleShowExcluir} />
                            </div>
                        </td>
                        <td className="text-center">
                            <div className="balao-monitor">
                                <div className="texto">Gustavo</div>
                                <FontAwesomeIcon icon={faTrash} className="icone-lixo" onClick={handleShowExcluir} />
                            </div>
                            <div className="balao-monitor">
                                <div className="texto">Matheus Mendes</div>
                                <FontAwesomeIcon icon={faTrash} className="icone-lixo" onClick={handleShowExcluir} />
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </Table>

                <Modal
                    show={showExcluir}
                    onHide={handleCloseExcluir}
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
                        <Confirmacao />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseExcluir}>
                            Cancelar
                        </Button>
                        <Button variant="danger">
                            <FontAwesomeIcon icon={faTrash} /> Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </section>
    );
};

export default Cronograma;