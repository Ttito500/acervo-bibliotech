package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.dtos.request.AlunoRequestDTO;
import com.bibliotech.bibliotech.dtos.request.mappers.AlunoRequestMapper;
import com.bibliotech.bibliotech.dtos.response.AlunoLeiturasDTO;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.models.Turma;
import com.bibliotech.bibliotech.repositories.AlunoRepository;
import com.bibliotech.bibliotech.repositories.EmprestimoRepository;
import com.bibliotech.bibliotech.repositories.TurmaRepository;
import com.bibliotech.bibliotech.utils.EmailValidator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class AlunosService {

    private final AlunoRepository alunoRepository;
    private final AlunoRequestMapper alunoRequestMapper;
    private final TurmaRepository turmaRepository;
    private final EmprestimoRepository emprestimoRepository;

    public AlunosService(AlunoRepository alunoRepository, AlunoRequestMapper alunoRequestMapper, TurmaRepository turmaRepository, EmprestimoRepository emprestimoRepository) {
        this.alunoRepository = alunoRepository;
        this.alunoRequestMapper = alunoRequestMapper;
        this.turmaRepository = turmaRepository;
        this.emprestimoRepository = emprestimoRepository;
    }

    public Page<Aluno> filtrarAlunos(Integer serie, String turma, String nome, String situacao, Boolean ativo, Pageable pageable) {
        return alunoRepository.filtrarAlunos(serie, turma, nome, ativo, situacao, pageable);
    }

    public Aluno buscarAlunoPorId(Integer id) {
        return alunoRepository.findById(id).orElseThrow(() -> new NotFoundException("Aluno não encontrado."));
    }

    @Transactional
    public Aluno cadastrarAluno(AlunoRequestDTO requestDTO) {
        if (requestDTO.getIdTurma() == null) {
            throw new ValidationException("A turma não pode ser nula.");
        }
        if (requestDTO.getNome() == null || requestDTO.getNome().isEmpty()) {
            throw new ValidationException("O nome do aluno é obrigatório.");
        }
        if (!EmailValidator.isValid(requestDTO.getEmail()) || requestDTO.getEmail().isEmpty()) {
            throw new ValidationException("O e-mail informado não é válido.");
        }
        if (alunoRepository.existsByEmail(requestDTO.getEmail())) {
            throw new ValidationException("Já existe um aluno cadastrado com esse e-mail.");
        }

        Aluno aluno = alunoRequestMapper.toEntity(requestDTO);
        aluno.setSituacao("regular");

        return alunoRepository.save(aluno);
    }

    @Transactional
    public Aluno atualizarAluno(Integer id, AlunoRequestDTO requestDTO) {
        Aluno alunoExistente = alunoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Aluno não encontrado."));

        if (requestDTO.getIdTurma() == null) {
            throw new ValidationException("A turma não pode ser nula.");
        }
        if (requestDTO.getNome() == null || requestDTO.getNome().isEmpty()) {
            throw new ValidationException("O nome do aluno é obrigatório.");
        }
        if (!EmailValidator.isValid(requestDTO.getEmail()) || requestDTO.getEmail().isEmpty()) {
            throw new ValidationException("O e-mail informado não é válido.");
        }
        if (!alunoExistente.getEmail().equals(requestDTO.getEmail()) && alunoRepository.existsByEmail(requestDTO.getEmail())) {
            throw new ValidationException("Já existe um aluno cadastrado com esse e-mail.");
        }
        if (requestDTO.getSituacao() != null && !requestDTO.getSituacao().isEmpty() && !requestDTO.getSituacao().equals("regular") && !requestDTO.getSituacao().equals("debito") && !requestDTO.getSituacao().equals("irregular")) {
            throw new ValidationException("Situação inválida. Deve ser 'regular', 'debito' ou 'irregular'.");
        }
        if (requestDTO.getEmail() == null || requestDTO.getEmail().isEmpty()) {
            throw new ValidationException("O telefone não pode ser nulo.");
        }

        alunoExistente.setNome(requestDTO.getNome());
        alunoExistente.setEmail(requestDTO.getEmail());
        alunoExistente.setTelefone(requestDTO.getTelefone());
        alunoExistente.setSituacao(requestDTO.getSituacao());

        if (requestDTO.getIdTurma() != null) {
            Turma turmaExistente = turmaRepository.findById(requestDTO.getIdTurma())
                    .orElseThrow(() -> new ValidationException("Turma não encontrada."));
            alunoExistente.setTurma(turmaExistente);
        }

        return alunoRepository.save(alunoExistente);
    }

    @Transactional
    public void inativarAluno(Integer id) {
        Aluno alunoExistente = alunoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Aluno não encontrado."));

        if (alunoRepository.temSituacaoIrregular(id)) {
            throw new ValidationException("Aluno possui pendências e não pode ser inativado.");
        }

        alunoExistente.setAtivo(false);
        alunoRepository.save(alunoExistente);
    }

    @Transactional
    public void ativarAluno(Integer id) {
        Aluno alunoExistente = alunoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Aluno não encontrado."));

        alunoExistente.setAtivo(true);
        alunoRepository.save(alunoExistente);
    }

    public void inativarAlunosPorTurma(Turma turma) {
        List<Aluno> alunos = alunoRepository.filtrarAlunos(turma.getSerie(), turma.getTurma(), null, true, null, Pageable.unpaged()).getContent();
        for (Aluno aluno : alunos) {
            aluno.setAtivo(false);
        }
        alunoRepository.saveAll(alunos);
    }

    public void ativarAlunosPorTurma(Turma turma) {
        List<Aluno> alunos = alunoRepository.filtrarAlunos(turma.getSerie(), turma.getTurma(), null, false, null, Pageable.unpaged()).getContent();
        for (Aluno aluno : alunos) {
            aluno.setAtivo(true);
        }
        alunoRepository.saveAll(alunos);
    }

    public List<AlunoLeiturasDTO> obterAlunosMaisLeitures(LocalDate dataInicio, LocalDate dataFim, Integer qtdMax) {
        if (dataInicio == null) {
            throw new ValidationException("A data de início é obrigatória.");
        } else if (dataFim == null) {
            dataFim = LocalDate.now();
        } else if (dataInicio.isAfter(dataFim)) {
            throw new ValidationException("A data de início deve ser anterior à data final.");
        }

        List<AlunoLeiturasDTO> result = alunoRepository.obterAlunosMaisLeitures(dataInicio, dataFim);

        if (qtdMax != null && result.size() > qtdMax) {
            return result.subList(0, qtdMax);
        }

        return result;
    }
}