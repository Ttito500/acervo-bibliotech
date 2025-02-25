import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { decodeToken, JwtPayload } from "./../../../shared/auth/auth";

const Perfil: React.FC = () => {

	const [token, setToken] = useState<JwtPayload>(null);

	const getToken = async () => {
		const storedToken = await window.electron.getStoreValue('token');
		if (storedToken) {
			const decodedToken = decodeToken(storedToken);
			setToken(decodedToken);
		}
	}

	useEffect(() => {
		getToken();
	}, [])

  return (
    <Form>
      <Row>
        <Col xs={10}>
          <Form.Group className="mb-0">
            <Form.Label>
              <strong>Nome:</strong> {token.nome}
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-0">
            <Form.Label>
              <strong>Email:</strong> {token.sub}
            </Form.Label>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Perfil;
