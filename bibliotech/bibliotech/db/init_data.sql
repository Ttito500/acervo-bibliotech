--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Debian 15.10-1.pgdg120+1)
-- Dumped by pg_dump version 15.8

-- Started on 2025-02-23 23:01:06 UTC

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
-- TOC entry 6 (class 2615 OID 16385)
-- Name: adelino_cunha; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA adelino_cunha;


ALTER SCHEMA adelino_cunha OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 236 (class 1259 OID 16524)
-- Name: aluno; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.aluno (
    id integer NOT NULL,
    id_turma integer,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    telefone character varying(15),
    ativo boolean DEFAULT true NOT NULL,
    situacao character varying(20) DEFAULT 'regular'::character varying,
    CONSTRAINT aluno_situacao_check CHECK (((situacao)::text = ANY (ARRAY[('regular'::character varying)::text, ('irregular'::character varying)::text, ('debito'::character varying)::text])))
);


ALTER TABLE adelino_cunha.aluno OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16523)
-- Name: aluno_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.aluno_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.aluno_id_seq OWNER TO postgres;

--
-- TOC entry 3573 (class 0 OID 0)
-- Dependencies: 235
-- Name: aluno_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.aluno_id_seq OWNED BY adelino_cunha.aluno.id;


--
-- TOC entry 224 (class 1259 OID 16431)
-- Name: autor; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.autor (
    id integer NOT NULL,
    nome character varying(255) NOT NULL
);


ALTER TABLE adelino_cunha.autor OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16430)
-- Name: autor_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.autor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.autor_id_seq OWNER TO postgres;

--
-- TOC entry 3574 (class 0 OID 0)
-- Dependencies: 223
-- Name: autor_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.autor_id_seq OWNED BY adelino_cunha.autor.id;


--
-- TOC entry 247 (class 1259 OID 16645)
-- Name: autor_livros; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.autor_livros (
    autores_id integer NOT NULL,
    livros_id integer NOT NULL
);


ALTER TABLE adelino_cunha.autor_livros OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 16629)
-- Name: cronogramaalunomonitor; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.cronogramaalunomonitor (
    id integer NOT NULL,
    id_aluno_monitor integer NOT NULL,
    dia_da_semana character varying(20) NOT NULL,
    CONSTRAINT cronogramaalunomonitor_dia_da_semana_check CHECK (((dia_da_semana)::text = ANY ((ARRAY['segunda-feira'::character varying, 'terca-feira'::character varying, 'quarta-feira'::character varying, 'quinta-feira'::character varying, 'sexta-feira'::character varying])::text[])))
);


ALTER TABLE adelino_cunha.cronogramaalunomonitor OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 16628)
-- Name: cronogramaalunomonitor_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.cronogramaalunomonitor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.cronogramaalunomonitor_id_seq OWNER TO postgres;

--
-- TOC entry 3575 (class 0 OID 0)
-- Dependencies: 245
-- Name: cronogramaalunomonitor_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.cronogramaalunomonitor_id_seq OWNED BY adelino_cunha.cronogramaalunomonitor.id;


--
-- TOC entry 240 (class 1259 OID 16556)
-- Name: emprestimo; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.emprestimo (
    id integer NOT NULL,
    id_aluno integer NOT NULL,
    id_exemplar integer NOT NULL,
    data_emprestimo date DEFAULT CURRENT_DATE NOT NULL,
    data_conclusao date,
    data_prazo date NOT NULL,
    qtd_renovacao integer DEFAULT 0,
    situacao character varying(20) DEFAULT 'pendente'::character varying,
    observacao character varying(500),
    realizado_por integer NOT NULL,
    concluido_por integer,
    data_ultima_notificacao date,
    CONSTRAINT emprestimo_situacao_check CHECK (((situacao)::text = ANY (ARRAY[('pendente'::character varying)::text, ('atrasado'::character varying)::text, ('entregue'::character varying)::text, ('extraviado'::character varying)::text, ('cancelado'::character varying)::text])))
);


ALTER TABLE adelino_cunha.emprestimo OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16555)
-- Name: emprestimo_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.emprestimo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.emprestimo_id_seq OWNER TO postgres;

--
-- TOC entry 3576 (class 0 OID 0)
-- Dependencies: 239
-- Name: emprestimo_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.emprestimo_id_seq OWNED BY adelino_cunha.emprestimo.id;


--
-- TOC entry 218 (class 1259 OID 16396)
-- Name: estanteprateleira; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.estanteprateleira (
    id integer NOT NULL,
    estante character varying(1) NOT NULL,
    prateleira integer NOT NULL
);


ALTER TABLE adelino_cunha.estanteprateleira OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16395)
-- Name: estanteprateleira_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.estanteprateleira_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.estanteprateleira_id_seq OWNER TO postgres;

--
-- TOC entry 3577 (class 0 OID 0)
-- Dependencies: 217
-- Name: estanteprateleira_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.estanteprateleira_id_seq OWNED BY adelino_cunha.estanteprateleira.id;


--
-- TOC entry 220 (class 1259 OID 16405)
-- Name: estanteprateleirasecao; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.estanteprateleirasecao (
    id integer NOT NULL,
    id_estante_prateleira integer NOT NULL,
    id_secao integer NOT NULL
);


ALTER TABLE adelino_cunha.estanteprateleirasecao OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16404)
-- Name: estanteprateleirasecao_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.estanteprateleirasecao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.estanteprateleirasecao_id_seq OWNER TO postgres;

--
-- TOC entry 3578 (class 0 OID 0)
-- Dependencies: 219
-- Name: estanteprateleirasecao_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.estanteprateleirasecao_id_seq OWNED BY adelino_cunha.estanteprateleirasecao.id;


