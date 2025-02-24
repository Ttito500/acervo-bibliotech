package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.response.EmprestimoNotificacaoDTO;
import com.bibliotech.bibliotech.dtos.response.EmprestimoResponseDTO;
import com.bibliotech.bibliotech.dtos.response.EmprestimoResponseDTOAluno;
import com.bibliotech.bibliotech.dtos.response.EmprestimoResponseDTOLivro;
import com.bibliotech.bibliotech.models.Emprestimo;
import org.springframework.stereotype.Component;

@Component
public class EmprestimoResponseMapper {
    public EmprestimoResponseDTO toDto(Emprestimo emprestimo) {
        EmprestimoResponseDTO dto = new EmprestimoResponseDTO();

        dto.setId(emprestimo.getId());
        dto.setAlunoId(emprestimo.getAluno().getId());
        dto.setExemplarId(emprestimo.getExemplar().getId());
        dto.setEstante(emprestimo.getExemplar().getEstanteprateleira().getEstante());
        dto.setPrateleira(emprestimo.getExemplar().getEstanteprateleira().getPrateleira());
        dto.setIsbn(emprestimo.getExemplar().getLivro().getIsbn());
        dto.setTituloLivro(emprestimo.getExemplar().getLivro().getTitulo());
        dto.setNumeroExemplar(emprestimo.getExemplar().getNumero());
        dto.setNomeAluno(emprestimo.getAluno().getNome());
        dto.setRealizadoPor(emprestimo.getRealizadoPor().getNome());
        dto.setObservacao(emprestimo.getObservacao());
        dto.setDataEmprestimo(emprestimo.getDataEmprestimo());
        dto.setDataPrazo(emprestimo.getDataPrazo());
        dto.setDataConclusao(emprestimo.getDataConclusao());
        dto.setQtdRenovacao(emprestimo.getQtdRenovacao());
        dto.setSituacao(emprestimo.getSituacao());

        return dto;
    }

    public EmprestimoResponseDTOAluno toDTOAluno(Emprestimo emprestimo) {
        EmprestimoResponseDTOAluno dto = new EmprestimoResponseDTOAluno();

        dto.setId(emprestimo.getId());
        dto.setExemplarId(emprestimo.getExemplar().getId());
        dto.setNumeroExemplar(emprestimo.getExemplar().getNumero());
        dto.setTituloLivro(emprestimo.getExemplar().getLivro().getTitulo());
        dto.setIsbn(emprestimo.getExemplar().getLivro().getIsbn());
        dto.setDataEmprestimo(emprestimo.getDataEmprestimo());
        dto.setDataConclusao(emprestimo.getDataConclusao());
        dto.setSituacao(emprestimo.getSituacao());

        return dto;
    }

    public EmprestimoResponseDTOLivro toDTOLivro(Emprestimo emprestimo) {
        EmprestimoResponseDTOLivro dto = new EmprestimoResponseDTOLivro();

        dto.setId(emprestimo.getId());
        dto.setAlunoId(emprestimo.getAluno().getId());
        dto.setExemplarId(emprestimo.getExemplar().getId());
        dto.setNumeroExemplar(emprestimo.getExemplar().getNumero());
        dto.setNomeAluno(emprestimo.getAluno().getNome());
        dto.setSerieAluno(emprestimo.getAluno().getTurma().getSerie());
        dto.setTurmaAluno(emprestimo.getAluno().getTurma().getTurma());
        dto.setDataEmprestimo(emprestimo.getDataEmprestimo());
        dto.setDataConclusao(emprestimo.getDataConclusao());
        dto.setSituacao(emprestimo.getSituacao());

        return dto;
    }

    public EmprestimoNotificacaoDTO toDTONotificacao(Emprestimo emprestimo) {
        EmprestimoNotificacaoDTO dto = new EmprestimoNotificacaoDTO();

        dto.setIdEmprestimo(emprestimo.getId());
        dto.setIdAluno(emprestimo.getAluno().getId());
        dto.setIdExemplar(emprestimo.getExemplar().getId());
        dto.setNumeroExemplar(emprestimo.getExemplar().getNumero());
        dto.setNomeAluno(emprestimo.getAluno().getNome());
        dto.setEmailAluno(emprestimo.getAluno().getEmail());
        dto.setTitulo(emprestimo.getExemplar().getLivro().getTitulo());
        dto.setDataEmprestimo(emprestimo.getDataEmprestimo());
        dto.setDataPrazo(emprestimo.getDataPrazo());

        return dto;
    }
}
