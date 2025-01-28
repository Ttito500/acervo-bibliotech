package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TurmaRepository extends JpaRepository<Turma, Integer> {
    @Query("SELECT t FROM Turma t " +
            "WHERE (:serie IS NULL OR t.serie = :serie) " +
            "AND (:turma IS NULL OR t.turma = :turma) " +
            "AND (:anoDeEntrada IS NULL OR t.anoDeEntrada = :anoDeEntrada) " +
            "AND (:ativo IS NULL OR t.ativo = :ativo)")
    List<Turma> filtrarTurmas(@Param("serie") Integer serie,
                              @Param("turma") String turma,
                              @Param("anoDeEntrada") Integer anoDeEntrada,
                              @Param("ativo") Boolean ativo);
}
