package com.bibliotech.bibliotech.dtos.request.mappers;

import com.bibliotech.bibliotech.dtos.request.EmprestimoRequestDTO;
import com.bibliotech.bibliotech.models.Emprestimo;
import org.springframework.stereotype.Component;


import java.time.LocalDate;

@Component
public class EmprestimoRequestMapper {
    public Emprestimo toEntity(EmprestimoRequestDTO EmprestimoDto) {
        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setDataEmprestimo(LocalDate.now());
        emprestimo.setDataPrazo(LocalDate.now().plusDays(7));
        emprestimo.setQtdRenovacao(0);
        emprestimo.setObservacao(EmprestimoDto.getObservacao());
        emprestimo.setDataUltimaNotificacao(LocalDate.now());

        return emprestimo;
    }
}
