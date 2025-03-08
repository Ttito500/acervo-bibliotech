package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.dtos.mappers.AlunoMapper;
import com.bibliotech.bibliotech.dtos.request.AlunoRequestDTO;
import com.bibliotech.bibliotech.dtos.response.AlunoResponseDTO;
import com.bibliotech.bibliotech.dtos.response.mappers.AlunoResponseMapper;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.services.AlunosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.naming.Binding;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoMapper mapper;

    @Autowired
    private AlunosService alunosService;

    @GetMapping("")
    public ResponseEntity<Page<AlunoResponseDTO>> listarAlunosPaginado(
            @RequestParam(value = "serie", required = false) Integer serie,
            @RequestParam(value = "turma", required = false) String turma,
            @RequestParam(value = "nome", required = false) String nome,
            @RequestParam(value = "situacao", required = false) String situacao,
            @RequestParam(value = "ativo", required = false) Boolean ativo,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size)
            {

        Page<Aluno> alunosPage = alunosService.filtrarAlunos(serie, turma, nome, situacao, ativo, PageRequest.of(page, size));

        return ResponseEntity.ok(alunosPage.map(aluno -> mapper.toAlunoResponseDTO(aluno)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> buscarAlunoPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(mapper.toAlunoResponseDTO(alunosService.buscarAlunoPorId(id)));
    }

    @PostMapping
    public ResponseEntity<AlunoResponseDTO> cadastrarAluno(@RequestBody AlunoRequestDTO alunoRequestDTO, BindingResult result) {
        if (result.hasErrors()) { // Verifica as validações do Jakarta
            throw new ValidationException(result);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toAlunoResponseDTO(alunosService.cadastrarAluno(mapper.toEntity(alunoRequestDTO))));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> atualizarAluno(
            @PathVariable Integer id,
            @RequestBody AlunoRequestDTO requestDTO) {
        return ResponseEntity.ok(mapper.toAlunoResponseDTO(alunosService.atualizarAluno(id, requestDTO)));
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