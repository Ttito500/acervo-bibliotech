import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import AcervoListagem from './templates/AcervoListagem';
import AcervoFiltros from "./templates/AcervoFiltros";
import Modal from 'react-bootstrap/Modal';
import AcervoCadastrarLivro from "./templates/AcervoCadastrarLivro";

const Acervo: React.FC = () => {

	const [showCadastrar, setShowCadastrar] = useState(false);
	const handleCloseCadastrar = () => setShowCadastrar(false);
	const handleShowCadastrar = () => setShowCadastrar(true);

	return (
		<section className="acervo">
			<div className="acervo-acoes">
				<Button variant="info" className="btn-blue" onClick={handleShowCadastrar}>
					<FontAwesomeIcon icon={faPlus} /> Cadastrar Novo Livro
				</Button>

				<Modal
					show={showCadastrar}
					onHide={handleCloseCadastrar}
					size="xl"
					backdrop="static"
					centered
					keyboard={false}>

					<Modal.Header closeButton>
						<Modal.Title>Cadastrar Novo Livro</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<AcervoCadastrarLivro />
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseCadastrar}>Desistir</Button>
						<Button variant="success"><FontAwesomeIcon icon={faCheck} /> Salvar</Button>
					</Modal.Footer>
				</Modal>
			</div>

			<div className="w-100">
				<AcervoFiltros />
			</div>

			<div className="w-100">
				<AcervoListagem />
			</div>
		</section>
	);
};

export default Acervo;
