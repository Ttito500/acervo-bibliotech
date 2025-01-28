    --
    -- PostgreSQL database dump
    --

    -- Dumped from database version 16.4
    -- Dumped by pg_dump version 16.4

    -- Started on 2025-01-20 20:20:56

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
    -- TOC entry 6 (class 2615 OID 16630)
    -- Name: adelino_cunha; Type: SCHEMA; Schema: -; Owner: postgres
    --

    CREATE SCHEMA adelino_cunha;


    ALTER SCHEMA adelino_cunha OWNER TO postgres;

    SET default_tablespace = '';

    SET default_table_access_method = heap;

    --
    -- TOC entry 237 (class 1259 OID 16769)
    -- Name: aluno; Type: TABLE; Schema: public; Owner: postgres
    --

    CREATE TABLE adelino_cunha.aluno (
        id integer NOT NULL,
        id_turma integer,
        nome character varying(255) NOT NULL,
        email character varying(255) NOT NULL,
        telefone character varying(15),
        ativo boolean DEFAULT true NOT NULL,
        situacao character varying(7) DEFAULT 'regular'::character varying,
        CONSTRAINT aluno_situacao_check CHECK (((situacao)::text = ANY ((ARRAY['regular'::character varying, 'irregular'::character varying, 'debito'::character varying])::text[])))
    );


    ALTER TABLE adelino_cunha.aluno OWNER TO postgres;

    --
    -- TOC entry 236 (class 1259 OID 16768)
    -- Name: aluno_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.aluno_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.aluno_id_seq OWNER TO postgres;

    --
    -- TOC entry 5009 (class 0 OID 0)
    -- Dependencies: 236
    -- Name: aluno_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.aluno_id_seq OWNED BY adelino_cunha.aluno.id;


    --
    -- TOC entry 225 (class 1259 OID 16676)
    -- Name: autor; Type: TABLE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE TABLE adelino_cunha.autor (
        id integer NOT NULL,
        nome character varying(255) NOT NULL
    );


    ALTER TABLE adelino_cunha.autor OWNER TO postgres;

    --
    -- TOC entry 224 (class 1259 OID 16675)
    -- Name: autor_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.autor_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.autor_id_seq OWNER TO postgres;

    --
    -- TOC entry 5010 (class 0 OID 0)
    -- Dependencies: 224
    -- Name: autor_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.autor_id_seq OWNED BY adelino_cunha.autor.id;


    --
    -- TOC entry 241 (class 1259 OID 16801)
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
        situacao character varying(10) DEFAULT 'pendente'::character varying,
        observacao character varying(500),
        realizado_por integer NOT NULL,
        concluido_por integer,
        CONSTRAINT emprestimo_situacao_check CHECK (((situacao)::text = ANY ((ARRAY['pendente'::character varying, 'atrasado'::character varying, 'entregue'::character varying, 'extraviado'::character varying, 'cancelado'::character varying])::text[])))
    );


    ALTER TABLE adelino_cunha.emprestimo OWNER TO postgres;

    --
    -- TOC entry 240 (class 1259 OID 16800)
    -- Name: emprestimo_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.emprestimo_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.emprestimo_id_seq OWNER TO postgres;

    --
    -- TOC entry 5011 (class 0 OID 0)
    -- Dependencies: 240
    -- Name: emprestimo_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.emprestimo_id_seq OWNED BY adelino_cunha.emprestimo.id;


    --
    -- TOC entry 219 (class 1259 OID 16639)
    -- Name: estanteprateleira; Type: TABLE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE TABLE adelino_cunha.estanteprateleira (
        id integer NOT NULL,
        estante character varying(1) NOT NULL,
        prateleira integer NOT NULL
    );


    ALTER TABLE adelino_cunha.estanteprateleira OWNER TO postgres;

    --
    -- TOC entry 218 (class 1259 OID 16638)
    -- Name: estanteprateleira_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.estanteprateleira_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.estanteprateleira_id_seq OWNER TO postgres;

    --
    -- TOC entry 5012 (class 0 OID 0)
    -- Dependencies: 218
    -- Name: estanteprateleira_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.estanteprateleira_id_seq OWNED BY adelino_cunha.estanteprateleira.id;


    --
    -- TOC entry 221 (class 1259 OID 16650)
    -- Name: estanteprateleirasecao; Type: TABLE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE TABLE adelino_cunha.estanteprateleirasecao (
        id integer NOT NULL,
        id_estante_prateleira integer NOT NULL,
        id_secao integer NOT NULL
    );


    ALTER TABLE adelino_cunha.estanteprateleirasecao OWNER TO postgres;

    --
    -- TOC entry 220 (class 1259 OID 16649)
    -- Name: estanteprateleirasecao_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.estanteprateleirasecao_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.estanteprateleirasecao_id_seq OWNER TO postgres;

    --
    -- TOC entry 5013 (class 0 OID 0)
    -- Dependencies: 220
    -- Name: estanteprateleirasecao_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.estanteprateleirasecao_id_seq OWNED BY adelino_cunha.estanteprateleirasecao.id;


    --
    -- TOC entry 233 (class 1259 OID 16731)
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
    -- TOC entry 232 (class 1259 OID 16730)
    -- Name: exemplar_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.exemplar_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.exemplar_id_seq OWNER TO postgres;

    --
    -- TOC entry 5014 (class 0 OID 0)
    -- Dependencies: 232
    -- Name: exemplar_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.exemplar_id_seq OWNED BY adelino_cunha.exemplar.id;


    --
    -- TOC entry 223 (class 1259 OID 16669)
    -- Name: genero; Type: TABLE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE TABLE adelino_cunha.genero (
        id integer NOT NULL,
        genero character varying(100) NOT NULL
    );


    ALTER TABLE adelino_cunha.genero OWNER TO postgres;

    --
    -- TOC entry 222 (class 1259 OID 16668)
    -- Name: genero_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.genero_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.genero_id_seq OWNER TO postgres;

    --
    -- TOC entry 5015 (class 0 OID 0)
    -- Dependencies: 222
    -- Name: genero_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.genero_id_seq OWNED BY adelino_cunha.genero.id;


    --
    -- TOC entry 227 (class 1259 OID 16683)
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
    -- TOC entry 226 (class 1259 OID 16682)
    -- Name: livro_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.livro_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.livro_id_seq OWNER TO postgres;

    --
    -- TOC entry 5016 (class 0 OID 0)
    -- Dependencies: 226
    -- Name: livro_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.livro_id_seq OWNED BY adelino_cunha.livro.id;


    --
    -- TOC entry 231 (class 1259 OID 16712)
    -- Name: livroautor; Type: TABLE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE TABLE adelino_cunha.livroautor (
        id integer NOT NULL,
        id_livro integer NOT NULL,
        id_autor integer NOT NULL
    );


    ALTER TABLE adelino_cunha.livroautor OWNER TO postgres;

    --
    -- TOC entry 230 (class 1259 OID 16711)
    -- Name: livroautor_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.livroautor_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.livroautor_id_seq OWNER TO postgres;

    --
    -- TOC entry 5017 (class 0 OID 0)
    -- Dependencies: 230
    -- Name: livroautor_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.livroautor_id_seq OWNED BY adelino_cunha.livroautor.id;


    --
    -- TOC entry 229 (class 1259 OID 16693)
    -- Name: livrogenero; Type: TABLE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE TABLE adelino_cunha.livrogenero (
        id integer NOT NULL,
        id_livro integer NOT NULL,
        id_genero integer NOT NULL
    );


    ALTER TABLE adelino_cunha.livrogenero OWNER TO postgres;

    --
    -- TOC entry 228 (class 1259 OID 16692)
    -- Name: livrogenero_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.livrogenero_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.livrogenero_id_seq OWNER TO postgres;

    --
    -- TOC entry 5018 (class 0 OID 0)
    -- Dependencies: 228
    -- Name: livrogenero_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.livrogenero_id_seq OWNED BY adelino_cunha.livrogenero.id;


    --
    -- TOC entry 217 (class 1259 OID 16632)
    -- Name: secao; Type: TABLE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE TABLE adelino_cunha.secao (
        id integer NOT NULL,
        nome character varying(100) NOT NULL
    );


    ALTER TABLE adelino_cunha.secao OWNER TO postgres;

    --
    -- TOC entry 216 (class 1259 OID 16631)
    -- Name: secao_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.secao_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.secao_id_seq OWNER TO postgres;

    --
    -- TOC entry 5019 (class 0 OID 0)
    -- Dependencies: 216
    -- Name: secao_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.secao_id_seq OWNED BY adelino_cunha.secao.id;


    --
    -- TOC entry 235 (class 1259 OID 16759)
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
    -- TOC entry 234 (class 1259 OID 16758)
    -- Name: turma_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.turma_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.turma_id_seq OWNER TO postgres;

    --
    -- TOC entry 5020 (class 0 OID 0)
    -- Dependencies: 234
    -- Name: turma_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.turma_id_seq OWNED BY adelino_cunha.turma.id;


    --
    -- TOC entry 239 (class 1259 OID 16788)
    -- Name: usuario; Type: TABLE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE TABLE adelino_cunha.usuario (
        id integer NOT NULL,
        nome character varying(255) NOT NULL,
        cargo character varying(13) NOT NULL,
        ativo boolean DEFAULT true NOT NULL,
        email character varying(255) NOT NULL,
        senha character varying(255) NOT NULL,
        data_ultimo_acesso timestamp without time zone,
        CONSTRAINT usuario_cargo_check CHECK (((cargo)::text = ANY ((ARRAY['bibliotecario'::character varying, 'aluno_monitor'::character varying])::text[])))
    );


    ALTER TABLE adelino_cunha.usuario OWNER TO postgres;

    --
    -- TOC entry 238 (class 1259 OID 16787)
    -- Name: usuario_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: postgres
    --

    CREATE SEQUENCE adelino_cunha.usuario_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER SEQUENCE adelino_cunha.usuario_id_seq OWNER TO postgres;

    --
    -- TOC entry 5021 (class 0 OID 0)
    -- Dependencies: 238
    -- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: postgres
    --

    ALTER SEQUENCE adelino_cunha.usuario_id_seq OWNED BY adelino_cunha.usuario.id;


    --
    -- TOC entry 4762 (class 2604 OID 16772)
    -- Name: aluno id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.aluno ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.aluno_id_seq'::regclass);


    --
    -- TOC entry 4753 (class 2604 OID 16679)
    -- Name: autor id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.autor ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.autor_id_seq'::regclass);


    --
    -- TOC entry 4767 (class 2604 OID 16804)
    -- Name: emprestimo id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.emprestimo ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.emprestimo_id_seq'::regclass);


    --
    -- TOC entry 4750 (class 2604 OID 16642)
    -- Name: estanteprateleira id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.estanteprateleira ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.estanteprateleira_id_seq'::regclass);


    --
    -- TOC entry 4751 (class 2604 OID 16653)
    -- Name: estanteprateleirasecao id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.estanteprateleirasecao_id_seq'::regclass);


    --
    -- TOC entry 4758 (class 2604 OID 16734)
    -- Name: exemplar id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.exemplar ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.exemplar_id_seq'::regclass);


    --
    -- TOC entry 4752 (class 2604 OID 16672)
    -- Name: genero id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.genero ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.genero_id_seq'::regclass);


    --
    -- TOC entry 4754 (class 2604 OID 16686)
    -- Name: livro id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livro ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.livro_id_seq'::regclass);


    --
    -- TOC entry 4757 (class 2604 OID 16715)
    -- Name: livroautor id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livroautor ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.livroautor_id_seq'::regclass);


    --
    -- TOC entry 4756 (class 2604 OID 16696)
    -- Name: livrogenero id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livrogenero ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.livrogenero_id_seq'::regclass);


    --
    -- TOC entry 4749 (class 2604 OID 16635)
    -- Name: secao id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.secao ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.secao_id_seq'::regclass);


    --
    -- TOC entry 4760 (class 2604 OID 16762)
    -- Name: turma id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.turma ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.turma_id_seq'::regclass);


    --
    -- TOC entry 4765 (class 2604 OID 16791)
    -- Name: usuario id; Type: DEFAULT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.usuario ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.usuario_id_seq'::regclass);


    --
    -- TOC entry 4999 (class 0 OID 16769)
    -- Dependencies: 237
    -- Data for Name: aluno; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.aluno (id, id_turma, nome, email, telefone, ativo, situacao) FROM stdin;
    \.


    --
    -- TOC entry 4987 (class 0 OID 16676)
    -- Dependencies: 225
    -- Data for Name: autor; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.autor (id, nome) FROM stdin;
    \.


    --
    -- TOC entry 5003 (class 0 OID 16801)
    -- Dependencies: 241
    -- Data for Name: emprestimo; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.emprestimo (id, id_aluno, id_exemplar, data_emprestimo, data_conclusao, data_prazo, qtd_renovacao, situacao, observacao, realizado_por, concluido_por) FROM stdin;
    \.


    --
    -- TOC entry 4981 (class 0 OID 16639)
    -- Dependencies: 219
    -- Data for Name: estanteprateleira; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.estanteprateleira (id, estante, prateleira) FROM stdin;
    \.


    --
    -- TOC entry 4983 (class 0 OID 16650)
    -- Dependencies: 221
    -- Data for Name: estanteprateleirasecao; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.estanteprateleirasecao (id, id_estante_prateleira, id_secao) FROM stdin;
    \.


    --
    -- TOC entry 4995 (class 0 OID 16731)
    -- Dependencies: 233
    -- Data for Name: exemplar; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.exemplar (id, id_livro, id_secao, id_estante_prateleira, observacao, numero, situacao) FROM stdin;
    \.


    --
    -- TOC entry 4985 (class 0 OID 16669)
    -- Dependencies: 223
    -- Data for Name: genero; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.genero (id, genero) FROM stdin;
    \.


    --
    -- TOC entry 4989 (class 0 OID 16683)
    -- Dependencies: 227
    -- Data for Name: livro; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.livro (id, isbn, titulo, ativo) FROM stdin;
    \.


    --
    -- TOC entry 4993 (class 0 OID 16712)
    -- Dependencies: 231
    -- Data for Name: livroautor; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.livroautor (id, id_livro, id_autor) FROM stdin;
    \.


    --
    -- TOC entry 4991 (class 0 OID 16693)
    -- Dependencies: 229
    -- Data for Name: livrogenero; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.livrogenero (id, id_livro, id_genero) FROM stdin;
    \.


    --
    -- TOC entry 4979 (class 0 OID 16632)
    -- Dependencies: 217
    -- Data for Name: secao; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.secao (id, nome) FROM stdin;
    \.


    --
    -- TOC entry 4997 (class 0 OID 16759)
    -- Dependencies: 235
    -- Data for Name: turma; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.turma (id, serie, turma, ano_de_entrada, ativo) FROM stdin;
    \.


    --
    -- TOC entry 5001 (class 0 OID 16788)
    -- Dependencies: 239
    -- Data for Name: usuario; Type: TABLE DATA; Schema: adelino_cunha; Owner: postgres
    --

    COPY adelino_cunha.usuario (id, nome, cargo, ativo, email, senha, data_ultimo_acesso) FROM stdin;
    \.


    --
    -- TOC entry 5022 (class 0 OID 0)
    -- Dependencies: 236
    -- Name: aluno_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.aluno_id_seq', 1, false);


    --
    -- TOC entry 5023 (class 0 OID 0)
    -- Dependencies: 224
    -- Name: autor_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.autor_id_seq', 1, false);


    --
    -- TOC entry 5024 (class 0 OID 0)
    -- Dependencies: 240
    -- Name: emprestimo_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.emprestimo_id_seq', 1, false);


    --
    -- TOC entry 5025 (class 0 OID 0)
    -- Dependencies: 218
    -- Name: estanteprateleira_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.estanteprateleira_id_seq', 1, false);


    --
    -- TOC entry 5026 (class 0 OID 0)
    -- Dependencies: 220
    -- Name: estanteprateleirasecao_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.estanteprateleirasecao_id_seq', 1, false);


    --
    -- TOC entry 5027 (class 0 OID 0)
    -- Dependencies: 232
    -- Name: exemplar_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.exemplar_id_seq', 1, false);


    --
    -- TOC entry 5028 (class 0 OID 0)
    -- Dependencies: 222
    -- Name: genero_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.genero_id_seq', 1, false);


    --
    -- TOC entry 5029 (class 0 OID 0)
    -- Dependencies: 226
    -- Name: livro_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.livro_id_seq', 1, false);


    --
    -- TOC entry 5030 (class 0 OID 0)
    -- Dependencies: 230
    -- Name: livroautor_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.livroautor_id_seq', 1, false);


    --
    -- TOC entry 5031 (class 0 OID 0)
    -- Dependencies: 228
    -- Name: livrogenero_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.livrogenero_id_seq', 1, false);


    --
    -- TOC entry 5032 (class 0 OID 0)
    -- Dependencies: 216
    -- Name: secao_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.secao_id_seq', 1, false);


    --
    -- TOC entry 5033 (class 0 OID 0)
    -- Dependencies: 234
    -- Name: turma_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.turma_id_seq', 1, false);


    --
    -- TOC entry 5034 (class 0 OID 0)
    -- Dependencies: 238
    -- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: postgres
    --

    SELECT pg_catalog.setval('adelino_cunha.usuario_id_seq', 1, false);


    --
    -- TOC entry 4812 (class 2606 OID 16781)
    -- Name: aluno aluno_email_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.aluno
        ADD CONSTRAINT aluno_email_key UNIQUE (email);


    --
    -- TOC entry 4814 (class 2606 OID 16779)
    -- Name: aluno aluno_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.aluno
        ADD CONSTRAINT aluno_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4790 (class 2606 OID 16681)
    -- Name: autor autor_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.autor
        ADD CONSTRAINT autor_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4820 (class 2606 OID 16812)
    -- Name: emprestimo emprestimo_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.emprestimo
        ADD CONSTRAINT emprestimo_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4778 (class 2606 OID 16646)
    -- Name: estanteprateleira estanteprateleira_estante_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.estanteprateleira
        ADD CONSTRAINT estanteprateleira_estante_key UNIQUE (estante);


    --
    -- TOC entry 4780 (class 2606 OID 16648)
    -- Name: estanteprateleira estanteprateleira_estante_prateleira_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.estanteprateleira
        ADD CONSTRAINT estanteprateleira_estante_prateleira_key UNIQUE (estante, prateleira);


    --
    -- TOC entry 4782 (class 2606 OID 16644)
    -- Name: estanteprateleira estanteprateleira_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.estanteprateleira
        ADD CONSTRAINT estanteprateleira_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4784 (class 2606 OID 16657)
    -- Name: estanteprateleirasecao estanteprateleirasecao_id_estante_prateleira_id_secao_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
        ADD CONSTRAINT estanteprateleirasecao_id_estante_prateleira_id_secao_key UNIQUE (id_estante_prateleira, id_secao);


    --
    -- TOC entry 4786 (class 2606 OID 16655)
    -- Name: estanteprateleirasecao estanteprateleirasecao_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
        ADD CONSTRAINT estanteprateleirasecao_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4804 (class 2606 OID 16742)
    -- Name: exemplar exemplar_numero_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.exemplar
        ADD CONSTRAINT exemplar_numero_key UNIQUE (numero);


    --
    -- TOC entry 4806 (class 2606 OID 16740)
    -- Name: exemplar exemplar_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.exemplar
        ADD CONSTRAINT exemplar_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4788 (class 2606 OID 16674)
    -- Name: genero genero_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.genero
        ADD CONSTRAINT genero_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4792 (class 2606 OID 16691)
    -- Name: livro livro_isbn_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livro
        ADD CONSTRAINT livro_isbn_key UNIQUE (isbn);


    --
    -- TOC entry 4794 (class 2606 OID 16689)
    -- Name: livro livro_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livro
        ADD CONSTRAINT livro_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4800 (class 2606 OID 16719)
    -- Name: livroautor livroautor_id_livro_id_autor_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livroautor
        ADD CONSTRAINT livroautor_id_livro_id_autor_key UNIQUE (id_livro, id_autor);


    --
    -- TOC entry 4802 (class 2606 OID 16717)
    -- Name: livroautor livroautor_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livroautor
        ADD CONSTRAINT livroautor_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4796 (class 2606 OID 16700)
    -- Name: livrogenero livrogenero_id_livro_id_genero_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livrogenero
        ADD CONSTRAINT livrogenero_id_livro_id_genero_key UNIQUE (id_livro, id_genero);


    --
    -- TOC entry 4798 (class 2606 OID 16698)
    -- Name: livrogenero livrogenero_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livrogenero
        ADD CONSTRAINT livrogenero_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4776 (class 2606 OID 16637)
    -- Name: secao secao_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.secao
        ADD CONSTRAINT secao_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4808 (class 2606 OID 16765)
    -- Name: turma turma_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.turma
        ADD CONSTRAINT turma_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4810 (class 2606 OID 16767)
    -- Name: turma turma_serie_turma_ano_de_entrada_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.turma
        ADD CONSTRAINT turma_serie_turma_ano_de_entrada_key UNIQUE (serie, turma, ano_de_entrada);


    --
    -- TOC entry 4816 (class 2606 OID 16799)
    -- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.usuario
        ADD CONSTRAINT usuario_email_key UNIQUE (email);


    --
    -- TOC entry 4818 (class 2606 OID 16797)
    -- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.usuario
        ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


    --
    -- TOC entry 4830 (class 2606 OID 16782)
    -- Name: aluno aluno_id_turma_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.aluno
        ADD CONSTRAINT aluno_id_turma_fkey FOREIGN KEY (id_turma) REFERENCES adelino_cunha.turma(id);


    --
    -- TOC entry 4831 (class 2606 OID 16828)
    -- Name: emprestimo emprestimo_concluido_por_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.emprestimo
        ADD CONSTRAINT emprestimo_concluido_por_fkey FOREIGN KEY (concluido_por) REFERENCES adelino_cunha.usuario(id);


    --
    -- TOC entry 4832 (class 2606 OID 16813)
    -- Name: emprestimo emprestimo_id_aluno_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.emprestimo
        ADD CONSTRAINT emprestimo_id_aluno_fkey FOREIGN KEY (id_aluno) REFERENCES adelino_cunha.aluno(id);


    --
    -- TOC entry 4833 (class 2606 OID 16818)
    -- Name: emprestimo emprestimo_id_exemplar_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.emprestimo
        ADD CONSTRAINT emprestimo_id_exemplar_fkey FOREIGN KEY (id_exemplar) REFERENCES adelino_cunha.exemplar(id);


    --
    -- TOC entry 4834 (class 2606 OID 16823)
    -- Name: emprestimo emprestimo_realizado_por_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.emprestimo
        ADD CONSTRAINT emprestimo_realizado_por_fkey FOREIGN KEY (realizado_por) REFERENCES adelino_cunha.usuario(id);


    --
    -- TOC entry 4821 (class 2606 OID 16658)
    -- Name: estanteprateleirasecao estanteprateleirasecao_id_estante_prateleira_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
        ADD CONSTRAINT estanteprateleirasecao_id_estante_prateleira_fkey FOREIGN KEY (id_estante_prateleira) REFERENCES adelino_cunha.estanteprateleira(id) ON DELETE CASCADE;


    --
    -- TOC entry 4822 (class 2606 OID 16663)
    -- Name: estanteprateleirasecao estanteprateleirasecao_id_secao_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
        ADD CONSTRAINT estanteprateleirasecao_id_secao_fkey FOREIGN KEY (id_secao) REFERENCES adelino_cunha.secao(id) ON DELETE CASCADE;


    --
    -- TOC entry 4827 (class 2606 OID 16753)
    -- Name: exemplar exemplar_id_estante_prateleira_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.exemplar
        ADD CONSTRAINT exemplar_id_estante_prateleira_fkey FOREIGN KEY (id_estante_prateleira) REFERENCES adelino_cunha.estanteprateleira(id);


    --
    -- TOC entry 4828 (class 2606 OID 16743)
    -- Name: exemplar exemplar_id_livro_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.exemplar
        ADD CONSTRAINT exemplar_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES adelino_cunha.livro(id);


    --
    -- TOC entry 4829 (class 2606 OID 16748)
    -- Name: exemplar exemplar_id_secao_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.exemplar
        ADD CONSTRAINT exemplar_id_secao_fkey FOREIGN KEY (id_secao) REFERENCES adelino_cunha.secao(id);


    --
    -- TOC entry 4825 (class 2606 OID 16725)
    -- Name: livroautor livroautor_id_autor_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livroautor
        ADD CONSTRAINT livroautor_id_autor_fkey FOREIGN KEY (id_autor) REFERENCES adelino_cunha.autor(id) ON DELETE CASCADE;


    --
    -- TOC entry 4826 (class 2606 OID 16720)
    -- Name: livroautor livroautor_id_livro_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livroautor
        ADD CONSTRAINT livroautor_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES adelino_cunha.livro(id) ON DELETE CASCADE;


    --
    -- TOC entry 4823 (class 2606 OID 16706)
    -- Name: livrogenero livrogenero_id_genero_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livrogenero
        ADD CONSTRAINT livrogenero_id_genero_fkey FOREIGN KEY (id_genero) REFERENCES adelino_cunha.genero(id) ON DELETE CASCADE;


    --
    -- TOC entry 4824 (class 2606 OID 16701)
    -- Name: livrogenero livrogenero_id_livro_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: postgres
    --

    ALTER TABLE ONLY adelino_cunha.livrogenero
        ADD CONSTRAINT livrogenero_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES adelino_cunha.livro(id) ON DELETE CASCADE;


    -- Completed on 2025-01-20 20:20:56

    --
    -- PostgreSQL database dump complete
    --

