package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Genero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GeneroRepository extends JpaRepository<Genero, Integer> {
    @Query("SELECT g FROM Genero g " +
            "WHERE (:genero IS NULL OR LOWER(g.genero) LIKE LOWER(CONCAT('%', :genero, '%')))")
    List<Genero> filtrarGeneros(@Param("genero") String genero);
}
