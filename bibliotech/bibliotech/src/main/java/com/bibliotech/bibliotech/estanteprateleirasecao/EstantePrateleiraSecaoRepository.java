
package com.bibliotech.bibliotech.estanteprateleirasecao;

import com.bibliotech.bibliotech.estanteprateleira.Estanteprateleira;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EstantePrateleiraSecaoRepository extends JpaRepository<Estanteprateleirasecao, Integer> {
    List<Estanteprateleirasecao> findBySecaoId(Integer idSecao);
    Optional<Estanteprateleirasecao> findByEstanteprateleiraIdAndSecaoId(Integer idEstantePrateleira, Integer idSecao);

    boolean existsByEstanteprateleira(Estanteprateleira estantePrateleira);
}