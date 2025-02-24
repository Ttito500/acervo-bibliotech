import React from "react";
import {
  faClipboardList,
  faPenToSquare,
  faPowerOff,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { GetLivroResponse } from "./../../../interfaces/acervo";
import { ResponsePagination } from "./../../../interfaces/pagination";
import Tooltip from "react-bootstrap/esm/Tooltip";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";

interface AcervoListagemProps {
  livros: ResponsePagination<GetLivroResponse>;
  onEdit: (livro: GetLivroResponse) => void;
  onAtivar: (id: number) => void;
  onInativar: (id: number) => void;
  onEmprestimos: (livro: GetLivroResponse) => void;
  onExemplares: (livro: GetLivroResponse) => void;
}

const AcervoListagem: React.FC<AcervoListagemProps> = ({ livros, onEdit, onAtivar, onInativar, onEmprestimos, onExemplares }) => {

  const renderTooltipGerenciarExemplares = (props: any) => (
    <Tooltip id="button-tooltip-1" {...props}>
      Gerenciar Exemplares
    </Tooltip>
  );

  const renderTooltipVerEmprestimos = (props: any) => (
    <Tooltip id="button-tooltip-2" {...props}>
      Ver Empréstimos
    </Tooltip>
  );

  const renderTooltipInativar = (props: any) => (
    <Tooltip id="button-tooltip-3" {...props}>
      Inativar
    </Tooltip>
  );

  const renderTooltipAtivar = (props: any) => (
    <Tooltip id="button-tooltip-4" {...props}>
      Ativar
    </Tooltip>
  );

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
            <th>ISBN</th>
            <th>Título</th>
            <th>Autores</th>
            <th>Gêneros</th>
            <th className="text-center">Total</th>
            <th className="text-center">Empr.</th>
            <th className="text-center">Extrav.</th>
            <th className="text-center">Disp.</th>
            <th className="text-center">Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros?.content.map((livro) => (
            <tr key={livro.id} className="tabela-tr">
              <td>{livro.isbn}</td>
              <td>{livro.titulo}</td>
              <td>
                {livro.autores.map((autor, index) => (
                  <span key={index}>
                    {index > 0 && <span>, </span>}
                    {autor.nome}
                  </span>
                ))}
              </td>
              <td>
                {livro.generos.map((genero, index) => (
                  <span key={index}>
                    {index > 0 && <span>, </span>}
                    {genero.genero}
                  </span>
                ))}
              </td>
              <td className="text-center">{livro.totalExemplares}</td>
              <td className="text-center">{livro.totalEmprestados}</td>
              <td className="text-center">
                { livro.totalExtraviados > 0 &&
                  <Badge className="bibliotech-badge" bg="danger">
                    {livro.totalExtraviados}
                  </Badge>
                }

                { livro.totalExtraviados == 0 &&
                  <span>
                    {livro.totalExtraviados}
                  </span>
                } 
              </td>
              <td className="text-center">
                { livro.totalDisponiveis == 0 &&
                  <Badge className="bibliotech-badge" bg="danger">
                    {livro.totalDisponiveis}
                  </Badge>
                }

                { livro.totalDisponiveis > 0 &&
                  <span>
                    {livro.totalDisponiveis}
                  </span>
                } 
              </td>
              <td className="text-center">
                <Badge className="bibliotech-badge" bg={livro.ativo ? 'success' : 'danger'}>
                  {livro.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </td>
              <td>
                <ButtonGroup aria-label="Ações" className="tabela-acoes">
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltipGerenciarExemplares}
                  >
                    <Button
                      variant="btn-outline-secondary"
                      className="color-orange"
                      onClick={() => onExemplares(livro)}
                    >
                      <FontAwesomeIcon icon={faTableList} />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltipVerEmprestimos}
                  >
                    <Button
                      variant="btn-outline-secondary"
                      className="color-blue"
                      onClick={() => onEmprestimos(livro)}
                    >
                      <FontAwesomeIcon icon={faClipboardList} />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltipEditar}
                  >
                    <Button
                      variant="btn-outline-secondary"
                      className="color-green"
                      onClick={() => onEdit(livro)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </OverlayTrigger>

                  { !livro.ativo &&
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltipAtivar}
                    >
                      <Button
                        variant="btn-outline-secondary"
                        className="color-green"
                        onClick={() => onAtivar(livro.id)}
                      >
                        <FontAwesomeIcon icon={faPowerOff} />
                      </Button>
                    </OverlayTrigger>
                  }

                  { livro.ativo &&
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltipInativar}
                    >
                      <Button
                        variant="btn-outline-secondary"
                        className="color-red"
                        onClick={() => onInativar(livro.id)}
                      >
                        <FontAwesomeIcon icon={faPowerOff} />
                      </Button>
                    </OverlayTrigger>
                  }
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AcervoListagem;
