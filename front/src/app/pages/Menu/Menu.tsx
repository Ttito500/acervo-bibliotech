import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from 'react-router-dom';
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, faCircleUser} from "@fortawesome/free-solid-svg-icons";
import Perfil from "./templates/Perfil";
import { decodeToken, JwtPayload } from "./../../shared/auth/auth";

const Menu: React.FC = () => {

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

  const [showPerfil, setShowPerfil] = useState(false);
  const handleClosePerfil = () => setShowPerfil(false);
  const handleShowPerfil = () => setShowPerfil(true);

  const handleSair = () => {
    window.electron.sairDoAplicativo();
  };

  return (
      <>
        <Navbar className="bg-green navbar">
          <Container>
          <span className="navbar-brand-bibliotech">
            Acervo Bibliotech
          </span>
          <Nav className="me-auto navbar-nav-custom">
            <Nav.Link as={NavLink} to="/inicio" className="navbar-link color-white">
              Início
            </Nav.Link>
            <Nav.Link as={NavLink} to="/acervo" className="navbar-link color-white">
              Acervo
            </Nav.Link>
            <Nav.Link as={NavLink} to="/emprestimos" className="navbar-link color-white">
              Empréstimos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/alunos" className="navbar-link color-white">
              Turmas e Alunos
            </Nav.Link>
            { token?.cargo === 'bibliotecario' &&
              <>
                <Nav.Link as={NavLink} to="/secoes" className="navbar-link color-white">
                  Seções
                </Nav.Link>
                <Nav.Link as={NavLink} to="/estantes" className="navbar-link color-white">
                  Estantes
                </Nav.Link>
                <Nav.Link as={NavLink} to="/cronograma" className="navbar-link color-white">
                  Cronograma
                </Nav.Link>
                <Nav.Link as={NavLink} to="/usuarios" className="navbar-link color-white">
                  Usuários
                </Nav.Link>
                <Nav.Link as={NavLink} to="/relatorios" className="navbar-link color-white">
                  Relatórios
                </Nav.Link>
              </>
            }
          </Nav>
            <div
                onClick={handleShowPerfil}
                style={{
                  cursor: "pointer",
                  fontSize: "1.75rem",
                  position: "absolute",
                  right: "20px",
                  color: "white",
                  backgroundColor: "#75B798",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
            >
              <FontAwesomeIcon icon={faCircleUser}/>
            </div>
          </Container>
        </Navbar>

        <Modal
          show={showPerfil}
          onHide={handleClosePerfil}
          size="lg"
          backdrop="static"
          centered
          keyboard={false}
          className="Modais-Confirmacao-Custon"
        >
          <Modal.Header closeButton>
            <Modal.Title>Perfil</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Perfil />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePerfil}>
              Voltar
            </Button>
            <Button variant="danger" onClick={handleSair}>
              <FontAwesomeIcon icon={faRightFromBracket} /> Sair
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};

export default Menu;
