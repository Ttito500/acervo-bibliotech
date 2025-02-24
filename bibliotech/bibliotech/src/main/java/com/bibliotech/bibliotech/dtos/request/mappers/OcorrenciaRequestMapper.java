package com.bibliotech.bibliotech.dtos.request.mappers;

import com.bibliotech.bibliotech.dtos.request.OcorrenciaRequestDTO;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.models.Ocorrencia;
import com.bibliotech.bibliotech.models.Usuario;
import com.bibliotech.bibliotech.services.AlunosService;
import com.bibliotech.bibliotech.services.UsuarioService;
import org.springframework.stereotype.Component;

@Component
public class OcorrenciaRequestMapper {
    private final AlunosService alunosService;
    private final UsuarioService usuarioService;

    public OcorrenciaRequestMapper(AlunosService alunoRepository, UsuarioService usuarioRepository) {
        this.alunosService = alunoRepository;
        this.usuarioService = usuarioRepository;
    }

    public Ocorrencia toEntity(OcorrenciaRequestDTO ocorrenciaRequestDTO) {
        Ocorrencia ocorrencia = new Ocorrencia();

        Aluno alunoExistente = alunosService.buscarAlunoPorId(ocorrenciaRequestDTO.getIdAluno());
        Usuario usuarioExistente = usuarioService.getUsuarioById(ocorrenciaRequestDTO.getRegistradaPor());

        if (ocorrenciaRequestDTO == null) {
            return null;
        }

        ocorrencia.setAluno(alunoExistente);
        ocorrencia.setRegistradaPor(usuarioExistente);
        ocorrencia.setId(ocorrenciaRequestDTO.getId());
        ocorrencia.setDetalhes(ocorrenciaRequestDTO.getDetalhes());

        return ocorrencia;
    }
}
