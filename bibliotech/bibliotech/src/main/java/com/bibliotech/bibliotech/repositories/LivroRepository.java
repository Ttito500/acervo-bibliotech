package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Integer> {


    @Query("SELECT l FROM Livro l " +
            "JOIN l.idSecao s " +
            "LEFT JOIN l.idEstantePrateleira ep " +
            "WHERE (:isbn IS NULL OR l.isbn = :isbn) " +
            "AND (:titulo IS NULL OR LOWER(l.titulo) LIKE LOWER(CONCAT('%', :titulo, '%'))) " +
            "AND (:autor IS NULL OR LOWER(l.autor) LIKE LOWER(CONCAT('%', :autor, '%'))) " +
            "AND (:situacao IS NULL OR l.situacao = :situacao) " +
            "AND (:idSecao IS NULL OR s.id = :idSecao)")
    List<Livro> filtrarLivros(@Param("isbn") String isbn,
                              @Param("titulo") String titulo,
                              @Param("autor") String autor,
                              @Param("situacao") String situacao,
                              @Param("idSecao") Integer idSecao);
}
