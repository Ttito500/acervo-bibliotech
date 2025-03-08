package com.bibliotech.bibliotech.dtos.request;

import jakarta.validation.constraints.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlunoRequestDTO {

    private Integer id;

    @NotBlank(message = "O nome não pode estar em branco!")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
    private String nome;

    @Email(message = "O email está inválido!")
    @NotBlank(message = "O email é obrigatório")
    private String email;

    @Pattern(regexp = "\\d{10,11}", message = "O telefone deve conter 10 ou 11 dígitos")
    private String telefone;

    @NotNull(message = "O ID da turma é obrigatório")
    private Integer idTurma;

    @Pattern(regexp = "regular|irregular|debito", message = "A situação deve ser regular, inrregular ou debito!")
    private String situacao;
}
