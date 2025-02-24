import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import Badge from "react-bootstrap/esm/Badge";
import React, { ChangeEvent, useEffect, useState } from "react";
import Pagination from "react-bootstrap/esm/Pagination";
import { ResponsePagination } from "./../../../interfaces/pagination";
import FormatDate from "./../../../shared/components/format-date/FormatDate";
import { format } from "date-fns/format";
import { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import { GetLivroResponse } from "./../../../interfaces/acervo";
import { EmprestimosPorLivroFiltros, GetEmprestimoPorLivroResponse } from "./../../../interfaces/emprestimo";
import { getEmprestimosPorLivro } from "./../../../api/EmprestimoApi";

registerLocale('ptBR', ptBR);

interface LivroEmprestimosProps {
	livro: GetLivroResponse;
}

const EmprestimosLivro: React.FC<LivroEmprestimosProps> = ({ livro }) => {

	const [periodo, setPeriodo] = useState<string>('30_dias');
	const [emprestimos, setEmprestimos] = useState<ResponsePagination<GetEmprestimoPorLivroResponse>>();

	const onChange = (e: ChangeEvent<any>): void => {
		const { value } = e.target;
		setPeriodo(value);
	};

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const sizePage = 10;

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		listarEmprestimosPorLivro();
	}, [currentPage]);

	useEffect(() => {
		listarEmprestimosPorLivro();
	}, [periodo]);

	const listarEmprestimosPorLivro = async (): Promise<void> => {
		let dataInicio = new Date();
		let dataFim = new Date();
		let dataInicioStr = '';
		let dataFimStr = '';
		
		switch (periodo) {
			case '30_dias':
				dataInicio.setDate(dataInicio.getDate() - 30);
				break;
			case '60_dias':
				dataInicio.setDate(dataInicio.getDate() - 60);
				break;
			case '90_dias':
				dataInicio.setDate(dataInicio.getDate() - 90);
				break;
			case 'neste_ano':
				dataInicio = new Date(dataInicio.getFullYear(), 0, 1);
				dataFim = new Date(dataFim.getFullYear(), 11, 31);
				break;
			default:
				break;
		}

		dataInicioStr = format(dataInicio, "yyyy-MM-dd");
		dataFimStr = format(dataFim, "yyyy-MM-dd");

		const filtros: EmprestimosPorLivroFiltros = {
			dataEmprestimoInicio: dataInicioStr,
			dataEmprestimoFim: dataFimStr,
			page: (currentPage - 1),
			size: sizePage
		}

		try {
			const data = await getEmprestimosPorLivro(livro.id, filtros);
			setEmprestimos(data);
			setTotalPages(data.totalPages);
		} catch(err) {
			console.log(err)
		}
	};

  return (
    <section className="Exemplar">
      <div>
        <Form className="mt-0">
          <Row>
					<Col xs={3}>
              <Form.Group className="mb-3">
                <Form.Label>Data do Empréstimo</Form.Label>
                <Form.Select
                  aria-label="Selecione"
                  required
                  className="custom-placeholder"
									value={periodo}
                  onChange={onChange}
                >
                  <option value="30_dias">Últimos 30 dias</option>
                  <option value="60_dias">Últimos 60 dias</option>
                  <option value="90_dias">Últimos 90 dias</option>
									<option value="neste_ano">Neste ano</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="w-100 list-scroll mt-0">
        <Table striped className="tabela">
          <thead>
            <tr>
              <th className="th-center-size-eight">Exemplar</th>
              <th>Aluno</th>
              <th className="th-center-size-eight">Série</th>
              <th className="th-center-size-eight">Turma</th>
              <th className="th-center-size-eighteen">Data de Empréstimo</th>
							<th className="th-center-size-twelve">Data Entrega</th>
							<th className="th-center-size-twelve">Status da Entrega</th>
            </tr>
          </thead>
          <tbody>
						{emprestimos?.content.map((emprestimo) => (
							<tr key={emprestimo.id} className="tabela-tr">
								<td className="text-center">{emprestimo.numeroExemplar}</td>
								<td>{emprestimo.nomeAluno}</td>
								<td className="text-center">{emprestimo.serieAluno}ª</td>
								<td className="text-center">{emprestimo.turmaAluno}</td>
								<td className="text-center"><FormatDate dateString={emprestimo.dataEmprestimo} /></td>
								<td className="text-center"><FormatDate dateString={emprestimo.dataConclusao} /></td>
								<td className="text-center">

									{emprestimo.situacao == 'entregue' &&
										<Badge className="bibliotech-badge" bg="success">
											Entregue
										</Badge>
									}
									{emprestimo.situacao == 'pendente' &&
										<Badge className="bibliotech-badge" bg="info">
											Pendente
										</Badge>
									}
									{emprestimo.situacao == 'atrasado' &&
										<Badge className="bibliotech-badge" bg="warning">
											Atrasado
										</Badge>
									}
									{emprestimo.situacao == 'cancelado' &&
										<Badge className="bibliotech-badge" bg="danger">
											Cancelado
										</Badge>
									}
									{emprestimo.situacao == 'extraviado' &&
										<Badge className="bibliotech-badge" bg="danger">
											Extraviado
										</Badge>
									}
									
								</td>
							</tr>
						))}
          </tbody>
        </Table>

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

export default EmprestimosLivro;
