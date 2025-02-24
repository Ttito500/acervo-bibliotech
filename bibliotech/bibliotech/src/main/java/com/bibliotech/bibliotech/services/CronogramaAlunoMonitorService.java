package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.dtos.CronogramaAlunoMonitorDTO;
import com.bibliotech.bibliotech.dtos.mappers.CronogramaAlunoMonitorMapper;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.CronogramaAlunoMonitor;
import com.bibliotech.bibliotech.repositories.CronogramaAlunoMonitorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class CronogramaAlunoMonitorService {

    private final CronogramaAlunoMonitorRepository repository;
    private final CronogramaAlunoMonitorMapper mapper;
    private final UsuarioService usuarioService;

    private static final List<String> DIAS_VALIDOS = Arrays.asList(
            "segunda-feira", "terca-feira", "quarta-feira", "quinta-feira", "sexta-feira"
    );

    private boolean isDiaValido(String diaDaSemana) {
        return DIAS_VALIDOS.contains(diaDaSemana);
    }

    public CronogramaAlunoMonitorService(CronogramaAlunoMonitorRepository repository, UsuarioService usuarioService, CronogramaAlunoMonitorMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
        this.usuarioService = usuarioService;
    }

    public List<CronogramaAlunoMonitor> listarTodos() {
        return repository.findAll();
    }

    public CronogramaAlunoMonitor buscarPorId(Integer id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Cronograma não encontrado"));
    }

    @Transactional
    public CronogramaAlunoMonitor salvar(CronogramaAlunoMonitorDTO cronograma) {
        if (cronograma.getIdAlunoMonitor() == null) {
            throw new ValidationException("O id do aluno monitor não pode ser nulo.");
        }
        if (cronograma.getDiaDaSemana() == null || cronograma.getDiaDaSemana().equals("")) {
            throw new ValidationException("O dia da semana não pode ser nulo.");
        }
        if (!isDiaValido(cronograma.getDiaDaSemana())) {
            throw new ValidationException("Dia da semana inválido. Os dias válidos são: segunda-feira, terca-feira, quarta-feira, quinta-feira e sexta-feira.");
        }
        if (repository.existsByUsuarioIdAndDiaDaSemana(cronograma.getIdAlunoMonitor(), cronograma.getDiaDaSemana())) {
            throw new ValidationException("Já existe um cronograma para esse aluno no mesmo dia da semana.");
        }
        if (repository.countByDiaDaSemana(cronograma.getDiaDaSemana()) > 2) {
            throw new ValidationException("O limite de cronogramas para esse dia já foi atingido.");
        }

        CronogramaAlunoMonitor novoCronograma = mapper.toEntity(cronograma);

        return repository.save(novoCronograma);
    }

    @Transactional
    public CronogramaAlunoMonitor atualizar(Integer id, CronogramaAlunoMonitorDTO cronograma) {
        if (cronograma.getIdAlunoMonitor() == null) {
            throw new ValidationException("O id do aluno monitor não pode ser nulo.");
        }
        if (cronograma.getDiaDaSemana() == null || cronograma.getDiaDaSemana().equals("")) {
            throw new ValidationException("O dia da semana não pode ser nulo.");
        }
        if (!isDiaValido(cronograma.getDiaDaSemana())) {
            throw new ValidationException("Dia da semana inválido. Os dias válidos são: segunda-feira, terca-feira, quarta-feira, quinta-feira e sexta-feira.");
        }
        if (repository.existsByUsuarioIdAndDiaDaSemana(cronograma.getIdAlunoMonitor(), cronograma.getDiaDaSemana())) {
            throw new ValidationException("Já existe um cronograma para esse aluno no mesmo dia da semana.");
        }
        if (repository.countByDiaDaSemana(cronograma.getDiaDaSemana()) > 2) {
            throw new ValidationException("O limite de cronogramas para esse dia já foi atingido.");
        }

        CronogramaAlunoMonitor existente = buscarPorId(id);
        existente.setUsuario(usuarioService.buscarUsuarioAlunoMonitorPorId(cronograma.getIdAlunoMonitor()));
        existente.setDiaDaSemana(cronograma.getDiaDaSemana());

        return repository.save(existente);
    }

    @Transactional
    public void deletar(Integer id) {
        CronogramaAlunoMonitor existente = buscarPorId(id);
        repository.delete(existente);
    }
}
