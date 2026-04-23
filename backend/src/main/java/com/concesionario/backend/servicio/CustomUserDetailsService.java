package com.concesionario.backend.servicio;

import com.concesionario.backend.dominio.Usuario;
import com.concesionario.backend.repositorio.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;  // ← Tu PasswordEncoder de utils/

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        System.out.println("🔐 Contraseña ingresada (debe coincidir con 1234)");
        System.out.println("🔐 Hash en BD: " + usuario.getPassword());
        System.out.println("✅ ¿Coincide? " + passwordEncoder.matches("1234", usuario.getPassword()));

        String role = usuario.getEsSuperUsuario() ? "ADMIN" : "USER";

        return new User(usuario.getUsername(), usuario.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role)));
    }
}