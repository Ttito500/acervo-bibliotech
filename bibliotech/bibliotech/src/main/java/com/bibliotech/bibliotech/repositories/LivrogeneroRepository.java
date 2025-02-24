package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Livrogenero;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface LivrogeneroRepository extends JpaRepository<Livrogenero, Integer> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Livrogenero lg WHERE lg.livro.id = :idLivro")
    void deleteByLivroId(Integer idLivro);
}
