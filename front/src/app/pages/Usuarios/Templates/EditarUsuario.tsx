import React, { ChangeEvent } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { UpdateUsuarioRequest } from "./../../../interfaces/usuario";

interface EditarUsuarioProps {
	formData: UpdateUsuarioRequest
	onChange: (e: ChangeEvent<any>) => void;
}

const EditarUsuario: React.FC<EditarUsuarioProps> = ({ formData, onChange }) => {
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
            <Form.Label>Nome</Form.Label>
            <Form.Control 
							type="text" 
							placeholder="Nome do Usuário" 
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email do usuario"
              name="email"
							value={formData.email}
							onChange={onChange}
							required
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nova Senha (Opcional)</Form.Label>
            <Form.Control 
							type="password" 
							placeholder="*********" 
              value={formData.senha}
							name="senha"
							onChange={onChange}
						/>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default EditarUsuario;
