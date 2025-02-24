package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.dtos.response.TurmaLeiturasDTO;
import com.bibliotech.bibliotech.models.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TurmaRepository extends JpaRepository<Turma, Integer> {
    @Query("SELECT t FROM Turma t " +
            "WHERE (:serie IS NULL OR t.serie = :serie) " +
            "AND (:turma IS NULL OR t.turma = :turma) " +
            "AND (:anoDeEntrada IS NULL OR t.anoDeEntrada = :anoDeEntrada) " +
            "AND (:ativo IS NULL OR t.ativo = :ativo) ORDER BY t.serie, t.turma")
    List<Turma> filtrarTurmas(@Param("serie") Integer serie,
                              @Param("turma") String turma,
                              @Param("anoDeEntrada") Integer anoDeEntrada,
                              @Param("ativo") Boolean ativo);

    boolean existsBySerieAndTurmaAndAnoDeEntrada(Integer serie, String turma, Integer anoDeEntrada);

    @Query("SELECT new com.bibliotech.bibliotech.dtos.response.TurmaLeiturasDTO(" +
            "t.serie, t.turma, COUNT(e), " +
            "(SELECT a.nome FROM Aluno a LEFT JOIN Emprestimo e2 ON a.id = e2.aluno.id WHERE a.turma.id = t.id AND e2.dataEmprestimo BETWEEN :dataInicio AND :dataFim GROUP BY a.nome ORDER BY COUNT(e2) DESC LIMIT 1), " +
            "(SELECT COUNT(e2) FROM Aluno a LEFT JOIN Emprestimo e2 ON a.id = e2.aluno.id WHERE a.turma.id = t.id AND e2.dataEmprestimo BETWEEN :dataInicio AND :dataFim GROUP BY a.nome ORDER BY COUNT(e2) DESC LIMIT 1)) " +
            "FROM Turma t " +
            "LEFT JOIN Aluno a ON t.id = a.turma.id " +
            "LEFT JOIN Emprestimo e ON a.id = e.aluno.id " +
            "WHERE e.dataEmprestimo BETWEEN :dataInicio AND :dataFim " +
            "GROUP BY t.id, t.serie, t.turma " +
            "ORDER BY COUNT(e) DESC")
    List<TurmaLeiturasDTO> obterTurmasMaisLeitoras(LocalDate dataInicio, LocalDate dataFim);
}
