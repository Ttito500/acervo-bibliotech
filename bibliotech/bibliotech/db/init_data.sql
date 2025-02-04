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

ALTER TABLE IF EXISTS ONLY adelino_cunha.ocorrencias DROP CONSTRAINT IF EXISTS ocorrencias_registrada_por_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.ocorrencias DROP CONSTRAINT IF EXISTS ocorrencias_id_aluno_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.livrogenero DROP CONSTRAINT IF EXISTS livrogenero_id_livro_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.livrogenero DROP CONSTRAINT IF EXISTS livrogenero_id_genero_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.livroautor DROP CONSTRAINT IF EXISTS livroautor_id_livro_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.livroautor DROP CONSTRAINT IF EXISTS livroautor_id_autor_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.frequenciaalunos DROP CONSTRAINT IF EXISTS frequenciaalunos_registrada_por_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.frequenciaalunos DROP CONSTRAINT IF EXISTS frequenciaalunos_id_aluno_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.exemplar DROP CONSTRAINT IF EXISTS exemplar_id_secao_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.exemplar DROP CONSTRAINT IF EXISTS exemplar_id_livro_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.exemplar DROP CONSTRAINT IF EXISTS exemplar_id_estante_prateleira_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.estanteprateleirasecao DROP CONSTRAINT IF EXISTS estanteprateleirasecao_id_secao_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.estanteprateleirasecao DROP CONSTRAINT IF EXISTS estanteprateleirasecao_id_estante_prateleira_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.emprestimo DROP CONSTRAINT IF EXISTS emprestimo_realizado_por_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.emprestimo DROP CONSTRAINT IF EXISTS emprestimo_id_exemplar_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.emprestimo DROP CONSTRAINT IF EXISTS emprestimo_id_aluno_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.emprestimo DROP CONSTRAINT IF EXISTS emprestimo_concluido_por_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.cronogramaalunomonitor DROP CONSTRAINT IF EXISTS cronogramaalunomonitor_id_aluno_monitor_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.aluno DROP CONSTRAINT IF EXISTS aluno_id_turma_fkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.usuario DROP CONSTRAINT IF EXISTS usuario_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.usuario DROP CONSTRAINT IF EXISTS usuario_email_key;
ALTER TABLE IF EXISTS ONLY adelino_cunha.turma DROP CONSTRAINT IF EXISTS turma_serie_turma_ano_de_entrada_key;
ALTER TABLE IF EXISTS ONLY adelino_cunha.turma DROP CONSTRAINT IF EXISTS turma_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.secao DROP CONSTRAINT IF EXISTS secao_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.ocorrencias DROP CONSTRAINT IF EXISTS ocorrencias_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.livrogenero DROP CONSTRAINT IF EXISTS livrogenero_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.livrogenero DROP CONSTRAINT IF EXISTS livrogenero_id_livro_id_genero_key;
ALTER TABLE IF EXISTS ONLY adelino_cunha.livroautor DROP CONSTRAINT IF EXISTS livroautor_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.livroautor DROP CONSTRAINT IF EXISTS livroautor_id_livro_id_autor_key;
ALTER TABLE IF EXISTS ONLY adelino_cunha.livro DROP CONSTRAINT IF EXISTS livro_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.livro DROP CONSTRAINT IF EXISTS livro_isbn_key;
ALTER TABLE IF EXISTS ONLY adelino_cunha.genero DROP CONSTRAINT IF EXISTS genero_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.frequenciaalunos DROP CONSTRAINT IF EXISTS frequenciaalunos_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.frequenciaalunos DROP CONSTRAINT IF EXISTS frequenciaalunos_id_aluno_data_frequencia_key;
ALTER TABLE IF EXISTS ONLY adelino_cunha.exemplar DROP CONSTRAINT IF EXISTS exemplar_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.exemplar DROP CONSTRAINT IF EXISTS exemplar_numero_key;
ALTER TABLE IF EXISTS ONLY adelino_cunha.estanteprateleirasecao DROP CONSTRAINT IF EXISTS estanteprateleirasecao_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.estanteprateleirasecao DROP CONSTRAINT IF EXISTS estanteprateleirasecao_id_estante_prateleira_id_secao_key;
ALTER TABLE IF EXISTS ONLY adelino_cunha.estanteprateleira DROP CONSTRAINT IF EXISTS estanteprateleira_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.estanteprateleira DROP CONSTRAINT IF EXISTS estanteprateleira_estante_prateleira_key;
ALTER TABLE IF EXISTS ONLY adelino_cunha.estanteprateleira DROP CONSTRAINT IF EXISTS estanteprateleira_estante_key;
ALTER TABLE IF EXISTS ONLY adelino_cunha.emprestimo DROP CONSTRAINT IF EXISTS emprestimo_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.cronogramaalunomonitor DROP CONSTRAINT IF EXISTS cronogramaalunomonitor_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.cronogramaalunomonitor DROP CONSTRAINT IF EXISTS cronogramaalunomonitor_id_aluno_monitor_dia_da_semana_key;
ALTER TABLE IF EXISTS ONLY adelino_cunha.autor DROP CONSTRAINT IF EXISTS autor_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.aluno DROP CONSTRAINT IF EXISTS aluno_pkey;
ALTER TABLE IF EXISTS ONLY adelino_cunha.aluno DROP CONSTRAINT IF EXISTS aluno_email_key;
ALTER TABLE IF EXISTS adelino_cunha.usuario ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.turma ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.secao ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.ocorrencias ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.livrogenero ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.livroautor ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.livro ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.genero ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.frequenciaalunos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.exemplar ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.estanteprateleirasecao ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.estanteprateleira ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.emprestimo ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.cronogramaalunomonitor ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.autor ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS adelino_cunha.aluno ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS adelino_cunha.usuario_id_seq;
DROP TABLE IF EXISTS adelino_cunha.usuario;
DROP SEQUENCE IF EXISTS adelino_cunha.turma_id_seq;
DROP TABLE IF EXISTS adelino_cunha.turma;
DROP SEQUENCE IF EXISTS adelino_cunha.secao_id_seq;
DROP TABLE IF EXISTS adelino_cunha.secao;
DROP SEQUENCE IF EXISTS adelino_cunha.ocorrencias_id_seq;
DROP TABLE IF EXISTS adelino_cunha.ocorrencias;
DROP SEQUENCE IF EXISTS adelino_cunha.livrogenero_id_seq;
DROP TABLE IF EXISTS adelino_cunha.livrogenero;
DROP SEQUENCE IF EXISTS adelino_cunha.livroautor_id_seq;
DROP TABLE IF EXISTS adelino_cunha.livroautor;
DROP SEQUENCE IF EXISTS adelino_cunha.livro_id_seq;
DROP TABLE IF EXISTS adelino_cunha.livro;
DROP SEQUENCE IF EXISTS adelino_cunha.genero_id_seq;
DROP TABLE IF EXISTS adelino_cunha.genero;
DROP SEQUENCE IF EXISTS adelino_cunha.frequenciaalunos_id_seq;
DROP TABLE IF EXISTS adelino_cunha.frequenciaalunos;
DROP SEQUENCE IF EXISTS adelino_cunha.exemplar_id_seq;
DROP TABLE IF EXISTS adelino_cunha.exemplar;
DROP SEQUENCE IF EXISTS adelino_cunha.estanteprateleirasecao_id_seq;
DROP TABLE IF EXISTS adelino_cunha.estanteprateleirasecao;
DROP SEQUENCE IF EXISTS adelino_cunha.estanteprateleira_id_seq;
DROP TABLE IF EXISTS adelino_cunha.estanteprateleira;
DROP SEQUENCE IF EXISTS adelino_cunha.emprestimo_id_seq;
DROP TABLE IF EXISTS adelino_cunha.emprestimo;
DROP SEQUENCE IF EXISTS adelino_cunha.cronogramaalunomonitor_id_seq;
DROP TABLE IF EXISTS adelino_cunha.cronogramaalunomonitor;
DROP SEQUENCE IF EXISTS adelino_cunha.autor_id_seq;
DROP TABLE IF EXISTS adelino_cunha.autor;
DROP SEQUENCE IF EXISTS adelino_cunha.aluno_id_seq;
DROP TABLE IF EXISTS adelino_cunha.aluno;
DROP SCHEMA IF EXISTS adelino_cunha;
--
-- Name: adelino_cunha; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA adelino_cunha;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: aluno; Type: TABLE; Schema: adelino_cunha; Owner: -
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


