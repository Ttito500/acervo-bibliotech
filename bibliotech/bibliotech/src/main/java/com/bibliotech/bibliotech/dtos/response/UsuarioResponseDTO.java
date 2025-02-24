package com.bibliotech.bibliotech.dtos.response;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class UsuarioResponseDTO {
    private Integer id;
    private String nome;
    private String cargo;
    private Boolean ativo;
    private String email;
    private Instant dataUltimoAcesso;
}
