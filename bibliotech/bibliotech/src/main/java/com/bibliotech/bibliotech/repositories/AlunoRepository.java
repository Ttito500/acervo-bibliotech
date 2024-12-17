package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlunoRepository extends JpaRepository<Aluno, Integer> {

    @Query("SELECT a FROM Aluno a " +
            "JOIN a.idTurma t " +
            "WHERE (:serie IS NULL OR t.serie = :serie) " +
            "AND (:turma IS NULL OR t.turma = :turma) " +
            "AND (:nome IS NULL OR LOWER(a.nome) LIKE LOWER(CONCAT('%', :nome, '%'))) " +
            "AND (:situacao IS NULL OR a.situacao = :situacao)")
    List<Aluno> filtrarAlunos(@Param("serie") Integer serie,
                              @Param("turma") String turma,
                              @Param("nome") String nome,
                              @Param("situacao") String situacao);
}
