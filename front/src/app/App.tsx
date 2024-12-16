import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Acervo from "./pages/Acervo/Acervo";
import Alunos from "./pages/Alunos/Alunos";
import Menu from "./pages/Menu/Menu";

const App: React.FC = () => {
  return (
    <Router>
      <Menu />
      <div className="w-100">
        <Routes>
          <Route path="/" />
          <Route path="/acervo" element={<Acervo />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/relatorios" />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
