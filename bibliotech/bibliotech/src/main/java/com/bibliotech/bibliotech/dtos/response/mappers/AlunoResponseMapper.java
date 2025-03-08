package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.response.AlunoResponseDTO;
import com.bibliotech.bibliotech.models.Aluno;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AlunoResponseMapper {

    private static TurmaResponseMapper turmaResponseMapper;

    public AlunoResponseMapper(TurmaResponseMapper turmaResponseMapper) {
        this.turmaResponseMapper = turmaResponseMapper;
    }


}