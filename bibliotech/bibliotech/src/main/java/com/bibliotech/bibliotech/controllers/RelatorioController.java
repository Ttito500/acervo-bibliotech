package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.services.AlunosService;
import com.bibliotech.bibliotech.services.PdfExportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

    PdfExportService pdfExportService;
    private final AlunosService alunosService;

    public RelatorioController(AlunosService alunosService) {
        this.alunosService = alunosService;
    }

    @GetMapping("/alunos-mais-leitores")
    public ResponseEntity<byte[]> exportarAlunosMaisLeitores (@RequestParam(required = false) LocalDate dataInicio, @RequestParam(required = false) LocalDate dataFim, @RequestParam(required = false) Integer qtdMax) {
        byte[] pdfBytes = pdfExportService.exportAlunosMaisLeitores(alunosService.obterAlunosMaisLeitores(dataInicio, dataFim, qtdMax));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "top-leitores.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }
}
