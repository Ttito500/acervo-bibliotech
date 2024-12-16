import React from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const AcervoEditarLivro: React.FC = () => {
  return (
    <Form>
        <Row>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>ISBN <span className="obgr">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Digite o ISBN" value={'123-12-12345-12-1'} />
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Título <span className="obgr">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Digite o título" value={'A Hora da Estrela'} />
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Autor <span className="obgr">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Digite o nome do autor" value={'Clarice Lispector'} />
                </Form.Group>
            </Col>
            
        </Row>

        <Row>
            
            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Gênero <span className="obgr">*</span></Form.Label>
                    <Form.Select aria-label="Selecione um gênero">
                        <option value="1">Romance</option>
                        <option value="2">Drama</option>
                        <option value="3">Terror</option>
                    </Form.Select>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Qtd. Exemplares <span className="obgr">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Digite a qtd. de exemplares" value={''} />
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Seção <span className="obgr">*</span></Form.Label>
                    <Form.Select aria-label="Selecione a seção">
                        <option value="1">Literatura Brasileira</option>
                        <option value="2">Drama</option>
                        <option value="3">Terror</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            
        </Row>

        <Row>
            
            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Estante <span className="obgr">*</span></Form.Label>
                    <Form.Select aria-label="Selecione a estante">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </Form.Select>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Prateleira <span className="obgr">*</span></Form.Label>
                    <Form.Select aria-label="Selecione a prateleira">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </Form.Select>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Status <span className="obgr">*</span></Form.Label>
                    <Form.Select aria-label="Selecione o status">
                        <option value="1">Disponível</option>
                        <option value="2">Indisponível</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            
        </Row>

    </Form>
  );
}

export default AcervoEditarLivro;