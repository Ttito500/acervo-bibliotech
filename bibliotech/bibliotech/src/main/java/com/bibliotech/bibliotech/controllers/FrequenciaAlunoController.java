package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.dtos.request.FrequenciaAlunosRequestDTO;
import com.bibliotech.bibliotech.dtos.response.FrequenciaAlunosResponseDTO;
import com.bibliotech.bibliotech.dtos.response.mappers.FrequenciaAlunosResponseMapper;
import com.bibliotech.bibliotech.models.FrequenciaAlunos;
import com.bibliotech.bibliotech.services.FrequenciaAlunosService;
import com.bibliotech.bibliotech.services.PdfExportService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/frequencia-alunos")
public class FrequenciaAlunoController {
    private final FrequenciaAlunosService frequenciaAlunosService;
    private final FrequenciaAlunosResponseMapper frequenciaAlunosResponceMapper;
    private final PdfExportService pdfExportService;

    public FrequenciaAlunoController(FrequenciaAlunosService frequenciaAlunosService, FrequenciaAlunosResponseMapper frequenciaAlunosResponceMapper, PdfExportService pdfExportService) {
        this.frequenciaAlunosService = frequenciaAlunosService;
        this.frequenciaAlunosResponceMapper = frequenciaAlunosResponceMapper;
        this.pdfExportService = pdfExportService;
    }

    @PostMapping
    public ResponseEntity<FrequenciaAlunosResponseDTO> registrarFrequencia(@RequestBody @Valid FrequenciaAlunosRequestDTO requestDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException("Erros de validação encontrados: " + bindingResult.getAllErrors());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(frequenciaAlunosResponceMapper.toDto(frequenciaAlunosService.registrarFrequencia(requestDTO)));
    }

    @GetMapping
    public ResponseEntity<List<FrequenciaAlunosResponseDTO>> filtrarFrequencias(@RequestParam(value = "data", required = false) LocalDate data) {
        return ResponseEntity.ok(frequenciaAlunosResponceMapper.toDtoList(frequenciaAlunosService.filtrarFrequencias(data)));
    }

    @GetMapping("/export/pdf")
    public ResponseEntity<byte[]> exportFrequenciasPdf(@RequestParam(value = "data", required = false) LocalDate data) {
        if (data == null) {
            throw new IllegalArgumentException("Data não pode ser nula.");
        }

        List<FrequenciaAlunos> frequencias = frequenciaAlunosService.filtrarFrequencias(data);

        if (frequencias.isEmpty()) {
            throw new IllegalArgumentException("Não há frequências registradas para a data informada.");
        }

        byte[] pdfBytes = pdfExportService.exportFrequenciaAlunosToPdf(frequencias);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "relatorio-frequencia-" + data.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + ".pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarFrequencia(@PathVariable Integer id) {
        frequenciaAlunosService.deletarFrequencia(id);
        return ResponseEntity.noContent().build();
    }
}