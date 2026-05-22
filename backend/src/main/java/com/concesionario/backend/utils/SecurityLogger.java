package com.concesionario.backend.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class SecurityLogger {

    private static final Logger logger = LoggerFactory.getLogger("SECURITY");

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public void logLoginSuccess(String username, String ip) {
        logger.info("LOGIN_SUCCESS | Usuario: {} | IP: {} | Fecha: {}",
                username, ip, LocalDateTime.now().format(formatter));
    }

    public void logLoginFailed(String username, String ip, String motivo) {
        logger.warn("LOGIN_FAILED | Usuario: {} | IP: {} | Motivo: {} | Fecha: {}",
                username, ip, motivo, LocalDateTime.now().format(formatter));
    }

    public void logTokenInvalid(String username, String ip, String motivo) {
        logger.warn("TOKEN_INVALID | Usuario: {} | IP: {} | Motivo: {} | Fecha: {}",
                username, ip, motivo, LocalDateTime.now().format(formatter));
    }

    public void logAccessDenied(String username, String ip, String endpoint) {
        logger.warn("ACCESS_DENIED | Usuario: {} | IP: {} | Endpoint: {} | Fecha: {}",
                username, ip, endpoint, LocalDateTime.now().format(formatter));
    }

    public void logRateLimitExceeded(String ip, String endpoint) {
        logger.warn("RATE_LIMIT_EXCEEDED | IP: {} | Endpoint: {} | Fecha: {}",
                ip, endpoint, LocalDateTime.now().format(formatter));
    }
}