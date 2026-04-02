package com.concesionario.backend.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UrlService {

    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;

    public String getImageUrl(Long vehiculoId, String uid) {
        return baseUrl + "/uploads/vehiculos/" + vehiculoId + "/imagenes/" + uid;
    }

    public String getVideoUrl(Long vehiculoId, String uid) {
        return baseUrl + "/uploads/vehiculos/" + vehiculoId + "/videos/" + uid;
    }
}