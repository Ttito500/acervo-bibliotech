import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/esm/Modal";
import ListagemTurma from "../../Alunos/turmas/templates/ListagemTurma";
import FiltrosTurma from "./templates/FiltrosTurma";
import CadastrarTurma from "./templates/CadastrarTurma";
import InativarTurma from "./templates/InativarTurma";
import AtivarTurma from "./templates/AtivarTurma";
import EditarTurma from "./templates/EditarTurma";
import { GetTurmaResponse, TurmaFiltros, CreateTurmaRequest, UpdateTurmaRequest } from "./../../../interfaces/turma";
import { ativarTurma, createTurma, getTurmas, inativarTurma, updateTurma } from "./../../../api/TurmaApi";

const GerenciarTurmas: React.FC = () => {
  const [showCadastrar, setShowCadastrar] = useState(false);
  const handleCloseCadastrar = () => setShowCadastrar(false);
  const handleShowCadastrar = () => setShowCadastrar(true);

  const [showEditar, setShowEditar] = useState(false);
  const handleCloseEditar = () => setShowEditar(false);
  const handleShowEditar = (turma: GetTurmaResponse) => {
      setEditingTurma(turma);
      setFormDataEditarTurma({
        turma: turma.turma,
        serie: turma.serie,
        anoDeEntrada: turma.anoDeEntrada
      });
      setShowEditar(true);
    }

  const [showAtivar, setShowAtivar] = useState(false);
  const handleCloseAtivar = () => setShowAtivar(false);
  const handleShowAtivar = (id: number) => {
		setActivatingTurma(id);
		setShowAtivar(true);
	}

  const [showInativar, setShowInativar] = useState(false);
  const handleCloseInativar = () => setShowInativar(false);
  const handleShowInativar = (id: number) => {
		setInactivatingTurma(id);
		setShowInativar(true);
	}

  const [turmas, setTurmas] = useState<GetTurmaResponse[]>([]);
  const [editingTurma, setEditingTurma] = useState<GetTurmaResponse | null>(null);
  const [activatingTurma, setActivatingTurma] = useState<number | null>(null);
  const [inactivatingTurma, setInactivatingTurma] = useState<number | null>(null);

  const [formDataCadastrarTurma, setFormDataCadastrarTurma] = useState({
    serie: null as number,
    turma: '',
    anoDeEntrada: null as number,
  });

  const [formDataEditarTurma, setFormDataEditarTurma] = useState({
    serie: null as number,
    turma: '',
    anoDeEntrada: null as number,
  });

  const [formDataFiltrar, setFormDataFiltrar] = useState({
    serie: null as number,
    turma: '',
    anoDeEntrada: null as number,
    ativo: true
  });

  const handleChangeCadastrarTurma = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataCadastrarTurma({ ...formDataCadastrarTurma, [name]: value });
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

  const handleChangeEditarTurma = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDataEditarTurma({ ...formDataEditarTurma, [name]: value });
  };

  const handleSubmitCadastrarTurma = async (): Promise<void> => {
    const body: CreateTurmaRequest = {
      serie: formDataCadastrarTurma.serie,
      turma: formDataCadastrarTurma.turma,
      anoDeEntrada: formDataCadastrarTurma.anoDeEntrada,
    }

    try {
      await createTurma(body);
      listarTurmas();
      setFormDataCadastrarTurma({
        serie: null as number,
        turma: '',
        anoDeEntrada: null as number,
      });
      handleCloseCadastrar();
		} catch(err) {
			console.log(err)
		}
  };

  const handleSubmitEditarTurma = async (): Promise<void> => {
    const body: UpdateTurmaRequest = {
      serie: formDataEditarTurma.serie,
      turma: formDataEditarTurma.turma,
      anoDeEntrada: formDataEditarTurma.anoDeEntrada,
    }

    try {
      await updateTurma(editingTurma.id, body);
  
      listarTurmas();
      setFormDataEditarTurma({
        serie: null as number,
        turma: '',
        anoDeEntrada: null as number
      });
      handleCloseEditar();
		} catch(err) {
			console.log(err)
		}

  };

  const handleSubmitActiveInactiveTurma = async (ativo: boolean): Promise<void> => {
    if(ativo) {
      try {
        await inativarTurma(inactivatingTurma);
        handleCloseInativar();
      } catch(err) {
        console.log(err)
      }
    } else {
      try {
        await ativarTurma(activatingTurma);
        handleCloseAtivar();
      } catch(err) {
        console.log(err)
      }
    }

    listarTurmas();
  };

  const listarTurmas = async (): Promise<void> => {
    const filtros: TurmaFiltros = {
      serie: formDataFiltrar.serie,
      turma: formDataFiltrar.turma,
      anoDeEntrada: formDataFiltrar.anoDeEntrada,
      ativo: formDataFiltrar.ativo
    }

    try {
      const data = await getTurmas(filtros);
      setTurmas(data);
		} catch(err) {
			console.log(err)
		}
  };

  useEffect(() => {
    listarTurmas();
  }, []);

  return (
    <>
      <Modal
        show={showEditar}
        onHide={handleCloseEditar}
        size="lg"
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ediar Turma</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditarTurma formData={formDataEditarTurma} onChange={handleChangeEditarTurma}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditar}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSubmitEditarTurma}>
            <FontAwesomeIcon icon={faCheck} /> Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAtivar}
        onHide={handleCloseAtivar}
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
          <AtivarTurma />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAtivar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleSubmitActiveInactiveTurma(false)}>Ativar</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showInativar}
        onHide={handleCloseInativar}
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
          <InativarTurma />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInativar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleSubmitActiveInactiveTurma(true)}>Inativar</Button>
        </Modal.Footer>
      </Modal>

      <section className="indentacaoPadrao">
        <div className="indentacaoPadrao-acoes">
          <Button
            variant="info"
            className="btn-blue"
            onClick={handleShowCadastrar}
          >
            <FontAwesomeIcon icon={faPlus} /> Cadastrar Nova Turma
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
              <Modal.Title>Cadastrar Nova Turma</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <CadastrarTurma formData={formDataCadastrarTurma} onChange={handleChangeCadastrarTurma} />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCadastrar}>
                Cancelar
              </Button>
              <Button variant="success" onClick={handleSubmitCadastrarTurma}>
                <FontAwesomeIcon icon={faCheck} /> Salvar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="w-100">
          <FiltrosTurma 
            formData={formDataFiltrar} 
            onSearch={listarTurmas} 
            onChange={handleChangeFiltrar}
          />
        </div>

        <div className="w-100 list-scroll">
          <ListagemTurma 
            turmas={turmas} 
            onEdit={handleShowEditar} 
            onActive={handleShowAtivar} 
            onInactive={handleShowInativar}
          />
        </div>
      </section>
    </>
  );
};

export default GerenciarTurmas;