--
-- Name: aluno_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.aluno_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: aluno_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.aluno_id_seq OWNED BY adelino_cunha.aluno.id;


--
-- Name: autor; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.autor (
                                     id integer NOT NULL,
                                     nome character varying(255) NOT NULL
);


--
-- Name: autor_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.autor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: autor_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.autor_id_seq OWNED BY adelino_cunha.autor.id;


--
-- Name: cronogramaalunomonitor; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.cronogramaalunomonitor (
                                                      id integer NOT NULL,
                                                      id_aluno_monitor integer NOT NULL,
                                                      dia_da_semana character varying(20) NOT NULL,
                                                      CONSTRAINT cronogramaalunomonitor_dia_da_semana_check CHECK (((dia_da_semana)::text = ANY ((ARRAY['segunda-feira'::character varying, 'terca-feira'::character varying, 'quarta-feira'::character varying, 'quinta-feira'::character varying, 'sexta-feira'::character varying])::text[])))
);


--
-- Name: cronogramaalunomonitor_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.cronogramaalunomonitor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cronogramaalunomonitor_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.cronogramaalunomonitor_id_seq OWNED BY adelino_cunha.cronogramaalunomonitor.id;


--
-- Name: emprestimo; Type: TABLE; Schema: adelino_cunha; Owner: -
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


