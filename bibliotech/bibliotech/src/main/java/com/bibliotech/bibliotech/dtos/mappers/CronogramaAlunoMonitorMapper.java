package com.bibliotech.bibliotech.dtos.mappers;

import com.bibliotech.bibliotech.dtos.CronogramaAlunoMonitorDTO;
import com.bibliotech.bibliotech.dtos.response.mappers.UsuarioResponseMapper;
import com.bibliotech.bibliotech.models.CronogramaAlunoMonitor;
import com.bibliotech.bibliotech.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CronogramaAlunoMonitorMapper {

    static UsuarioService usuarioService;
    static UsuarioResponseMapper usuarioResponseMapper;

    @Autowired
    public CronogramaAlunoMonitorMapper(UsuarioService usuarioService, UsuarioResponseMapper usuarioResponseMapper) {
       this.usuarioService = usuarioService;
       this.usuarioResponseMapper = usuarioResponseMapper;
    }

    public static CronogramaAlunoMonitor toEntity(CronogramaAlunoMonitorDTO dto) {
        CronogramaAlunoMonitor cronograma = new CronogramaAlunoMonitor();
        cronograma.setId(dto.getId());
        cronograma.setUsuario(usuarioService.buscarUsuarioAlunoMonitorPorId(dto.getAlunoMonitor().getId()));
        cronograma.setDiaDaSemana(dto.getDiaDaSemana());
        return cronograma;
    }

    public static CronogramaAlunoMonitorDTO toDTO(CronogramaAlunoMonitor entity) {
        CronogramaAlunoMonitorDTO dto = new CronogramaAlunoMonitorDTO();
        dto.setId(entity.getId());
        dto.setAlunoMonitor(usuarioResponseMapper.toDto(entity.getUsuario()));
        dto.setDiaDaSemana(entity.getDiaDaSemana());
        return dto;
    }

    public static List<CronogramaAlunoMonitorDTO> toDTOList(List<CronogramaAlunoMonitor> entities) {
        return entities.stream()
                .map(CronogramaAlunoMonitorMapper::toDTO)
                .collect(Collectors.toList());
    }
}
