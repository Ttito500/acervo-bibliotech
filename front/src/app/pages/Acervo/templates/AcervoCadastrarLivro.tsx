import React from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const AcervoCadastrarLivro: React.FC = () => {
  return (
    <Form>
        <Row>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>ISBN <span className="obgr">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Digite o ISBN" />
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Título <span className="obgr">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Digite o título" />
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Autor <span className="obgr">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Digite o nome do autor" />
                </Form.Group>
            </Col>
            
        </Row>

        <Row>
            
            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Gênero <span className="obgr">*</span></Form.Label>
                    <Form.Select aria-label="Selecione um gênero">
                        <option>Selecione um gênero</option>
                        <option value="1">Romance</option>
                        <option value="2">Drama</option>
                        <option value="3">Terror</option>
                    </Form.Select>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Qtd. Exemplares <span className="obgr">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Digite a qtd. de exemplares" />
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Seção <span className="obgr">*</span></Form.Label>
                    <Form.Select aria-label="Selecione a seção">
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Estante <span className="obgr">*</span></Form.Label>
                    <Form.Select aria-label="Selecione a estante">
                        <option>Selecione a estante</option>
                        <option value="1">Romance</option>
                        <option value="2">Drama</option>
                        <option value="3">Terror</option>
                    </Form.Select>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Prateleira <span className="obgr">*</span></Form.Label>
                    <Form.Select aria-label="Selecione a prateleira">
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
}

export default AcervoCadastrarLivro;