--
-- TOC entry 232 (class 1259 OID 16486)
-- Name: exemplar; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.exemplar (
    id integer NOT NULL,
    id_livro integer NOT NULL,
    id_secao integer NOT NULL,
    id_estante_prateleira integer,
    observacao character varying(500),
    numero integer NOT NULL,
    situacao character varying(10) DEFAULT 'disponivel'::character varying,
    CONSTRAINT exemplar_situacao_check CHECK (((situacao)::text = ANY ((ARRAY['disponivel'::character varying, 'emprestado'::character varying, 'extraviado'::character varying])::text[])))
);


ALTER TABLE adelino_cunha.exemplar OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16485)
-- Name: exemplar_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.exemplar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.exemplar_id_seq OWNER TO postgres;

--
-- TOC entry 3579 (class 0 OID 0)
-- Dependencies: 231
-- Name: exemplar_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.exemplar_id_seq OWNED BY adelino_cunha.exemplar.id;


--
-- TOC entry 242 (class 1259 OID 16589)
-- Name: frequenciaalunos; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.frequenciaalunos (
    id integer NOT NULL,
    id_aluno integer NOT NULL,
    registrada_por integer NOT NULL,
    atividade character varying(20) DEFAULT 'lendo'::character varying,
    data_frequencia date NOT NULL,
    CONSTRAINT frequenciaalunos_atividade_check CHECK (((atividade)::text = ANY ((ARRAY['lendo'::character varying, 'celula_de_estudo'::character varying, 'estudo_individual'::character varying, 'descansando'::character varying, 'outros'::character varying])::text[])))
);


ALTER TABLE adelino_cunha.frequenciaalunos OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16588)
-- Name: frequenciaalunos_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.frequenciaalunos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.frequenciaalunos_id_seq OWNER TO postgres;

--
-- TOC entry 3580 (class 0 OID 0)
-- Dependencies: 241
-- Name: frequenciaalunos_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.frequenciaalunos_id_seq OWNED BY adelino_cunha.frequenciaalunos.id;


--
-- TOC entry 222 (class 1259 OID 16424)
-- Name: genero; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.genero (
    id integer NOT NULL,
    genero character varying(255) NOT NULL
);


ALTER TABLE adelino_cunha.genero OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16423)
-- Name: genero_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.genero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.genero_id_seq OWNER TO postgres;

--
-- TOC entry 3581 (class 0 OID 0)
-- Dependencies: 221
-- Name: genero_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.genero_id_seq OWNED BY adelino_cunha.genero.id;


--
-- TOC entry 248 (class 1259 OID 16650)
-- Name: genero_livros; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.genero_livros (
    generos_id integer NOT NULL,
    livros_id integer NOT NULL
);


ALTER TABLE adelino_cunha.genero_livros OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16438)
-- Name: livro; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.livro (
    id integer NOT NULL,
    isbn character varying(13) NOT NULL,
    titulo character varying(255) NOT NULL,
    ativo boolean DEFAULT true NOT NULL
);


ALTER TABLE adelino_cunha.livro OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16437)
-- Name: livro_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.livro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.livro_id_seq OWNER TO postgres;

--
-- TOC entry 3582 (class 0 OID 0)
-- Dependencies: 225
-- Name: livro_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.livro_id_seq OWNED BY adelino_cunha.livro.id;


--
-- TOC entry 230 (class 1259 OID 16467)
-- Name: livroautor; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.livroautor (
    id integer NOT NULL,
    id_livro integer NOT NULL,
    id_autor integer NOT NULL
);


ALTER TABLE adelino_cunha.livroautor OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16466)
-- Name: livroautor_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.livroautor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.livroautor_id_seq OWNER TO postgres;

--
-- TOC entry 3583 (class 0 OID 0)
-- Dependencies: 229
-- Name: livroautor_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.livroautor_id_seq OWNED BY adelino_cunha.livroautor.id;


--
-- TOC entry 228 (class 1259 OID 16448)
-- Name: livrogenero; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.livrogenero (
    id integer NOT NULL,
    id_livro integer NOT NULL,
    id_genero integer NOT NULL
);


ALTER TABLE adelino_cunha.livrogenero OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16447)
-- Name: livrogenero_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.livrogenero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.livrogenero_id_seq OWNER TO postgres;

--
-- TOC entry 3584 (class 0 OID 0)
-- Dependencies: 227
-- Name: livrogenero_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.livrogenero_id_seq OWNED BY adelino_cunha.livrogenero.id;


--
-- TOC entry 244 (class 1259 OID 16610)
-- Name: ocorrencias; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.ocorrencias (
    id integer NOT NULL,
    id_aluno integer NOT NULL,
    registrada_por integer NOT NULL,
    detalhes character varying(500),
    data_ocorrencia date NOT NULL
);


ALTER TABLE adelino_cunha.ocorrencias OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16609)
-- Name: ocorrencias_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.ocorrencias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.ocorrencias_id_seq OWNER TO postgres;

--
-- TOC entry 3585 (class 0 OID 0)
-- Dependencies: 243
-- Name: ocorrencias_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.ocorrencias_id_seq OWNED BY adelino_cunha.ocorrencias.id;


--
-- TOC entry 216 (class 1259 OID 16387)
-- Name: secao; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.secao (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    descricao character varying(500)
);


ALTER TABLE adelino_cunha.secao OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16386)
-- Name: secao_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.secao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.secao_id_seq OWNER TO postgres;

--
-- TOC entry 3586 (class 0 OID 0)
-- Dependencies: 215
-- Name: secao_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.secao_id_seq OWNED BY adelino_cunha.secao.id;


