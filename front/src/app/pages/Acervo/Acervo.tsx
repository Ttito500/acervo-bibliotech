import React, { ChangeEvent, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import AcervoListagem from './templates/AcervoListagem';
import AcervoFiltros from "./templates/AcervoFiltros";
import Modal from 'react-bootstrap/Modal';
import AcervoCadastrarLivro from "./templates/AcervoCadastrarLivro";
import { createLivro, deleteLivro, getLivros, updateLivro } from './../../api/AcervoApi';
import { CreateLivroRequest, GetLivroResponse, UpdateLivroRequest } from "./../../interfaces/acervo";
import Spinner from "react-bootstrap/Spinner";
import AcervoEditarLivro from "./templates/AcervoEditarLivro";
import AcervoEmprestimosLivro from "./templates/AcervoEmprestimosLivro";
import AcervoRealizarEmprestimo from "./templates/AcervoRealizarEmprestimo";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Acervo: React.FC = () => {

	const [showEditar, setShowEditar] = useState(false);
  const handleCloseEditar = () => setShowEditar(false);
  const handleShowEditar = (livro: GetLivroResponse) => {
		setEditingLivro(livro);
		setFormDataEditarLivro(livro);
		setShowEditar(true);
	}

  const [showEmprestimos, setShowEmprestimos] = useState(false);
  const handleCloseEmprestimos = () => setShowEmprestimos(false);
  const handleShowEmprestimos = () => setShowEmprestimos(true);

  const [showRealizarEmprestimo, setShowRealizarEmprestimo] = useState(false);
  const handleCloseRealizarEmprestimo = () => setShowRealizarEmprestimo(false);
  const handleShowRealizarEmprestimo = () => setShowRealizarEmprestimo(true);

  const [showExcluirLivro, setShowExcluirLivro] = useState(false);
  const handleCloseExcluirLivro = () => setShowExcluirLivro(false);
  const handleShowExcluirLivro = (id: number) => {
		setDeletingLivro(id);
		setShowExcluirLivro(true);
	}

	const [livros, setLivros] = useState<GetLivroResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
	const [editingLivro, setEditingLivro] = useState<GetLivroResponse | null>(null);
	const [deletingLivro, setDeletingLivro] = useState<number | null>(null);
	const [showToastError, setShowToastError] = useState(false);
	const [showToastSuccess, setShowToastSuccess] = useState(false);

  useEffect(() => {
    listarLivros();
  }, []);

  const listarLivros = async (): Promise<void> => {
		setLoading(true);

    try {
      const data = await getLivros();
      setLivros(data);
    } catch (err) {
      setShowToastError(true);
    } finally {
      setLoading(false);
    }
  };

	const [showCadastrar, setShowCadastrar] = useState(false);
	const handleCloseCadastrar = () => setShowCadastrar(false);
	const handleShowCadastrar = () => setShowCadastrar(true);

	const [formDataCadastrarLivro, setFormDataCadastrarLivro] = useState({
    isbn: '',
    titulo: '',
    autor: ''
  });

	const handleChangeCadastrarLivro = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataCadastrarLivro({ ...formDataCadastrarLivro, [name]: value });
  };

  const handleSubmitCadastrarLivro = async (): Promise<void> => {
    try {
			const body: CreateLivroRequest = {
				isbn: formDataCadastrarLivro.isbn,
				autor: formDataCadastrarLivro.autor,
				titulo: formDataCadastrarLivro.titulo,
				observacao: "",
				situacao: "disponivel",
				idEstantePrateleira: {
					id: 1,
					estante: "3",
					prateleira: "6"
				},
				idSecao: {
					id: 1,
					nome: "literatura portuguesa"
				}
			}
      await createLivro(body);

      listarLivros();
			setShowToastSuccess(true);
			setFormDataCadastrarLivro(null);
      handleCloseCadastrar();
    } catch (err) {
			setShowToastError(true);
    }
  };

	const [formDataEditarLivro, setFormDataEditarLivro] = useState({
    isbn: '',
    titulo: '',
    autor: ''
  });

	const handleChangeEditarLivro = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataEditarLivro({ ...formDataEditarLivro, [name]: value });
  };

  const handleSubmitEditarLivro = async (): Promise<void> => {
    try {
			const body: UpdateLivroRequest = {
				isbn: formDataEditarLivro.isbn,
				autor: formDataEditarLivro.autor,
				titulo: formDataEditarLivro.titulo,
				observacao: "",
				situacao: "disponivel",
				idEstantePrateleira: {
					id: 1,
					estante: "3",
					prateleira: "6"
				},
				idSecao: {
					id: 1,
					nome: "literatura portuguesa"
				}
			}
      await updateLivro(editingLivro.id, body);

      listarLivros();
			setShowToastSuccess(true);
			setFormDataEditarLivro(null);
      handleCloseEditar();
    } catch (err) {
      setShowToastError(true);
    }
  };

	const handleSubmitExcluirLivro = async (): Promise<void> => {
    try {
      await deleteLivro(deletingLivro);

      listarLivros();
			setShowToastSuccess(true);
      handleCloseExcluirLivro();
    } catch (err) {
      setShowToastError(true);
    }
  };

	if (loading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Carregando...</span></Spinner>;
  }

	return (
		<section className="acervo">
			<div className="acervo-acoes">

				<ToastContainer
          className="p-3"
          position="bottom-center"
          style={{ zIndex: 10 }}
        >
					<Toast bg="success" onClose={() => setShowToastSuccess(false)} show={showToastSuccess} delay={3000} autohide>
						<Toast.Header>
							<strong className="me-auto">Operação realizada com sucesso!</strong>
						</Toast.Header>
					</Toast>
				</ToastContainer>

				<ToastContainer
          className="p-3"
          position="bottom-center"
          style={{ zIndex: 10 }}
        >
					<Toast bg="danger" onClose={() => setShowToastError(false)} show={showToastError} delay={3000} autohide>
						<Toast.Header>
							<strong className="me-auto">Não foi possível concluir a operação. Tente novamente.</strong>
						</Toast.Header>
					</Toast>
				</ToastContainer>

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
						<AcervoCadastrarLivro formData={formDataCadastrarLivro} onChange={handleChangeCadastrarLivro} />
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseCadastrar}>Desistir</Button>
						<Button variant="success" onClick={handleSubmitCadastrarLivro}><FontAwesomeIcon icon={faCheck} /> Salvar</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					show={showEditar}
					onHide={handleCloseEditar}
					size="xl"
					backdrop="static"
					centered
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Editar Livro</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<AcervoEditarLivro formData={formDataEditarLivro} onChange={handleChangeEditarLivro} />
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseEditar}>
							Desistir
						</Button>
						<Button variant="success" onClick={handleSubmitEditarLivro}>
							<FontAwesomeIcon icon={faCheck} /> Salvar
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					show={showEmprestimos}
					onHide={handleCloseEmprestimos}
					size="xl"
					backdrop="static"
					centered
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>
							Emprestimos do Livro: A Hora da Estrela - Clarice Lispector
						</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<AcervoEmprestimosLivro />
					</Modal.Body>

					<Modal.Footer>
						<Button
							variant="info"
							className="btn-blue"
							onClick={handleCloseEmprestimos}
						>
							Ok
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					show={showRealizarEmprestimo}
					onHide={handleCloseRealizarEmprestimo}
					size="xl"
					backdrop="static"
					centered
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>
							Realizar Emprestimo do Livro: A Hora da Estrela - Clarice Lispector
						</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<AcervoRealizarEmprestimo />
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseRealizarEmprestimo}>
							Desistir
						</Button>
						<Button variant="success">
							<FontAwesomeIcon icon={faCheck} /> Realizar Empréstimo
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					show={showExcluirLivro}
					onHide={handleCloseExcluirLivro}
					size="lg"
					backdrop="static"
					centered
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Confirmação</Modal.Title>
					</Modal.Header>

					<Modal.Body>Tem certeza que deseja excluir este livro?</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseExcluirLivro}>
							Desistir
						</Button>
						<Button variant="danger" onClick={handleSubmitExcluirLivro}>
							<FontAwesomeIcon icon={faTrash} /> Excluir
						</Button>
					</Modal.Footer>
				</Modal>
			</div>

			<div className="w-100">
				<AcervoFiltros />
			</div>

			<div className="w-100">
				<AcervoListagem 
					livros={livros} 
					onEdit={handleShowEditar} 
					onDelete={handleShowExcluirLivro} 
					onEmprestimos={handleShowEmprestimos} 
					onRealizarEmprestimo={handleShowRealizarEmprestimo} 
				/>
			</div>
		</section>
	);
};

export default Acervo;
