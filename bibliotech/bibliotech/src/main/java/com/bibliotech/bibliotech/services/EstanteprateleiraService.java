package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Estanteprateleira;
import com.bibliotech.bibliotech.repositories.EstanteprateleiraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstanteprateleiraService {

    @Autowired
    private EstanteprateleiraRepository estateprateleiraRepository;

    public Estanteprateleira adicionarEstanteprateleira(Estanteprateleira ep) {

        if(estateprateleiraRepository.existsByEstante(ep.getEstante())){
            throw new ValidationException("Estante-Prateleira ja existe");
        }
        if(ep.getPrateleira() == null){
            throw new ValidationException("A prateleira não pode ser vazia.");
        }
        if(ep.getEstante() == null){
            throw new ValidationException("A estante não pode ser vazia.");
        }
        ep.setEstante(ep.getEstante().toUpperCase());

        return estateprateleiraRepository.save(ep);
    }

    public List<Estanteprateleira> listarEstanteprateleiras() {
        return estateprateleiraRepository.findAll();
    }

    public Estanteprateleira atualizarEstanteprateleira(Integer id, Estanteprateleira ep) {
        Estanteprateleira ep_existente = estateprateleiraRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Estante-Prateleira com ID " + id + " não encontrado."));
        if(estateprateleiraRepository.existsByEstante(ep.getEstante())){
            throw new ValidationException("Estante-Prateleira ja existe");
        }

        ep_existente.setEstante(ep.getEstante().toUpperCase());
        ep_existente.setPrateleira(ep.getPrateleira());

        return estateprateleiraRepository.save(ep_existente);
    }

    public void deletarEstanteprateleira (Integer id) {
        Estanteprateleira estanteprateleira = estateprateleiraRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Estante-Prateleira com ID " + id + " não encontrada."));
        estateprateleiraRepository.delete(estanteprateleira);
    }

}
