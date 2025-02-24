package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.dtos.response.AlunoLeiturasDTO;
import com.bibliotech.bibliotech.models.Aluno;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Integer> {

    @Query("SELECT a FROM Aluno a " +
            "JOIN a.turma t " +
            "WHERE (:serie IS NULL OR t.serie = :serie) " +
            "AND (:turma IS NULL OR t.turma = :turma) " +
            "AND (COALESCE(:nome, '') = '' OR LOWER(a.nome) LIKE LOWER(CONCAT('%', :nome, '%'))) " +
            "AND (:situacao IS NULL OR a.situacao = :situacao) " +
            "AND (:ativo IS NULL OR a.ativo = :ativo) ORDER BY a.nome")
    Page<Aluno> filtrarAlunos(@Param("serie") Integer serie,
                              @Param("turma") String turma,
                              @Param("nome") String nome,
                              @Param("ativo") Boolean ativo,
                              @Param("situacao") String situacao,
                              Pageable pageable);

    @Query("SELECT CASE WHEN a.situacao <> 'regular' THEN true ELSE false END FROM Aluno a WHERE a.id = :id")
    boolean temSituacaoIrregular(@Param("id") Integer id);

    @Query("SELECT new com.bibliotech.bibliotech.dtos.response.AlunoLeiturasDTO(" +
            "a.nome, t.serie, t.turma, COUNT(e.id)) " +
            "FROM Aluno a " +
            "INNER JOIN Turma t ON a.turma.id = t.id " + // Join with Turma
            "INNER JOIN Emprestimo e ON a.id = e.aluno.id " +
            "WHERE e.dataEmprestimo BETWEEN :dataInicio AND :dataFim " +
            "GROUP BY a.nome, t.serie, t.turma " + // Group by all selected non-aggregated fields
            "ORDER BY COUNT(e.id) DESC")
    List<AlunoLeiturasDTO> obterAlunosMaisLeitures(LocalDate dataInicio, LocalDate dataFim);

    boolean existsByEmail(String email);
    boolean existsById(Integer id);
}