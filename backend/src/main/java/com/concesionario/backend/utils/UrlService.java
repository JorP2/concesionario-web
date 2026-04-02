package com.concesionario.backend.utils;

import org.springframework.stereotype.Service;

import com.concesionario.backend.config.AppProperties;

@Service
public class UrlService {

    private final AppProperties appProperties;

    public UrlService(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    public String getImageUrl(Long vehiculoId, String uid) {
        return appProperties.getBaseUrl() + "/uploads/vehiculos/" + vehiculoId + "/imagenes/" + uid;
    }

    public String getVideoUrl(Long vehiculoId, String uid) {
        return appProperties.getBaseUrl() + "/uploads/vehiculos/" + vehiculoId + "/videos/" + uid;
    }
}