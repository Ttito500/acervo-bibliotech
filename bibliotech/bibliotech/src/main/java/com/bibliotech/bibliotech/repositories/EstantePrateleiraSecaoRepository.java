
package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Estanteprateleirasecao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EstantePrateleiraSecaoRepository extends JpaRepository<Estanteprateleirasecao, Integer> {
    List<Estanteprateleirasecao> findBySecaoId(Integer idSecao);
    Optional<Estanteprateleirasecao> findByEstanteprateleiraIdAndSecaoId(Integer idEstantePrateleira, Integer idSecao);
}