--
-- Name: emprestimo_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.emprestimo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: emprestimo_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.emprestimo_id_seq OWNED BY adelino_cunha.emprestimo.id;


--
-- Name: estanteprateleira; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.estanteprateleira (
                                                 id integer NOT NULL,
                                                 estante character varying(1) NOT NULL,
                                                 prateleira integer NOT NULL
);


--
-- Name: estanteprateleira_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.estanteprateleira_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: estanteprateleira_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.estanteprateleira_id_seq OWNED BY adelino_cunha.estanteprateleira.id;


--
-- Name: estanteprateleirasecao; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.estanteprateleirasecao (
                                                      id integer NOT NULL,
                                                      id_estante_prateleira integer NOT NULL,
                                                      id_secao integer NOT NULL
);


--
-- Name: estanteprateleirasecao_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.estanteprateleirasecao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: estanteprateleirasecao_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.estanteprateleirasecao_id_seq OWNED BY adelino_cunha.estanteprateleirasecao.id;


--
-- Name: exemplar; Type: TABLE; Schema: adelino_cunha; Owner: -
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


--
-- Name: exemplar_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.exemplar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: exemplar_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.exemplar_id_seq OWNED BY adelino_cunha.exemplar.id;


--
-- Name: frequenciaalunos; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.frequenciaalunos (
                                                id integer NOT NULL,
                                                id_aluno integer NOT NULL,
                                                registrada_por integer NOT NULL,
                                                atividade character varying(20) DEFAULT 'lendo'::character varying,
                                                data_frequencia date NOT NULL,
                                                CONSTRAINT frequenciaalunos_atividade_check CHECK (((atividade)::text = ANY ((ARRAY['lendo'::character varying, 'celula_de_estudo'::character varying, 'estudo_individual'::character varying, 'descansando'::character varying, 'outros'::character varying])::text[])))
);


--
-- Name: frequenciaalunos_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.frequenciaalunos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: frequenciaalunos_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.frequenciaalunos_id_seq OWNED BY adelino_cunha.frequenciaalunos.id;


--
-- Name: genero; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.genero (
                                      id integer NOT NULL,
                                      genero character varying(100) NOT NULL
);


--
-- Name: genero_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.genero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: genero_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.genero_id_seq OWNED BY adelino_cunha.genero.id;


--
-- Name: livro; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.livro (
                                     id integer NOT NULL,
                                     isbn character varying(13) NOT NULL,
                                     titulo character varying(255) NOT NULL,
                                     ativo boolean DEFAULT true NOT NULL
);


--
-- Name: livro_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.livro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: livro_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.livro_id_seq OWNED BY adelino_cunha.livro.id;


--
-- Name: livroautor; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.livroautor (
                                          id integer NOT NULL,
                                          id_livro integer NOT NULL,
                                          id_autor integer NOT NULL
);


