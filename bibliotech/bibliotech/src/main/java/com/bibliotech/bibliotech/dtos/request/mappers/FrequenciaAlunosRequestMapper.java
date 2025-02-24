package com.bibliotech.bibliotech.dtos.request.mappers;

import com.bibliotech.bibliotech.dtos.request.FrequenciaAlunosRequestDTO;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.models.FrequenciaAlunos;
import com.bibliotech.bibliotech.models.Usuario;
import com.bibliotech.bibliotech.services.AlunosService;
import com.bibliotech.bibliotech.services.UsuarioService;
import org.springframework.stereotype.Component;

@Component
public class FrequenciaAlunosRequestMapper {
    private final AlunosService alunosService;
    private final UsuarioService usuarioService;

    public FrequenciaAlunosRequestMapper(AlunosService alunoRepository, UsuarioService usuarioRepository) {
        this.alunosService = alunoRepository;
        this.usuarioService = usuarioRepository;
    }

    public FrequenciaAlunos toEntity(FrequenciaAlunosRequestDTO frequenciaAlunosRequestDTO) {
        FrequenciaAlunos frequenciaAlunos = new FrequenciaAlunos();

        Aluno alunoExistente = alunosService.buscarAlunoPorId(frequenciaAlunosRequestDTO.getIdAluno());
        Usuario usuarioExistente = usuarioService.getUsuarioById(frequenciaAlunosRequestDTO.getRegistradaPor());


        if (frequenciaAlunosRequestDTO == null) {
            return null;
        }

        frequenciaAlunos.setAluno(alunoExistente);
        frequenciaAlunos.setRegistradaPor(usuarioExistente);
        frequenciaAlunos.setId(frequenciaAlunosRequestDTO.getId());
        frequenciaAlunos.setAtividade(frequenciaAlunosRequestDTO.getAtividade());

        return frequenciaAlunos;
    }
}
