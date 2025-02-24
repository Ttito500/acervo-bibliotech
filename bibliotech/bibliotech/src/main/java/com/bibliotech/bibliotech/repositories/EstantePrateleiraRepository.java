package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Estanteprateleira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstantePrateleiraRepository extends JpaRepository<Estanteprateleira, Integer> {
    Optional<Estanteprateleira> findByEstanteAndPrateleira(String estante, Integer prateleira);

    boolean existsEstanteprateleiraByEstanteAndPrateleira(String estante, Integer prateleira);
}
