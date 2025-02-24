package com.bibliotech.bibliotech.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class LivrosMaisLidosDTO {
    private String titulo;
    private Long quantidadeEmprestimos;
}
