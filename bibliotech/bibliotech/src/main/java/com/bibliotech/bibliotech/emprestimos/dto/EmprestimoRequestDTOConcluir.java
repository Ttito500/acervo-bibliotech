package com.bibliotech.bibliotech.emprestimos.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmprestimoRequestDTOConcluir {
    private boolean extraviado;
    private String observacao;
}
