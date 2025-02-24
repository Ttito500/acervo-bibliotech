package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.dtos.request.OcorrenciaRequestDTO;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Ocorrencia;
import com.bibliotech.bibliotech.repositories.OcorrenciaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class OcorrenciaService {
    private final OcorrenciaRepository ocorrenciaRepository;
    private final AlunosService alunoService;
    private final UsuarioService usuarioService;

    public OcorrenciaService(OcorrenciaRepository ocorrenciaRepository, AlunosService alunoService, UsuarioService usuarioService) {
        this.ocorrenciaRepository = ocorrenciaRepository;
        this.alunoService = alunoService;
        this.usuarioService = usuarioService;
    }

    public Ocorrencia registrarOcorrencia(OcorrenciaRequestDTO requestDTO) {
        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.setAluno(alunoService.buscarAlunoPorId(requestDTO.getIdAluno()));
        ocorrencia.setRegistradaPor(usuarioService.getUsuarioById(requestDTO.getRegistradaPor()));
        ocorrencia.setDetalhes(requestDTO.getDetalhes());
        ocorrencia.setData(LocalDate.now());

        return ocorrenciaRepository.save(ocorrencia);

    }

    public List<Ocorrencia> filtrarOcorrencias(LocalDate dataInicio, LocalDate dataFim) {
        return ocorrenciaRepository.filtrarOcorrencias(dataInicio, dataFim);
    }

    public void deletarOcorrencia(Integer id) {
        if (ocorrenciaRepository.findById(id).isEmpty()) {
            throw new NotFoundException("Ocorrência não encontrada.");
        }
        ocorrenciaRepository.deleteById(id);
    }
}
