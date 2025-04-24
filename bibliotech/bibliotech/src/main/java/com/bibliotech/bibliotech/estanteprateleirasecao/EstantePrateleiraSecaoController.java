package com.bibliotech.bibliotech.estanteprateleirasecao;

import com.bibliotech.bibliotech.estanteprateleira.Estanteprateleira;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estantesecao")
public class EstantePrateleiraSecaoController {

    @Autowired
    private EstantePrateleiraSecaoService estantePrateleiraSecaoService;

    @PostMapping()
    public ResponseEntity<Estanteprateleirasecao> vincularEstantePrateleiraASecao(@RequestBody EstantePrateleiraSecaoDTO request) {
        return ResponseEntity.ok(estantePrateleiraSecaoService.vincularEstantePrateleiraASecao(request));
    }

    @DeleteMapping()
    public ResponseEntity<String> deletarEstantePrateleiraDeSecao(@RequestBody EstantePrateleiraSecaoDTO request) {
        return ResponseEntity.ok(estantePrateleiraSecaoService.desvincularEstantePrateleiraDeSecao(request));
    }

    @GetMapping("/{idSecao}")
    public ResponseEntity<List<Estanteprateleira>> listarEstantePrateleirasPorSecao(@PathVariable Integer idSecao) {
        return ResponseEntity.ok(estantePrateleiraSecaoService.listarEstantePrateleirasPorSecao(idSecao));
    }
}
