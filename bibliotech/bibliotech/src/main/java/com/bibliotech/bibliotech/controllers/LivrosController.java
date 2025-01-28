package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.models.Livro;
import com.bibliotech.bibliotech.services.AlunosService;
import com.bibliotech.bibliotech.services.LivrosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/livros")
public class LivrosController {

    private final LivrosService livrosService;

    @Autowired
    private LivrosController (LivrosService livrosService) { this.livrosService = livrosService; };

    @PostMapping("")
    public ResponseEntity<Livro> criarLivro (@RequestBody Livro body){
        Livro livro = livrosService.cadastrarLivro(body);
        URI location = URI.create("/livros/" + livro.getId()); // não sei muito bem oq isso faz, to seguindo exemplo do codigo de GC
        return ResponseEntity.created(location).body(livro);
    }

    @GetMapping("")
    public ResponseEntity<List<Livro>> getLivros(){
        List<Livro> livros = livrosService.getLivros();
        return ResponseEntity.ok(livros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Livro>> getLivroById(@PathVariable Integer id){
        return ResponseEntity.ok(livrosService.getLivroById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Livro> deleteLivroById(@PathVariable Integer id){
        Livro livroDeletado = livrosService.deletarLivro(id);
        return ResponseEntity.ok(livroDeletado);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Livro> atualizarLivro(@PathVariable Integer id, @RequestBody Livro body){
        Livro livro = livrosService.atualizarLivro(id, body);
        return ResponseEntity.ok(livro);
    }
}
