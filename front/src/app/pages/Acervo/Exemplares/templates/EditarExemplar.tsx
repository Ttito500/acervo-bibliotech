import React, { ChangeEvent, useEffect, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { UpdateExemplarRequest } from "./../../../../interfaces/exemplar";
import { getSecoes } from "./../../../../api/SecoesApi";
import { getEstantePrateleirasPorSecao } from "./../../../../api/EstantePrateleiraApi";
import { GetEstantePrateleiraResponse } from "./../../../../interfaces/estante-prateleira";
import { GetSecaoResponse } from "./../../../../interfaces/secao";

interface EditarExemplarProps {
  formData: UpdateExemplarRequest;
  onChange: (e: ChangeEvent<any>) => void;
}

const EditarExemplar: React.FC<EditarExemplarProps> = ({ formData, onChange }) => {

	const [secoes, setSecoes] = useState<GetSecaoResponse[]>([]);
		const [selectedSecao, setSelectedSecao] = useState<string>('');
	
	const listarSecoes = async (): Promise<void> => {
		try {
			const data = await getSecoes();
			setSecoes(data);
		} catch(err) {
			console.log(err)
		}
	};

	const [estantesPrateleiras, setEstantesPrateleiras] = useState<GetEstantePrateleiraResponse[]>([]);

	const listarEstantePrateleirasPorSecao = async (idSecao: number): Promise<void> => {
		try {
			const data = await getEstantePrateleirasPorSecao(idSecao);
			setEstantesPrateleiras(data);
		} catch(err) {
			console.log(err)
		}
	};

	useEffect(() => {
		if(selectedSecao) listarEstantePrateleirasPorSecao(Number(selectedSecao));
	}, [selectedSecao]);

	useEffect(() => {
		listarSecoes();
		listarEstantePrateleirasPorSecao(formData.idSecao);
	}, []);

  return (
    <Form>
      <Row>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>
							Seção <span className="obgr">*</span>
						</Form.Label>
						<Form.Select
							aria-label="Selecione uma Seção"
							name="idSecao"
							value={formData.idSecao}
							onChange={(e) => {onChange(e); setSelectedSecao(e.target.value)}}
							required
						>
							<option value="">Selecione</option>
							{secoes?.map((secao) => (
								<option key={secao.id} value={secao.id}>
									{secao.nome}
								</option>
							))}
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							Campo obrigatório.
						</Form.Control.Feedback>
					</Form.Group>
				</Col>

        <Col>
					<Form.Group className="mb-3">
						<Form.Label>
							Estante e Prateleira<span className="obgr">*</span>
						</Form.Label>
						<Form.Select
							aria-label="Selecione uma prateleira de uma estante"
							name="idEstantePrateleira"
							value={formData.idEstantePrateleira}
							onChange={onChange}
							required
						>
							<option value="">Selecione</option>
							{estantesPrateleiras?.map((estantePrateleira) => (
								<option key={estantePrateleira.id} value={estantePrateleira.id}>
									Estante {estantePrateleira.estante} / Prateleira {estantePrateleira.prateleira}
								</option>
							))}
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							Campo obrigatório.
						</Form.Control.Feedback>
					</Form.Group>
				</Col>

        <Col xs={3}>
          <Form.Group className="mb-3">
            <Form.Label>Situação</Form.Label>
            <Form.Select
							name="situacao"
              value={formData.situacao}
              onChange={onChange}
              required
						>
              <option value="">Selecione</option>
              <option value="disponivel">Disponível</option>
              <option value="emprestado">Emprestado</option>
              <option value="extraviado">Extraviado</option>
            </Form.Select>
						<Form.Control.Feedback type="invalid">
							Campo obrigatório.
						</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Observação</Form.Label>
            <Form.Control 
							type="text" 
							placeholder="Digite uma observação"
							name="observacao"
              value={formData.observacao}
              onChange={onChange}
              required
						/>
						<Form.Control.Feedback type="invalid">
							Campo obrigatório.
						</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default EditarExemplar;
