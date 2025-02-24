package com.bibliotech.bibliotech.specifications;

import com.bibliotech.bibliotech.models.Emprestimo;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class EmprestimoSpecification {

    public Specification<Emprestimo> buildSpecification(String nomeAluno, String tituloLivro, String isbn, String situacao,
                                                        String nomeRealizadoPor, LocalDate dataEmprestimo, String nomeConcluidoPor,
                                                        LocalDate dataPrazo, LocalDate dataConclusao) {
        return (root, query, builder) -> {
            Predicate predicate = builder.conjunction();

            if (nomeAluno != null) {
                predicate = builder.and(predicate, builder.like(builder.lower(root.get("aluno").get("nome")), "%" + nomeAluno.toLowerCase() + "%"));
            }
            if (tituloLivro != null) {
                predicate = builder.and(predicate, builder.like(builder.lower(root.get("exemplar").get("livro").get("titulo")), "%" + tituloLivro.toLowerCase() + "%"));
            }
            if (isbn != null) {
                predicate = builder.and(predicate, builder.equal(root.get("exemplar").get("livro").get("isbn"), isbn));
            }
            if (situacao != null) {
                predicate = builder.and(predicate, builder.equal(root.get("situacao"), situacao));
            }
            if (nomeRealizadoPor != null) {
                predicate = builder.and(predicate, builder.like(builder.lower(root.get("realizadoPor").get("nome")), "%" + nomeRealizadoPor.toLowerCase() + "%"));
            }
            if (dataEmprestimo != null) {
                predicate = builder.and(predicate, builder.equal(root.get("dataEmprestimo"), dataEmprestimo));
            }
            if (nomeConcluidoPor != null) {
                predicate = builder.and(predicate, builder.like(builder.lower(root.get("concluidoPor").get("nome")), "%" + nomeConcluidoPor.toLowerCase() + "%"));
            }
            if (dataPrazo != null) {
                predicate = builder.and(predicate, builder.equal(root.get("dataPrazo"), dataPrazo));
            }
            if (dataConclusao != null) {
                predicate = builder.and(predicate, builder.equal(root.get("dataConclusao"), dataConclusao));
            }

            return predicate;
        };
    }
}
