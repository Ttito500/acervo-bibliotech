package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.CronogramaAlunoMonitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CronogramaAlunoMonitorRepository extends JpaRepository<CronogramaAlunoMonitor, Integer> {
    Integer countByDiaDaSemana(String diaDaSemana);
    boolean existsByUsuarioIdAndDiaDaSemana(Integer id, String diaDaSemana);
}
