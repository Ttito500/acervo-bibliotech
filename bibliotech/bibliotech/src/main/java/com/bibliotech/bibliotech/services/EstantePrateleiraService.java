package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.dtos.response.ExemplarResponseDTO;
import com.bibliotech.bibliotech.dtos.response.mappers.ExemplarResponseMapper;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Estanteprateleira;
import com.bibliotech.bibliotech.models.Exemplar;
import com.bibliotech.bibliotech.repositories.EstantePrateleiraRepository;
import com.bibliotech.bibliotech.repositories.ExemplarRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EstantePrateleiraService {

    @Autowired
    private EstantePrateleiraRepository estantePrateleiraRepository;

    @Autowired
    private ExemplarRepository exemplarRepository;

    @Autowired
    private ExemplarResponseMapper exemplarResponseMapper;

    @Transactional
    public Estanteprateleira adicionarEstanteprateleira(Estanteprateleira estanteprateleira) {
        if(estanteprateleira.getPrateleira() == null){
            throw new ValidationException("A prateleira não pode ser vazia.");
        }
        if(!estanteIsValid(estanteprateleira.getEstante())){
            throw new ValidationException("A estante invalida! A estante não pode ser vaiza e deve ser uma letra!");
        }
        if (estantePrateleiraRepository.existsEstanteprateleiraByEstanteAndPrateleira(estanteprateleira.getEstante(), estanteprateleira.getPrateleira())) {
            throw new ValidationException("Já existe uma estante-prateleira com esses valores!");
        }

        return estantePrateleiraRepository.save(estanteprateleira);
    }

    public List<Estanteprateleira> listarEstanteprateleiras() {
        return estantePrateleiraRepository.findAll();
    }

    private boolean estanteIsValid(String estante) {
        if(estante == null || estante.length() != 1 || estante.equals("0") || estante.equals("1") || estante.equals("2") ||
                estante.equals("3") || estante.equals("4") || estante.equals("5") || estante.equals("6") || estante.equals("7") ||
                estante.equals("8") || estante.equals("9")){
            return false;
        }

        return true;
    }

    public List<ExemplarResponseDTO> listarExemplaresPorEstantePrateleira(Integer idEstantePrateleira) {
        Estanteprateleira estanteprateleira = getEstantePrateleiraById(idEstantePrateleira);
        List<Exemplar> exemplares = exemplarRepository.findByEstanteprateleira(estanteprateleira);
        if (exemplares.isEmpty()) {
            throw new NotFoundException("Nenhum exemplar encontrado para a Estante-Prateleira com ID " + idEstantePrateleira);
        }

        return exemplares.stream().map(exemplarResponseMapper::toDTO).collect(Collectors.toList());
    }

    public Estanteprateleira atualizarEstanteprateleira(Integer id, Estanteprateleira estanteprateleira) {
        Estanteprateleira ep_existente = getEstantePrateleiraById(id);

        if(estanteprateleira.getPrateleira() == null){
            throw new ValidationException("A prateleira não pode ser vazia.");
        }
        if(!estanteIsValid(estanteprateleira.getEstante())){
            throw new ValidationException("A estante invalida! A estante não pode ser vaiza e deve ser uma letra!");
        }
        if (estantePrateleiraRepository.existsEstanteprateleiraByEstanteAndPrateleira(estanteprateleira.getEstante(), estanteprateleira.getPrateleira())) {
            throw new ValidationException("Já existe uma estante-prateleira com esses valores!");
        }
        ep_existente.setEstante(estanteprateleira.getEstante());
        ep_existente.setPrateleira(estanteprateleira.getPrateleira());

        return estantePrateleiraRepository.save(ep_existente);
    }


    public void deletarEstanteprateleira (Integer id) {
        Estanteprateleira estanteprateleira = estantePrateleiraRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Estante-Prateleira com ID " + id + " não encontrada."));

        if (exemplarRepository.existsByEstanteprateleira(estantePrateleiraRepository.findById(id).get())){
            throw new ValidationException("Não é possível deletar a estante-prateleira porque há exemplares associados a ela.");
        }

        estantePrateleiraRepository.delete(estanteprateleira);
    }

    public Estanteprateleira getEstantePrateleiraById(Integer id) {
        return estantePrateleiraRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Estante-Prateleira com id: " + id + " não encontrada."));
    }
}