--
-- TOC entry 234 (class 1259 OID 16514)
-- Name: turma; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.turma (
    id integer NOT NULL,
    serie integer NOT NULL,
    turma character varying(1) NOT NULL,
    ano_de_entrada integer NOT NULL,
    ativo boolean DEFAULT true NOT NULL
);


ALTER TABLE adelino_cunha.turma OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16513)
-- Name: turma_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.turma_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.turma_id_seq OWNER TO postgres;

--
-- TOC entry 3587 (class 0 OID 0)
-- Dependencies: 233
-- Name: turma_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.turma_id_seq OWNED BY adelino_cunha.turma.id;


--
-- TOC entry 238 (class 1259 OID 16543)
-- Name: usuario; Type: TABLE; Schema: adelino_cunha; Owner: postgres
--

CREATE TABLE adelino_cunha.usuario (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    cargo character varying(50) NOT NULL,
    ativo boolean DEFAULT true NOT NULL,
    email character varying(255) NOT NULL,
    senha character varying(255) NOT NULL,
    data_ultimo_acesso timestamp with time zone,
    CONSTRAINT usuario_cargo_check CHECK (((cargo)::text = ANY (ARRAY[('bibliotecario'::character varying)::text, ('aluno_monitor'::character varying)::text])))
);


ALTER TABLE adelino_cunha.usuario OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16542)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
--

CREATE SEQUENCE adelino_cunha.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE adelino_cunha.usuario_id_seq OWNER TO postgres;

--
-- TOC entry 3588 (class 0 OID 0)
-- Dependencies: 237
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
--

ALTER SEQUENCE adelino_cunha.usuario_id_seq OWNED BY adelino_cunha.usuario.id;


--
-- TOC entry 3296 (class 2604 OID 16527)
-- Name: aluno id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.aluno ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.aluno_id_seq'::regclass);


--
-- TOC entry 3287 (class 2604 OID 16434)
-- Name: autor id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.autor ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.autor_id_seq'::regclass);


--
-- TOC entry 3308 (class 2604 OID 16632)
-- Name: cronogramaalunomonitor id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.cronogramaalunomonitor ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.cronogramaalunomonitor_id_seq'::regclass);


--
-- TOC entry 3301 (class 2604 OID 16559)
-- Name: emprestimo id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.emprestimo ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.emprestimo_id_seq'::regclass);


--
-- TOC entry 3284 (class 2604 OID 16399)
-- Name: estanteprateleira id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.estanteprateleira ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.estanteprateleira_id_seq'::regclass);


--
-- TOC entry 3285 (class 2604 OID 16408)
-- Name: estanteprateleirasecao id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.estanteprateleirasecao_id_seq'::regclass);


--
-- TOC entry 3292 (class 2604 OID 16489)
-- Name: exemplar id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.exemplar ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.exemplar_id_seq'::regclass);


--
-- TOC entry 3305 (class 2604 OID 16592)
-- Name: frequenciaalunos id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.frequenciaalunos ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.frequenciaalunos_id_seq'::regclass);


--
-- TOC entry 3286 (class 2604 OID 16427)
-- Name: genero id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.genero ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.genero_id_seq'::regclass);


--
-- TOC entry 3288 (class 2604 OID 16441)
-- Name: livro id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livro ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.livro_id_seq'::regclass);


--
-- TOC entry 3291 (class 2604 OID 16470)
-- Name: livroautor id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livroautor ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.livroautor_id_seq'::regclass);


--
-- TOC entry 3290 (class 2604 OID 16451)
-- Name: livrogenero id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livrogenero ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.livrogenero_id_seq'::regclass);


--
-- TOC entry 3307 (class 2604 OID 16613)
-- Name: ocorrencias id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.ocorrencias ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.ocorrencias_id_seq'::regclass);


--
-- TOC entry 3283 (class 2604 OID 16390)
-- Name: secao id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.secao ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.secao_id_seq'::regclass);


--
-- TOC entry 3294 (class 2604 OID 16517)
-- Name: turma id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.turma ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.turma_id_seq'::regclass);


--
-- TOC entry 3299 (class 2604 OID 16546)
-- Name: usuario id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.usuario ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.usuario_id_seq'::regclass);


--
-- TOC entry 3555 (class 0 OID 16524)
-- Dependencies: 236
-- Data for Name: aluno; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.aluno (id, id_turma, nome, email, telefone, ativo, situacao) FROM stdin;
1	1	Kauan	kauan@email.com	1111111111	t	regular
2	1	Maria Oliveira	maria@email.com	2222222222	t	regular
3	1	Gabriel Alves	gabriel@email.com	3333333333	t	regular
4	1	Ana Souza	ana@email.com	4444444444	t	irregular
5	1	Pedro Rivaldo	pedro@email.com	5555555555	t	regular
6	1	Lucas Tito	lucas@email.com	6666666666	f	regular
7	1	Juliana Mendes	juliana@email.com	7777777777	t	regular
8	1	Luis	luis@email.com	8888888888	t	debito
9	1	Camila Andrade	camila@email.com	9999999999	t	regular
10	1	Tiago Tito	tiago@email.com	1010101010	t	regular
\.


--
-- TOC entry 3543 (class 0 OID 16431)
-- Dependencies: 224
-- Data for Name: autor; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.autor (id, nome) FROM stdin;
1	Isaac Asimov
2	Jane Austen
3	Yuval Noah Harari
4	Steve Jobs
5	Paulo Freire
6	Vincent Van Gogh
7	Platão
8	Sigmund Freud
9	Monteiro Lobato
10	Nelson Mandela
\.


--
-- TOC entry 3566 (class 0 OID 16645)
-- Dependencies: 247
-- Data for Name: autor_livros; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.autor_livros (autores_id, livros_id) FROM stdin;
\.


