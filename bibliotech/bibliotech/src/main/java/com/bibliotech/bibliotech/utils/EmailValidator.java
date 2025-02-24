package com.bibliotech.bibliotech.utils;

import java.util.regex.Pattern;

public class EmailValidator {
    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
    private static final Pattern pattern = Pattern.compile(EMAIL_REGEX);

    private EmailValidator() {}

    public static boolean isValid(String email) {
        return email != null && pattern.matcher(email).matches();
    }
}
