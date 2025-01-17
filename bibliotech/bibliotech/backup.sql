--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Debian 15.10-1.pgdg120+1)
-- Dumped by pg_dump version 15.10 (Debian 15.10-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adelino_cunha; Type: SCHEMA; Schema: -; Owner: admin
--

CREATE SCHEMA adelino_cunha;


ALTER SCHEMA adelino_cunha OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: aluno; Type: TABLE; Schema: adelino_cunha; Owner: admin
--

CREATE TABLE adelino_cunha.aluno (
    id integer NOT NULL,
    id_turma integer NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    telefone character varying(15),
    situacao character varying(20) DEFAULT 'regular'::character varying,
    CONSTRAINT aluno_situacao_check CHECK (((situacao)::text = ANY ((ARRAY['regular'::character varying, 'debito'::character varying])::text[])))
);


ALTER TABLE adelino_cunha.aluno OWNER TO admin;

--
-- Name: aluno_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: admin
--

CREATE SEQUENCE adelino_cunha.aluno_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.aluno_id_seq OWNER TO admin;

--
-- Name: aluno_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: admin
--

ALTER SEQUENCE adelino_cunha.aluno_id_seq OWNED BY adelino_cunha.aluno.id;


--
-- Name: emprestimo; Type: TABLE; Schema: adelino_cunha; Owner: admin
--

CREATE TABLE adelino_cunha.emprestimo (
    id integer NOT NULL,
    id_aluno integer NOT NULL,
    id_livro integer NOT NULL,
    data_emprestimo date DEFAULT CURRENT_DATE NOT NULL,
    data_devolucao date,
    data_prazo date NOT NULL,
    qtd_renovacao integer DEFAULT 0,
    situacao character varying(20) DEFAULT 'pendente'::character varying,
    observacao character varying(500),
    CONSTRAINT emprestimo_situacao_check CHECK (((situacao)::text = ANY ((ARRAY['pendente'::character varying, 'atraso'::character varying, 'entregue'::character varying, 'extraviado'::character varying])::text[])))
);


ALTER TABLE adelino_cunha.emprestimo OWNER TO admin;

--
-- Name: emprestimo_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: admin
--

CREATE SEQUENCE adelino_cunha.emprestimo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.emprestimo_id_seq OWNER TO admin;

--
-- Name: emprestimo_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: admin
--

ALTER SEQUENCE adelino_cunha.emprestimo_id_seq OWNED BY adelino_cunha.emprestimo.id;


--
-- Name: estanteprateleira; Type: TABLE; Schema: adelino_cunha; Owner: admin
--

CREATE TABLE adelino_cunha.estanteprateleira (
    id integer NOT NULL,
    estante integer NOT NULL,
    prateleira integer NOT NULL
);


ALTER TABLE adelino_cunha.estanteprateleira OWNER TO admin;

--
-- Name: estanteprateleira_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: admin
--

CREATE SEQUENCE adelino_cunha.estanteprateleira_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.estanteprateleira_id_seq OWNER TO admin;

--
-- Name: estanteprateleira_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: admin
--

ALTER SEQUENCE adelino_cunha.estanteprateleira_id_seq OWNED BY adelino_cunha.estanteprateleira.id;


--
-- Name: estanteprateleirasecao; Type: TABLE; Schema: adelino_cunha; Owner: admin
--

CREATE TABLE adelino_cunha.estanteprateleirasecao (
    id integer NOT NULL,
    id_estante_prateleira integer NOT NULL,
    id_secao integer NOT NULL
);


ALTER TABLE adelino_cunha.estanteprateleirasecao OWNER TO admin;

--
-- Name: estanteprateleirasecao_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: admin
--

CREATE SEQUENCE adelino_cunha.estanteprateleirasecao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.estanteprateleirasecao_id_seq OWNER TO admin;

--
-- Name: estanteprateleirasecao_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: admin
--

ALTER SEQUENCE adelino_cunha.estanteprateleirasecao_id_seq OWNED BY adelino_cunha.estanteprateleirasecao.id;


--
-- Name: genero; Type: TABLE; Schema: adelino_cunha; Owner: admin
--

CREATE TABLE adelino_cunha.genero (
    id integer NOT NULL,
    genero character varying(100) NOT NULL
);


ALTER TABLE adelino_cunha.genero OWNER TO admin;

--
-- Name: genero_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: admin
--

CREATE SEQUENCE adelino_cunha.genero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.genero_id_seq OWNER TO admin;

--
-- Name: genero_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: admin
--

ALTER SEQUENCE adelino_cunha.genero_id_seq OWNED BY adelino_cunha.genero.id;


--
-- Name: livro; Type: TABLE; Schema: adelino_cunha; Owner: admin
--

CREATE TABLE adelino_cunha.livro (
    id integer NOT NULL,
    isbn character varying(13) NOT NULL,
    titulo character varying(255) NOT NULL,
    autor character varying(255) NOT NULL,
    situacao character varying(20) DEFAULT 'disponivel'::character varying,
    observacao character varying(500),
    id_secao integer NOT NULL,
    id_estante_prateleira integer,
    CONSTRAINT livro_situacao_check CHECK (((situacao)::text = ANY ((ARRAY['emprestado'::character varying, 'disponivel'::character varying, 'extraviado'::character varying])::text[])))
);


ALTER TABLE adelino_cunha.livro OWNER TO admin;

--
-- Name: livro_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: admin
--

CREATE SEQUENCE adelino_cunha.livro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.livro_id_seq OWNER TO admin;

--
-- Name: livro_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: admin
--

ALTER SEQUENCE adelino_cunha.livro_id_seq OWNED BY adelino_cunha.livro.id;


--
-- Name: livrogenero; Type: TABLE; Schema: adelino_cunha; Owner: admin
--

CREATE TABLE adelino_cunha.livrogenero (
    id integer NOT NULL,
    id_livro integer NOT NULL,
    id_genero integer NOT NULL
);


ALTER TABLE adelino_cunha.livrogenero OWNER TO admin;

--
-- Name: livrogenero_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: admin
--

CREATE SEQUENCE adelino_cunha.livrogenero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.livrogenero_id_seq OWNER TO admin;

--
-- Name: livrogenero_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: admin
--

ALTER SEQUENCE adelino_cunha.livrogenero_id_seq OWNED BY adelino_cunha.livrogenero.id;


--
-- Name: secao; Type: TABLE; Schema: adelino_cunha; Owner: admin
--

CREATE TABLE adelino_cunha.secao (
    id integer NOT NULL,
    nome character varying(100) NOT NULL
);


ALTER TABLE adelino_cunha.secao OWNER TO admin;

--
-- Name: secao_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: admin
--

CREATE SEQUENCE adelino_cunha.secao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.secao_id_seq OWNER TO admin;

--
-- Name: secao_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: admin
--

ALTER SEQUENCE adelino_cunha.secao_id_seq OWNED BY adelino_cunha.secao.id;


--
-- Name: secaogenero; Type: TABLE; Schema: adelino_cunha; Owner: admin
--

CREATE TABLE adelino_cunha.secaogenero (
    id integer NOT NULL,
    id_secao integer NOT NULL,
    id_genero integer NOT NULL
);


ALTER TABLE adelino_cunha.secaogenero OWNER TO admin;

--
-- Name: secaogenero_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: admin
--

CREATE SEQUENCE adelino_cunha.secaogenero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.secaogenero_id_seq OWNER TO admin;

--
-- Name: secaogenero_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: admin
--

ALTER SEQUENCE adelino_cunha.secaogenero_id_seq OWNED BY adelino_cunha.secaogenero.id;


--
-- Name: turma; Type: TABLE; Schema: adelino_cunha; Owner: admin
--

CREATE TABLE adelino_cunha.turma (
    id integer NOT NULL,
    serie integer NOT NULL,
    turma character varying(1) NOT NULL
);


ALTER TABLE adelino_cunha.turma OWNER TO admin;

--
-- Name: turma_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: admin
--

CREATE SEQUENCE adelino_cunha.turma_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.turma_id_seq OWNER TO admin;

--
-- Name: turma_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: admin
--

ALTER SEQUENCE adelino_cunha.turma_id_seq OWNED BY adelino_cunha.turma.id;


--
-- Name: usuario; Type: TABLE; Schema: adelino_cunha; Owner: admin
--

CREATE TABLE adelino_cunha.usuario (
    id integer NOT NULL,
    cargo character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    senha character varying(255) NOT NULL,
    data_ultimo_acesso timestamp without time zone,
    CONSTRAINT usuario_cargo_check CHECK (((cargo)::text = ANY ((ARRAY['bibliotecario'::character varying, 'aluno_monitor'::character varying])::text[])))
);


ALTER TABLE adelino_cunha.usuario OWNER TO admin;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: admin
--

CREATE SEQUENCE adelino_cunha.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.usuario_id_seq OWNER TO admin;

--
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: admin
--

ALTER SEQUENCE adelino_cunha.usuario_id_seq OWNED BY adelino_cunha.usuario.id;


--
-- Name: aluno id; Type: DEFAULT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.aluno ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.aluno_id_seq'::regclass);


--
-- Name: emprestimo id; Type: DEFAULT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.emprestimo ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.emprestimo_id_seq'::regclass);


--
-- Name: estanteprateleira id; Type: DEFAULT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.estanteprateleira ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.estanteprateleira_id_seq'::regclass);


--
-- Name: estanteprateleirasecao id; Type: DEFAULT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.estanteprateleirasecao_id_seq'::regclass);


--
-- Name: genero id; Type: DEFAULT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.genero ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.genero_id_seq'::regclass);


--
-- Name: livro id; Type: DEFAULT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.livro ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.livro_id_seq'::regclass);


--
-- Name: livrogenero id; Type: DEFAULT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.livrogenero ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.livrogenero_id_seq'::regclass);


--
-- Name: secao id; Type: DEFAULT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.secao ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.secao_id_seq'::regclass);


--
-- Name: secaogenero id; Type: DEFAULT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.secaogenero ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.secaogenero_id_seq'::regclass);


--
-- Name: turma id; Type: DEFAULT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.turma ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.turma_id_seq'::regclass);


--
-- Name: usuario id; Type: DEFAULT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.usuario ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.usuario_id_seq'::regclass);


--
-- Data for Name: aluno; Type: TABLE DATA; Schema: adelino_cunha; Owner: admin
--

COPY adelino_cunha.aluno (id, id_turma, nome, email, telefone, situacao) FROM stdin;
\.


--
-- Data for Name: emprestimo; Type: TABLE DATA; Schema: adelino_cunha; Owner: admin
--

COPY adelino_cunha.emprestimo (id, id_aluno, id_livro, data_emprestimo, data_devolucao, data_prazo, qtd_renovacao, situacao, observacao) FROM stdin;
\.


--
-- Data for Name: estanteprateleira; Type: TABLE DATA; Schema: adelino_cunha; Owner: admin
--

COPY adelino_cunha.estanteprateleira (id, estante, prateleira) FROM stdin;
\.


--
-- Data for Name: estanteprateleirasecao; Type: TABLE DATA; Schema: adelino_cunha; Owner: admin
--

COPY adelino_cunha.estanteprateleirasecao (id, id_estante_prateleira, id_secao) FROM stdin;
\.


--
-- Data for Name: genero; Type: TABLE DATA; Schema: adelino_cunha; Owner: admin
--

COPY adelino_cunha.genero (id, genero) FROM stdin;
1	Romance
2	Drama
\.


--
-- Data for Name: livro; Type: TABLE DATA; Schema: adelino_cunha; Owner: admin
--

COPY adelino_cunha.livro (id, isbn, titulo, autor, situacao, observacao, id_secao, id_estante_prateleira) FROM stdin;
\.


--
-- Data for Name: livrogenero; Type: TABLE DATA; Schema: adelino_cunha; Owner: admin
--

COPY adelino_cunha.livrogenero (id, id_livro, id_genero) FROM stdin;
\.


--
-- Data for Name: secao; Type: TABLE DATA; Schema: adelino_cunha; Owner: admin
--

COPY adelino_cunha.secao (id, nome) FROM stdin;
\.


--
-- Data for Name: secaogenero; Type: TABLE DATA; Schema: adelino_cunha; Owner: admin
--

COPY adelino_cunha.secaogenero (id, id_secao, id_genero) FROM stdin;
\.


--
-- Data for Name: turma; Type: TABLE DATA; Schema: adelino_cunha; Owner: admin
--

COPY adelino_cunha.turma (id, serie, turma) FROM stdin;
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: adelino_cunha; Owner: admin
--

COPY adelino_cunha.usuario (id, cargo, email, senha, data_ultimo_acesso) FROM stdin;
\.


--
-- Name: aluno_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: admin
--

SELECT pg_catalog.setval('adelino_cunha.aluno_id_seq', 1, false);


--
-- Name: emprestimo_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: admin
--

SELECT pg_catalog.setval('adelino_cunha.emprestimo_id_seq', 1, false);


--
-- Name: estanteprateleira_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: admin
--

SELECT pg_catalog.setval('adelino_cunha.estanteprateleira_id_seq', 1, false);


--
-- Name: estanteprateleirasecao_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: admin
--

SELECT pg_catalog.setval('adelino_cunha.estanteprateleirasecao_id_seq', 1, false);


--
-- Name: genero_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: admin
--

SELECT pg_catalog.setval('adelino_cunha.genero_id_seq', 2, true);


--
-- Name: livro_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: admin
--

SELECT pg_catalog.setval('adelino_cunha.livro_id_seq', 1, false);


--
-- Name: livrogenero_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: admin
--

SELECT pg_catalog.setval('adelino_cunha.livrogenero_id_seq', 1, false);


--
-- Name: secao_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: admin
--

SELECT pg_catalog.setval('adelino_cunha.secao_id_seq', 1, false);


--
-- Name: secaogenero_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: admin
--

SELECT pg_catalog.setval('adelino_cunha.secaogenero_id_seq', 1, false);


--
-- Name: turma_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: admin
--

SELECT pg_catalog.setval('adelino_cunha.turma_id_seq', 1, false);


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: admin
--

SELECT pg_catalog.setval('adelino_cunha.usuario_id_seq', 1, false);


--
-- Name: aluno aluno_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.aluno
    ADD CONSTRAINT aluno_pkey PRIMARY KEY (id);


--
-- Name: emprestimo emprestimo_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_pkey PRIMARY KEY (id);


--
-- Name: estanteprateleira estanteprateleira_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.estanteprateleira
    ADD CONSTRAINT estanteprateleira_pkey PRIMARY KEY (id);


--
-- Name: estanteprateleirasecao estanteprateleirasecao_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
    ADD CONSTRAINT estanteprateleirasecao_pkey PRIMARY KEY (id);


--
-- Name: genero genero_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.genero
    ADD CONSTRAINT genero_pkey PRIMARY KEY (id);


--
-- Name: livro livro_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.livro
    ADD CONSTRAINT livro_pkey PRIMARY KEY (id);


--
-- Name: livrogenero livrogenero_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.livrogenero
    ADD CONSTRAINT livrogenero_pkey PRIMARY KEY (id);


--
-- Name: secao secao_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.secao
    ADD CONSTRAINT secao_pkey PRIMARY KEY (id);


--
-- Name: secaogenero secaogenero_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.secaogenero
    ADD CONSTRAINT secaogenero_pkey PRIMARY KEY (id);


--
-- Name: turma turma_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.turma
    ADD CONSTRAINT turma_pkey PRIMARY KEY (id);


--
-- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- Name: aluno aluno_id_turma_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.aluno
    ADD CONSTRAINT aluno_id_turma_fkey FOREIGN KEY (id_turma) REFERENCES adelino_cunha.turma(id) ON DELETE CASCADE;


--
-- Name: emprestimo emprestimo_id_aluno_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_id_aluno_fkey FOREIGN KEY (id_aluno) REFERENCES adelino_cunha.aluno(id) ON DELETE CASCADE;


--
-- Name: emprestimo emprestimo_id_livro_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES adelino_cunha.livro(id) ON DELETE CASCADE;


--
-- Name: estanteprateleirasecao estanteprateleirasecao_id_estante_prateleira_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
    ADD CONSTRAINT estanteprateleirasecao_id_estante_prateleira_fkey FOREIGN KEY (id_estante_prateleira) REFERENCES adelino_cunha.estanteprateleira(id) ON DELETE CASCADE;


--
-- Name: estanteprateleirasecao estanteprateleirasecao_id_secao_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
    ADD CONSTRAINT estanteprateleirasecao_id_secao_fkey FOREIGN KEY (id_secao) REFERENCES adelino_cunha.secao(id) ON DELETE CASCADE;


--
-- Name: livro livro_id_estante_prateleira_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.livro
    ADD CONSTRAINT livro_id_estante_prateleira_fkey FOREIGN KEY (id_estante_prateleira) REFERENCES adelino_cunha.estanteprateleira(id) ON DELETE CASCADE;


--
-- Name: livro livro_id_secao_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.livro
    ADD CONSTRAINT livro_id_secao_fkey FOREIGN KEY (id_secao) REFERENCES adelino_cunha.secao(id) ON DELETE CASCADE;


--
-- Name: livrogenero livrogenero_id_genero_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.livrogenero
    ADD CONSTRAINT livrogenero_id_genero_fkey FOREIGN KEY (id_genero) REFERENCES adelino_cunha.genero(id) ON DELETE CASCADE;


--
-- Name: livrogenero livrogenero_id_livro_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.livrogenero
    ADD CONSTRAINT livrogenero_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES adelino_cunha.livro(id) ON DELETE CASCADE;


--
-- Name: secaogenero secaogenero_id_genero_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.secaogenero
    ADD CONSTRAINT secaogenero_id_genero_fkey FOREIGN KEY (id_genero) REFERENCES adelino_cunha.genero(id) ON DELETE CASCADE;


--
-- Name: secaogenero secaogenero_id_secao_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: admin
--

ALTER TABLE ONLY adelino_cunha.secaogenero
    ADD CONSTRAINT secaogenero_id_secao_fkey FOREIGN KEY (id_secao) REFERENCES adelino_cunha.secao(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

