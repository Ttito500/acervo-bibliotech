package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.models.Emprestimo;
import com.bibliotech.bibliotech.models.Livro;
import com.bibliotech.bibliotech.repositories.AlunoRepository;
import com.bibliotech.bibliotech.repositories.EmprestimoRepository;
import com.bibliotech.bibliotech.repositories.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

@Service
public class EmprestimosService {
    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    //Ainda tem que fazer as excessoes bonitinhas
    public Emprestimo realizarEmprestimo (Integer alunoId, Integer livroId, Integer qtdRenovacao ,String situacao ,String observacao) {
        Livro livro = livroRepository.findById(livroId)
                .orElseThrow(() -> new NotFoundException("Livro não encontrado"));
        if (!"disponivel".equalsIgnoreCase(livro.getSituacao())){
            throw new RuntimeException("Erro de situação");
        }

        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new NotFoundException("Aluno não encontrado"));

        if (!"regular".equalsIgnoreCase(aluno.getSituacao())){
            throw new RuntimeException("Erro de situação");
        }

        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setIdAluno(aluno);
        emprestimo.setIdLivro(livro);
        emprestimo.setDataEmprestimo(LocalDate.now());
        emprestimo.setDataPrazo(LocalDate.now().plusDays(7));
        emprestimo.setQtdRenovacao(qtdRenovacao);
        emprestimo.setSituacao(emprestimo.getSituacao() != null ? emprestimo.getSituacao() : "pendente");
        emprestimo.setObservacao(observacao);

        livro.setSituacao("emprestado");

        return emprestimoRepository.save(emprestimo);
    }

    public Emprestimo alterarSituacao(Integer id, String status){
        Emprestimo emprestimoExistente = emprestimoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Emprestimo com o ID" + id + "não encontrado."));

        emprestimoExistente.setSituacao(status);

        emprestimoRepository.save(emprestimoExistente);
        return emprestimoExistente;
    }

    public Emprestimo renovarPrazo(Integer id){
        Emprestimo emprestimoExistente = emprestimoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Emprestimo com o ID" + id + "não encontrado."));

        if (emprestimoExistente.getSituacao().equals("atrasado")){
            emprestimoExistente.setDataPrazo(LocalDate.now().plusDays(7));
        }
        else {
            emprestimoExistente.setDataPrazo(emprestimoExistente.getDataPrazo().plusDays(7));
        }

        emprestimoRepository.save(emprestimoExistente);
        return emprestimoExistente;
    }

    public List<Emprestimo> getEmprestimos(){ return emprestimoRepository.findAll(); }

}
