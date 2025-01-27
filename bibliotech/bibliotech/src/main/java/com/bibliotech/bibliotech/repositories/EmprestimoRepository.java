package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Integer> {
}
