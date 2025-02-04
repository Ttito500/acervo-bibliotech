package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Integer> {

    @Query("SELECT a FROM Aluno a " +
            "JOIN a.turma t " +
            "WHERE (:serie IS NULL OR t.serie = :serie) " +
            "AND (:turma IS NULL OR t.turma = :turma) " +
            "AND (COALESCE(:nome, '') = '' OR LOWER(a.nome) LIKE LOWER(CONCAT('%', :nome, '%'))) " + // Condição ajustada
            "AND (:situacao IS NULL OR a.situacao = :situacao) " +
            "AND (:ativo IS NULL OR a.ativo = :ativo) ORDER BY a.nome")
    List<Aluno> filtrarAlunos(@Param("serie") Integer serie,
                              @Param("turma") String turma,
                              @Param("nome") String nome,
                              @Param("ativo") Boolean ativo,
                              @Param("situacao") String situacao);

    boolean existsByEmail(String email);
    boolean existsById(Integer id);
}