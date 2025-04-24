package com.bibliotech.bibliotech.estanteprateleira;

import com.bibliotech.bibliotech.estanteprateleira.dto.EstanteprateleiraMapper;
import com.bibliotech.bibliotech.dtos.response.ExemplarResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estanteprateleira")
public class EstantePrateleiraController {

    @Autowired
    private EstanteprateleiraMapper estanteprateleiraMapper;

    @Autowired
    private EstantePrateleiraService estantePrateleiraService;

    @PostMapping
    public ResponseEntity<EstanteprateleiraDTO> criarEstanteprateleira(@RequestBody EstanteprateleiraDTO request) {
        return ResponseEntity.ok(EstanteprateleiraMapper.toDTO(estantePrateleiraService.adicionarEstanteprateleira(EstanteprateleiraMapper.toEntity(request))));
    }

    @GetMapping
    public ResponseEntity<List<EstanteprateleiraDTO>> listarEstanteprateleira() {
        return ResponseEntity.ok(estanteprateleiraMapper.toDTOList(estantePrateleiraService.listarEstanteprateleiras()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EstanteprateleiraDTO> atualizarEstanteprateleira(@PathVariable Integer id, @RequestBody EstanteprateleiraDTO body) {
        return ResponseEntity.ok(EstanteprateleiraMapper.toDTO(estantePrateleiraService.atualizarEstanteprateleira(id, estanteprateleiraMapper.toEntity(body))));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarEstanteprateleira(@PathVariable Integer id) {
        estantePrateleiraService.deletarEstanteprateleira(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ExemplarResponseDTO>> listarExemplaresPorEstantePrateleira(@PathVariable Integer id) {
        return ResponseEntity.ok(estantePrateleiraService.listarExemplaresPorEstantePrateleira(id));
    }
}