--
-- TOC entry 3565 (class 0 OID 16629)
-- Dependencies: 246
-- Data for Name: cronogramaalunomonitor; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.cronogramaalunomonitor (id, id_aluno_monitor, dia_da_semana) FROM stdin;
1	2	segunda-feira
2	4	segunda-feira
3	6	terca-feira
4	8	terca-feira
5	10	quarta-feira
6	2	quarta-feira
7	4	quinta-feira
8	6	quinta-feira
9	8	sexta-feira
10	10	sexta-feira
\.


--
-- TOC entry 3559 (class 0 OID 16556)
-- Dependencies: 240
-- Data for Name: emprestimo; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.emprestimo (id, id_aluno, id_exemplar, data_emprestimo, data_conclusao, data_prazo, qtd_renovacao, situacao, observacao, realizado_por, concluido_por, data_ultima_notificacao) FROM stdin;
1	1	1	2024-10-01	2024-10-15	2024-10-15	0	entregue	\N	1	1	\N
2	2	2	2024-10-02	2024-10-16	2024-10-16	1	entregue	\N	2	1	\N
3	3	3	2024-10-03	2024-10-17	2024-10-17	0	entregue	Devolvido com rasuras na primeira pagina	3	1	\N
4	4	4	2024-10-04	2024-10-18	2024-10-18	0	entregue	Entregue no prazo	4	1	\N
5	5	5	2024-10-05	2024-10-19	2024-10-19	0	entregue	Devolvido com paginas arrancadas	5	1	\N
6	6	6	2024-10-06	2024-10-20	2024-10-20	0	entregue	\N	6	1	\N
7	7	7	2024-10-07	2024-10-21	2024-10-21	0	entregue	Entregue no prazo	7	7	\N
8	8	8	2024-10-08	2024-10-22	2024-10-22	0	entregue	Devolvido com mancha de café	8	1	\N
9	9	9	2024-10-09	2024-10-23	2024-10-23	0	entregue	\N	9	1	\N
10	10	10	2024-10-10	2024-10-24	2024-10-24	0	entregue	\N	10	1	\N
\.


--
-- TOC entry 3537 (class 0 OID 16396)
-- Dependencies: 218
-- Data for Name: estanteprateleira; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.estanteprateleira (id, estante, prateleira) FROM stdin;
1	A	1
2	A	2
3	A	3
4	A	4
5	A	5
6	B	1
7	B	2
8	B	3
9	B	4
10	B	5
11	C	1
12	C	2
13	C	3
14	C	4
15	C	5
16	D	1
17	D	2
18	D	3
19	D	4
20	D	5
21	E	1
22	E	2
23	E	3
24	E	4
25	E	5
26	F	1
27	F	2
\.


--
-- TOC entry 3539 (class 0 OID 16405)
-- Dependencies: 220
-- Data for Name: estanteprateleirasecao; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.estanteprateleirasecao (id, id_estante_prateleira, id_secao) FROM stdin;
1	1	1
2	6	1
3	11	1
4	2	2
5	7	2
6	12	2
7	3	3
8	4	3
9	5	3
10	8	4
11	9	4
12	13	5
13	14	5
14	15	5
15	17	6
16	18	6
17	19	7
18	20	7
19	21	7
20	22	8
21	23	8
22	24	9
23	25	9
24	26	10
25	27	10
\.


--
-- TOC entry 3551 (class 0 OID 16486)
-- Dependencies: 232
-- Data for Name: exemplar; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.exemplar (id, id_livro, id_secao, id_estante_prateleira, observacao, numero, situacao) FROM stdin;
1	1	1	1	Bom estado	1	disponivel
2	1	1	6	Capa levemente danificada	2	disponivel
3	2	2	2	Ótimo estado	1	disponivel
4	2	2	7	Anotações a lápis	2	disponivel
5	3	3	3	Bom estado	1	disponivel
6	3	3	4	Rasura na página 50	2	disponivel
7	4	10	26	Bom estado	1	disponivel
8	4	10	27	Capa desgastada	2	disponivel
9	5	5	13	Ótimo estado	1	disponivel
10	5	5	14	Levemente amassado	2	disponivel
11	6	6	17	Novo	1	disponivel
12	6	6	18	Leve desgaste	2	disponivel
13	7	7	19	Ótimo estado	1	disponivel
14	7	7	20	Sublinhado a caneta	2	disponivel
15	8	8	22	Capa intacta	1	disponivel
16	8	8	23	Marcas de uso	2	disponivel
17	9	9	24	Novo	1	disponivel
18	9	9	25	Capa suja	2	disponivel
19	10	10	26	Bom estado	1	disponivel
20	10	10	27	Leves marcas na capa	2	disponivel
\.


--
-- TOC entry 3561 (class 0 OID 16589)
-- Dependencies: 242
-- Data for Name: frequenciaalunos; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.frequenciaalunos (id, id_aluno, registrada_por, atividade, data_frequencia) FROM stdin;
1	1	1	lendo	2024-10-01
2	2	2	celula_de_estudo	2024-10-01
3	3	3	estudo_individual	2024-10-01
4	4	4	descansando	2024-10-01
5	5	5	outros	2024-10-01
6	6	6	lendo	2024-10-03
7	7	7	celula_de_estudo	2024-10-03
8	8	8	estudo_individual	2024-10-03
9	9	9	descansando	2024-10-03
10	10	10	outros	2024-10-13
\.


--
-- TOC entry 3541 (class 0 OID 16424)
-- Dependencies: 222
-- Data for Name: genero; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.genero (id, genero) FROM stdin;
1	Ficção Científica
2	Romance
3	História
4	Biografia
5	Educação
6	Artes
7	Filosofia
8	Psicologia
9	Infantil
10	Biografia
\.


