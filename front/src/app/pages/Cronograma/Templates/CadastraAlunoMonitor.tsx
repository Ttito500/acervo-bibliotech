import React, { ChangeEvent, useEffect, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { CreateCronogramaRequest } from "./../../../interfaces/cronograma";
import { GetMonitorResponse } from "./../../../interfaces/monitor";
import { getMonitores } from "./../../../api/MonitorApi";

interface CadastrarCronogramaProps {
	formData: CreateCronogramaRequest
	onChange: (e: ChangeEvent<any>) => void;
}

const CadastraAlunoMonitor: React.FC<CadastrarCronogramaProps> = ({ formData, onChange }) => {
	const [monitores, setMonitores] = useState<GetMonitorResponse[]>([]);

	const listarMonitores = async (): Promise<void> => {
		try {
			const data = await getMonitores();
			setMonitores(data);
		} catch(err) {
			console.log(err)
		}
	};

	useEffect(() => {
		listarMonitores();
	}, []);

  return (
    <Form>
      <Row>
        <Col xs={3}>
          <Form.Group className="mb-3">
            <Form.Label>
              Dia da Semana <span className="obgr">*</span>
            </Form.Label>
            <Form.Select 
							aria-label="Selecione" 
							name="diaDaSemana"
							value={formData.diaDaSemana}
							onChange={onChange}
							required
						>
              <option value="">Selecione</option>
              <option value="segunda-feira">Segunda-feira</option>
              <option value="terca-feira">Terça-feira</option>
              <option value="quarta-feira">Quarta-feira</option>
              <option value="quinta-feira">Quinta-feira</option>
              <option value="sexta-feira">Sexta-feira</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={9}>
          <Form.Group className="mb-3">
            <Form.Label>
              Selecionar Monitor <span className="obgr">*</span>
            </Form.Label>
            <Form.Select 
							aria-label="Selecione" 
							name="idAlunoMonitor"
							value={formData.idAlunoMonitor}
							onChange={onChange}
							required
						>
              <option value="">Selecione</option>
							{monitores?.map((monitor) => (
								<option key={monitor.id} value={monitor.id}>
									{ monitor.nome }
								</option>
							))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default CadastraAlunoMonitor;
