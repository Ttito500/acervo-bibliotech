package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Livroautor;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface LivroautorRepository extends JpaRepository<Livroautor, Integer> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Livroautor la WHERE la.livro.id = :idLivro")
    void deleteByLivroId(Integer idLivro);
}