--
-- Name: livroautor_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.livroautor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: livroautor_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.livroautor_id_seq OWNED BY adelino_cunha.livroautor.id;


--
-- Name: livrogenero; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.livrogenero (
                                           id integer NOT NULL,
                                           id_livro integer NOT NULL,
                                           id_genero integer NOT NULL
);


--
-- Name: livrogenero_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.livrogenero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: livrogenero_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.livrogenero_id_seq OWNED BY adelino_cunha.livrogenero.id;


--
-- Name: ocorrencias; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.ocorrencias (
                                           id integer NOT NULL,
                                           id_aluno integer NOT NULL,
                                           registrada_por integer NOT NULL,
                                           detalhes character varying(500),
                                           data_ocorrencia date NOT NULL
);


--
-- Name: ocorrencias_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.ocorrencias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ocorrencias_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.ocorrencias_id_seq OWNED BY adelino_cunha.ocorrencias.id;


--
-- Name: secao; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.secao (
                                     id integer NOT NULL,
                                     nome character varying(100) NOT NULL,
                                     descricao character varying(500)
);


--
-- Name: secao_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.secao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: secao_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.secao_id_seq OWNED BY adelino_cunha.secao.id;


--
-- Name: turma; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.turma (
                                     id integer NOT NULL,
                                     serie integer NOT NULL,
                                     turma character varying(1) NOT NULL,
                                     ano_de_entrada smallint NOT NULL,
                                     ativo boolean DEFAULT true NOT NULL
);


--
-- Name: turma_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.turma_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: turma_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.turma_id_seq OWNED BY adelino_cunha.turma.id;


--
-- Name: usuario; Type: TABLE; Schema: adelino_cunha; Owner: -
--

CREATE TABLE adelino_cunha.usuario (
                                       id integer NOT NULL,
                                       nome character varying(255) NOT NULL,
                                       cargo character varying(13) NOT NULL,
                                       ativo boolean DEFAULT true NOT NULL,
                                       email character varying(255) NOT NULL,
                                       senha character varying(255) NOT NULL,
                                       data_ultimo_acesso timestamp with time zone,
                                       CONSTRAINT usuario_cargo_check CHECK (((cargo)::text = ANY ((ARRAY['bibliotecario'::character varying, 'aluno_monitor'::character varying])::text[])))
);


--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: adelino_cunha; Owner: -
--

CREATE SEQUENCE adelino_cunha.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: adelino_cunha; Owner: -
--

ALTER SEQUENCE adelino_cunha.usuario_id_seq OWNED BY adelino_cunha.usuario.id;


--
-- Name: aluno id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.aluno ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.aluno_id_seq'::regclass);


--
-- Name: autor id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.autor ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.autor_id_seq'::regclass);


--
-- Name: cronogramaalunomonitor id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.cronogramaalunomonitor ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.cronogramaalunomonitor_id_seq'::regclass);


--
-- Name: emprestimo id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.emprestimo ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.emprestimo_id_seq'::regclass);


--
-- Name: estanteprateleira id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.estanteprateleira ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.estanteprateleira_id_seq'::regclass);


--
-- Name: estanteprateleirasecao id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.estanteprateleirasecao_id_seq'::regclass);


--
-- Name: exemplar id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.exemplar ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.exemplar_id_seq'::regclass);


--
-- Name: frequenciaalunos id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.frequenciaalunos ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.frequenciaalunos_id_seq'::regclass);


--
-- Name: genero id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.genero ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.genero_id_seq'::regclass);


--
-- Name: livro id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livro ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.livro_id_seq'::regclass);


--
-- Name: livroautor id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livroautor ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.livroautor_id_seq'::regclass);


--
-- Name: livrogenero id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livrogenero ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.livrogenero_id_seq'::regclass);


--
-- Name: ocorrencias id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.ocorrencias ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.ocorrencias_id_seq'::regclass);


--
-- Name: secao id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.secao ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.secao_id_seq'::regclass);


--
-- Name: turma id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.turma ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.turma_id_seq'::regclass);


--
-- Name: usuario id; Type: DEFAULT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.usuario ALTER COLUMN id SET DEFAULT nextval('adelino_cunha.usuario_id_seq'::regclass);


--
-- Data for Name: aluno; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.aluno (id, id_turma, nome, email, telefone, ativo, situacao) FROM stdin;
\.


