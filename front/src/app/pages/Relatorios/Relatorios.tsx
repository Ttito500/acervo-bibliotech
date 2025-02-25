import Accordion from "react-bootstrap/esm/Accordion";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faCheck, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import InputGroup from "react-bootstrap/esm/InputGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { showSuccess } from "./../../shared/components/success-toast/SuccessToast";
import { showError } from "./../../shared/components/error-toast/ErrorToast";
import { format } from "date-fns/format";

const Relatorios: React.FC = () => {
	const savePDF = async (url: string) => {
		try {
			await window.electron.savePdf(url);
			showSuccess('PDF exportado com sucesso! Confira nos seus Downloads.');
		} catch (error) {
			console.error('Erro ao baixar o PDF:', error);
			showError('Não foi possível exportar o PDF, tente novamente.')
		}
	}

	const dataUmMesAtras = new Date();
	dataUmMesAtras.setDate(dataUmMesAtras.getDate() - 30);

	const [dataAlunosInicial, setDataAlunosInicial] = useState<Date | null>(dataUmMesAtras);
	const [dataAlunosFim, setDataAlunosFim] = useState<Date | null>(new Date());
	const [qtdMaxAlunos, setQtdMaxAlunos] = useState<number>(10);

	const handleExportarAlunosMaisLeitores = async () => {
		const baseUrl = await window.electron.getStoreValue('baseUrl');
		const url = `${baseUrl}/alunos/mais-leitores/export/pdf?dataInicio=${format(dataAlunosInicial, "yyyy-MM-dd")}&dataFim=${format(dataAlunosFim, "yyyy-MM-dd")}&qtdMax=${qtdMaxAlunos}`;
		await savePDF(url);
	}

	const [dataTurmasInicial, setDataTurmasInicial] = useState<Date | null>(dataUmMesAtras);
	const [dataTurmasFim, setDataTurmasFim] = useState<Date | null>(new Date());
	const [qtdMaxTurmas, setQtdMaxTurmas] = useState<number>(10);

	const handleExportarTurmasMaisLeitoras = async () => {
		const baseUrl = await window.electron.getStoreValue('baseUrl');
		const url = `${baseUrl}/turmas/mais-leitoras/export/pdf?dataInicio=${format(dataTurmasInicial, "yyyy-MM-dd")}&dataFim=${format(dataTurmasFim, "yyyy-MM-dd")}&qtdMax=${qtdMaxTurmas}`;
		await savePDF(url);
	}

	const [dataLivrosInicial, setDataLivrosInicial] = useState<Date | null>(dataUmMesAtras);
	const [dataLivrosFim, setDataLivrosFim] = useState<Date | null>(new Date());
	const [qtdMaxLivros, setQtdMaxLivros] = useState<number>(10);

	const handleExportarLivrosMaisLidos = async () => {
		const baseUrl = await window.electron.getStoreValue('baseUrl');
		const url = `${baseUrl}/livros/relatorio/export/pdf?dataInicio=${format(dataLivrosInicial, "yyyy-MM-dd")}&dataFim=${format(dataLivrosFim, "yyyy-MM-dd")}&qtdMaxLivros=${qtdMaxLivros}`;
		await savePDF(url);
	}

	const handleExportarAcervo = async () => {
		const baseUrl = await window.electron.getStoreValue('baseUrl');
		const url = `${baseUrl}/livros/relatorio/acervo/export/pdf`;
		await savePDF(url);
	}

  return (
    <section className="Exemplar">
      <div className="accordion-container">
        <Accordion defaultActiveKey="0" className="accordion-relatorios">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="custon-accordion-header-cyan">
              Alunos Mais Leitores
            </Accordion.Header>
            <Accordion.Body className="accordion-body-expanded">
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formData" className="mb-3">
                    <Form.Label>
                      Data Inicial <span className="obgr">*</span>{" "}
                    </Form.Label>
                    <InputGroup>
                      <DatePicker
                        selected={dataAlunosInicial}
												onChange={(date: Date) => setDataAlunosInicial(date)}
												dateFormat="dd/MM/yyyy"
												placeholderText="Selecione a data"
												className="w-100"
                        customInput={
                          <InputGroup>
														<Form.Control
															type="text"
															placeholder="Selecione a data"
															readOnly
															value={format(dataAlunosInicial, "dd/MM/yyyy")}
															style={{ cursor: "pointer" }}
															className="no-border-radius-right"
														/>
														<InputGroup.Text className="btn-orange">
															<FontAwesomeIcon icon={faCalendarDay} />
														</InputGroup.Text>
													</InputGroup>
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formData" className="mb-3">
                    <Form.Label>
                      Data Final <span className="obgr">*</span>{" "}
                    </Form.Label>
                    <InputGroup>
										<DatePicker
											selected={dataAlunosFim}
											onChange={(date: Date) => setDataAlunosFim(date)}
											dateFormat="dd/MM/yyyy"
											placeholderText="Selecione a data"
											className="w-100"
											customInput={
												<InputGroup>
													<Form.Control
														type="text"
														placeholder="Selecione a data"
														readOnly
														value={format(dataAlunosFim, "dd/MM/yyyy")}
														style={{ cursor: "pointer" }}
														className="no-border-radius-right"
													/>
													<InputGroup.Text className="btn-orange">
														<FontAwesomeIcon icon={faCalendarDay} />
													</InputGroup.Text>
												</InputGroup>
											}
										/>
                    </InputGroup>
                  </Form.Group>
                </Col>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>
											Qtd. Máxima de Alunos
										</Form.Label>
										<Form.Control
											type="number"
											onChange={(e) => setQtdMaxAlunos(Number(e.target.value))}
											value={qtdMaxAlunos}
											placeholder="Digite a quantidade"
										/>
									</Form.Group>
								</Col>
              </Row>
              <p>
                Selecione a data inicial e final do período desejado para gerar
                um relatório com os 10 alunos mais leitores e exporte-o em
                formato PDF
              </p>

              <div className="d-flex justify-content-end">
                <Button variant="success" onClick={handleExportarAlunosMaisLeitores}>
                  <FontAwesomeIcon icon={faFileExport} /> Exportar Relatório
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="accordion-relatorios">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="custon-accordion-header-blue">
              Turmas Mais Leitoras
            </Accordion.Header>
            <Accordion.Body className="accordion-body-expanded">
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formData" className="mb-3">
                    <Form.Label>
                      Data Inicial <span className="obgr">*</span>{" "}
                    </Form.Label>
                    <InputGroup>
										<DatePicker
											selected={dataTurmasInicial}
											onChange={(date: Date) => setDataTurmasInicial(date)}
											dateFormat="dd/MM/yyyy"
											placeholderText="Selecione a data"
											className="w-100"
											customInput={
												<InputGroup>
													<Form.Control
														type="text"
														placeholder="Selecione a data"
														readOnly
														value={format(dataTurmasInicial, "dd/MM/yyyy")}
														style={{ cursor: "pointer" }}
														className="no-border-radius-right"
													/>
													<InputGroup.Text className="btn-orange">
														<FontAwesomeIcon icon={faCalendarDay} />
													</InputGroup.Text>
												</InputGroup>
											}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formData" className="mb-3">
                    <Form.Label>
                      Data Final <span className="obgr">*</span>{" "}
                    </Form.Label>
                    <InputGroup>
										<DatePicker
											selected={dataTurmasFim}
											onChange={(date: Date) => setDataTurmasFim(date)}
											dateFormat="dd/MM/yyyy"
											placeholderText="Selecione a data"
											className="w-100"
											customInput={
												<InputGroup>
													<Form.Control
														type="text"
														placeholder="Selecione a data"
														readOnly
														value={format(dataTurmasFim, "dd/MM/yyyy")}
														style={{ cursor: "pointer" }}
														className="no-border-radius-right"
													/>
													<InputGroup.Text className="btn-orange">
														<FontAwesomeIcon icon={faCalendarDay} />
													</InputGroup.Text>
												</InputGroup>
											}
										/>
                    </InputGroup>
                  </Form.Group>
                </Col>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>
											Qtd. Máxima de Turmas
										</Form.Label>
										<Form.Control
											type="number"
											onChange={(e) => setQtdMaxTurmas(Number(e.target.value))}
											placeholder="Digite a quantidade"
											value={qtdMaxTurmas}
										/>
									</Form.Group>
								</Col>
              </Row>
              <p>
                Selecione a data inicial e final do período desejado para gerar
                um relatório com as turmas mais leitoras e exporte-o em formato
                PDF.
              </p>

              <div className="d-flex justify-content-end">
                <Button variant="success" onClick={handleExportarTurmasMaisLeitoras}>
                  <FontAwesomeIcon icon={faFileExport} /> Exportar Relatório
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="accordion-container">
        <Accordion defaultActiveKey="0" className="accordion-relatorios">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="custon-accordion-header-yellow">
              Livros Mais Lidos
            </Accordion.Header>
            <Accordion.Body className="accordion-body-expanded">
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formData" className="mb-3">
                    <Form.Label>
                      Data Inicial <span className="obgr">*</span>{" "}
                    </Form.Label>
                    <InputGroup>
											<DatePicker
												selected={dataLivrosInicial}
												onChange={(date: Date) => setDataLivrosInicial(date)}
												dateFormat="dd/MM/yyyy"
												placeholderText="Selecione a data"
												className="w-100"
												customInput={
													<InputGroup>
														<Form.Control
															type="text"
															placeholder="Selecione a data"
															readOnly
															value={format(dataLivrosInicial, "dd/MM/yyyy")}
															style={{ cursor: "pointer" }}
															className="no-border-radius-right"
														/>
														<InputGroup.Text className="btn-orange">
															<FontAwesomeIcon icon={faCalendarDay} />
														</InputGroup.Text>
													</InputGroup>
												}
											/>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formData" className="mb-3">
                    <Form.Label>
                      Data Final <span className="obgr">*</span>{" "}
                    </Form.Label>
                    <InputGroup>
										<DatePicker
											selected={dataLivrosFim}
											onChange={(date: Date) => setDataLivrosFim(date)}
											dateFormat="dd/MM/yyyy"
											placeholderText="Selecione a data"
											className="w-100"
											customInput={
												<InputGroup>
													<Form.Control
														type="text"
														placeholder="Selecione a data"
														readOnly
														value={format(dataLivrosFim, "dd/MM/yyyy")}
														style={{ cursor: "pointer" }}
														className="no-border-radius-right"
													/>
													<InputGroup.Text className="btn-orange">
														<FontAwesomeIcon icon={faCalendarDay} />
													</InputGroup.Text>
												</InputGroup>
											}
										/>
                    </InputGroup>
                  </Form.Group>
                </Col>
								<Col>
									<Form.Group className="mb-3">
										<Form.Label>
											Qtd. Máxima de Livros
										</Form.Label>
										<Form.Control
											type="number"
											onChange={(e) => setQtdMaxLivros(Number(e.target.value))}
											placeholder="Digite a quantidade"
											value={qtdMaxLivros}
										/>
									</Form.Group>
								</Col>
              </Row>
              <p>
                Selecione a data inicial e final do período desejado para gerar
                um relatório com os livros mais lidos e exporte-o em formato
                PDF.
              </p>

              <div className="d-flex justify-content-end">
                <Button variant="success" onClick={handleExportarLivrosMaisLidos}>
                  <FontAwesomeIcon icon={faFileExport} /> Exportar Relatório
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="accordion-relatorios">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="custon-accordion-header-orange">
              Relatório Geral do Acervo
            </Accordion.Header>
            <Accordion.Body className="accordion-body-expanded">
              <p>
                Selecione a data inicial e final do período desejado para gerar
                um relatório com as informações do acervo.
              </p>

              <div className="d-flex justify-content-end">
                <Button variant="success" onClick={handleExportarAcervo}>
                  <FontAwesomeIcon icon={faFileExport} /> Exportar Relatório
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </section>
  );
};

export default Relatorios;
