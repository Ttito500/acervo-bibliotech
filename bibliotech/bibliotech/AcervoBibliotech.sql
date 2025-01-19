CREATE DATABASE AcervoBibliotech;

CREATE TABLE Secao (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500)
);

CREATE TABLE EstantePrateleira (
    id SERIAL PRIMARY KEY,
    estante VARCHAR(1) NOT NULL UNIQUE,
    prateleira INT NOT NULL,
    UNIQUE (estante, prateleira)
);

CREATE TABLE EstantePrateleiraSecao (
    id SERIAL PRIMARY KEY,
    id_estante_prateleira INT NOT NULL,
    id_secao INT NOT NULL,
    UNIQUE (id_estante_prateleira, id_secao),
    FOREIGN KEY (id_estante_prateleira) REFERENCES EstantePrateleira(id) ON DELETE CASCADE,
    FOREIGN KEY (id_secao) REFERENCES Secao(id) ON DELETE CASCADE
);

CREATE TABLE Genero (
    id SERIAL PRIMARY KEY,
    genero VARCHAR(100) NOT NULL
);

CREATE TABLE Autor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE Livro (
    id SERIAL PRIMARY KEY,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    titulo VARCHAR(255) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE  
);

CREATE TABLE LivroGenero (
    id SERIAL PRIMARY KEY,
    id_livro INT NOT NULL,
    id_genero INT NOT NULL,
    UNIQUE (id_livro, id_genero),
    FOREIGN KEY (id_livro) REFERENCES Livro(id) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES Genero(id) ON DELETE CASCADE
);

CREATE TABLE LivroAutor (
    id SERIAL PRIMARY KEY,
    id_livro INT NOT NULL,
    id_autor INT NOT NULL,
    UNIQUE (id_livro, id_autor),
    FOREIGN KEY (id_livro) REFERENCES Livro(id) ON DELETE CASCADE,
    FOREIGN KEY (id_autor) REFERENCES Autor(id) ON DELETE CASCADE
);

CREATE TABLE Exemplar (
    id SERIAL PRIMARY KEY,
    id_livro INT NOT NULL,
    id_secao INT NOT NULL,
    id_estante_prateleira INT,
    observacao VARCHAR(500),
    numero INT NOT NULL UNIQUE,
    situacao VARCHAR(10) CHECK (situacao IN ('disponivel', 'emprestado', 'extraviado')) DEFAULT 'disponivel',
    FOREIGN KEY (id_livro) REFERENCES Livro(id),
    FOREIGN KEY (id_secao) REFERENCES Secao(id),
    FOREIGN KEY (id_estante_prateleira) REFERENCES EstantePrateleira(id)
);
 
CREATE TABLE Turma (
    id SERIAL PRIMARY KEY,
    serie INT NOT NULL,
    turma VARCHAR(1) NOT NULL,
    ano_de_entrada INT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (serie, turma, ano_de_entrada)
);

CREATE TABLE Aluno (
    id SERIAL PRIMARY KEY,
    id_turma INT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    situacao VARCHAR(7) CHECK (situacao IN ('regular', 'irregular', 'debito')) DEFAULT 'regular',
    FOREIGN KEY (id_turma) REFERENCES Turma(id)
);

CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(13) CHECK (cargo IN ('bibliotecario', 'aluno_monitor')) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_ultimo_acesso TIMESTAMP
);

CREATE TABLE Emprestimo (
    id SERIAL PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_exemplar INT NOT NULL,
    data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao DATE,
    data_prazo DATE NOT NULL,
    qtd_renovacao INT DEFAULT 0,
    situacao VARCHAR(10) CHECK (situacao IN ('pendente', 'atrasado', 'entregue', 'extraviado', 'cancelado')) DEFAULT 'pendente',
    observacao VARCHAR(500),
    realizado_por INT NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id),
    FOREIGN KEY (id_exemplar) REFERENCES Exemplar(id),
    FOREIGN KEY (realizado_por) REFERENCES Usuario(id)
);
