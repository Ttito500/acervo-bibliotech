package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Integer> {
}
