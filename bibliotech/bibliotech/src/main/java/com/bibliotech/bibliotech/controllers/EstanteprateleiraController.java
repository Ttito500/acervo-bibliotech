package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.models.Estanteprateleira;
import com.bibliotech.bibliotech.services.EstanteprateleiraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estanteprateleira")
public class EstanteprateleiraController {

    @Autowired
    private EstanteprateleiraService estateprateleiraService;

    @PostMapping
    public ResponseEntity<Estanteprateleira> criarEstanteprateleira(@RequestBody Estanteprateleira body) {
        Estanteprateleira estateprateleira = estateprateleiraService.adicionarEstanteprateleira(body);
        return ResponseEntity.ok(estateprateleira);
    }

    @GetMapping
    public ResponseEntity<List<Estanteprateleira>> listarEstanteprateleira() {
        List<Estanteprateleira> ep = estateprateleiraService.listarEstanteprateleiras();
        return ResponseEntity.ok(ep);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estanteprateleira> atualizarEstanteprateleira(@PathVariable Integer id, @RequestBody Estanteprateleira body) {
        Estanteprateleira ep = estateprateleiraService.atualizarEstanteprateleira(id, body);
        return ResponseEntity.ok(ep);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Estanteprateleira> deletarEstanteprateleira(@PathVariable Integer id) {
        estateprateleiraService.deletarEstanteprateleira(id);
        return ResponseEntity.noContent().build();
    }
}
