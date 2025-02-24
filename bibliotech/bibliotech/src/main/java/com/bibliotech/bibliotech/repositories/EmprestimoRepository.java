package com.bibliotech.bibliotech.repositories;


import com.bibliotech.bibliotech.models.Emprestimo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;



@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Integer>, JpaSpecificationExecutor<Emprestimo> {
    Page<Emprestimo> findByAlunoId(Integer idAluno, Pageable pageable);
    @Query("SELECT e FROM Emprestimo e WHERE e.aluno.id = :idAluno AND e.dataEmprestimo BETWEEN :dataEmprestimoInicio AND :dataEmprestimoFim")
    Page<Emprestimo> findByAlunoIdAndDataEmprestimoBetween(
            @Param("idAluno") Integer idAluno,
            @Param("dataEmprestimoInicio") LocalDate dataEmprestimoInicio,
            @Param("dataEmprestimoFim") LocalDate dataEmprestimoFim,
            Pageable pageable
    );

    Page<Emprestimo> findByExemplar_LivroId(Integer idExemplar, Pageable pageable);
    @Query("SELECT e FROM Emprestimo e WHERE e.exemplar.livro.id = :idLivro AND e.dataEmprestimo BETWEEN :dataEmprestimoInicio AND :dataEmprestimoFim")
    Page<Emprestimo> findByExemplar_LivroIdAndDataEmprestimoBetween(
            @Param("idLivro") Integer idLivro,
            @Param("dataEmprestimoInicio") LocalDate dataEmprestimoInicio,
            @Param("dataEmprestimoFim") LocalDate dataEmprestimoFim,
            Pageable pageable
    );
    List<Emprestimo> findBySituacao(String situacao);
    List<Emprestimo> findBySituacaoAndDataPrazo(String situacao, LocalDate data);
}