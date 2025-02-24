import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Acervo from "./pages/Acervo/Acervo";
import Emprestimos from "./pages/Emprestimos/Emprestimos";
import Alunos from "./pages/Alunos/Alunos";
import Secoes from "./pages/Secoes/Secoes";
import Menu from "./pages/Menu/Menu";
import Estantes from "./pages/Estantes/Estantes";
import Inicio from "./pages/Inicio/Inicio";
import Usuarios from "./pages/Usuarios/Usuarios";
import Login from "./pages/Autenticacao/Login";
import ProgressBar from "react-bootstrap/ProgressBar";
import { deleteAutoresSemAssociacao } from "./api/AutorApi";
import { deleteGeneroesSemAssociacao } from "./api/GeneroApi";
import { notificarAtrasos } from "./api/EmprestimoApi";
import Cronograma from "./pages/Cronograma/Cronograma";
import LoadingBar from "./shared/components/loading-bar/LoadingBar";
import ErrorToast from "./shared/components/error-toast/ErrorToast";

const App: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, senha: string) => {
    // temporario
    setIsAuthenticated(true);
    return

    if (email === "adelino@email.com" && senha === "cunha") {
      setIsAuthenticated(true);
    } else {
      alert("Credenciais incorretas");
    }
  };

  const [loading, setLoading] = useState(true);
  const [falhou, setFalhou] = useState(false);
  const [progress, setProgress] = useState(0);
  const [taskSelected, setTaskSelected] = useState("");

  const tasks = [
    { id: 1, name: 'Carregando recursos...'  },
    { id: 2, name: 'Conectando ao servidor...' },
    { id: 3, name: 'Organizando a base de dados...' },
    { id: 4, name: 'Notificando atrasos...' }
  ]

  const performRequest = async (taskId: number) => {
    switch (taskId) {
      case 1:
        await new Promise(resolve => setTimeout(resolve, 1000));
        break;
      case 2:
        await new Promise(resolve => setTimeout(resolve, 1400));
        break;
      case 3:
        await new Promise(resolve => setTimeout(resolve, 1200));
        try {
          await deleteAutoresSemAssociacao();
          await deleteGeneroesSemAssociacao()
        } catch(err) {
          console.log(err)
        }
        break;
      case 4:
        await new Promise(resolve => setTimeout(resolve, 1200));
        try {
          await notificarAtrasos()
        } catch(err) {
          console.log(err)
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const totalTasks = tasks.length;
    let completedTasks = 0;

    const loadTasks = async () => {
      for (const task of tasks) {
        setTaskSelected(task.name)

        try {
          await performRequest(task.id);
          completedTasks += 1;
          setProgress((completedTasks / totalTasks) * 100);
        } catch (error) {
          setLoading(false);
          setFalhou(true);
        }
      }

      setTaskSelected("")
      setLoading(false);
    };

    loadTasks();
  }, []);

  if(loading) {
    return (
      <>
        <div className="screen-loader">
          <h1 style={{color: '#fff'}}>Inicializando o Acervo BiblioTech</h1>
          <img src='static://assets/gifs/book.gif' width={400}/>
          <div className="progress-container">
            <span className="progress-task-name">{taskSelected}</span>
            <ProgressBar style={{width: '400px'}} variant="success" animated now={progress} label={`${progress}%`} />
          </div>
        </div>
      </>
    )
  }

  if(falhou) {
    return (
      <>
        <span>A inicialização falhou, tente abrir novamente ou entre em contato.</span><br></br>
        <span>Task: {taskSelected}</span>
      </>
    )
  }
  
  return (
    <>
      <LoadingBar />
      <ErrorToast />
      <Router>
        <div className="w-100">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/inicio" /> : <Login onLogin={handleLogin} />} />
            <Route path="/inicio" element={isAuthenticated ? <><Menu /><Inicio /></> : <Navigate to="/" />} />
            <Route path="/acervo" element={isAuthenticated ? <><Menu /><Acervo /></> : <Navigate to="/" />} />
            <Route path="/emprestimos" element={isAuthenticated ? <><Menu /><Emprestimos /></> : <Navigate to="/" />} />
            <Route path="/alunos" element={isAuthenticated ? <><Menu /><Alunos /></> : <Navigate to="/" />} />
            <Route path="/secoes" element={isAuthenticated ? <><Menu /><Secoes /></> : <Navigate to="/" />} />
            <Route path="/estantes" element={isAuthenticated ? <><Menu /><Estantes /></> : <Navigate to="/" />} />
            <Route path="/usuarios" element={isAuthenticated ? <><Menu /><Usuarios /></> : <Navigate to="/" />} />
            <Route path="/cronograma" element={isAuthenticated ? <><Menu /><Cronograma /></> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
  
    </>
  );
};

export default App;
