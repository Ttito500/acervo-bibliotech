package com.bibliotech.bibliotech.dtos.request.mappers;

import com.bibliotech.bibliotech.dtos.request.EmprestimoRequestDTO;
import com.bibliotech.bibliotech.dtos.request.EmprestimoRequestDTOConcluir;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.models.Emprestimo;
import com.bibliotech.bibliotech.models.Exemplar;
import com.bibliotech.bibliotech.models.Usuario;
import com.bibliotech.bibliotech.repositories.AlunoRepository;
import com.bibliotech.bibliotech.repositories.ExemplarRepository;
import com.bibliotech.bibliotech.repositories.UsuarioRepository;
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