--
-- TOC entry 3567 (class 0 OID 16650)
-- Dependencies: 248
-- Data for Name: genero_livros; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.genero_livros (generos_id, livros_id) FROM stdin;
\.


--
-- TOC entry 3545 (class 0 OID 16438)
-- Dependencies: 226
-- Data for Name: livro; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.livro (id, isbn, titulo, ativo) FROM stdin;
1	9788576574835	Fundação	t
2	9786586490275	Orgulho e Preconceito	t
3	9788525432186	Sapiens: Uma Breve História da Humanidade	t
4	9788535919714	Steve Jobs: A Biografia	t
5	9788577534180	Pedagogia do Oprimido	t
6	9788527307697	vincent van gogh	t
7	9788581862538	A República	t
8	9788551301982	Introdução à Psicanálise	t
9	9788551304440	O Sítio do Picapau Amarelo	t
10	9788526707436	O Longo Caminho para a Liberdade	t
\.


--
-- TOC entry 3549 (class 0 OID 16467)
-- Dependencies: 230
-- Data for Name: livroautor; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.livroautor (id, id_livro, id_autor) FROM stdin;
1	1	1
2	2	2
3	3	3
4	4	4
5	5	5
6	6	6
7	7	7
8	8	8
9	9	9
10	10	10
\.


--
-- TOC entry 3547 (class 0 OID 16448)
-- Dependencies: 228
-- Data for Name: livrogenero; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.livrogenero (id, id_livro, id_genero) FROM stdin;
1	1	1
2	2	2
3	3	3
4	4	4
5	5	5
6	6	6
7	7	7
8	8	8
9	9	9
10	10	4
\.


--
-- TOC entry 3563 (class 0 OID 16610)
-- Dependencies: 244
-- Data for Name: ocorrencias; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.ocorrencias (id, id_aluno, registrada_por, detalhes, data_ocorrencia) FROM stdin;
1	3	1	Aluno pregando ideias extremistas	2024-10-01
2	10	2	Aluno comendo feijoada na biblioteca	2024-10-02
3	8	3	Aluno jogando LOL	2024-10-03
4	1	4	Aluno se escondendo na biblioteca para faltar aula	2024-10-04
5	5	5	Aluno usa JS no backend	2024-10-05
6	6	6	Aluno danificou livro	2024-10-06
7	7	7	Aluno puxando cabelo da outra	2024-10-07
8	8	8	Aluno jogando free fire	2024-10-08
9	9	9	Aluno trouxe uma sanduicheira e fez misto quente	2024-10-09
10	10	10	Aluno quebrou a mesa jogando truco	2024-10-10
\.


--
-- TOC entry 3535 (class 0 OID 16387)
-- Dependencies: 216
-- Data for Name: secao; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.secao (id, nome, descricao) FROM stdin;
1	Ficção Científica	Livros sobre ficção científica
2	Romance	Seção dedicada a romances
3	História	Livros sobre história mundial e do Brasil
4	Tecnologia	Livros sobre tecnologia e inovação
5	Educação	Livros didáticos e pedagógicos
6	Artes	Seção de livros sobre arte e design
7	Filosofia	Livros sobre filosofia clássica e contemporânea
8	Psicologia	Estudos e pesquisas sobre psicologia
9	Infantil	Livros para crianças e contos infantis
10	Biografias	Histórias de personalidades famosas
\.


--
-- TOC entry 3553 (class 0 OID 16514)
-- Dependencies: 234
-- Data for Name: turma; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.turma (id, serie, turma, ano_de_entrada, ativo) FROM stdin;
1	1	A	2025	t
2	1	B	2025	t
3	1	C	2025	t
4	2	A	2024	t
5	2	B	2024	t
6	2	C	2024	t
7	3	A	2024	t
8	3	B	2024	t
9	3	C	2024	t
10	3	A	2022	f
\.


--
-- TOC entry 3557 (class 0 OID 16543)
-- Dependencies: 238
-- Data for Name: usuario; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
--

COPY adelino_cunha.usuario (id, nome, cargo, ativo, email, senha, data_ultimo_acesso) FROM stdin;
1	João Silva	bibliotecario	t	joao.silva@escola.com	$2a$10$zGxxid8A2KUbcvXr2mBZmeRD6uRdzJCTxZV33ZcZCw08WXLDQbmz6	2024-10-01 00:00:00+00
2	Maria Oliveira	aluno_monitor	t	maria.oliveira@escola.com	$2a$10$SXNc5gJX8X5Xidx45Urd9.GCDEoR6lmMCjppGnt1aXWYH2cw6dgpa	2024-10-02 00:00:00+00
3	Pedro Souza	bibliotecario	t	pedro.souza@escola.com	$2a$10$woR3.PteoHUhiKe6HM6GZurS38YLM7YmNNlHEqr7Gd7Bwavwe5sSy	2024-10-03 00:00:00+00
4	Ana Costa	aluno_monitor	t	ana.costa@escola.com	$2a$10$IkgXEI8BRqmyyJa9jxi1UO/8.wPnkmyuPaGxA7RtDTq8w4kMTZ/ei	2024-10-04 00:00:00+00
5	Carlos Mendes	bibliotecario	t	carlos.mendes@escola.com	$2a$10$AnAUrGa3.2y8Hiy07KZcZ.ayeBx.K2sspAxCaGJDPVcTOOzb8DA1O	2024-10-05 00:00:00+00
6	Fernanda Lima	aluno_monitor	t	fernanda.lima@escola.com	$2a$10$CtzZ2fhEFT7THPyG3aD2e.mB9rVibrCTyNYR8JKe3uaXorwU/bNlG	2024-10-06 00:00:00+00
7	Ricardo Alves	bibliotecario	t	ricardo.alves@escola.com	$2a$10$dLg7rIMToIfguIqo67SkeuEbTyOxxGmGnkD.OIcSxlJzpFy2xuZOO	2024-10-07 00:00:00+00
8	Juliana Pereira	aluno_monitor	t	juliana.pereira@escola.com	$2a$10$y12aaQ3jA/BKzxZKroaO4eqdtRGQSyVgoKvKR.Ji4/OxJPwl9uGsK	2024-10-08 00:00:00+00
9	Lucas Gomes	bibliotecario	t	lucas.gomes@escola.com	$2a$10$aS5OBcfIbP9K.evCmXChTu/TXALHPXMQ6q8782cX/RIs23jLp7l3q	2024-10-09 00:00:00+00
10	Patricia Santos	aluno_monitor	t	patricia.santos@escola.com	$2a$10$d/WJrKvxCHFQbIVnzVlPEOFQgIv7CMyWp1ifE30DDYN7mv4xYOqsa	2024-10-10 00:00:00+00
11	admin	bibliotecario	t	admin@admin	$2a$10$N1GNH0Nk4rATx6rDloRVMu9zWGWsX2aYYNKfIlk6cH/LjDAE3qaP2	2025-02-23 00:00:00+00
\.


