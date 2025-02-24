package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.dtos.request.ExemplarRequestPatchDTO;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Estanteprateleira;
import com.bibliotech.bibliotech.models.Exemplar;
import com.bibliotech.bibliotech.models.Livro;
import com.bibliotech.bibliotech.models.Secao;
import com.bibliotech.bibliotech.repositories.EstantePrateleiraRepository;
import com.bibliotech.bibliotech.repositories.ExemplarRepository;
import com.bibliotech.bibliotech.repositories.LivroRepository;
import com.bibliotech.bibliotech.repositories.SecaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExemplaresService {

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private SecoesService secoesService;

    @Autowired
    private ExemplarRepository exemplarRepository;

    @Autowired
    private EstantePrateleiraService estantePrateleiraService;

    @Transactional
    public List<Exemplar> cadastrarExemplares(Livro livro, Secao secao, Estanteprateleira estanteprateleira, Integer qtdExemplaresNovos) {
        Livro livroCadastrado = livroRepository.findLivroById(livro.getId());
        List<Exemplar> exemplaresSalvos = new ArrayList<>();

        int qtd_exemplares_ja_existente = 0;

        if (livroCadastrado.getExemplares() != null) {
            qtd_exemplares_ja_existente = livroCadastrado.getExemplares().size();
        }

        int qtd_exemplares_final = qtd_exemplares_ja_existente + qtdExemplaresNovos;

        for (int i = qtd_exemplares_ja_existente; i < qtd_exemplares_final; i++) {
            Exemplar exemplar = new Exemplar();
            exemplar.setLivro(livroCadastrado);
            exemplar.setSecao(secao);
            exemplar.setEstanteprateleira(estanteprateleira);
            exemplar.setNumero(i + 1);
            exemplarRepository.save(exemplar);
            exemplaresSalvos.add(exemplar);
        }

        return exemplaresSalvos;
    }

    public List<Exemplar> listarExemplaresDeUmLivro(Integer id) {
        return exemplarRepository.findExemplarByLivro_IdOrderByNumero(id);
    }

    public Exemplar findExemplarById(Integer id) {
        return exemplarRepository.findById(id).orElseThrow(()-> new NotFoundException("Exemplar com id: " + id + " não encontrado"));
    }

    public void extraviarExemplar(Integer id) {
        Exemplar exemplar = findExemplarById(id);

        if (exemplarRepository.existsByExemplarAndSituacaoPendenteOuAtrasado(id)) {
            throw new ValidationException("Exemplar não pode ser extraviado pois está associado a um emprestimo pendente ou atrasado.");
        }

        exemplar.setSituacao("extraviado");
        exemplarRepository.save(exemplar);
    }

    public Exemplar atualizarExemplar(Integer id, ExemplarRequestPatchDTO exemplarDTO) {
        Exemplar exemplar = findExemplarById(id);
        Secao secao = secoesService.getSecaoById(exemplarDTO.getIdSecao());
        Estanteprateleira estanteprateleira = estantePrateleiraService.getEstantePrateleiraById(exemplarDTO.getIdEstantePrateleira());

        if (exemplarDTO.getIdLivro() != exemplar.getLivro().getId()) {
            throw new ValidationException("O id do Livro infromado não corresponde ao exemplar selecionado.");
        }
        if (exemplarDTO.getSituacao() != null || !exemplarDTO.getSituacao().equals("")) {
            exemplar.setSituacao(exemplarDTO.getSituacao());
        }
        if (exemplarDTO.getObservacao() != null) {
            exemplar.setObservacao(exemplarDTO.getObservacao());
        }
        exemplar.setEstanteprateleira(estanteprateleira);
        exemplar.setSecao(secao);

        return exemplarRepository.save(exemplar);
    }

    public List<Exemplar> findByLivroIdAndSituacaoNotExtraviado(Integer id) {
        return exemplarRepository.findByLivroIdAndSituacaoNotExtraviado(id);
    }
}
