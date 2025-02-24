import React from "react";
import { Table, Badge, Button, ButtonGroup, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { GetExemplarResponse } from "./../../../../interfaces/exemplar";

interface ListagemExemplaresProps {
  exemplares: GetExemplarResponse[];
	onEdit: (exemplar: GetExemplarResponse) => void;
}

const ListagemExemplares: React.FC<ListagemExemplaresProps> = ({ exemplares, onEdit }) => {

	const renderTooltipEditar = (props: any) => (
    <Tooltip id="button-tooltip-5" {...props}>
      Editar
    </Tooltip>
  );

  return (
    <>
      <Table striped className="tabela">
        <thead>
          <tr>
            <th className="th-center-size-eight">Exemplar</th>
            <th className="th-center-size-eight">Estante</th>
            <th className="th-center-size-eight">Prateleira</th>
            <th>Seção</th>
            <th>Observações</th>
            <th className="th-center-size-fifteen">Situação</th>
            <th className="th-center-size-eight">Ações</th>
          </tr>
        </thead>
        <tbody>
					{exemplares?.map((exemplar) => (
            <tr key={exemplar.id} className="tabela-tr">
              <td className="text-center">{exemplar.numero}</td>
              <td className="text-center">{exemplar.estanteprateleira.estante}</td>
              <td className="text-center">{exemplar.estanteprateleira.prateleira}</td>
              <td className="text-center">{exemplar.secao.nome}</td>
              <td>{exemplar.observacao}</td>
              <td className="text-center">
                { exemplar.situacao === 'disponivel' && <Badge className="bibliotech-badge" bg={'success'}>
                  Disponível
                </Badge>}

								{ exemplar.situacao === 'emprestado' && <Badge className="bibliotech-badge" bg={'info'}>
                  Emprestado
                </Badge>}

								{ exemplar.situacao === 'extraviado' && <Badge className="bibliotech-badge" bg={'danger'}>
                  Extraviado
                </Badge>}
              </td>
              <td>
                <ButtonGroup aria-label="Ações" className="tabela-acoes">
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltipEditar}
                  >
                    <Button
                      variant="btn-outline-secondary"
                      className="color-green"
                      onClick={() => onEdit(exemplar)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </OverlayTrigger>
                </ButtonGroup>
              </td>
            </tr>
					))}
        </tbody>
      </Table>
    </>
  );
};

export default ListagemExemplares;
