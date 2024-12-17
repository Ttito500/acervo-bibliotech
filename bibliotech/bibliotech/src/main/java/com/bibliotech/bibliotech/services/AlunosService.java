package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.models.Turma;
import com.bibliotech.bibliotech.repositories.AlunoRepository;
import com.bibliotech.bibliotech.repositories.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlunosService {

    @Autowired
    private AlunoRepository alunoRepository;
    @Autowired
    private TurmaRepository turmaRepository;

    public List<Aluno> filtrarAlunos(Integer serie, String turma, String nome, String situacao) {
        System.out.println("Serie: " + serie);
        System.out.println("Turma: " + turma);
        System.out.println("Nome: " + nome);
        System.out.println("Situacao: " + situacao);
        
        return alunoRepository.filtrarAlunos(serie, turma, nome, situacao);
    }

    public Aluno cadastrarAluno(Aluno aluno) {
        // Verifica se a Turma foi enviada corretamente
        if (aluno.getIdTurma() == null || aluno.getIdTurma().getId() == null) {
            throw new IllegalArgumentException("A turma associada ao aluno é inválida.");
        }

        // Busca a Turma no banco de dados
        Turma turmaExistente = turmaRepository.findById(aluno.getIdTurma().getId())
                .orElseThrow(() -> new NotFoundException("Turma com ID " + aluno.getIdTurma().getId() + " não encontrada."));

        // Preenche a série com base na turma
        aluno.setIdTurma(turmaExistente);  // A turma já foi validada e recuperada
        aluno.setIdTurma(turmaExistente);
        aluno.setSituacao(aluno.getSituacao() != null ? aluno.getSituacao() : "regular");

        // Salva o Aluno no banco de dados
        return alunoRepository.save(aluno);
    }

    public List<Aluno> getAlunos(){return alunoRepository.findAll();}

    public Optional<Aluno> getAlunoById(Integer id){return alunoRepository.findById(id);}

    public Aluno alterarAluno(Integer id, Aluno novoAluno) {
        // Verifica se o aluno existe
        Aluno alunoExistente = alunoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Aluno com ID " + id + " não encontrado."));

        alunoExistente.setNome(novoAluno.getNome());
        alunoExistente.setEmail(novoAluno.getEmail());
        alunoExistente.setTelefone(novoAluno.getTelefone());
        alunoExistente.setSituacao(novoAluno.getSituacao());

        // Se houver necessidade de atualizar a turma:
        if (novoAluno.getIdTurma() != null && novoAluno.getIdTurma().getId() != null) {
            Turma turmaExistente = turmaRepository.findById(novoAluno.getIdTurma().getId())
                    .orElseThrow(() -> new NotFoundException("Turma com ID " + novoAluno.getIdTurma().getId() + " não encontrada."));
            alunoExistente.setIdTurma(turmaExistente);
        }

        // Salva as alterações no aluno
        return alunoRepository.save(alunoExistente);
    }

    public void deletarAluno(Integer id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Aluno com ID " + id + " não encontrado."));

        alunoRepository.delete(aluno);
    }

}