--
-- Data for Name: autor; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.autor (id, nome) FROM stdin;
\.


--
-- Data for Name: cronogramaalunomonitor; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.cronogramaalunomonitor (id, id_aluno_monitor, dia_da_semana) FROM stdin;
\.


--
-- Data for Name: emprestimo; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.emprestimo (id, id_aluno, id_exemplar, data_emprestimo, data_conclusao, data_prazo, qtd_renovacao, situacao, observacao, realizado_por, concluido_por) FROM stdin;
\.


--
-- Data for Name: estanteprateleira; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.estanteprateleira (id, estante, prateleira) FROM stdin;
\.


--
-- Data for Name: estanteprateleirasecao; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.estanteprateleirasecao (id, id_estante_prateleira, id_secao) FROM stdin;
\.


--
-- Data for Name: exemplar; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.exemplar (id, id_livro, id_secao, id_estante_prateleira, observacao, numero, situacao) FROM stdin;
\.


--
-- Data for Name: frequenciaalunos; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.frequenciaalunos (id, id_aluno, registrada_por, atividade, data_frequencia) FROM stdin;
\.


--
-- Data for Name: genero; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.genero (id, genero) FROM stdin;
\.


--
-- Data for Name: livro; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.livro (id, isbn, titulo, ativo) FROM stdin;
\.


--
-- Data for Name: livroautor; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.livroautor (id, id_livro, id_autor) FROM stdin;
\.


--
-- Data for Name: livrogenero; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.livrogenero (id, id_livro, id_genero) FROM stdin;
\.


--
-- Data for Name: ocorrencias; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.ocorrencias (id, id_aluno, registrada_por, detalhes, data_ocorrencia) FROM stdin;
\.


--
-- Data for Name: secao; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.secao (id, nome, descricao) FROM stdin;
\.


--
-- Data for Name: turma; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.turma (id, serie, turma, ano_de_entrada, ativo) FROM stdin;
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: adelino_cunha; Owner: -
--

COPY adelino_cunha.usuario (id, nome, cargo, ativo, email, senha, data_ultimo_acesso) FROM stdin;
\.


--
-- Name: aluno_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.aluno_id_seq', 1, false);


--
-- Name: autor_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.autor_id_seq', 1, false);


--
-- Name: cronogramaalunomonitor_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.cronogramaalunomonitor_id_seq', 1, false);


--
-- Name: emprestimo_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.emprestimo_id_seq', 1, false);


--
-- Name: estanteprateleira_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.estanteprateleira_id_seq', 1, false);


--
-- Name: estanteprateleirasecao_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.estanteprateleirasecao_id_seq', 1, false);


--
-- Name: exemplar_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.exemplar_id_seq', 1, false);


--
-- Name: frequenciaalunos_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.frequenciaalunos_id_seq', 1, false);


--
-- Name: genero_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.genero_id_seq', 1, false);


--
-- Name: livro_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.livro_id_seq', 1, false);


--
-- Name: livroautor_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.livroautor_id_seq', 1, false);


--
-- Name: livrogenero_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.livrogenero_id_seq', 1, false);


--
-- Name: ocorrencias_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.ocorrencias_id_seq', 1, false);


--
-- Name: secao_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.secao_id_seq', 1, false);


--
-- Name: turma_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.turma_id_seq', 1, false);


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: adelino_cunha; Owner: -
--

SELECT pg_catalog.setval('adelino_cunha.usuario_id_seq', 1, false);


--
-- Name: aluno aluno_email_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.aluno
    ADD CONSTRAINT aluno_email_key UNIQUE (email);


--
-- Name: aluno aluno_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.aluno
    ADD CONSTRAINT aluno_pkey PRIMARY KEY (id);


--
-- Name: autor autor_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.autor
    ADD CONSTRAINT autor_pkey PRIMARY KEY (id);


--
-- Name: cronogramaalunomonitor cronogramaalunomonitor_id_aluno_monitor_dia_da_semana_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.cronogramaalunomonitor
    ADD CONSTRAINT cronogramaalunomonitor_id_aluno_monitor_dia_da_semana_key UNIQUE (id_aluno_monitor, dia_da_semana);


