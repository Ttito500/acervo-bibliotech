package com.bibliotech.bibliotech.dtos.request;

import lombok.Getter;
import lombok.Setter;

//CONSERTAR USUARIO DEPOIS
@Getter
@Setter
public class EmprestimoRequestDTO {
    private Integer idAluno;
    private Integer idExemplar;
    private String observacao;

    private Integer idUsuario; //TEMPORARIO
}