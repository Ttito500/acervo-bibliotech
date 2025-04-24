package com.bibliotech.bibliotech.cronogramaAlunoMonitor;

import com.bibliotech.bibliotech.cronogramaAlunoMonitor.dto.CronogramaAlunoMonitorDTO;
import com.bibliotech.bibliotech.cronogramaAlunoMonitor.dto.CronogramaAlunoMonitorMapper;
import com.bibliotech.bibliotech.cronogramaAlunoMonitor.dto.CronogramaAlunoMonitorRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cronograma")
public class CronogramaAlunoMonitorController {

    private final CronogramaAlunoMonitorMapper mapper;
    private final CronogramaAlunoMonitorService service;

    @Autowired
    public CronogramaAlunoMonitorController(CronogramaAlunoMonitorService service, CronogramaAlunoMonitorMapper mapper) {
        this.mapper = mapper;
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CronogramaAlunoMonitorDTO> criar(@RequestBody CronogramaAlunoMonitorRequestDTO cronograma) {
        return ResponseEntity.ok(mapper.toDTO(service.salvar(mapper.toEntity(cronograma))));
    }

    @GetMapping
    public ResponseEntity<List<CronogramaAlunoMonitorDTO>> listarTodos() {
        return ResponseEntity.ok(mapper.toDTOList(service.listarTodos()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CronogramaAlunoMonitorDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(mapper.toDTO(service.buscarPorId(id)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CronogramaAlunoMonitorDTO> atualizar(@PathVariable Integer id, @RequestBody CronogramaAlunoMonitorRequestDTO cronograma) {
        return ResponseEntity.ok(mapper.toDTO(service.atualizar(id, mapper.toEntity(cronograma))));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
