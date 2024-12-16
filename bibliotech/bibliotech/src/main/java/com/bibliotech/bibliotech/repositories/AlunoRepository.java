package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}