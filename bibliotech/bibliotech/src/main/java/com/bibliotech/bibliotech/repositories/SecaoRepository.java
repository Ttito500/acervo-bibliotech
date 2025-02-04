package com.bibliotech.bibliotech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bibliotech.bibliotech.models.Secao;
import org.springframework.stereotype.Repository;

@Repository
public interface SecaoRepository extends JpaRepository<Secao, Integer> {
    boolean existsByNome(String nome);
}
