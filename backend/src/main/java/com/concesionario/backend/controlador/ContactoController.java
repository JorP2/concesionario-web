package com.concesionario.backend.controlador;

import com.concesionario.backend.dto.request.ContactoRequest;
import com.concesionario.backend.servicio.ContactoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contacto")
public class ContactoController {

    private final ContactoService contactoService;

    public ContactoController(ContactoService contactoService) {
        this.contactoService = contactoService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> enviar(@Valid @RequestBody ContactoRequest request) {
        contactoService.enviarFormularioContacto(request);
        return ResponseEntity.ok(Map.of("message", "Mensaje enviado correctamente"));
    }
}
