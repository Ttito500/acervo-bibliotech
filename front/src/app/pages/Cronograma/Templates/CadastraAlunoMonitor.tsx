import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";

const CadastraAlunoMonitor: React.FC = () => {
    return(
        <Form>
            <Row>
                <Col xs={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Dia da Semana <span className="obgr">*</span>
                        </Form.Label>
                        <Form.Select aria-label="Selecione" required>
                            <option value="">Selecione</option>
                            <option value="1">Segunda</option>
                            <option value="2">Terça</option>
                            <option value="3">Quarta</option>
                            <option value="4">Quinta</option>
                            <option value="5">Sexta</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={9}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Selecionar Monitor <span className="obgr">*</span>
                        </Form.Label>
                        <Form.Select aria-label="Selecione" required>
                            <option value="">Selecione</option>
                            <option value="1">Aluno Monitor 1</option>
                            <option value="2">Aluno MOnitor 2</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

        </Form>
    );
};

export default CadastraAlunoMonitor;