--
-- TOC entry 3589 (class 0 OID 0)
-- Dependencies: 235
-- Name: aluno_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.aluno_id_seq', 10, true);


--
-- TOC entry 3590 (class 0 OID 0)
-- Dependencies: 223
-- Name: autor_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.autor_id_seq', 10, true);


--
-- TOC entry 3591 (class 0 OID 0)
-- Dependencies: 245
-- Name: cronogramaalunomonitor_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.cronogramaalunomonitor_id_seq', 10, true);


--
-- TOC entry 3592 (class 0 OID 0)
-- Dependencies: 239
-- Name: emprestimo_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.emprestimo_id_seq', 10, true);


--
-- TOC entry 3593 (class 0 OID 0)
-- Dependencies: 217
-- Name: estanteprateleira_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.estanteprateleira_id_seq', 27, true);


--
-- TOC entry 3594 (class 0 OID 0)
-- Dependencies: 219
-- Name: estanteprateleirasecao_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.estanteprateleirasecao_id_seq', 25, true);


--
-- TOC entry 3595 (class 0 OID 0)
-- Dependencies: 231
-- Name: exemplar_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.exemplar_id_seq', 20, true);


--
-- TOC entry 3596 (class 0 OID 0)
-- Dependencies: 241
-- Name: frequenciaalunos_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.frequenciaalunos_id_seq', 10, true);


--
-- TOC entry 3597 (class 0 OID 0)
-- Dependencies: 221
-- Name: genero_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.genero_id_seq', 10, true);


--
-- TOC entry 3598 (class 0 OID 0)
-- Dependencies: 225
-- Name: livro_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.livro_id_seq', 10, true);


--
-- TOC entry 3599 (class 0 OID 0)
-- Dependencies: 229
-- Name: livroautor_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.livroautor_id_seq', 10, true);


--
-- TOC entry 3600 (class 0 OID 0)
-- Dependencies: 227
-- Name: livrogenero_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.livrogenero_id_seq', 10, true);


--
-- TOC entry 3601 (class 0 OID 0)
-- Dependencies: 243
-- Name: ocorrencias_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.ocorrencias_id_seq', 10, true);


--
-- TOC entry 3602 (class 0 OID 0)
-- Dependencies: 215
-- Name: secao_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.secao_id_seq', 10, true);


--
-- TOC entry 3603 (class 0 OID 0)
-- Dependencies: 233
-- Name: turma_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.turma_id_seq', 10, true);


--
-- TOC entry 3604 (class 0 OID 0)
-- Dependencies: 237
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
--

SELECT pg_catalog.setval('adelino_cunha.usuario_id_seq', 11, true);


--
-- TOC entry 3350 (class 2606 OID 16536)
-- Name: aluno aluno_email_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.aluno
    ADD CONSTRAINT aluno_email_key UNIQUE (email);


--
-- TOC entry 3352 (class 2606 OID 16534)
-- Name: aluno aluno_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.aluno
    ADD CONSTRAINT aluno_pkey PRIMARY KEY (id);


--
-- TOC entry 3328 (class 2606 OID 16436)
-- Name: autor autor_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.autor
    ADD CONSTRAINT autor_pkey PRIMARY KEY (id);


--
-- TOC entry 3366 (class 2606 OID 16637)
-- Name: cronogramaalunomonitor cronogramaalunomonitor_id_aluno_monitor_dia_da_semana_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.cronogramaalunomonitor
    ADD CONSTRAINT cronogramaalunomonitor_id_aluno_monitor_dia_da_semana_key UNIQUE (id_aluno_monitor, dia_da_semana);


--
-- TOC entry 3368 (class 2606 OID 16635)
-- Name: cronogramaalunomonitor cronogramaalunomonitor_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.cronogramaalunomonitor
    ADD CONSTRAINT cronogramaalunomonitor_pkey PRIMARY KEY (id);


--
-- TOC entry 3358 (class 2606 OID 16567)
-- Name: emprestimo emprestimo_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_pkey PRIMARY KEY (id);


--
-- TOC entry 3318 (class 2606 OID 16403)
-- Name: estanteprateleira estanteprateleira_estante_prateleira_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.estanteprateleira
    ADD CONSTRAINT estanteprateleira_estante_prateleira_key UNIQUE (estante, prateleira);


