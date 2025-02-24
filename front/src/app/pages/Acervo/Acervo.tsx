import React, { ChangeEvent, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import AcervoListagem from './templates/AcervoListagem';
import AcervoFiltros from "./templates/AcervoFiltros";
import Modal from 'react-bootstrap/Modal';
import AcervoCadastrarLivro from "./templates/AcervoCadastrarLivro";
import { ativarLivro, createLivro, getLivros, inativarLivro, updateLivro } from './../../api/AcervoApi';
import { CreateLivroRequest, GetLivroResponse, LivroFiltros, UpdateLivroRequest } from "./../../interfaces/acervo";
import AcervoEditarLivro from "./templates/AcervoEditarLivro";
import Exemplares from "./Exemplares/Exemplares";
import EmprestimosLivro from "./templates/EmprestimosLivro";
import { ResponsePagination } from "./../../interfaces/pagination";
import Pagination from "react-bootstrap/esm/Pagination";

const Acervo: React.FC = () => {

	const [showEditar, setShowEditar] = useState(false);
  const handleCloseEditar = () => setShowEditar(false);
  const handleShowEditar = (livro: GetLivroResponse) => {
		setEditingLivro(livro);
		setFormDataEditarLivro(livro);
		setShowEditar(true);
	}

	const [showAtivarLivro, setShowAtivarLivro] = useState(false);
	const handleCloseAtivarLivro = () => setShowAtivarLivro(false);
	const handleShowAtivarLivro = (id: number) => {
		setActivatingLivro(id);
		setShowAtivarLivro(true);
	}

	const [showInativarLivro, setShowInativarLivro] = useState(false);
	const handleCloseInativarLivro = () => setShowInativarLivro(false);
	const handleShowInativarLivro = (id: number) => {
		setInactivatingLivro(id);
		setShowInativarLivro(true);
	}

	const [activatingLivro, setActivatingLivro] = useState<number | null>(null);
	const [inactivatingLivro, setInactivatingLivro] = useState<number | null>(null);

	const [livros, setLivros] = useState<ResponsePagination<GetLivroResponse>>();
	const [editingLivro, setEditingLivro] = useState<GetLivroResponse | null>(null);

	const [showExemplares, setShowExemplares] = useState(false);
	const handleCloseExemplares = () => setShowExemplares(false);
	const handleShowExemplares = (livro: GetLivroResponse) => {
		setEditingLivro(livro);
		setShowExemplares(true);
	}

	const [showVerEmprestimos, setShowVerEmprestimos] = useState(false);
	const handleCloseVerEmprestimos = () => setShowVerEmprestimos(false);
	const handleShowVerEmprestimos  = (livro: GetLivroResponse) => {
		setEditingLivro(livro);
		setShowVerEmprestimos(true);
	}

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const sizePage = 10;

	const [formDataFiltrar, setFormDataFiltrar] = useState<LivroFiltros>({
		isbn: '',
		ativo: true,
		autor: '',
		genero: '',
		titulo: ''
	});

	const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

	useEffect(() => {
		listarLivros();
	}, [currentPage]);

  useEffect(() => {
    listarLivros();
  }, []);

	const handleChangeFiltros = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;

    if(name == "ativo") {
      setFormDataFiltrar({...formDataFiltrar,
        ativo: value === "true" ? true : value === "false" ? false : null,
      });
    } else {
      setFormDataFiltrar({ ...formDataFiltrar, [name]: value });
    }
	};

  const listarLivros = async (): Promise<void> => {
		try {
			const filtros: LivroFiltros = {
				isbn: formDataFiltrar.isbn,
				ativo: formDataFiltrar.ativo,
				titulo: formDataFiltrar.titulo,
				autor: formDataFiltrar.autor,
				genero: formDataFiltrar.genero,
				page: (currentPage - 1),
				size: sizePage
			}
			const data = await getLivros(filtros);
			setLivros(data);
			setTotalPages(data.totalPages);
		} catch(err) {
			console.log(err)
		}
  };

	const handleSubmitActiveInactiveLivro = async (ativo: boolean): Promise<void> => {
		if(ativo) {
			try {
				await inativarLivro(inactivatingLivro);
				handleCloseInativarLivro();
			} catch(err) {
				console.log(err)
			}
		} else {
			try {
				await ativarLivro(activatingLivro);
				handleCloseAtivarLivro();
			} catch(err) {
				console.log(err)
			}
		}

		listarLivros();
	};

	const [showCadastrar, setShowCadastrar] = useState(false);
	const handleCloseCadastrar = () => setShowCadastrar(false);
	const handleShowCadastrar = () => setShowCadastrar(true);

	const [formDataCadastrarLivro, setFormDataCadastrarLivro] = useState<CreateLivroRequest>({
    isbn: '',
    titulo: '',
		autores: [],
		generos: [],
		idEstanteprateleira: null as number,
		idSecao: null as number,
		qtdExemplares: null as number
  });

	const handleChangeCadastrarLivro = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataCadastrarLivro({ ...formDataCadastrarLivro, [name]: value });
  };

  const handleSubmitCadastrarLivro = async (): Promise<void> => {
		const body: CreateLivroRequest = {
			isbn: formDataCadastrarLivro.isbn,
			titulo: formDataCadastrarLivro.titulo,
			autores: formDataCadastrarLivro.autores,
			generos: formDataCadastrarLivro.generos,
			idEstanteprateleira: Number(formDataCadastrarLivro.idEstanteprateleira),
			idSecao: Number(formDataCadastrarLivro.idSecao),
			qtdExemplares: Number(formDataCadastrarLivro.qtdExemplares)
		}
		try {
			await createLivro(body);
			listarLivros();
			setFormDataCadastrarLivro({
				isbn: '',
				titulo: '',
				autores: [],
				generos: [],
				idEstanteprateleira: null as number,
				idSecao: null as number,
				qtdExemplares: null as number
			});
			handleCloseCadastrar();
		} catch(err) {
			console.log(err)
		}

  };

	const [formDataEditarLivro, setFormDataEditarLivro] = useState<UpdateLivroRequest>({
    isbn: '',
		titulo: '',
		autores: [],
		generos: []
  });

	const handleChangeEditarLivro = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataEditarLivro({ ...formDataEditarLivro, [name]: value });
  };

  const handleSubmitEditarLivro = async (): Promise<void> => {
		const body: UpdateLivroRequest = {
			isbn: formDataEditarLivro.isbn,
			autores: formDataEditarLivro.autores,
			titulo: formDataEditarLivro.titulo,
			generos: formDataEditarLivro.generos
		}

		try {
			await updateLivro(editingLivro.id, body);
			listarLivros();
			setFormDataEditarLivro({
				isbn: '',
				titulo: '',
				autores: [],
				generos: []
			});
			handleCloseEditar();
		} catch(err) {
			console.log(err)
		}

  };

	return (
		<section className="indentacaoPadrao">
			<div className="indentacaoPadrao-acoes">
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
						<Button variant="secondary" onClick={handleCloseCadastrar}>Cancelar</Button>
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
							Cancelar
						</Button>
						<Button variant="success" onClick={handleSubmitEditarLivro}>
							<FontAwesomeIcon icon={faCheck} /> Salvar
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					show={showVerEmprestimos}
					onHide={handleCloseVerEmprestimos}
					size="xl"
					backdrop="static"
					centered
					keyboard={false}
					className="Modais-VerEmprestimos-Custon"
				>

					<Modal.Header closeButton>
						{editingLivro && 
							<Modal.Title>Emprestimos do Livro: <span className="custom-variavel">{editingLivro.titulo}</span></Modal.Title>
						}
					</Modal.Header>

					<Modal.Body>
						<EmprestimosLivro livro={editingLivro} />
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseVerEmprestimos}>Ok</Button>

					</Modal.Footer>
				</Modal>

				<Modal
					show={showExemplares}
					onHide={handleCloseExemplares}
					size="xl"
					backdrop="static"
					centered
					keyboard={false}>

					<Modal.Header closeButton>
						<Modal.Title>Gerenciar Exemplares</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Exemplares livro={editingLivro}/>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseExemplares}>Ok</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					show={showAtivarLivro}
					onHide={handleCloseAtivarLivro}
					size="lg"
					backdrop="static"
					centered
					keyboard={false}
					className="Modais-Confirmacao-Custon"
				>
					<Modal.Header closeButton>
						<Modal.Title>Confirmação</Modal.Title>
					</Modal.Header>

					<Modal.Body>Tem certeza que deseja ativar este livro?</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseAtivarLivro}>
							Cancelar
						</Button>
						<Button variant="success" onClick={() => handleSubmitActiveInactiveLivro(false)}>Ativar</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					show={showInativarLivro}
					onHide={handleCloseInativarLivro}
					size="lg"
					backdrop="static"
					centered
					keyboard={false}
					className="Modais-Confirmacao-Custon"
				>
					<Modal.Header closeButton>
						<Modal.Title>Confirmação</Modal.Title>
					</Modal.Header>

					<Modal.Body>Tem certeza que deseja inativar este livro?</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseInativarLivro}>Cancelar</Button>
						<Button variant="danger" onClick={() => handleSubmitActiveInactiveLivro(true)}>Inativar</Button>
					</Modal.Footer>
				</Modal>

			</div>

			<div className="w-100">
				<AcervoFiltros 
					formData={formDataFiltrar} 
					onChange={handleChangeFiltros} 
					onSearch={listarLivros} 
				/>
			</div>

			<div className="w-100">
				<AcervoListagem 
					livros={livros} 
					onEdit={handleShowEditar} 
					onAtivar={handleShowAtivarLivro} 
          onInativar={handleShowInativarLivro}
					onEmprestimos={handleShowVerEmprestimos} 
					onExemplares={handleShowExemplares}
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

export default Acervo;
