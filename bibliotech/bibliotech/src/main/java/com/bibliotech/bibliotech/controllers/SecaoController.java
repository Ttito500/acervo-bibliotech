package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.models.Secao;
import com.bibliotech.bibliotech.services.SecoesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/secoes")
public class SecaoController {

    @Autowired
    private SecoesService secaoService;

    @PostMapping ("")
    public ResponseEntity<Secao> cadastrarSecao(@RequestBody Secao body) {
        Secao secao = secaoService.criarSecao(body);
        URI location = URI.create("/secoes" + secao.getId());
        return ResponseEntity.created(location).body(secao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Secao> deletarSecao(@PathVariable Integer id) {
        Secao secaoDeletada = secaoService.deletarSecao(id);
        return ResponseEntity.ok().body(secaoDeletada);
    }

    @GetMapping("")
    public ResponseEntity<List<Secao>> getSecoes() {
        List<Secao> secoes = secaoService.getSecoes();
        return ResponseEntity.ok(secoes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Secao> getSecaoById(@PathVariable Integer id) {
        return ResponseEntity.ok(secaoService.getSecao(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Secao> atualizarSecao(@PathVariable Integer id, @RequestBody Secao body) {
        Secao secao = secaoService.atualizarSecao(id, body);
        return ResponseEntity.ok().body(secao);
    }
}
