package com.bibliotech.bibliotech.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class FormatarData {

    public static String formatarData(LocalDate data) {
        if (data == null) {
            throw new IllegalArgumentException("A data não pode ser nula.");
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return data.format(formatter);
    }

}