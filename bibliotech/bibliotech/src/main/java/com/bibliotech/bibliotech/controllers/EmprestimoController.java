package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.dtos.request.EmprestimoRequestDTO;
import com.bibliotech.bibliotech.dtos.request.EmprestimoRequestDTOConcluir;
import com.bibliotech.bibliotech.dtos.response.EmprestimoNotificacaoDTO;
import com.bibliotech.bibliotech.dtos.response.EmprestimoResponseDTO;
import com.bibliotech.bibliotech.dtos.response.EmprestimoResponseDTOAluno;
import com.bibliotech.bibliotech.dtos.response.EmprestimoResponseDTOLivro;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Emprestimo;
import com.bibliotech.bibliotech.services.EmprestimosService;
import com.bibliotech.bibliotech.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {

    private final EmprestimosService emprestimosService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    public EmprestimoController(EmprestimosService emprestimosService) {
        this.emprestimosService = emprestimosService;
    }

    @PostMapping("")
    public ResponseEntity<EmprestimoResponseDTO> realizarEmprestimo(@RequestBody EmprestimoRequestDTO requestDTO) {
        requestDTO.setIdUsuario(tokenService.getUsuarioId());

        EmprestimoResponseDTO emprestimoResponseDTO = emprestimosService.realizarEmprestimo(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(emprestimoResponseDTO);
    }

    @GetMapping("")
    public ResponseEntity<Page<EmprestimoResponseDTO>> consultarEmprestimos(
            @RequestParam(value = "nomeAluno", required = false) String nomeAluno,
            @RequestParam(value = "tituloLivro", required = false) String tituloLivro,
            @RequestParam(value = "isbn", required = false) String isbn,
            @RequestParam(value = "situacao", required = false) String situacao,
            @RequestParam(value = "nomeRealizadoPor", required = false) String nomeRealizadoPor,
            @RequestParam(value = "dataEmprestimo", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataEmprestimo,
            @RequestParam(value = "nomeConcluidoPor", required = false) String nomeConcluidoPor,
            @RequestParam(value = "dataPrazo", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataPrazo,
            @RequestParam(value = "dataConclusao", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataConclusao,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<EmprestimoResponseDTO> emprestimosDTO = emprestimosService.consultarEmprestimos(
                nomeAluno,
                tituloLivro,
                isbn,
                situacao,
                nomeRealizadoPor,
                dataEmprestimo,
                nomeConcluidoPor,
                dataPrazo,
                dataConclusao,
                pageable);

        return ResponseEntity.ok(emprestimosDTO);
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<Page<EmprestimoResponseDTOAluno>> consultarEmprestimosPorAluno(
            @PathVariable Integer idAluno,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataEmprestimoInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataEmprestimoFim,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        if (dataEmprestimoInicio.isAfter(dataEmprestimoFim)) {
            throw new ValidationException("A data de início deve ser anterior ou igual à data de fim.");
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<EmprestimoResponseDTOAluno> emprestimosDTO = emprestimosService.consultarEmprestimosPorAlunoEPeriodo(idAluno, dataEmprestimoInicio, dataEmprestimoFim, pageable);

        return ResponseEntity.ok(emprestimosDTO);
    }

    @GetMapping("/livro/{idLivro}")
    public ResponseEntity<Page<EmprestimoResponseDTOLivro>> consultarEmprestimosPorLivro(
            @PathVariable Integer idLivro,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataEmprestimoInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataEmprestimoFim,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        if (dataEmprestimoInicio.isAfter(dataEmprestimoFim)) {
            throw new ValidationException("A data de início deve ser anterior ou igual à data de fim.");
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<EmprestimoResponseDTOLivro> emprestimosDTO = emprestimosService.consultarEmprestimosPorLivroEPeriodo(idLivro, dataEmprestimoInicio, dataEmprestimoFim, pageable);

        return ResponseEntity.ok(emprestimosDTO);
    }

    @PatchMapping("/renovar/{id}")
    public ResponseEntity<String> renovarPrazo(@PathVariable Integer id) {
        return ResponseEntity.ok(emprestimosService.renovarPrazo(id));
    }

    @PatchMapping("/cancelar/{id}")
    public ResponseEntity<String> cancelarEmprestimo(@PathVariable Integer id) {
        return ResponseEntity.ok(emprestimosService.cancelarEmprestimo(id));
    }

    @PatchMapping("/concluir/{id}")
    public ResponseEntity<String> concluirEmprestimo(
            @PathVariable Integer id,
            @RequestBody EmprestimoRequestDTOConcluir DTOConcluir) {

        return ResponseEntity.ok(emprestimosService.concluirEmprestimo(id, DTOConcluir));
    }

    @PostMapping("/enviar-email")
    public ResponseEntity<List<EmprestimoNotificacaoDTO>> verificarAtrasos() {
        return ResponseEntity.ok(emprestimosService.enviarEmailAtrasadosEPresteAAtrasar());
    }
}
