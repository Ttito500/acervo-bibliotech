package com.bibliotech.bibliotech.models;

import com.bibliotech.bibliotech.exception.ValidationException;

public enum SituacaoEmprestimo {
    PENDENTE("pendente"),
    ATRASO("atraso"),
    ENTREGUE("entregue"),
    EXTRAVIADO("extraviado");

    private final String valor;

    SituacaoEmprestimo(String valor) {
        this.valor = valor;
    }

    public String getValor() {
        return valor;
    }

    public static SituacaoEmprestimo fromValor(String valor) {
        if(valor == null){  //n sei se ele devia aceitar nulo ou n, fiz assim pois no postman a situação era passada nula
            return null;
        }

        for (SituacaoEmprestimo situacao : SituacaoEmprestimo.values()) {
            if (situacao.getValor().equals(valor)) {
                return situacao;
            }
        }

        throw new ValidationException("Valor desconhecido: " + valor); //não tenho certeza se eu deveria criar nova excessão, ou usar essa msm
    }
}

