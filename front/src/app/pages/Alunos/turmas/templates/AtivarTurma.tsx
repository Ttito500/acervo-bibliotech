import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";

const AtivarTurma: React.FC = () => {
  return(
      <Form>
          <Row>
              <Col xs={10}>
                  <Form.Group className="mb-3">
                      <Form.Label>Tem certeza que deseja ativar essa Turma?</Form.Label>
                  </Form.Group>
              </Col>
          </Row>
      </Form>
  );
};

export default AtivarTurma;