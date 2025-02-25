import React, { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import CadastrarUsuarios from "./Templates/CadastrarUsuarios";
import FiltrosUsuarios from "./Templates/FiltrosUsuarios";
import ListagemUsuarios from "./Templates/ListagemUsuarios";
import { CreateUsuarioRequest, GetUsuarioResponse, UpdateUsuarioRequest, UsuarioFiltros } from "./../../interfaces/usuario";
import { getUsuarios, createUsuario, updateUsuario, inativarUsuario, ativarUsuario } from "./../../api/UsuarioApi";
import AtivarUsuario from "./Templates/AtivarUsuario";
import InativarUsuario from "./Templates/InativarUsuario";

const Usuarios: React.FC = () => {
	const [showEditar, setShowEditar] = useState(false);
	const handleCloseEditar = () => setShowEditar(false);
	const handleShowEditar = (usuario: GetUsuarioResponse) => {
		setEditingUsuario(usuario);
		setFormDataEditarUsuario({
			nome: usuario.nome, 
			email: usuario.email, 
			ativo: usuario.ativo,
			cargo: usuario.cargo,
			senha: null
		});
		setShowEditar(true);
	}

	const [showActiveUsuario, setShowActiveUsuario] = useState(false);
	const handleCloseActiveUsuario = () => setShowActiveUsuario(false);
	const handleShowActiveUsuario = (id: number) => {
		setActivatingUsuario(id);
		setShowActiveUsuario(true);
	}

	const [showInactiveUsuario, setShowInactiveUsuario] = useState(false);
	const handleCloseInactiveUsuario = () => setShowInactiveUsuario(false);
	const handleShowInactiveUsuario = (id: number) => {
		setInactivatingUsuario(id);
		setShowInactiveUsuario(true);
	}

	const [usuarios, setUsuarios] = useState<GetUsuarioResponse[]>();
	const [editingUsuario, setEditingUsuario] = useState<GetUsuarioResponse | null>(null);
	const [activatingUsuario, setActivatingUsuario] = useState<number | null>(null);
	const [inactivatingUsuario, setInactivatingUsuario] = useState<number | null>(null);

	useEffect(() => {
		listarUsuarios();
	}, []);


	const listarUsuarios = async (): Promise<void> => {
		const filtros: UsuarioFiltros = {
			nome: formDataFiltrar.nome,
			ativo: formDataFiltrar.ativo,
			cargo: formDataFiltrar.cargo
		}

		try {
			const data = await getUsuarios(filtros);
			setUsuarios(data);
		} catch(err) {
			console.log(err)
		}
	};

	const [showCadastrar, setShowCadastrar] = useState(false);
	const handleCloseCadastrar = () => setShowCadastrar(false);
	const handleShowCadastrar = () => setShowCadastrar(true);

	const [formDataCadastrarUsuario, setFormDataCadastrarUsuario] = useState<CreateUsuarioRequest>({
		nome: '',
		email: '',
		cargo: '',
		senha: ''
	});

	const [formDataFiltrar, setFormDataFiltrar] = useState<UsuarioFiltros>({
		nome: '',
		ativo: true,
		cargo: ''
	});

	const handleChangeCadastrarUsuario = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormDataCadastrarUsuario({ ...formDataCadastrarUsuario, [name]: value });
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

	const handleSubmitCadastrarUsuario = async (): Promise<void> => {
		const body: CreateUsuarioRequest = {
			email: formDataCadastrarUsuario.email,
			nome: formDataCadastrarUsuario.nome,
			cargo: formDataCadastrarUsuario.cargo,
			senha: formDataCadastrarUsuario.senha
		}

		try {
			await createUsuario(body);
	
			listarUsuarios();
			setFormDataCadastrarUsuario({
				nome: '',
				email: '',
				cargo: '',
				senha: ''
			});
			handleCloseCadastrar();
		} catch(err) {
			console.log(err)
		}
	};

	const [formDataEditarUsuario, setFormDataEditarUsuario] = useState<UpdateUsuarioRequest>({
		nome: '',
		email: '',
		ativo: true,
		cargo: '',
		senha: '',
	});

	const handleChangeEditarUsuario = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormDataEditarUsuario({ ...formDataEditarUsuario, [name]: value });
	};

	const handleSubmitEditarUsuario = async (): Promise<void> => {
		const body: UpdateUsuarioRequest = {
			email: formDataEditarUsuario.email,
			nome: formDataEditarUsuario.nome,
			ativo: formDataEditarUsuario.ativo,
			cargo: formDataEditarUsuario.cargo,
			senha: formDataCadastrarUsuario.senha
		}

		try {
			await updateUsuario(editingUsuario.id, body);
	
			listarUsuarios();
			setFormDataEditarUsuario({
				nome: '',
				email: '',
				ativo: true,
				cargo: '',
				senha: '',
			});
			handleCloseEditar();
		} catch(err) {
			console.log(err)
		}
	};

	const handleSubmitActiveInactiveUsuario = async (ativo: boolean): Promise<void> => {
		if(ativo) {
			try {
				await inativarUsuario(inactivatingUsuario);
				handleCloseInactiveUsuario();
			} catch(err) {
				console.log(err)
			}
		} else {
			try {
				await ativarUsuario(activatingUsuario);
				handleCloseActiveUsuario();
			} catch(err) {
				console.log(err)
			}
		}

		listarUsuarios();
	};

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
						<EditarUsuario formData={formDataEditarUsuario} onChange={handleChangeEditarUsuario}/>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseEditar}>
							Cancelar
						</Button>
						<Button variant="success" onClick={handleSubmitEditarUsuario}>
							<FontAwesomeIcon icon={faCheck} /> Salvar
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					show={showInactiveUsuario}
					onHide={handleCloseInactiveUsuario}
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
						<Button variant="secondary" onClick={handleCloseInactiveUsuario}>
							Cancelar
						</Button>
						<Button variant="danger"  onClick={() => handleSubmitActiveInactiveUsuario(false)}>
							<FontAwesomeIcon icon={faCheck} /> Inativar
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					show={showActiveUsuario}
					onHide={handleCloseActiveUsuario}
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
						<Button variant="secondary" onClick={handleCloseActiveUsuario}>
							Cancelar
						</Button>
						<Button variant="success" onClick={() => handleSubmitActiveInactiveUsuario(false)}>Ativar</Button>
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
