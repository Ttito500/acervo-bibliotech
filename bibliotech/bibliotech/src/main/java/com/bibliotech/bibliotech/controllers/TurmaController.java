package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.dtos.request.TurmaRequestDTO;
import com.bibliotech.bibliotech.dtos.response.TurmaResponseDTO;
import com.bibliotech.bibliotech.dtos.response.mappers.TurmaResponseMapper;
import com.bibliotech.bibliotech.models.Turma;
import com.bibliotech.bibliotech.services.PdfExportService;
import com.bibliotech.bibliotech.services.TurmasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/turmas")
public class TurmaController {

    @Autowired
    private TurmasService turmasService;

    @Autowired
    private TurmaResponseMapper turmaResponseMapper;

    @Autowired
    private PdfExportService pdfExportService;

    @PostMapping("")
    public ResponseEntity<TurmaResponseDTO> criarTurma(@RequestBody TurmaRequestDTO requestDTO){

        TurmaResponseDTO turmaResponseDTO = turmaResponseMapper.toDto(turmasService.cadastrarTurma(requestDTO));
        URI location = URI.create("/turmas/" + turmaResponseDTO.getId());
        return ResponseEntity.created(location).body(turmaResponseDTO);
    }


    @GetMapping("/{id}")
    public ResponseEntity<TurmaResponseDTO> getTurmaById(@PathVariable Integer id){
        return ResponseEntity.ok(turmaResponseMapper.toDto(turmasService.getTurmaById(id)));
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<TurmaResponseDTO>> filtrarTurmas(@RequestParam(required = false) Integer serie,
                                                                @RequestParam(required = false) String turma,
                                                                @RequestParam(required = false) Integer anoDeEntrada,
                                                                @RequestParam(required = false) Boolean ativo) {
        List<Turma> turmas = turmasService.filtrarTurmas(serie, turma, anoDeEntrada, ativo);
        return ResponseEntity.ok(turmas.stream()
                .map(turmaResponseMapper::toDto)
                .toList());
    }

    @PutMapping ("/{id}")
    public ResponseEntity<TurmaResponseDTO> alterarTurma(@PathVariable Integer id, @RequestBody TurmaRequestDTO requestDTO) {
        TurmaResponseDTO turmaAtualizadaResponseDTO = turmaResponseMapper.toDto(turmasService.alterarTurma(id, requestDTO));
        return ResponseEntity.ok(turmaAtualizadaResponseDTO);
    }

    @PatchMapping("/inativar/{id}")
    public ResponseEntity<Void> inativarTurma(@PathVariable Integer id) {
        turmasService.inativarTurma(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarTurma(@PathVariable Integer id) {
        turmasService.ativarTurma(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/mais-leitoras/export/pdf")
    public ResponseEntity<byte[]> exportTopLeitoresPdf(@RequestParam(required = false) LocalDate dataInicio, @RequestParam(required = false) LocalDate dataFim, @RequestParam(required = false) Integer qtdMax) {
        byte[] pdfBytes = pdfExportService.exportTurmasMaisLeitoras(turmasService.obterTurmasMaisLeitoras(dataInicio, dataFim, qtdMax));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "turma-mais-leitoras.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }
}
