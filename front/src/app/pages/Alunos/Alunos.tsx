import React, { ChangeEvent, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import AlunosListagem from './templates/AlunosListagem';
import AlunosFiltros from "./templates/AlunosFiltros";
import Modal from 'react-bootstrap/Modal';
import AlunosCadastrarAluno from "./templates/AlunosCadastrarAluno";
import { CreateAlunoRequest, GetAlunoResponse, UpdateAlunoRequest } from "./../../interfaces/aluno";
import { createAluno, deleteAluno, getAlunos, updateAluno } from "../../api/AlunosApi";
import Spinner from "react-bootstrap/Spinner";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import AlunosEditarAluno from "./templates/AlunosEditarAluno";
import AlunosEmprestimosAluno from "./templates/AlunosEmprestimosAluno";

const Alunos: React.FC = () => {

	const [showEditar, setShowEditar] = useState(false);
  const handleCloseEditar = () => setShowEditar(false);
  const handleShowEditar = (aluno: GetAlunoResponse) => {
		setEditingAluno(aluno);
		setFormDataEditarAluno(aluno);
		setShowEditar(true);
	}

  const [showEmprestimos, setShowEmprestimos] = useState(false);
  const handleCloseEmprestimos = () => setShowEmprestimos(false);
  const handleShowEmprestimos = () => setShowEmprestimos(true);

  const [showExcluirAluno, setShowExcluirAluno] = useState(false);
  const handleCloseExcluirAluno = () => setShowExcluirAluno(false);
  const handleShowExcluirAluno = (id: number) => {
		setDeletingAluno(id);
		setShowExcluirAluno(true);
	}

	const [alunos, setAlunos] = useState<GetAlunoResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
	const [editingAluno, setEditingAluno] = useState<GetAlunoResponse | null>(null);
	const [deletingAluno, setDeletingAluno] = useState<number | null>(null);
	const [showToastError, setShowToastError] = useState(false);
	const [showToastSuccess, setShowToastSuccess] = useState(false);

  useEffect(() => {
    listarAlunos();
  }, []);

  const listarAlunos = async (): Promise<void> => {
		setLoading(true);

    try {
      const data = await getAlunos();
      setAlunos(data);
    } catch (err) {
      setShowToastError(true);
    } finally {
      setLoading(false);
    }
  };

	const [showCadastrar, setShowCadastrar] = useState(false);
	const handleCloseCadastrar = () => setShowCadastrar(false);
	const handleShowCadastrar = () => setShowCadastrar(true);

	const [formDataCadastrarAluno, setFormDataCadastrarAluno] = useState({
    nome: '',
    telefone: '',
    email: '',
  });

	const handleChangeCadastrarAluno = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataCadastrarAluno({ ...formDataCadastrarAluno, [name]: value });
  };

  const handleSubmitCadastrarAluno = async (): Promise<void> => {
    try {
			const body: CreateAlunoRequest = {
				email: formDataCadastrarAluno.email,
				idTurma: {
					id: 1,
					serie: 1,
					turma: 'A'
				},
				nome: formDataCadastrarAluno.nome,
				telefone: formDataCadastrarAluno.telefone
			}
      await createAluno(body);

      listarAlunos();
			setShowToastSuccess(true);
			setFormDataCadastrarAluno(null);
      handleCloseCadastrar();
    } catch (err) {
			setShowToastError(true);
    }
  };

	const [formDataEditarAluno, setFormDataEditarAluno] = useState({
    nome: '',
    telefone: '',
    email: '',
		situacao: ''
  });

	const handleChangeEditarAluno = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataEditarAluno({ ...formDataEditarAluno, [name]: value });
  };

  const handleSubmitEditarAluno = async (): Promise<void> => {
    try {
			const body: UpdateAlunoRequest = {
				email: formDataEditarAluno.email,
				situacao: formDataEditarAluno.situacao,
				idTurma: {
					id: 1,
					serie: 1,
					turma: 'A'
				},
				nome: formDataEditarAluno.nome,
				telefone: formDataEditarAluno.telefone
			}
      await updateAluno(editingAluno.id, body);

      listarAlunos();
			setShowToastSuccess(true);
			setFormDataEditarAluno(null);
      handleCloseEditar();
    } catch (err) {
      setShowToastError(true);
    }
  };

	const handleSubmitExcluirAluno = async (): Promise<void> => {
    try {
      await deleteAluno(deletingAluno);

      listarAlunos();
			setShowToastSuccess(true);
      handleCloseExcluirAluno();
    } catch (err) {
      setShowToastError(true);
    }
  };

	if (loading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Carregando...</span></Spinner>;
  }

	return (
		<section className="alunos">
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
          <AlunosEditarAluno formData={formDataEditarAluno} onChange={handleChangeEditarAluno}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditar}>
            Desistir
          </Button>
          <Button variant="success" onClick={handleSubmitEditarAluno}>
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
          <Modal.Title>Empréstimos do Aluno</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AlunosEmprestimosAluno />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="info" className="btn-blue" onClick={handleCloseEmprestimos}>Ok</Button>
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
          <Button variant="danger" onClick={handleSubmitExcluirAluno}>
            <FontAwesomeIcon icon={faTrash} /> Excluir
          </Button>
        </Modal.Footer>
      </Modal>

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
						<AlunosCadastrarAluno formData={formDataCadastrarAluno} onChange={handleChangeCadastrarAluno} />
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseCadastrar}>Desistir</Button>
						<Button variant="success" onClick={handleSubmitCadastrarAluno}><FontAwesomeIcon icon={faCheck} /> Salvar</Button>
					</Modal.Footer>
				</Modal>
			</div>

			<div className="w-100">
				<AlunosFiltros />
			</div>

			<div className="w-100">
				<AlunosListagem 
					alunos={alunos} 
					onEdit={handleShowEditar} 
					onDelete={handleShowExcluirAluno} 
					onEmprestimos={handleShowEmprestimos} 
				/>
			</div>
		</section>
	);
};

export default Alunos;
