package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.dtos.request.EstantePrateleiraSecaoDTO;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Estanteprateleira;
import com.bibliotech.bibliotech.models.Estanteprateleirasecao;
import com.bibliotech.bibliotech.models.Secao;
import com.bibliotech.bibliotech.repositories.EstantePrateleiraRepository;
import com.bibliotech.bibliotech.repositories.EstantePrateleiraSecaoRepository;
import com.bibliotech.bibliotech.repositories.SecaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EstantePrateleiraSecaoService {

    @Autowired
    private EstantePrateleiraRepository estantePrateleiraRepository;

    @Autowired
    private SecaoRepository secaoRepository;

    @Autowired
    private EstantePrateleiraSecaoRepository estantePrateleiraSecaoRepository;

    public Estanteprateleirasecao vincularEstantePrateleiraASecao(EstantePrateleiraSecaoDTO dto) {
        Estanteprateleira estantePrateleira = estantePrateleiraRepository.findById(dto.getIdEstantePrateleira())
                .orElseThrow(() -> new NotFoundException("Estante-Prateleira com ID " + dto.getIdEstantePrateleira() + " não encontrada."));

        Secao secao = secaoRepository.findById(dto.getIdSecao())
                .orElseThrow(() -> new NotFoundException("Seção com ID " + dto.getIdSecao() + " não encontrada."));

        Estanteprateleirasecao estanteprateleirasecao = new Estanteprateleirasecao();
        estanteprateleirasecao.setEstanteprateleira(estantePrateleira);
        estanteprateleirasecao.setSecao(secao);

        return estantePrateleiraSecaoRepository.save(estanteprateleirasecao);
    }

    public List<Estanteprateleira> listarEstantePrateleirasPorSecao(Integer idSecao) {
        List<Estanteprateleirasecao> estanteprateleirasecoes = estantePrateleiraSecaoRepository.findBySecaoId(idSecao);

        if (estanteprateleirasecoes.isEmpty()) {
            throw new NotFoundException("Nenhuma Estante-Prateleira encontrada para a Seção com ID " + idSecao);
        }

        return estanteprateleirasecoes.stream()
                .map(Estanteprateleirasecao::getEstanteprateleira)
                .collect(Collectors.toList());
    }

    public String desvincularEstantePrateleiraDeSecao(EstantePrateleiraSecaoDTO dto) {
        Estanteprateleirasecao estanteprateleirasecao = estantePrateleiraSecaoRepository.findByEstanteprateleiraIdAndSecaoId(dto.getIdEstantePrateleira(), dto.getIdSecao())
                .orElseThrow(() -> new NotFoundException("Vínculo entre Estante-Prateleira e Seção não encontrado."));

        estantePrateleiraSecaoRepository.delete(estanteprateleirasecao);

        return "Estante-Prateleira removida da Seção com sucesso.";
    }
}
