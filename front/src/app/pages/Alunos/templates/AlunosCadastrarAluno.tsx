import React, { ChangeEvent, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { GetTurmaResponse, TurmaFiltros } from "./../../../interfaces/turma";
import { getTurmas } from "./../../../api/TurmaApi";

interface AlunosCadastrarAlunoProps {
  formData: {
    nome: string;
    telefone: string;
    email: string;
    idTurma: number;
  };
  onChange: (e: ChangeEvent<any>) => void;
}

const AlunosCadastrarAluno: React.FC<AlunosCadastrarAlunoProps> = ({ formData, onChange }) => {

  const [turmas, setTurmas] = useState<GetTurmaResponse[]>([]);

  useEffect(() => {
    listarTurmas();
  }, []);
  
  const listarTurmas = async (): Promise<void> => {
    const filtros: TurmaFiltros = {
      ativo: true
    }

    try {
      const data = await getTurmas(filtros);
      setTurmas(data);
		} catch(err) {
			console.log(err)
		}
    
  };

  return (
    <>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>
                Série / Turma <span className="obgr">*</span>
              </Form.Label>

              <Form.Select
                aria-label="Selecione uma série e turma"
                name="idTurma"
                value={formData.idTurma}
                onChange={onChange}
                required
              >
                <option value="">Selecione</option>
                {turmas?.map((turma) => (
                  <option key={turma.id} value={turma.id}>
                    Série: {turma.serie}ª / Turma: {turma.turma} / Ano de Entrada: {turma.anoDeEntrada}
                  </option>
                ))}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                Campo obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Nome <span className="obgr">*</span>
              </Form.Label>

              <Form.Control 
                type="text" 
                placeholder="Digite o nome" 
                name="nome" 
                value={formData.nome} 
                required
                onChange={onChange} />

              <Form.Control.Feedback type="invalid">
                Campo obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Email <span className="obgr">*</span>
              </Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Digite o email" 
                name="email" 
                required
                value={formData.email} 
                onChange={onChange} 
              />

            <Form.Control.Feedback type="invalid">
                Campo obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Telefone
              </Form.Label>
              
              <Form.Control 
                type="text" 
                placeholder="Digite o telefone" 
                name="telefone" 
                value={formData.telefone} 
                onChange={onChange} 
              />
            </Form.Group>
          </Col>

          <Col></Col>
        </Row>
      </Form>
    </>
    
  );
};

export default AlunosCadastrarAluno;
