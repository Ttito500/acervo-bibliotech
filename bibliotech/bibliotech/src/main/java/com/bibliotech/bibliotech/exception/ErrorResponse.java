package com.bibliotech.bibliotech.exception;

import java.util.List;

public class ErrorResponse {
    private String error;
    private List<String> messages;

    public ErrorResponse() {} // Construtor sem argumentos (importante para algumas frameworks)

    public ErrorResponse(String error, List<String> messages) {
        this.error = error;
        this.messages = messages;
    }

    public ErrorResponse(String message) { // Construtor para apenas 1 mensagem
        this.messages = List.of(message);
    }

    // Getters e Setters
    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }
}