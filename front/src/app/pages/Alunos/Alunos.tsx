import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import AlunosListagem from './templates/AlunosListagem';
import AlunosFiltros from "./templates/AlunosFiltros";
import Modal from 'react-bootstrap/Modal';
import AlunosCadastrarAluno from "./templates/AlunosCadastrarAluno";

const Alunos: React.FC = () => {

	const [showCadastrar, setShowCadastrar] = useState(false);
	const handleCloseCadastrar = () => setShowCadastrar(false);
	const handleShowCadastrar = () => setShowCadastrar(true);

	return (
		<section className="alunos">
			<div className="alunos-acoes">
				<Button variant="info" className="btn-blue" onClick={handleShowCadastrar}>
					<FontAwesomeIcon icon={faPlus} /> Cadastrar Novo Aluno
				</Button>

				<Modal
					show={showCadastrar}
					onHide={handleCloseCadastrar}
					size="xl"
					backdrop="static"
					centered
					keyboard={false}>

					<Modal.Header closeButton>
						<Modal.Title>Cadastrar Novo Aluno</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<AlunosCadastrarAluno />
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseCadastrar}>Desistir</Button>
						<Button variant="success"><FontAwesomeIcon icon={faCheck} /> Salvar</Button>
					</Modal.Footer>
				</Modal>
			</div>

			<div className="w-100">
				<AlunosFiltros />
			</div>

			<div className="w-100">
				<AlunosListagem />
			</div>
		</section>
	);
};

export default Alunos;
