package com.bibliotech.bibliotech.dtos.request.mappers;

import com.bibliotech.bibliotech.dtos.request.AlunoRequestDTO;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.models.Turma;
import com.bibliotech.bibliotech.repositories.TurmaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AlunoRequestMapper {

    private final TurmaRepository turmaRepository;

    public AlunoRequestMapper(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    public Aluno toEntity(AlunoRequestDTO alunoRequestDTO) {
        Aluno aluno = new Aluno();
        Turma turmaExistente = turmaRepository.findById(alunoRequestDTO.getIdTurma())
                .orElseThrow(() -> new ValidationException(List.of("Turma não encontrada")));

        if (!turmaExistente.isAtivo()) {
            throw new ValidationException("Turma com o id: "+turmaExistente.getId()+" está inativa");
        }
        if (alunoRequestDTO == null) {
            return null;
        }

        aluno.setTurma(turmaExistente);
        aluno.setId(alunoRequestDTO.getId());
        aluno.setNome(alunoRequestDTO.getNome());
        aluno.setEmail(alunoRequestDTO.getEmail());
        aluno.setTelefone(alunoRequestDTO.getTelefone());
        aluno.setSituacao(alunoRequestDTO.getSituacao());

        return aluno;
    }
}