package com.concesionario.backend.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtils {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    public static String formatearFecha(LocalDateTime fecha) {
        if (fecha == null) return "";
        return fecha.format(FORMATTER);
    }

    public static LocalDateTime ahora() {
        return LocalDateTime.now();
    }

    public static String formatearParaJSON(LocalDateTime fecha) {
        if (fecha == null) return null;
        return fecha.toString(); // ISO format
    }
}