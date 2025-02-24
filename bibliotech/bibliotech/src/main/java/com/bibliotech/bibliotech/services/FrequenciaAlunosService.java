package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.dtos.request.FrequenciaAlunosRequestDTO;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.FrequenciaAlunos;
import com.bibliotech.bibliotech.repositories.FrequenciaAlunosRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FrequenciaAlunosService {
    private final FrequenciaAlunosRepository frequenciaAlunosRepository;
    private final AlunosService alunosService;
    private final UsuarioService usuarioService;

    public FrequenciaAlunosService(FrequenciaAlunosRepository frequenciaAlunosRepository, AlunosService alunosService, UsuarioService usuarioService) {
        this.frequenciaAlunosRepository = frequenciaAlunosRepository;
        this.alunosService = alunosService;
        this.usuarioService = usuarioService;
    }

    public FrequenciaAlunos registrarFrequencia(FrequenciaAlunosRequestDTO requestDTO) {

        //validaçoes feitas no controller com o jakarta
        FrequenciaAlunos frequenciaAlunos = new FrequenciaAlunos();
        frequenciaAlunos.setAluno(alunosService.buscarAlunoPorId(requestDTO.getIdAluno()));
        frequenciaAlunos.setRegistradaPor(usuarioService.getUsuarioById(requestDTO.getRegistradaPor()));
        frequenciaAlunos.setAtividade(requestDTO.getAtividade());
        frequenciaAlunos.setData(LocalDate.now());

        return frequenciaAlunosRepository.save(frequenciaAlunos);
    }

    //fiz assim para continuar o padrao e para deixar mais facil de manter o codigo
    public List<FrequenciaAlunos> filtrarFrequencias(LocalDate data){
        return frequenciaAlunosRepository.filtrarFrequencias(data);
    }

    public void deletarFrequencia(Integer id){
        if (frequenciaAlunosRepository.findById(id).isEmpty()) {
            throw new NotFoundException("Frequência não encontrada.");
        }
        frequenciaAlunosRepository.deleteById(id);
    }

}