--
-- TOC entry 3320 (class 2606 OID 16401)
-- Name: estanteprateleira estanteprateleira_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.estanteprateleira
    ADD CONSTRAINT estanteprateleira_pkey PRIMARY KEY (id);


--
-- TOC entry 3322 (class 2606 OID 16412)
-- Name: estanteprateleirasecao estanteprateleirasecao_id_estante_prateleira_id_secao_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
    ADD CONSTRAINT estanteprateleirasecao_id_estante_prateleira_id_secao_key UNIQUE (id_estante_prateleira, id_secao);


--
-- TOC entry 3324 (class 2606 OID 16410)
-- Name: estanteprateleirasecao estanteprateleirasecao_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
    ADD CONSTRAINT estanteprateleirasecao_pkey PRIMARY KEY (id);


--
-- TOC entry 3342 (class 2606 OID 16497)
-- Name: exemplar exemplar_id_livro_numero_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.exemplar
    ADD CONSTRAINT exemplar_id_livro_numero_key UNIQUE (id_livro, numero);


--
-- TOC entry 3344 (class 2606 OID 16495)
-- Name: exemplar exemplar_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.exemplar
    ADD CONSTRAINT exemplar_pkey PRIMARY KEY (id);


--
-- TOC entry 3360 (class 2606 OID 16598)
-- Name: frequenciaalunos frequenciaalunos_id_aluno_data_frequencia_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.frequenciaalunos
    ADD CONSTRAINT frequenciaalunos_id_aluno_data_frequencia_key UNIQUE (id_aluno, data_frequencia);


--
-- TOC entry 3362 (class 2606 OID 16596)
-- Name: frequenciaalunos frequenciaalunos_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.frequenciaalunos
    ADD CONSTRAINT frequenciaalunos_pkey PRIMARY KEY (id);


--
-- TOC entry 3326 (class 2606 OID 16429)
-- Name: genero genero_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.genero
    ADD CONSTRAINT genero_pkey PRIMARY KEY (id);


--
-- TOC entry 3330 (class 2606 OID 16446)
-- Name: livro livro_isbn_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livro
    ADD CONSTRAINT livro_isbn_key UNIQUE (isbn);


--
-- TOC entry 3332 (class 2606 OID 16444)
-- Name: livro livro_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livro
    ADD CONSTRAINT livro_pkey PRIMARY KEY (id);


--
-- TOC entry 3338 (class 2606 OID 16474)
-- Name: livroautor livroautor_id_livro_id_autor_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livroautor
    ADD CONSTRAINT livroautor_id_livro_id_autor_key UNIQUE (id_livro, id_autor);


--
-- TOC entry 3340 (class 2606 OID 16472)
-- Name: livroautor livroautor_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livroautor
    ADD CONSTRAINT livroautor_pkey PRIMARY KEY (id);


--
-- TOC entry 3334 (class 2606 OID 16455)
-- Name: livrogenero livrogenero_id_livro_id_genero_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livrogenero
    ADD CONSTRAINT livrogenero_id_livro_id_genero_key UNIQUE (id_livro, id_genero);


--
-- TOC entry 3336 (class 2606 OID 16453)
-- Name: livrogenero livrogenero_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livrogenero
    ADD CONSTRAINT livrogenero_pkey PRIMARY KEY (id);


--
-- TOC entry 3364 (class 2606 OID 16617)
-- Name: ocorrencias ocorrencias_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.ocorrencias
    ADD CONSTRAINT ocorrencias_pkey PRIMARY KEY (id);


--
-- TOC entry 3316 (class 2606 OID 16394)
-- Name: secao secao_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.secao
    ADD CONSTRAINT secao_pkey PRIMARY KEY (id);


--
-- TOC entry 3346 (class 2606 OID 16520)
-- Name: turma turma_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.turma
    ADD CONSTRAINT turma_pkey PRIMARY KEY (id);


--
-- TOC entry 3348 (class 2606 OID 16654)
-- Name: turma turma_serie_turma_ano_de_entrada_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.turma
    ADD CONSTRAINT turma_serie_turma_ano_de_entrada_key UNIQUE (serie, turma, ano_de_entrada);


--
-- TOC entry 3354 (class 2606 OID 16554)
-- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);


--
-- TOC entry 3356 (class 2606 OID 16552)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 3378 (class 2606 OID 16537)
-- Name: aluno aluno_id_turma_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.aluno
    ADD CONSTRAINT aluno_id_turma_fkey FOREIGN KEY (id_turma) REFERENCES adelino_cunha.turma(id);


--
-- TOC entry 3387 (class 2606 OID 16638)
-- Name: cronogramaalunomonitor cronogramaalunomonitor_id_aluno_monitor_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.cronogramaalunomonitor
    ADD CONSTRAINT cronogramaalunomonitor_id_aluno_monitor_fkey FOREIGN KEY (id_aluno_monitor) REFERENCES adelino_cunha.usuario(id);


--
-- TOC entry 3379 (class 2606 OID 16583)
-- Name: emprestimo emprestimo_concluido_por_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_concluido_por_fkey FOREIGN KEY (concluido_por) REFERENCES adelino_cunha.usuario(id);


--
-- TOC entry 3380 (class 2606 OID 16568)
-- Name: emprestimo emprestimo_id_aluno_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_id_aluno_fkey FOREIGN KEY (id_aluno) REFERENCES adelino_cunha.aluno(id);


--
-- TOC entry 3381 (class 2606 OID 16573)
-- Name: emprestimo emprestimo_id_exemplar_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_id_exemplar_fkey FOREIGN KEY (id_exemplar) REFERENCES adelino_cunha.exemplar(id);


