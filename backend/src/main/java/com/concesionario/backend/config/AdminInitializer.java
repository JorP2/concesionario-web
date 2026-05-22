package com.concesionario.backend.config;

import com.concesionario.backend.dominio.Usuario;
import com.concesionario.backend.repositorio.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Value("${admin.username}")
    private String adminUsername;
    
    @Value("${admin.password}")
    private String adminPassword;
    
    @Value("${admin.email}")
    private String adminEmail;

    @Override
    public void run(String... args) throws Exception {
        if (usuarioRepository.countByEsSuperUsuarioTrue() == 0) {
            Usuario admin = new Usuario();
            admin.setUsername(adminUsername);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setNombre("Administrador");
            admin.setEmail(adminEmail);
            admin.setTelefono("123456789");
            admin.setEsSuperUsuario(true);
            admin.setActivo(true);
            
            usuarioRepository.save(admin);
            System.out.println(" Usuario administrador creado con éxito");

        }
    }
}