--
-- Name: cronogramaalunomonitor cronogramaalunomonitor_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.cronogramaalunomonitor
    ADD CONSTRAINT cronogramaalunomonitor_pkey PRIMARY KEY (id);


--
-- Name: emprestimo emprestimo_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_pkey PRIMARY KEY (id);


--
-- Name: estanteprateleira estanteprateleira_estante_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.estanteprateleira
    ADD CONSTRAINT estanteprateleira_estante_key UNIQUE (estante);


--
-- Name: estanteprateleira estanteprateleira_estante_prateleira_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.estanteprateleira
    ADD CONSTRAINT estanteprateleira_estante_prateleira_key UNIQUE (estante, prateleira);


--
-- Name: estanteprateleira estanteprateleira_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.estanteprateleira
    ADD CONSTRAINT estanteprateleira_pkey PRIMARY KEY (id);


--
-- Name: estanteprateleirasecao estanteprateleirasecao_id_estante_prateleira_id_secao_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
    ADD CONSTRAINT estanteprateleirasecao_id_estante_prateleira_id_secao_key UNIQUE (id_estante_prateleira, id_secao);


--
-- Name: estanteprateleirasecao estanteprateleirasecao_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
    ADD CONSTRAINT estanteprateleirasecao_pkey PRIMARY KEY (id);


--
-- Name: exemplar exemplar_numero_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.exemplar
    ADD CONSTRAINT exemplar_numero_key UNIQUE (numero);


--
-- Name: exemplar exemplar_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.exemplar
    ADD CONSTRAINT exemplar_pkey PRIMARY KEY (id);


--
-- Name: frequenciaalunos frequenciaalunos_id_aluno_data_frequencia_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.frequenciaalunos
    ADD CONSTRAINT frequenciaalunos_id_aluno_data_frequencia_key UNIQUE (id_aluno, data_frequencia);


--
-- Name: frequenciaalunos frequenciaalunos_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.frequenciaalunos
    ADD CONSTRAINT frequenciaalunos_pkey PRIMARY KEY (id);


--
-- Name: genero genero_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.genero
    ADD CONSTRAINT genero_pkey PRIMARY KEY (id);


--
-- Name: livro livro_isbn_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livro
    ADD CONSTRAINT livro_isbn_key UNIQUE (isbn);


--
-- Name: livro livro_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livro
    ADD CONSTRAINT livro_pkey PRIMARY KEY (id);


--
-- Name: livroautor livroautor_id_livro_id_autor_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livroautor
    ADD CONSTRAINT livroautor_id_livro_id_autor_key UNIQUE (id_livro, id_autor);


--
-- Name: livroautor livroautor_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livroautor
    ADD CONSTRAINT livroautor_pkey PRIMARY KEY (id);


--
-- Name: livrogenero livrogenero_id_livro_id_genero_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livrogenero
    ADD CONSTRAINT livrogenero_id_livro_id_genero_key UNIQUE (id_livro, id_genero);


--
-- Name: livrogenero livrogenero_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livrogenero
    ADD CONSTRAINT livrogenero_pkey PRIMARY KEY (id);


--
-- Name: ocorrencias ocorrencias_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.ocorrencias
    ADD CONSTRAINT ocorrencias_pkey PRIMARY KEY (id);


--
-- Name: secao secao_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.secao
    ADD CONSTRAINT secao_pkey PRIMARY KEY (id);


--
-- Name: turma turma_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.turma
    ADD CONSTRAINT turma_pkey PRIMARY KEY (id);


--
-- Name: turma turma_serie_turma_ano_de_entrada_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.turma
    ADD CONSTRAINT turma_serie_turma_ano_de_entrada_key UNIQUE (serie, turma, ano_de_entrada);


--
-- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- Name: aluno aluno_id_turma_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.aluno
    ADD CONSTRAINT aluno_id_turma_fkey FOREIGN KEY (id_turma) REFERENCES adelino_cunha.turma(id);


--
-- Name: cronogramaalunomonitor cronogramaalunomonitor_id_aluno_monitor_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.cronogramaalunomonitor
    ADD CONSTRAINT cronogramaalunomonitor_id_aluno_monitor_fkey FOREIGN KEY (id_aluno_monitor) REFERENCES adelino_cunha.usuario(id);


