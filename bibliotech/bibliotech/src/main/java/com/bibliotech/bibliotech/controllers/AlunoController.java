package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.dtos.request.AlunoRequestDTO;
import com.bibliotech.bibliotech.dtos.response.AlunoResponseDTO;
import com.bibliotech.bibliotech.services.AlunosService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    private final AlunosService alunosService;

    public AlunoController(AlunosService alunosService) {
        this.alunosService = alunosService;
    }

    @GetMapping
    public ResponseEntity<List<AlunoResponseDTO>> listarAlunos(
            @RequestParam(value = "serie", required = false) Integer serie,
            @RequestParam(value = "turma", required = false) String turma,
            @RequestParam(value = "nome", required = false) String nome,
            @RequestParam(value = "situacao", required = false) String situacao,
            @RequestParam(value = "ativo", required = false) Boolean ativo) {
        List<AlunoResponseDTO> alunosResponseDTO = alunosService.filtrarAlunos(serie, turma, nome, situacao, ativo);
        return ResponseEntity.ok(alunosResponseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> buscarAlunoPorId(@PathVariable Integer id) {
        AlunoResponseDTO alunoResponseDTO = alunosService.buscarAlunoPorId(id);
        return ResponseEntity.ok(alunoResponseDTO);
    }

    @PostMapping
    public ResponseEntity<AlunoResponseDTO> cadastrarAluno(@RequestBody AlunoRequestDTO requestDTO) {
        AlunoResponseDTO alunoResponseDTO = alunosService.cadastrarAluno(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoResponseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> atualizarAluno(
            @PathVariable Integer id,
            @RequestBody AlunoRequestDTO requestDTO) {
        AlunoResponseDTO alunoAtualizadoResponseDTO = alunosService.atualizarAluno(id, requestDTO);
        return ResponseEntity.ok(alunoAtualizadoResponseDTO);
    }

    @PatchMapping("/{id}/inativar")
    public ResponseEntity<Void> inativarAluno(@PathVariable Integer id) {
        alunosService.inativarAluno(id);
        return ResponseEntity.noContent().build();
    }
}