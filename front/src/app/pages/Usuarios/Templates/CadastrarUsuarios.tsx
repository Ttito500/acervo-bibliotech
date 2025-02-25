import React, { ChangeEvent } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { CreateUsuarioRequest } from "./../../../interfaces/usuario";

interface CadastrarUsuarioProps {
	formData: CreateUsuarioRequest
	onChange: (e: ChangeEvent<any>) => void;
}

const CadastrarUsuarios: React.FC<CadastrarUsuarioProps> = ({ formData, onChange }) => {
  return (
    <Form>
      <Row>
        <Col xs={3}>
          <Form.Group className="mb-3">
            <Form.Label>
              Cargo <span className="obgr">*</span>
            </Form.Label>
            <Form.Select 
							aria-label="Selecione" 
							name="cargo"
							value={formData.cargo}
							onChange={onChange}
							required
						>
              <option value="">Selecione</option>
              <option value="aluno_monitor">Aluno Monitor</option>
              <option value="bibliotecario">Bibliotecária(o)</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={9}>
          <Form.Group className="mb-3">
            <Form.Label>
              Nome <span className="obgr">*</span>
            </Form.Label>
            <Form.Control 
							type="text" 
							placeholder="Digite o nome" 
							name="nome"
							value={formData.nome}
							onChange={onChange}
							required
						/>
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
							value={formData.email}
							onChange={onChange}
							required
						/>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Senha <span className="obgr">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite a senha"
              name="senha"
							value={formData.senha}
							onChange={onChange}
							required
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default CadastrarUsuarios;
