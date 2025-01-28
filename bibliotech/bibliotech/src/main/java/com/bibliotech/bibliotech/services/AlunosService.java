package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.dtos.request.AlunoRequestDTO;
import com.bibliotech.bibliotech.dtos.response.AlunoResponseDTO;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.models.Turma;
import com.bibliotech.bibliotech.repositories.AlunoRepository;
import com.bibliotech.bibliotech.dtos.request.mappers.AlunoRequestMapper;
import com.bibliotech.bibliotech.dtos.response.mappers.AlunoResponseMapper;
import com.bibliotech.bibliotech.repositories.EmprestimoRepository;
import com.bibliotech.bibliotech.repositories.TurmaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlunosService {

    private final AlunoRepository alunoRepository;
    private final AlunoRequestMapper alunoRequestMapper;
    private final AlunoResponseMapper alunoResponseMapper;
    private final TurmaRepository turmaRepository;
    private final EmprestimoRepository emprestimoRepository;

    public AlunosService(AlunoRepository alunoRepository, AlunoRequestMapper alunoRequestMapper, AlunoResponseMapper alunoResponseMapper, TurmaRepository turmaRepository, EmprestimoRepository emprestimoRepository) {
        this.alunoRepository = alunoRepository;
        this.alunoRequestMapper = alunoRequestMapper;
        this.alunoResponseMapper = alunoResponseMapper;
        this.turmaRepository = turmaRepository;
        this.emprestimoRepository = emprestimoRepository;
    }

    public List<AlunoResponseDTO> filtrarAlunos(Integer serie, String turma, String nome, String situacao, Boolean ativo) {
        List<Aluno> alunos = alunoRepository.filtrarAlunos(serie, turma, nome, ativo, situacao);
        return alunos.stream()
                .map(alunoResponseMapper::toDto)
                .collect(Collectors.toList());
    }

    public AlunoResponseDTO buscarAlunoPorId(Integer id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Aluno não encontrado."));
        return alunoResponseMapper.toDto(aluno);
    }

    @Transactional
    public AlunoResponseDTO cadastrarAluno(AlunoRequestDTO requestDTO) {
        if (requestDTO.getIdTurma() == null) {
            throw new ValidationException("A turma não pode ser nula.");
        }
        if (requestDTO.getNome() == null || requestDTO.getNome().isEmpty()) {
            throw new ValidationException("O nome do aluno é obrigatório.");
        }
        if (requestDTO.getEmail() == null || requestDTO.getEmail().isEmpty()) {
            throw new ValidationException("O e-mail do aluno é obrigatório.");
        }
        if (alunoRepository.existsByEmail(requestDTO.getEmail())) {
            throw new ValidationException("Já existe um aluno cadastrado com esse e-mail.");
        }

        Aluno aluno = alunoRequestMapper.toEntity(requestDTO);
        aluno.setSituacao("regular");
        Aluno alunoSalvo = alunoRepository.save(aluno);
        return alunoResponseMapper.toDto(alunoSalvo);
    }

    @Transactional
    public AlunoResponseDTO atualizarAluno(Integer id, AlunoRequestDTO requestDTO) {
        Aluno alunoExistente = alunoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Aluno não encontrado."));

        if (!alunoExistente.getEmail().equals(requestDTO.getEmail()) && alunoRepository.existsByEmail(requestDTO.getEmail())) {
            throw new ValidationException("Já existe um aluno cadastrado com esse e-mail.");
        }

        alunoExistente.setNome(requestDTO.getNome());
        alunoExistente.setEmail(requestDTO.getEmail());
        alunoExistente.setTelefone(requestDTO.getTelefone());

        String situacao = requestDTO.getSituacao();
        if (situacao != null && !situacao.isEmpty() && !situacao.equals("regular") && !situacao.equals("debito") && !situacao.equals("irregular")) {
            throw new ValidationException("Situação inválida. Deve ser 'regular', 'debito' ou 'irregular'.");
        }
        alunoExistente.setSituacao(situacao);

        if (requestDTO.getIdTurma() != null) {
            Turma turmaExistente = turmaRepository.findById(requestDTO.getIdTurma())
                    .orElseThrow(() -> new ValidationException("Turma não encontrada."));
            alunoExistente.setTurma(turmaExistente);
        }

        Aluno alunoAtualizado = alunoRepository.save(alunoExistente);
        return alunoResponseMapper.toDto(alunoAtualizado);
    }

    @Transactional
    public void inativarAluno(Integer id) {
        Aluno alunoExistente = alunoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Aluno não encontrado."));

//        if (emprestimoRepository.existsByAlunoAndDataDevolucaoIsNull(alunoExistente)) {
//            throw new AlunoComPendenciasException("Aluno possui pendências e não pode ser inativado.");
//        }

        alunoExistente.setAtivo(false);
        alunoRepository.save(alunoExistente); // Não esqueça de salvar a alteração!
    }

    //achei melhor passar logo o obj de turma ao inves de passar id para evitar a query do banco
    public void inativarAlunosPorTurma(Turma turma) {
        List<Aluno> alunos = alunoRepository.filtrarAlunos(turma.getSerie(), turma.getTurma(), null, true, null);
        for (Aluno aluno : alunos) {
            aluno.setAtivo(false);
        }
        alunoRepository.saveAll(alunos);
    }
}