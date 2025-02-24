import React, { ChangeEvent, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { CreateLivroRequest } from "./../../../interfaces/acervo";
import { getAutores } from "./../../../api/AutorApi";
import { WithContext as ReactTags, SEPARATORS, Tag } from 'react-tag-input';
import { getGeneros } from "./../../../api/GeneroApi";
import { getSecoes } from "./../../../api/SecoesApi";
import { GetSecaoResponse } from "./../../../interfaces/secao";
import { getEstantePrateleirasPorSecao } from "./../../../api/EstantePrateleiraApi";
import { GetEstantePrateleiraResponse } from "./../../../interfaces/estante-prateleira";

interface AcervoCadastrarLivroProps {
  formData: CreateLivroRequest;
  onChange: (e: ChangeEvent<any>) => void;
}

const AcervoCadastrarLivro: React.FC<AcervoCadastrarLivroProps> = ({
  formData,
  onChange,
}) => {

  const [queryAutor, setQueryAutor] = useState('');
  const [suggestionsAutores, setSuggestionsAutores] = useState<Tag[]>([]);
  const [selectedTagAutores, setSelectedTagAutores] = useState<Tag[]>([]);

  const handleDeleteAutor = (index: number) => {
    setSelectedTagAutores(selectedTagAutores.filter((_, i) => i !== index));
  };

  const handleAdditionAutor = (autor: Tag) => {
    setSelectedTagAutores((prevSelecteds) => {
      return [...prevSelecteds, autor];
    });
  };

  const handleInputChangeAutores = (value: any, event: any): void => {
    setQueryAutor(value);
  }

  useEffect(() => {
    const selecteds = selectedTagAutores.map((tag) => { return {nome: tag.text} } );
    onChange({ target: { value: selecteds, name: "autores" }} as any)
  }, [selectedTagAutores]);

  useEffect(() => {
    const listarAutores = async () => {
      if (queryAutor.length > 2) {
        try {
          const response = await getAutores(queryAutor);
          const data = response.map((autor) => {
            return {
              id: String(autor.id),
              className: '',
              text: autor.nome
            } as Tag;
          })
          setSuggestionsAutores(data);
        } catch (error) {
          console.error('Erro ao buscar autores:', error);
        }
      } else {
        setSuggestionsAutores([]);
      }
    };

    listarAutores();
  }, [queryAutor]);

  const [queryGenero, setQueryGenero] = useState('');
  const [suggestionsGeneros, setSuggestionsGeneros] = useState<Tag[]>([]);
  const [selectedTagGeneros, setSelectedTagGeneros] = useState<Tag[]>([]);

  const handleDeleteGenero = (index: number) => {
    setSelectedTagGeneros(selectedTagGeneros.filter((_, i) => i !== index));
  };

  const handleAdditionGenero = (genero: Tag) => {
    setSelectedTagGeneros((prevSelecteds) => {
      return [...prevSelecteds, genero];
    });
  };

  const handleInputChangeGeneros = (value: any, event: any): void => {
    setQueryGenero(value);
  }

  useEffect(() => {
    const selecteds = selectedTagGeneros.map((tag) => { return {genero: tag.text} } );
    onChange({ target: { value: selecteds, name: "generos" }} as any)
  }, [selectedTagGeneros]);

  useEffect(() => {
    const listarGeneros = async () => {
      if (queryGenero.length > 2) {
        try {
          const response = await getGeneros(queryGenero);
          const data = response.map((genero) => {
            return {
              id: String(genero.id),
              className: '',
              text: genero.genero
            } as Tag;
          })
          setSuggestionsGeneros(data);
        } catch (error) {
          console.error('Erro ao buscar generos:', error);
        }
      } else {
        setSuggestionsGeneros([]);
      }
    };

    listarGeneros();
  }, [queryGenero]);

  const [secoes, setSecoes] = useState<GetSecaoResponse[]>([]);
  const [selectedSecao, setSelectedSecao] = useState<string>('');

  const listarSecoes = async (): Promise<void> => {
    try {
      const data = await getSecoes();
      setSecoes(data);
    } catch(err) {
      console.log(err)
    }
  };

  const [estantesPrateleiras, setEstantesPrateleiras] = useState<GetEstantePrateleiraResponse[]>([]);

  const listarEstantePrateleirasPorSecao = async (idSecao: number): Promise<void> => {
    try {
      const data = await getEstantePrateleirasPorSecao(idSecao);
      setEstantesPrateleiras(data);
    } catch(err) {
      console.log(err)
    }
  };

  useEffect(() => {
    if(selectedSecao) listarEstantePrateleirasPorSecao(Number(selectedSecao));
  }, [selectedSecao]);

  useEffect(() => {
    listarSecoes();
  }, []);
  
  return (
    <Form>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              ISBN <span className="obgr">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o ISBN"
              name="isbn"
              value={formData.isbn}
              onChange={onChange}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Título <span className="obgr">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o título"
              name="titulo"
              value={formData.titulo}
              onChange={onChange}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Autores <span className="obgr">*</span>
            </Form.Label>
            <ReactTags
              placeholder="Adicione os autores"
              autoFocus={false}
              autofocus={false}
              tags={selectedTagAutores}
              handleInputChange={handleInputChangeAutores}
              suggestions={suggestionsAutores}
              separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
              handleDelete={handleDeleteAutor}
              inputFieldPosition="top"
              handleAddition={handleAdditionAutor}
              maxTags={10}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Gêneros <span className="obgr">*</span>
            </Form.Label>
            <ReactTags
              placeholder="Adicione os gêneros"
              autoFocus={false}
              autofocus={false}
              tags={selectedTagGeneros}
              handleInputChange={handleInputChangeGeneros}
              suggestions={suggestionsGeneros}
              separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
              handleDelete={handleDeleteGenero}
              inputFieldPosition="top"
              handleAddition={handleAdditionGenero}
              maxTags={10}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Qtd. Exemplares <span className="obgr">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a qtd. de exemplares"
              name="qtdExemplares"
              value={formData.qtdExemplares}
              onChange={onChange}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Seção <span className="obgr">*</span>
            </Form.Label>
            <Form.Select
              aria-label="Selecione uma Seção"
              name="idSecao"
              value={formData.idSecao}
              onChange={(e) => {onChange(e); setSelectedSecao(e.target.value)}}
              required
            >
              <option value="">Selecione</option>
              {secoes?.map((secao) => (
                <option key={secao.id} value={secao.id}>
                  {secao.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Estante e Prateleira<span className="obgr">*</span>
            </Form.Label>
            <Form.Select
              aria-label="Selecione uma prateleira de uma estante"
              name="idEstanteprateleira"
              value={formData.idEstanteprateleira}
              onChange={onChange}
              required
            >
              <option value="">Selecione</option>
              {estantesPrateleiras?.map((estantePrateleira) => (
                <option key={estantePrateleira.id} value={estantePrateleira.id}>
                  Estante {estantePrateleira.estante} / Prateleira {estantePrateleira.prateleira}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col></Col>
        <Col></Col>
      </Row>
    </Form>
  );
};

export default AcervoCadastrarLivro;
