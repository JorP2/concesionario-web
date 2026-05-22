package com.concesionario.backend.security;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.concesionario.backend.utils.SecurityLogger;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    
    @Autowired
    private SecurityLogger securityLogger;

    private Bucket createNewBucket() {
        Bandwidth limit = Bandwidth.classic(5, Refill.greedy(5, Duration.ofMinutes(1)));
        return Bucket.builder().addLimit(limit).build();
    }

    private Bucket getBucket(String ip) {
        return buckets.computeIfAbsent(ip, k -> createNewBucket());
    }

    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader != null) {
            return xfHeader.split(",")[0];
        }
        return request.getRemoteAddr();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        
        if (requestURI.equals("/api/auth/login") || requestURI.equals("/api/auth/refresh")) {
            String clientIp = getClientIP(request);
            Bucket bucket = getBucket(clientIp);

            if (bucket.tryConsume(1)) {
                filterChain.doFilter(request, response);
            } else {
                securityLogger.logRateLimitExceeded(clientIp, requestURI);
                response.setStatus(429);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Demasiados intentos. Espere 1 minuto e intente nuevamente.\"}");
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }
}