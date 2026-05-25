package com.concesionario.backend.servicio;

import com.concesionario.backend.dto.request.ContactoRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactoService {

    private final JavaMailSender mailSender;
    private final String destinatario;
    private final String remitente;

    public ContactoService(
            JavaMailSender mailSender,
            @Value("${app.contact.mail.to}") String destinatario,
            @Value("${spring.mail.username}") String remitente
    ) {
        this.mailSender = mailSender;
        this.destinatario = destinatario;
        this.remitente = remitente;
    }

    public void enviarFormularioContacto(ContactoRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(destinatario);
        message.setFrom(remitente);
        message.setReplyTo(request.getEmail());
        message.setSubject("Nuevo mensaje desde la web - Nohales Automoviles");
        message.setText(construirCuerpo(request));
        mailSender.send(message);
    }

    private String construirCuerpo(ContactoRequest request) {
        String telefono = request.getTelefono() == null || request.getTelefono().isBlank()
                ? "No facilitado"
                : request.getTelefono().trim();

        return """
                Nuevo mensaje recibido desde el formulario web.

                Nombre: %s
                Email: %s
                Teléfono: %s

                Mensaje:
                %s
                """.formatted(
                request.getNombre().trim(),
                request.getEmail().trim(),
                telefono,
                request.getMensaje().trim()
        );
    }
}
