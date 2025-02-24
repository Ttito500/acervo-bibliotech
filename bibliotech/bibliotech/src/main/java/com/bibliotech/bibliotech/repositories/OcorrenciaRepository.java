package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Ocorrencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Integer> {

    @Query("SELECT o FROM Ocorrencia o WHERE o.data BETWEEN :dataInicio AND :dataFim")
    List<Ocorrencia> findByPeriod(@Param("dataInicio") LocalDate dataInicio, @Param("dataFim") LocalDate dataFim);

    default List<Ocorrencia> filtrarOcorrencias(LocalDate dataInicio, LocalDate dataFim) {
        if (dataInicio == null) {
            return findAll(); // Return all records if dataInicio or dataFim is null
        }
        else if (dataFim == null) {
            if (dataInicio.isAfter(LocalDate.now())) {
                throw new ValidationException("Data de início não pode ser maior que a data atual.");
            }
            return findByPeriod(dataInicio, LocalDate.now()); // Filter by date if dataFim is null
        }
        else {
            if (dataInicio.isAfter(dataFim)) {
                throw new ValidationException("Data de início não pode ser maior que a data de fim.");
            }
            return findByPeriod(dataInicio, dataFim); // Filter by date if dataInicio and dataFim are not null
        }
    }
}
