import React, { ChangeEvent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import CadastraAlunoMonitor from "./Templates/CadastraAlunoMonitor";
import Confirmacao from "./Templates/Confirmacao";
import { GetCronogramaResponse, Cronograma, CreateCronogramaRequest } from "./../../interfaces/cronograma";
import { createCronograma, deleteCronograma, getCronogramas } from "./../../api/CronogramaApi";

function transformCronogramas(lista: GetCronogramaResponse[]): Cronograma[] {
	const mapa = new Map<string, Cronograma>();

	lista.forEach(({ id, diaDaSemana, alunoMonitor }) => {
		if (!mapa.has(diaDaSemana)) {
			mapa.set(diaDaSemana, { diaDaSemana, items: [] });
		}
		mapa.get(diaDaSemana)!.items.push({ id, alunoMonitor, diaDaSemana });
	});

	return Array.from(mapa.values());
}

const Cronograma: React.FC = () => {
	const [cronogramas, setCronogramas] = useState<Cronograma[]>([]);
	const [cronogramaSegunda, setCronogramaSegunda] = useState<GetCronogramaResponse[]>([]);
	const [cronogramaTerca, setCronogramaTerca] = useState<GetCronogramaResponse[]>([]);
	const [cronogramaQuarta, setCronogramaQuarta] = useState<GetCronogramaResponse[]>([]);
	const [cronogramaQuinta, setCronogramaQuinta] = useState<GetCronogramaResponse[]>([]);
	const [cronogramaSexta, setCronogramaSexta] = useState<GetCronogramaResponse[]>([]);

  const [showCadastrar, setShowCadastrar] = useState(false);
  const handleCloseCadastrar = () => setShowCadastrar(false);
  const handleShowCadastrar = () => setShowCadastrar(true);

  const [showExcluir, setShowExcluir] = useState(false);
  const handleCloseExcluir = () => setShowExcluir(false);
  const handleShowExcluir = (id: number) => {
		setEditingCronogramaId(id);
		setShowExcluir(true);
	}

	const [editingCronogramaId, setEditingCronogramaId] = useState<number>(null);

	const [formDataCadastrarCronograma, setFormDataCadastrarCronograma] = useState<CreateCronogramaRequest>({
		idAlunoMonitor: null as number,
		diaDaSemana: ''
	});

	const handleChangeCadastrarCronograma = (e: ChangeEvent<any>): void => {
		const { name, value } = e.target;
		setFormDataCadastrarCronograma({ ...formDataCadastrarCronograma, [name]: value });
	};

	const onDelete = async () => {
		try {
			if(editingCronogramaId) {
				await deleteCronograma(editingCronogramaId);
				setEditingCronogramaId(null);
				listarCronogramas();
				handleCloseExcluir();
			}
		} catch(err) {
			console.log(err)
		}
	}

	const handleSubmitCadastrar = async (): Promise<void> => {
			const body: CreateCronogramaRequest = {
				diaDaSemana: formDataCadastrarCronograma.diaDaSemana,
				idAlunoMonitor: formDataCadastrarCronograma.idAlunoMonitor
			}
	
			try {
				await createCronograma(body);
				listarCronogramas();
				setFormDataCadastrarCronograma({
					idAlunoMonitor: null as number,
					diaDaSemana: ''
				});
				handleCloseCadastrar();
			} catch(err) {
				console.log(err)
			}
		};
	
	const listarCronogramas = async (): Promise<void> => {
		try {
			const data = await getCronogramas();
			const cronogramasTransfom = transformCronogramas(data);
			setCronogramas(cronogramasTransfom);
		} catch(err) {
			console.log(err)
		}
	};

	useEffect(() => {
		setCronogramaSegunda(cronogramas.filter((c) => c.diaDaSemana === 'segunda-feira')[0]?.items || []);
		setCronogramaTerca(cronogramas.filter((c) => c.diaDaSemana === 'terca-feira')[0]?.items || []);
		setCronogramaQuarta(cronogramas.filter((c) => c.diaDaSemana === 'quarta-feira')[0]?.items || []);
		setCronogramaQuinta(cronogramas.filter((c) => c.diaDaSemana === 'quinta-feira')[0]?.items || []);
		setCronogramaSexta(cronogramas.filter((c) => c.diaDaSemana === 'sexta-feira')[0]?.items || []);
	}, [cronogramas]);

	useEffect(() => {
		listarCronogramas();
	}, []);

  return (
    <section className="Exemplar">
      <div className="w-100">
        <h2 className="cronograma-titulo">Cronograma de Alunos Monitores</h2>

        <Button
          variant="info"
          className="btn-orange"
          onClick={handleShowCadastrar}
        >
          <FontAwesomeIcon icon={faPlus} /> Adicionar Monitor ao Cronograma
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
            <Modal.Title>Adicionar Monitor</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <CadastraAlunoMonitor formData={formDataCadastrarCronograma} onChange={handleChangeCadastrarCronograma} />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCadastrar}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleSubmitCadastrar}>
              <FontAwesomeIcon icon={faCheck} /> Salvar
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
                <div>
									{cronogramaSegunda?.map((cronograma) => (
										<div key={cronograma.id} className="balao-monitor">
											<div className="texto">{cronograma.alunoMonitor.nome}</div>
											<FontAwesomeIcon
												icon={faTrash}
												className="icone-lixo"
												onClick={() => handleShowExcluir(cronograma.id)}
											/>
										</div>
									))}
                </div>
              </td>
              <td className="text-center">
                <div>
									{cronogramaTerca?.map((cronograma) => (
										<div key={cronograma.id} className="balao-monitor">
											<div className="texto">{cronograma.alunoMonitor.nome}</div>
											<FontAwesomeIcon
												icon={faTrash}
												className="icone-lixo"
												onClick={() => handleShowExcluir(cronograma.id)}
											/>
										</div>
									))}
                </div>
              </td>
              <td className="text-center">
                <div>
									{cronogramaQuarta?.map((cronograma) => (
										<div key={cronograma.id} className="balao-monitor">
											<div className="texto">{cronograma.alunoMonitor.nome}</div>
											<FontAwesomeIcon
												icon={faTrash}
												className="icone-lixo"
												onClick={() => handleShowExcluir(cronograma.id)}
											/>
										</div>
									))}
                </div>
              </td>
              <td className="text-center">
                <div>
									{cronogramaQuinta?.map((cronograma) => (
										<div key={cronograma.id} className="balao-monitor">
											<div className="texto">{cronograma.alunoMonitor.nome}</div>
											<FontAwesomeIcon
												icon={faTrash}
												className="icone-lixo"
												onClick={() => handleShowExcluir(cronograma.id)}
											/>
										</div>
									))}
                </div>
              </td>
              <td className="text-center">
                <div>
									{cronogramaSexta?.map((cronograma) => (
										<div key={cronograma.id} className="balao-monitor">
											<div className="texto">{cronograma.alunoMonitor.nome}</div>
											<FontAwesomeIcon
												icon={faTrash}
												className="icone-lixo"
												onClick={() => handleShowExcluir(cronograma.id)}
											/>
										</div>
									))}
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
            <Button variant="danger" onClick={onDelete}>
              <FontAwesomeIcon icon={faTrash} /> Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
};

export default Cronograma;
