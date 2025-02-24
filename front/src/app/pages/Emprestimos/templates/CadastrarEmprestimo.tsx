import React, { ChangeEvent, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { getExemplares, getLivros } from "./../../../api/AcervoApi";
import { GetLivroResponse, LivroFiltros } from "./../../../interfaces/acervo";
import ListGroup from "react-bootstrap/ListGroup";
import { GetExemplarResponse } from "./../../../interfaces/exemplar";
import { AlunoFiltros, GetAlunoResponse } from "./../../../interfaces/aluno";
import { getAlunos } from "./../../../api/AlunosApi";
import Button from "react-bootstrap/esm/Button";
import { InputGroup } from "react-bootstrap/esm";

interface CadastrarEmprestimoProps {
  formData: {
    idAluno: number;
    idExemplar: number;
    idUsuario: number;
    observacao: string;
  };
  onChange: (e: ChangeEvent<any>) => void;
}

const CadastrarEmprestimo: React.FC<CadastrarEmprestimoProps> = ({ formData, onChange }) => {

  const [tituloLivro, setTituloLivro] = useState('');
  const [queryLivro, setQueryLivro] = useState('');
  const [suggestionsLivros, setSuggestionsLivros] = useState<GetLivroResponse[]>([]);
  const [selectedLivroId, setSelectedLivroId] = useState<number | null>(null);

  const [nomeAluno, setNomeAluno] = useState('');
  const [queryAluno, setQueryAluno] = useState('');
  const [suggestionsAlunos, setSuggestionsAlunos] = useState<GetAlunoResponse[]>([]);
  const [selectedAlunoId, setSelectedAlunoId] = useState<number | null>(null);

  const [exemplares, setExemplares] = useState<GetExemplarResponse[]>([]);

  const [serie, setSerie] = useState<number>(null);
  const [turma, setTurma] = useState<string>('');
  const [prazoCalculado, setPrazoCalculado] = useState<string>('');

  const handleChangeSerie = (e: ChangeEvent<any>): void => {
    const { value } = e.target;
    if(value) {
      setSerie(Number(value))
    } else {
      setSerie(null)
    }
  };

  const handleChangeTurma = (e: ChangeEvent<any>): void => {
    const { value } = e.target;
    setTurma(value)

  };

  useEffect(() => {
    const dataAtual = new Date();

    dataAtual.setDate(dataAtual.getDate() + 7);

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;
    setPrazoCalculado(dataFormatada)
  }, []);

  useEffect(() => {
    const listarLivros = async () => {
      if (queryLivro.length > 2) {
        try {
          const filtros: LivroFiltros = {
            titulo: queryLivro
          }
          const response = await getLivros(filtros)
          setSuggestionsLivros(response.content);
        } catch (error) {
          console.error('Erro ao buscar livros:', error);
        }
      } else {
        setSuggestionsLivros([]);
      }
    };

    listarLivros();
  }, [queryLivro]);

  const handleSelectLivro = (livro: GetLivroResponse) => {
    setTituloLivro(livro.titulo);
    setSelectedLivroId(livro.id);
    setSuggestionsLivros([]);
  };

  useEffect(() => {
    const listarExemplares = async () => {
      if(selectedLivroId) {
        try {
          const response = await getExemplares(selectedLivroId)
          const responseFilter = response.filter((exemplar) => exemplar.situacao === 'disponivel')
          setExemplares(responseFilter)
        } catch (error) {
          console.error('Erro ao buscar livros:', error);
        }
      }
    };

    listarExemplares();
  }, [selectedLivroId]);

  useEffect(() => {
    const listarAlunos = async () => {
      if (queryAluno.length > 2) {
        try {
          const filtros: AlunoFiltros = {
            nome: queryAluno,
            turma: turma,
            serie: serie,
            ativo: true
          }
          const response = await getAlunos(filtros)
          setSuggestionsAlunos(response.content);
        } catch (error) {
          console.error('Erro ao buscar alunos:', error);
        }
      } else {
        setSuggestionsAlunos([]);
      }
    };

    listarAlunos();
  }, [queryAluno]);

  useEffect(() => {
    formData.idAluno = selectedAlunoId;
    const e: any = { target: { name: 'idAluno', value: selectedAlunoId } }
    onChange(e)
  }, [selectedAlunoId]);

  const handleSelectAluno = (aluno: GetAlunoResponse) => {
    setNomeAluno(aluno.nome);
    setSelectedAlunoId(aluno.id);
    setSuggestionsAlunos([]);
  };

  const handleClearSelectionLivro = () => {
    setSelectedLivroId(null);
    setQueryLivro('');
    setTituloLivro('');
  };

  const handleClearSelectionAluno = () => {
    setSelectedAlunoId(null);
    setQueryAluno('');
    setNomeAluno('');
  };

  return (
    <>
      <Form>
        <Row>
          <Col xs={8}>
            <Form.Group className="mb-3">
              <Form.Label>
                Livro <span className="obgr">*</span>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Digite o título do livro"
                  value={tituloLivro}
                  onChange={(e) => {
                    setQueryLivro(e.target.value);
                    setTituloLivro(e.target.value);
                    setSelectedLivroId(null);
                  }}
                  required
                  readOnly={!!selectedLivroId}
                  style={{
                    backgroundColor: selectedLivroId ? '#e9ecef' : 'white',
                    cursor: selectedLivroId ? 'not-allowed' : 'text',
                  }}
                />
                  {selectedLivroId && (
                    <Button variant="outline-secondary" onClick={handleClearSelectionLivro}>
                      Limpar
                    </Button>
                  )}
                  <Form.Control.Feedback type="invalid">
                    Campo obrigatório.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              {suggestionsLivros.length > 0 && (
                <ListGroup style={{
                  position: 'absolute',
                  zIndex: 1000,
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}>
                  {suggestionsLivros?.map((livro) => (
                    <ListGroup.Item action style={{cursor: 'pointer'}} key={livro.id} onClick={() => handleSelectLivro(livro)}>
                      {livro.titulo}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
          </Col>

          <Col xs={4}>
            <Form.Group className="mb-3">
              <Form.Label>
                Exemplares disponíveis <span className="obgr">*</span>
              </Form.Label>
              <Form.Select
                aria-label="Selecione"
                name="idExemplar"
                value={formData.idExemplar}
                onChange={onChange}
                required
              >
                <option value="">Selecione</option>
                {exemplares?.map((exemplar) => (
                  <option key={exemplar.id} value={exemplar.id}>
                    Número: {exemplar.numero}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Campo obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={2}>
            <Form.Group className="mb-3">
              <Form.Label>
                Série <span className="obgr">*</span>
              </Form.Label>
              <Form.Select 
                aria-label="Selecione"
                onChange={handleChangeSerie}
                required
              >
                <option>Selecione</option>
                <option value="1">1ª</option>
                <option value="2">2ª</option>
                <option value="3">3ª</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Campo obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={2}>
            <Form.Group className="mb-3">
              <Form.Label>
                Turma <span className="obgr">*</span>
              </Form.Label>
              <Form.Select 
                aria-label="Selecionar"
                onChange={handleChangeTurma}
                required
              >
                <option>Selecione</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Campo obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={8}>
            <Form.Group className="mb-3">
              <Form.Label>
                Selecionar Aluno <span className="obgr">*</span>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do aluno"
                  value={nomeAluno}
                  onChange={(e) => {
                    setNomeAluno(e.target.value);
                    setQueryAluno(e.target.value);
                    setSelectedAlunoId(null);
                  }}
                  required
                  readOnly={!!selectedAlunoId}
                  style={{
                    backgroundColor: selectedAlunoId ? '#e9ecef' : 'white',
                    cursor: selectedAlunoId ? 'not-allowed' : 'text',
                  }}
                />
                  {selectedAlunoId && (
                    <Button variant="outline-secondary" onClick={handleClearSelectionAluno}>
                      Limpar
                    </Button>
                  )}
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                Campo obrigatório.
              </Form.Control.Feedback>       
            </Form.Group>
            {suggestionsAlunos.length > 0 && (
              <ListGroup style={{
                position: 'absolute',
                zIndex: 1000,
                maxHeight: '200px',
                overflowY: 'auto',
              }}>
                {suggestionsAlunos?.map((aluno) => (
                  <ListGroup.Item style={{cursor: 'pointer'}} key={aluno.id} onClick={() => handleSelectAluno(aluno)}>
                    {aluno.nome}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>Observação</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="Digite uma observação (opcional)"
                name="observacao" 
                value={formData.observacao} 
                onChange={onChange} 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Prazo Calculado Para Devolução: <b>{prazoCalculado}</b>
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CadastrarEmprestimo;
