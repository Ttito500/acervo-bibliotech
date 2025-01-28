package com.bibliotech.bibliotech.exception;

import lombok.Getter;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ValidationException extends RuntimeException {
    private List<String> errorMessages;

    public ValidationException(BindingResult result) {
        super("Erro de validação");
        this.errorMessages = new ArrayList<>();
        result.getAllErrors().forEach(error -> errorMessages.add(error.getDefaultMessage()));
    }

    public ValidationException(String message) {
        super(message);
        this.errorMessages = new ArrayList<>();
        this.errorMessages.add(message);
    }

    public ValidationException(List<String> messages) {
        super("Erro de validação");
        this.errorMessages = messages;
    }

    public List<String> getErrorMessages() {
        return errorMessages;
    }
}
