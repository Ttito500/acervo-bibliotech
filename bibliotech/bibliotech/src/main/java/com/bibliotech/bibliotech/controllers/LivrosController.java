package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.dtos.request.LivroRequestPatchDTO;
import com.bibliotech.bibliotech.dtos.request.LivroRequestPostDTO;
import com.bibliotech.bibliotech.dtos.response.LivroResponseDTO;
import com.bibliotech.bibliotech.dtos.response.mappers.LivroResponseMapper;
import com.bibliotech.bibliotech.models.Livro;
import com.bibliotech.bibliotech.services.LivrosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/livros")
public class LivrosController {

    private final LivrosService livrosService;

    private final LivroResponseMapper livroResponseMapper;

    @Autowired
    public LivrosController(LivrosService livrosService, LivroResponseMapper livroResponseMapper) {
        this.livrosService = livrosService;
        this.livroResponseMapper = livroResponseMapper;
    }

    @PostMapping("")
    public ResponseEntity<LivroResponseDTO> criarLivro (@RequestBody LivroRequestPostDTO body) {
        LivroResponseDTO livroResponseDTO = livroResponseMapper.toDTO(livrosService.cadastrarLivro(body));
        URI location = URI.create("/livros/" + livroResponseDTO.getId());
        return ResponseEntity.created(location).body(livroResponseDTO);
    }

    @GetMapping("/filtrar")
    public ResponseEntity<Page<LivroResponseDTO>> getLivros(
            @RequestParam(value = "titulo", required = false) String titulo,
            @RequestParam(value = "isbn", required = false) String isbn,
            @RequestParam(value = "autor", required = false) String autor,
            @RequestParam(value = "genero", required = false) String genero,
            @RequestParam(value = "ativo", required = false) Boolean ativo,
            @PageableDefault(page = 0, size = 10) Pageable pageable) {

        Page<LivroResponseDTO> livroResponseDTOPage = livrosService.getLivros(titulo, isbn, autor, genero, ativo, pageable)
                .map(livroResponseMapper::toDTO);

        return ResponseEntity.ok(livroResponseDTOPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivroResponseDTO> getLivroById(@PathVariable Integer id){
        LivroResponseDTO livroResponseGetDTO = livroResponseMapper.toDTO(livrosService.getLivroById(id));
        return ResponseEntity.ok(livroResponseGetDTO);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<LivroResponseDTO> atualizarLivro(@PathVariable Integer id, @RequestBody LivroRequestPatchDTO body){
        LivroResponseDTO livro = livroResponseMapper.toDTO(livrosService.atualizarLivro(id, body));
        return ResponseEntity.ok(livro);
    }

    @PatchMapping("/inativar/{id}")
    public ResponseEntity<Void> inativarLivro(@PathVariable Integer id){
        livrosService.inativarLivro(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarLivro(@PathVariable Integer id){
        livrosService.ativarLivro(id);
        return ResponseEntity.noContent().build();
    }
}
