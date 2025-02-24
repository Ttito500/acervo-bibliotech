package com.bibliotech.bibliotech.dtos.mappers;

import com.bibliotech.bibliotech.dtos.CronogramaAlunoMonitorDTO;
import com.bibliotech.bibliotech.models.CronogramaAlunoMonitor;
import com.bibliotech.bibliotech.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CronogramaAlunoMonitorMapper {

    static UsuarioService usuarioService;

    @Autowired
    public CronogramaAlunoMonitorMapper(UsuarioService usuarioService) {
       this.usuarioService = usuarioService;
    }

    public static CronogramaAlunoMonitor toEntity(CronogramaAlunoMonitorDTO dto) {
        CronogramaAlunoMonitor cronograma = new CronogramaAlunoMonitor();
        cronograma.setId(dto.getId());
        cronograma.setUsuario(usuarioService.buscarUsuarioAlunoMonitorPorId(dto.getIdAlunoMonitor()));
        cronograma.setDiaDaSemana(dto.getDiaDaSemana());
        return cronograma;
    }

    public static CronogramaAlunoMonitorDTO toDTO(CronogramaAlunoMonitor entity) {
        CronogramaAlunoMonitorDTO dto = new CronogramaAlunoMonitorDTO();
        dto.setId(entity.getId());
        dto.setIdAlunoMonitor(entity.getUsuario().getId());
        dto.setDiaDaSemana(entity.getDiaDaSemana());
        return dto;
    }

    public static List<CronogramaAlunoMonitorDTO> toDTOList(List<CronogramaAlunoMonitor> entities) {
        return entities.stream()
                .map(CronogramaAlunoMonitorMapper::toDTO)
                .collect(Collectors.toList());
    }
}