--
-- Name: emprestimo emprestimo_concluido_por_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_concluido_por_fkey FOREIGN KEY (concluido_por) REFERENCES adelino_cunha.usuario(id);


--
-- Name: emprestimo emprestimo_id_aluno_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_id_aluno_fkey FOREIGN KEY (id_aluno) REFERENCES adelino_cunha.aluno(id);


--
-- Name: emprestimo emprestimo_id_exemplar_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_id_exemplar_fkey FOREIGN KEY (id_exemplar) REFERENCES adelino_cunha.exemplar(id);


--
-- Name: emprestimo emprestimo_realizado_por_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.emprestimo
    ADD CONSTRAINT emprestimo_realizado_por_fkey FOREIGN KEY (realizado_por) REFERENCES adelino_cunha.usuario(id);


--
-- Name: estanteprateleirasecao estanteprateleirasecao_id_estante_prateleira_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
    ADD CONSTRAINT estanteprateleirasecao_id_estante_prateleira_fkey FOREIGN KEY (id_estante_prateleira) REFERENCES adelino_cunha.estanteprateleira(id) ON DELETE CASCADE;


--
-- Name: estanteprateleirasecao estanteprateleirasecao_id_secao_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.estanteprateleirasecao
    ADD CONSTRAINT estanteprateleirasecao_id_secao_fkey FOREIGN KEY (id_secao) REFERENCES adelino_cunha.secao(id) ON DELETE CASCADE;


--
-- Name: exemplar exemplar_id_estante_prateleira_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.exemplar
    ADD CONSTRAINT exemplar_id_estante_prateleira_fkey FOREIGN KEY (id_estante_prateleira) REFERENCES adelino_cunha.estanteprateleira(id);


--
-- Name: exemplar exemplar_id_livro_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.exemplar
    ADD CONSTRAINT exemplar_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES adelino_cunha.livro(id);


--
-- Name: exemplar exemplar_id_secao_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.exemplar
    ADD CONSTRAINT exemplar_id_secao_fkey FOREIGN KEY (id_secao) REFERENCES adelino_cunha.secao(id);


--
-- Name: frequenciaalunos frequenciaalunos_id_aluno_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.frequenciaalunos
    ADD CONSTRAINT frequenciaalunos_id_aluno_fkey FOREIGN KEY (id_aluno) REFERENCES adelino_cunha.aluno(id);


--
-- Name: frequenciaalunos frequenciaalunos_registrada_por_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.frequenciaalunos
    ADD CONSTRAINT frequenciaalunos_registrada_por_fkey FOREIGN KEY (registrada_por) REFERENCES adelino_cunha.usuario(id);


--
-- Name: livroautor livroautor_id_autor_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livroautor
    ADD CONSTRAINT livroautor_id_autor_fkey FOREIGN KEY (id_autor) REFERENCES adelino_cunha.autor(id) ON DELETE CASCADE;


--
-- Name: livroautor livroautor_id_livro_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livroautor
    ADD CONSTRAINT livroautor_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES adelino_cunha.livro(id) ON DELETE CASCADE;


--
-- Name: livrogenero livrogenero_id_genero_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livrogenero
    ADD CONSTRAINT livrogenero_id_genero_fkey FOREIGN KEY (id_genero) REFERENCES adelino_cunha.genero(id) ON DELETE CASCADE;


--
-- Name: livrogenero livrogenero_id_livro_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.livrogenero
    ADD CONSTRAINT livrogenero_id_livro_fkey FOREIGN KEY (id_livro) REFERENCES adelino_cunha.livro(id) ON DELETE CASCADE;


--
-- Name: ocorrencias ocorrencias_id_aluno_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.ocorrencias
    ADD CONSTRAINT ocorrencias_id_aluno_fkey FOREIGN KEY (id_aluno) REFERENCES adelino_cunha.aluno(id);


--
-- Name: ocorrencias ocorrencias_registrada_por_fkey; Type: FK CONSTRAINT; Schema: adelino_cunha; Owner: -
--

ALTER TABLE ONLY adelino_cunha.ocorrencias
    ADD CONSTRAINT ocorrencias_registrada_por_fkey FOREIGN KEY (registrada_por) REFERENCES adelino_cunha.usuario(id);


--
-- PostgreSQL database dump complete
--

