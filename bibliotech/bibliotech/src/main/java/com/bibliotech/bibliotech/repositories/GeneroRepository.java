package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Genero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GeneroRepository extends JpaRepository<Genero, Integer> {
    @Query("SELECT g FROM Genero g WHERE NOT EXISTS (SELECT lg FROM Livrogenero lg WHERE lg.genero = g ORDER BY g.genero)")
    List<Genero> findGenerosSemAssociacao();

    List<Genero> findByGeneroContainingIgnoreCase(String genero);

    Optional<Genero> findFirstByGeneroIgnoreCase(String genero);

    @Query("SELECT g FROM Genero g JOIN Livrogenero lg ON g.id = lg.genero.id WHERE lg.livro.id = :livroId")
    List<Genero> findGenerosByLivroId(@Param("livroId") Integer livroId);

}
