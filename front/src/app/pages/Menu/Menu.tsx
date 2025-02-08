import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
      <>
        <Navbar className="bg-green navbar">
          <Container>
          <span className="navbar-brand-bibliotech">
            Acervo Bibliotech
          </span>
          <Nav className="me-auto">
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
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
