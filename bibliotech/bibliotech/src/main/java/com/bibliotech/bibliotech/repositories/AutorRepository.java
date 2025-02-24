package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Autor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface AutorRepository extends JpaRepository<Autor, Integer> {

    @Query("SELECT a FROM Autor a WHERE NOT EXISTS (SELECT 1 FROM Livroautor la WHERE la.autor.id = a.id)")
    List<Autor> findAutoresSemLivros();

    Optional<Autor> findFirstByNomeIgnoreCase(String nome);

    @Query("SELECT g FROM Autor g JOIN Livroautor lg ON g.id = lg.autor.id WHERE lg.livro.id = :livroId")
    List<Autor> findAutoresByLivroId(@Param("livroId") Integer livroId);

    List<Autor> findByNomeContainingIgnoreCase(String nome);
}
