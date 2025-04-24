package com.bibliotech.bibliotech.cronogramaAlunoMonitor;

import com.bibliotech.bibliotech.cronogramaAlunoMonitor.dto.CronogramaAlunoMonitorMapper;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.cronogramaAlunoMonitor.dto.CronogramaAlunoMonitor;
import com.bibliotech.bibliotech.services.UsuarioService;
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
    public CronogramaAlunoMonitor salvar(CronogramaAlunoMonitor cronograma) {
        if (!isDiaValido(cronograma.getDiaDaSemana())) {
            throw new ValidationException("Dia da semana inválido. Os dias válidos são: segunda-feira, terca-feira, quarta-feira, quinta-feira e sexta-feira.");
        }
        if (repository.existsByUsuarioIdAndDiaDaSemana(cronograma.getUsuario().getId(), cronograma.getDiaDaSemana())) {
            throw new ValidationException("Já existe um cronograma para esse aluno no mesmo dia da semana.");
        }
        if (repository.countByDiaDaSemana(cronograma.getDiaDaSemana()) > 2) {
            throw new ValidationException("O limite de cronogramas para esse dia já foi atingido.");
        }

        return repository.save(cronograma);
    }

    @Transactional
    public CronogramaAlunoMonitor atualizar(Integer id, CronogramaAlunoMonitor cronograma) {
        if (!isDiaValido(cronograma.getDiaDaSemana())) {
            throw new ValidationException("Dia da semana inválido. Os dias válidos são: segunda-feira, terca-feira, quarta-feira, quinta-feira e sexta-feira.");
        }
        if (repository.existsByUsuarioIdAndDiaDaSemana(cronograma.getUsuario().getId(), cronograma.getDiaDaSemana())) {
            throw new ValidationException("Já existe um cronograma para esse aluno no mesmo dia da semana.");
        }
        if (repository.countByDiaDaSemana(cronograma.getDiaDaSemana()) > 2) {
            throw new ValidationException("O limite de cronogramas para esse dia já foi atingido.");
        }

        CronogramaAlunoMonitor existente = buscarPorId(id);
        existente.setUsuario(usuarioService.buscarUsuarioAlunoMonitorPorId(cronograma.getUsuario().getId()));
        existente.setDiaDaSemana(cronograma.getDiaDaSemana());

        return repository.save(existente);
    }

    @Transactional
    public void deletar(Integer id) {
        repository.delete(buscarPorId(id));
    }
}
