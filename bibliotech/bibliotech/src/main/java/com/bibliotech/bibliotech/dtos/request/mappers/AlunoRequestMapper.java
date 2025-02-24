package com.bibliotech.bibliotech.dtos.request.mappers;

import com.bibliotech.bibliotech.dtos.request.AlunoRequestDTO;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.repositories.TurmaRepository;
import org.springframework.stereotype.Component;


@Component
public class AlunoRequestMapper {

    private final TurmaRepository turmaRepository;

    public AlunoRequestMapper(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    public Aluno toEntity(AlunoRequestDTO alunoRequestDTO) {
        Aluno aluno = new Aluno();

        aluno.setTurma(turmaRepository.findById(alunoRequestDTO.getIdTurma()).orElseThrow(() -> new NotFoundException("Turma não encontrada")));
        aluno.setId(alunoRequestDTO.getId());
        aluno.setNome(alunoRequestDTO.getNome());
        aluno.setEmail(alunoRequestDTO.getEmail());
        aluno.setTelefone(alunoRequestDTO.getTelefone());
        aluno.setSituacao(alunoRequestDTO.getSituacao());

        return aluno;
    }
}