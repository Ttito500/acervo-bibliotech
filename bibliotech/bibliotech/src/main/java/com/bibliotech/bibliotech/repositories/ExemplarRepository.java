package com.bibliotech.bibliotech.repositories;

import com.bibliotech.bibliotech.models.Estanteprateleira;
import com.bibliotech.bibliotech.models.Exemplar;
import com.bibliotech.bibliotech.models.Secao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExemplarRepository extends JpaRepository<Exemplar, Integer> {
    boolean existsByEstanteprateleira(Estanteprateleira estanteprateleira);
    boolean existsBySecao(Secao secao);

    List<Exemplar> findByEstanteprateleira(Estanteprateleira estanteprateleira);

    List<Exemplar> findExemplarByLivro_IdOrderByNumero(Integer livroId);

    @Query("SELECT COUNT(e) > 0 FROM Emprestimo e WHERE e.exemplar.id = :idExemplar AND e.situacao IN ('pendente', 'atrasado')")
    boolean existsByExemplarAndSituacaoPendenteOuAtrasado(@Param("idExemplar") Integer idExemplar);

    @Query("SELECT e FROM Exemplar e WHERE e.livro.id = :idLivro AND e.situacao <> 'extraviado'")
    List<Exemplar> findByLivroIdAndSituacaoNotExtraviado(@Param("idLivro") Integer idLivro);
}
