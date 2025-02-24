import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import CadastrarUsuarios from "./Templates/CadastrarUsuarios";
import FiltrosUsuarios from "./Templates/FiltrosUsuarios";
import ListagemUsuarios from "./Templates/ListagemUsuarios";


const Usuarios: React.FC = () =>{

    const [loading, setLoading] = useState<boolean>(true);
    const [showToastError, setShowToastError] = useState(false);
    const [showToastSuccess, setShowToastSuccess] = useState(false);

    const [showFrequencia, setFrequencia] = useState(false);
    const handleCloseFrequencia = () => setFrequencia(false);
    const handleShowFrequencia = () => setFrequencia(true);

    const [showCadastrar, setShowCadastrar] = useState(false);
    const handleCloseCadastrar = () => setShowCadastrar(false);
    const handleShowCadastrar = () => setShowCadastrar(true);

    useEffect(() => {
        TelaUsuarios();
    }, []);

    const TelaUsuarios = async (): Promise<void> => {
        setLoading(true);

        try {
            /* empty */
        } catch (err) {
            setShowToastError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Carregando...</span>
            </Spinner>
        );
    }

    return (
        <section className="Exemplar">
            <div className="Exemplar-acoes">
                <Button
                    variant="info"
                    className="btn-blue"
                    onClick={handleShowCadastrar}
                >
                    <FontAwesomeIcon icon={faPlus} /> Cadastrar Novo Usuário
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
                        <Modal.Title>Cadastrar Novo Usuário</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <CadastrarUsuarios />
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
                <FiltrosUsuarios />
            </div>

            <div className="w-100">
                <ListagemUsuarios />
            </div>
        </section>
    );
};

export default Usuarios;