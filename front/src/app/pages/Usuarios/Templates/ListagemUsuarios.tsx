import React from "react";
import { Table, Badge, Button, ButtonGroup, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { GetUsuarioResponse } from "./../../../interfaces/usuario";
import { format } from "date-fns/format";
import { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
registerLocale('ptBR', ptBR);

interface UsuariosListagemProps {
  usuarios: GetUsuarioResponse[];
  onEdit: (usuario: GetUsuarioResponse) => void;
  onActive: (id: number) => void;
  onInactive: (id: number) => void;
}

const ListagemUsuarios: React.FC<UsuariosListagemProps> = ({ usuarios, onActive, onEdit, onInactive }) => {

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
            <th className="th-size-ten">Cargo</th>
            <th className="th-size-fifteen">Nome</th>
            <th className="th-size-ten text-center">Data de Último Acesso</th>
            <th>Email</th>
            <th className="th-center-size-eight">Ativo</th>
            <th className="th-center-size-eight">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios?.map((usuario) => (
            <tr key={usuario.id} className="tabela-tr">
              <td>
                {usuario.cargo == 'aluno_monitor' &&
                  <span>Aluno Monitor</span>
                }
                {usuario.cargo == 'bibliotecario' &&
                  <span>Bibliotecário</span>
                }
              </td>
              <td>{usuario.nome}</td>
              <td>
                {/* { format(new Date(usuario.dataUltimoAcesso), "dd/MM/yyyy HH:mm:ss")} TO DO */}
                { format(new Date(usuario.dataUltimoAcesso), "dd/MM/yyyy")}
              </td>
              <td>{usuario.email}</td>
              <td className="text-center">
                
                {usuario.ativo &&
                  <Badge className="bibliotech-badge" bg="success">
                    Ativo
                  </Badge>
                }

                {!usuario.ativo &&
                  <Badge className="bibliotech-badge" bg="danger">
                    Inativo
                  </Badge>
                }
                
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
                      onClick={() => onEdit(usuario)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </OverlayTrigger>
                  { !usuario.ativo &&
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltipAtivar}
                    >
                      <Button
                        variant="btn-outline-secondary"
                        className="color-green"
                        onClick={() => onActive(usuario.id)}
                      >
                        <FontAwesomeIcon icon={faPowerOff} />
                      </Button>
                    </OverlayTrigger>
                  }

                  { usuario.ativo &&
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltipInativar}
                    >
                      <Button
                        variant="btn-outline-secondary"
                        className="color-red"
                        onClick={() => onInactive(usuario.id)}
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

export default ListagemUsuarios;
