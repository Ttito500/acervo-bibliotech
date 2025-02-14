package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.dtos.request.AlunoRequestDTO;
import com.bibliotech.bibliotech.dtos.response.AlunoResponseDTO;
import com.bibliotech.bibliotech.dtos.response.mappers.AlunoResponseMapper;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.services.AlunosService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    private final AlunosService alunosService;
    private final AlunoResponseMapper alunoResponseMapper;

    public AlunoController(AlunosService alunosService, AlunoResponseMapper alunoResponseMapper) {
        this.alunosService = alunosService;
        this.alunoResponseMapper = alunoResponseMapper;
    }

    @GetMapping("")
    public ResponseEntity<Page<AlunoResponseDTO>> listarAlunos(
            @RequestParam(value = "serie", required = false) Integer serie,
            @RequestParam(value = "turma", required = false) String turma,
            @RequestParam(value = "nome", required = false) String nome,
            @RequestParam(value = "situacao", required = false) String situacao,
            @RequestParam(value = "ativo", required = false) Boolean ativo,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size)
            {


        Pageable pageable = PageRequest.of(page, size);

        Page<Aluno> alunosPage = alunosService.filtrarAlunos(serie, turma, nome, situacao, ativo, pageable);

        Page<AlunoResponseDTO> alunosResponseDTOPage = alunosPage.map(aluno -> AlunoResponseMapper.toDto(aluno));

        return ResponseEntity.ok(alunosResponseDTOPage);
    }
    @GetMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> buscarAlunoPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(AlunoResponseMapper.toDto(alunosService.buscarAlunoPorId(id)));
    }

    @PostMapping
    public ResponseEntity<AlunoResponseDTO> cadastrarAluno(@RequestBody AlunoRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(AlunoResponseMapper.toDto(alunosService.cadastrarAluno(requestDTO)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> atualizarAluno(
            @PathVariable Integer id,
            @RequestBody AlunoRequestDTO requestDTO) {
        return ResponseEntity.ok(alunoResponseMapper.toDto(alunosService.atualizarAluno(id, requestDTO)));
    }

    @PatchMapping("/inativar/{id}")
    public ResponseEntity<Void> inativarAluno(@PathVariable Integer id) {
        alunosService.inativarAluno(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarAluno(@PathVariable Integer id) {
        alunosService.ativarAluno(id);
        return ResponseEntity.noContent().build();
    }
}