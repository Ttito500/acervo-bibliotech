package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.dtos.request.OcorrenciaRequestDTO;
import com.bibliotech.bibliotech.dtos.response.OcorrenciaResponseDTO;
import com.bibliotech.bibliotech.dtos.response.mappers.OcorrenciaResponseMapper;
import com.bibliotech.bibliotech.models.Ocorrencia;
import com.bibliotech.bibliotech.services.OcorrenciaService;
import com.bibliotech.bibliotech.services.PdfExportService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/ocorrencias")
public class OcorrenciaController {
    private final OcorrenciaService ocorrenciaService;
    private final OcorrenciaResponseMapper ocorrenciaResponseMapper;
    private final PdfExportService pdfExportService;

    public OcorrenciaController(OcorrenciaService ocorrenciaService, OcorrenciaResponseMapper ocorrenciaResponseMapper, PdfExportService pdfExportService) {
        this.ocorrenciaService = ocorrenciaService;
        this.ocorrenciaResponseMapper = ocorrenciaResponseMapper;
        this.pdfExportService = pdfExportService;
    }

    @PostMapping
    public ResponseEntity<OcorrenciaResponseDTO> registrarOcorrencia(@RequestBody @Valid OcorrenciaRequestDTO requestDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException("Erros de validação encontrados: " + bindingResult.getAllErrors());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(ocorrenciaResponseMapper.toDto(ocorrenciaService.registrarOcorrencia(requestDTO)));
    }

    @GetMapping
    public ResponseEntity<List<OcorrenciaResponseDTO>> filtrarOcorrencias(@RequestParam(value = "dataInicio", required = false) LocalDate dataInicio, @RequestParam(value = "dataFim", required = false) LocalDate dataFim) {
        return ResponseEntity.ok(ocorrenciaResponseMapper.toDtoList(ocorrenciaService.filtrarOcorrencias(dataInicio, dataFim)));
    }

    @GetMapping("/export/pdf")
    public ResponseEntity<byte[]> exportOcorrenciasPdf(@RequestParam(value = "dataInicio", required = false) LocalDate dataInicio, @RequestParam(value = "dataFim", required = false) LocalDate dataFim) {
        List<Ocorrencia> ocorrencias = ocorrenciaService.filtrarOcorrencias(dataInicio, dataFim);

        if (ocorrencias.isEmpty()) {
            throw new IllegalArgumentException("Não há ocorrências registradas para o período informado.");
        }

        byte[] pdfBytes = pdfExportService.exportOcorrenciasToPdf(ocorrencias);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=ocorrencias.pdf")
                .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarOcorrencia(@PathVariable Integer id) {
        ocorrenciaService.deletarOcorrencia(id);
        return ResponseEntity.ok().build();
    }
}
