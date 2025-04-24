package com.bibliotech.bibliotech.cronogramaAlunoMonitor;

import com.bibliotech.bibliotech.cronogramaAlunoMonitor.dto.CronogramaAlunoMonitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CronogramaAlunoMonitorRepository extends JpaRepository<CronogramaAlunoMonitor, Integer> {
    Integer countByDiaDaSemana(String diaDaSemana);
    boolean existsByUsuarioIdAndDiaDaSemana(Integer id, String diaDaSemana);
}
