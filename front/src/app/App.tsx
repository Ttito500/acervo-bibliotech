import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Acervo from "./pages/Acervo/Acervo";
import Emprestimos from "./pages/Emprestimos/Emprestimos";
import Alunos from "./pages/Alunos/Alunos";
import Secoes from "./pages/Secoes/Secoes";
import Menu from "./pages/Menu/Menu";
import Estantes from "./pages/Estantes/Estantes";
import Inicio from "./pages/Inicio/Inicio";

const App: React.FC = () => {
  return (
    <Router>
      <Menu />
      <div className="w-100">
        <Routes>
          <Route path="/" />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/acervo" element={<Acervo />} />
          <Route path="/emprestimos" element={<Emprestimos />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/secoes" element={<Secoes />} />
          <Route path="/estantes" element={<Estantes />} />
          <Route path="/relatorios" />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
