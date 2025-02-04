package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Autor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface AutorRepository extends JpaRepository<Autor, Integer> {

    @Query("SELECT a FROM Autor a WHERE NOT EXISTS (SELECT 1 FROM Livroautor la WHERE la.idAutor = a ORDER BY a.nome)")
    List<Autor> findAutoresSemLivros();

    Optional<Autor> findFirstByNomeIgnoreCase(String nome);
}