--
-- TOC entry 3382 (class 2606 OID 16578)
-- Name: emprestimo emprestimo_realizado_por_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_realizado_por_fkey FOREIGN KEY (realizado_por) REFERENCES adelino_cunha.usuario(id);


--
-- TOC entry 3369 (class 2606 OID 16413)
-- Name: estanteprateleirasecao estanteprateleirasecao_id_estante_prateleira_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
    ADD CONSTRAINT estanteprateleirasecao_id_estante_prateleira_fkey FOREIGN KEY (id_estante_prateleira) REFERENCES adelino_cunha.estanteprateleira(id) ON DELETE CASCADE;


--
-- TOC entry 3370 (class 2606 OID 16418)
-- Name: estanteprateleirasecao estanteprateleirasecao_id_secao_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
    ADD CONSTRAINT estanteprateleirasecao_id_secao_fkey FOREIGN KEY (id_secao) REFERENCES adelino_cunha.secao(id) ON DELETE CASCADE;


--
-- TOC entry 3375 (class 2606 OID 16508)
-- Name: exemplar exemplar_id_estante_prateleira_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.exemplar
    ADD CONSTRAINT exemplar_id_estante_prateleira_fkey FOREIGN KEY (id_estante_prateleira) REFERENCES adelino_cunha.estanteprateleira(id);


--
-- TOC entry 3376 (class 2606 OID 16503)
-- Name: exemplar exemplar_id_livro_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.exemplar
    ADD CONSTRAINT exemplar_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES adelino_cunha.livro(id);


--
-- TOC entry 3377 (class 2606 OID 16498)
-- Name: exemplar exemplar_id_secao_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.exemplar
    ADD CONSTRAINT exemplar_id_secao_fkey FOREIGN KEY (id_secao) REFERENCES adelino_cunha.secao(id);


--
-- TOC entry 3388 (class 2606 OID 16661)
-- Name: autor_livros fkcqcotisett8tmmdsg2gmy3un6; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.autor_livros
    ADD CONSTRAINT fkcqcotisett8tmmdsg2gmy3un6 FOREIGN KEY (livros_id) REFERENCES adelino_cunha.livro(id);


--
-- TOC entry 3390 (class 2606 OID 16671)
-- Name: genero_livros fkenknnir1iu7yfdi5t7shor63m; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.genero_livros
    ADD CONSTRAINT fkenknnir1iu7yfdi5t7shor63m FOREIGN KEY (livros_id) REFERENCES adelino_cunha.livro(id);


--
-- TOC entry 3391 (class 2606 OID 16676)
-- Name: genero_livros fkjwshkttf4nf69ksa42nneke5q; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.genero_livros
    ADD CONSTRAINT fkjwshkttf4nf69ksa42nneke5q FOREIGN KEY (generos_id) REFERENCES adelino_cunha.genero(id);


--
-- TOC entry 3389 (class 2606 OID 16666)
-- Name: autor_livros fkt9924svrmphfd60nt6s2vg9fc; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.autor_livros
    ADD CONSTRAINT fkt9924svrmphfd60nt6s2vg9fc FOREIGN KEY (autores_id) REFERENCES adelino_cunha.autor(id);


--
-- TOC entry 3383 (class 2606 OID 16599)
-- Name: frequenciaalunos frequenciaalunos_id_aluno_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.frequenciaalunos
    ADD CONSTRAINT frequenciaalunos_id_aluno_fkey FOREIGN KEY (id_aluno) REFERENCES adelino_cunha.aluno(id);


--
-- TOC entry 3384 (class 2606 OID 16604)
-- Name: frequenciaalunos frequenciaalunos_registrada_por_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.frequenciaalunos
    ADD CONSTRAINT frequenciaalunos_registrada_por_fkey FOREIGN KEY (registrada_por) REFERENCES adelino_cunha.usuario(id);


--
-- TOC entry 3373 (class 2606 OID 16480)
-- Name: livroautor livroautor_id_autor_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livroautor
    ADD CONSTRAINT livroautor_id_autor_fkey FOREIGN KEY (id_autor) REFERENCES adelino_cunha.autor(id) ON DELETE CASCADE;


--
-- TOC entry 3374 (class 2606 OID 16475)
-- Name: livroautor livroautor_id_livro_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livroautor
    ADD CONSTRAINT livroautor_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES adelino_cunha.livro(id) ON DELETE CASCADE;


--
-- TOC entry 3371 (class 2606 OID 16461)
-- Name: livrogenero livrogenero_id_genero_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livrogenero
    ADD CONSTRAINT livrogenero_id_genero_fkey FOREIGN KEY (id_genero) REFERENCES adelino_cunha.genero(id) ON DELETE CASCADE;


--
-- TOC entry 3372 (class 2606 OID 16456)
-- Name: livrogenero livrogenero_id_livro_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.livrogenero
    ADD CONSTRAINT livrogenero_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES adelino_cunha.livro(id) ON DELETE CASCADE;


--
-- TOC entry 3385 (class 2606 OID 16618)
-- Name: ocorrencias ocorrencias_id_aluno_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.ocorrencias
    ADD CONSTRAINT ocorrencias_id_aluno_fkey FOREIGN KEY (id_aluno) REFERENCES adelino_cunha.aluno(id);


--
-- TOC entry 3386 (class 2606 OID 16623)
-- Name: ocorrencias ocorrencias_registrada_por_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
--

ALTER TABLE ONLY adelino_cunha.ocorrencias
    ADD CONSTRAINT ocorrencias_registrada_por_fkey FOREIGN KEY (registrada_por) REFERENCES adelino_cunha.usuario(id);


-- Completed on 2025-02-23 23:01:06 UTC

--
-- PostgreSQL database dump complete
--

