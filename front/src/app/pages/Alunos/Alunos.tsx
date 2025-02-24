import React, { ChangeEvent, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faCheck, faUsersRectangle, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import AlunosListagem from './templates/AlunosListagem';
import AlunosFiltros from "./templates/AlunosFiltros";
import Modal from 'react-bootstrap/Modal';
import AlunosCadastrarAluno from "./templates/AlunosCadastrarAluno";
import { AlunoFiltros, CreateAlunoRequest, GetAlunoResponse, UpdateAlunoRequest } from "./../../interfaces/aluno";
import { createAluno, inativarAluno, getAlunos, updateAluno, ativarAluno } from "../../api/AlunosApi";
import AlunosEditarAluno from "./templates/AlunosEditarAluno";
import GerenciarTurmas from "./turmas/GerenciarTurmas";
import EmprestimosAluno from "./templates/EmprestimosAluno";
import Pagination from "react-bootstrap/esm/Pagination";
import { ResponsePagination } from "./../../interfaces/pagination";

const Alunos: React.FC = () => {

  const[showGerenciarTurmas, setShowGerenciarTurmas] = useState(false)
  const handleCloseGerenciarTurmas = () => setShowGerenciarTurmas(false);
  const handleShowGerenciarTurmas = () => setShowGerenciarTurmas(true);

  const [showVerEmprestimos, setShowVerEmprestimos] = useState(false);
  const handleCloseVerEmprestimos = () => setShowVerEmprestimos(false);
  const handleShowVerEmprestimos = (aluno: GetAlunoResponse) => {
    setEditingAluno(aluno);
    setShowVerEmprestimos(true);
  }

	const [showEditar, setShowEditar] = useState(false);
  const handleCloseEditar = () => setShowEditar(false);
  const handleShowEditar = (aluno: GetAlunoResponse) => {
		setEditingAluno(aluno);
		setFormDataEditarAluno({
      nome: aluno.nome, 
      email: aluno.email, 
      situacao: aluno.situacao, 
      telefone: aluno.telefone, 
      idTurma: aluno.turma.id 
    });
		setShowEditar(true);
	}

  const [showActiveAluno, setShowActiveAluno] = useState(false);
  const handleCloseActiveAluno = () => setShowActiveAluno(false);
  const handleShowActiveAluno = (id: number) => {
		setActivatingAluno(id);
		setShowActiveAluno(true);
	}

  const [showInactiveAluno, setShowInactiveAluno] = useState(false);
  const handleCloseInactiveAluno = () => setShowInactiveAluno(false);
  const handleShowInactiveAluno = (id: number) => {
		setInactivatingAluno(id);
		setShowInactiveAluno(true);
	}

	const [alunos, setAlunos] = useState<ResponsePagination<GetAlunoResponse>>();
	const [editingAluno, setEditingAluno] = useState<GetAlunoResponse | null>(null);
	const [activatingAluno, setActivatingAluno] = useState<number | null>(null);
	const [inactivatingAluno, setInactivatingAluno] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const sizePage = 10;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  useEffect(() => {
    listarAlunos();
  }, [currentPage]);

  useEffect(() => {
    listarAlunos();
  }, []);


  const listarAlunos = async (): Promise<void> => {
    const filtros: AlunoFiltros = {
      nome: formDataFiltrar.nome,
      situacao: formDataFiltrar.situacao,
      serie: formDataFiltrar.serie,
      turma: formDataFiltrar.turma,
      ativo: formDataFiltrar.ativo,
      page: (currentPage - 1),
      size: sizePage
    }

    try {
      const data = await getAlunos(filtros);
      setAlunos(data);
      setTotalPages(data.totalPages);
		} catch(err) {
			console.log(err)
		}
  };

	const [showCadastrar, setShowCadastrar] = useState(false);
	const handleCloseCadastrar = () => setShowCadastrar(false);
	const handleShowCadastrar = () => setShowCadastrar(true);

	const [formDataCadastrarAluno, setFormDataCadastrarAluno] = useState({
    idTurma: null as number,
    nome: '',
    telefone: '',
    email: '',
  });

  const [formDataFiltrar, setFormDataFiltrar] = useState({
    nome: '',
    serie: null as number,
    turma: '',
    situacao: '',
    ativo: true
  });

	const handleChangeCadastrarAluno = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataCadastrarAluno({ ...formDataCadastrarAluno, [name]: value });
  };

  const handleChangeFiltrar = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if(name == "ativo") {
      setFormDataFiltrar({...formDataFiltrar,
        ativo: value === "true" ? true : value === "false" ? false : null,
      });
    } else {
      setFormDataFiltrar({ ...formDataFiltrar, [name]: value });
    }
  };

  const handleSubmitCadastrarAluno = async (): Promise<void> => {
    const body: CreateAlunoRequest = {
      email: formDataCadastrarAluno.email,
      idTurma: Number(formDataCadastrarAluno.idTurma),
      nome: formDataCadastrarAluno.nome,
      telefone: formDataCadastrarAluno.telefone
    }

    try {
      await createAluno(body);
  
      listarAlunos();
      setFormDataCadastrarAluno({
        idTurma: null as number,
        nome: '',
        telefone: '',
        email: '',
      });
      handleCloseCadastrar();
		} catch(err) {
			console.log(err)
		}
  };

	const [formDataEditarAluno, setFormDataEditarAluno] = useState({
    idTurma: null as number,
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
    const body: UpdateAlunoRequest = {
      email: formDataEditarAluno.email,
      situacao: formDataEditarAluno.situacao,
      idTurma: Number(formDataEditarAluno.idTurma),
      nome: formDataEditarAluno.nome,
      telefone: formDataEditarAluno.telefone
    }

    try {
      await updateAluno(editingAluno.id, body);
  
      listarAlunos();
      setFormDataEditarAluno({
        idTurma: null as number,
        nome: '',
        telefone: '',
        email: '',
        situacao: ''
      });
      handleCloseEditar();
		} catch(err) {
			console.log(err)
		}
  };

	const handleSubmitActiveInactiveAluno = async (ativo: boolean): Promise<void> => {
    if(ativo) {
      try {
        await inativarAluno(inactivatingAluno);
        handleCloseInactiveAluno();
      } catch(err) {
        console.log(err)
      }
    } else {
      try {
        await ativarAluno(activatingAluno);
        handleCloseActiveAluno();
      } catch(err) {
        console.log(err)
      }
    }

    listarAlunos();
  };

	return (
		<section className="alunos">
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
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSubmitEditarAluno}>
            <FontAwesomeIcon icon={faCheck} /> Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showActiveAluno}
        onHide={handleCloseActiveAluno}
        size="lg"
        backdrop="static"
        centered
        keyboard={false}
        className="Modais-Confirmacao-Custon"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>

        <Modal.Body>Tem certeza que deseja ativar este aluno?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseActiveAluno}>
            Cancelar
          </Button>
          <Button variant="success" onClick={() => handleSubmitActiveInactiveAluno(false)}>Ativar</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showInactiveAluno}
        onHide={handleCloseInactiveAluno}
        size="lg"
        backdrop="static"
        centered
        keyboard={false}
        className="Modais-Confirmacao-Custon"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>

        <Modal.Body>Tem certeza que deseja inativar este aluno?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInactiveAluno}>Cancelar</Button>
          <Button variant="danger" onClick={() => handleSubmitActiveInactiveAluno(true)}>Inativar</Button>
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
						<Button variant="secondary" onClick={handleCloseCadastrar}>Cancelar</Button>
						<Button variant="success" onClick={handleSubmitCadastrarAluno}><FontAwesomeIcon icon={faCheck} /> Salvar</Button>
					</Modal.Footer>
				</Modal>

        <Button variant="info" className="btn-orange" onClick={handleShowGerenciarTurmas}>
          <FontAwesomeIcon icon={faUsersRectangle} /> Gerenciar Turmas
        </Button>

        <Modal
          show={showGerenciarTurmas}
          onHide={handleCloseGerenciarTurmas}
          size="xl"
          backdrop="static"
          centered
          keyboard={false}>

          <Modal.Header closeButton>
            <Modal.Title>Gerenciar Turmas</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <GerenciarTurmas/>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseGerenciarTurmas}>Ok</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showVerEmprestimos}
          onHide={handleCloseVerEmprestimos}
          size="xl"
          backdrop="static"
          centered
          keyboard={false}
        >

          <Modal.Header closeButton>
            {editingAluno && 
              <Modal.Title>
                Emprestimos do Aluno: <span className="custom-variavel">{editingAluno.nome} - {editingAluno.turma.serie}ª{editingAluno.turma.turma}</span>
              </Modal.Title>         
            }
          </Modal.Header>

          <Modal.Body>
            <EmprestimosAluno aluno={editingAluno}/>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseVerEmprestimos}>Ok</Button>
          </Modal.Footer>
        </Modal>
			</div>

			<div className="w-100">
				<AlunosFiltros formData={formDataFiltrar} onSearch={listarAlunos} onChange={handleChangeFiltrar}  />
			</div>

			<div className="w-100">
				<AlunosListagem 
					alunos={alunos} 
					onEdit={handleShowEditar} 
					onActive={handleShowActiveAluno} 
          onInactive={handleShowInactiveAluno}
					onEmprestimos={handleShowVerEmprestimos} 
				/>

        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange((currentPage - 1))} disabled={currentPage === 1} />
          <Pagination.Item
            active={true}
          >
            {currentPage}
          </Pagination.Item>
          <Pagination.Next onClick={() => handlePageChange((currentPage + 1))} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
			</div>
		</section>
	);
};

export default Alunos;
