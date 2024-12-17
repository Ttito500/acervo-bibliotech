import React, { ChangeEvent } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface AcervoCadastrarLivroProps {
  formData: {
    isbn: string;
    titulo: string;
    autor: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AcervoCadastrarLivro: React.FC<AcervoCadastrarLivroProps> = ({ formData, onChange }) => {
  return (
    <Form>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              ISBN <span className="obgr">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="Digite o ISBN" name="isbn" value={formData.isbn} onChange={onChange} />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Título <span className="obgr">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="Digite o título" name="titulo" value={formData.titulo} onChange={onChange} />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Autor <span className="obgr">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="Digite o nome do autor" name="autor" value={formData.autor} onChange={onChange} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Gênero <span className="obgr">*</span>
            </Form.Label>
            <Form.Select aria-label="Selecione um gênero" name="generos">
              <option>Selecione um gênero</option>
              <option value="1">Romance</option>
              <option value="2">Drama</option>
              <option value="3">Terror</option>
            </Form.Select>
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
              name="qtd_exemplares"
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Seção <span className="obgr">*</span>
            </Form.Label>
            <Form.Select aria-label="Selecione a seção" name="secao">
              <option>Selecione a seção</option>
              <option value="1">Romance</option>
              <option value="2">Drama</option>
              <option value="3">Terror</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Estante <span className="obgr">*</span>
            </Form.Label>
            <Form.Select aria-label="Selecione a estante" name="estante">
              <option>Selecione a estante</option>
              <option value="1">Romance</option>
              <option value="2">Drama</option>
              <option value="3">Terror</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              Prateleira <span className="obgr">*</span>
            </Form.Label>
            <Form.Select aria-label="Selecione a prateleira" name="prateleira">
              <option>Selecione a prateleira</option>
              <option value="1">Romance</option>
              <option value="2">Drama</option>
              <option value="3">Terror</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col></Col>
      </Row>
    </Form>
  );
};

export default AcervoCadastrarLivro;
