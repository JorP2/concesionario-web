package com.concesionario.backend.servicio;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.concesionario.backend.dominio.Usuario;
import com.concesionario.backend.repositorio.UsuarioRepository;

@Service
public class UsuarioService {
	final private UsuarioRepository usuarioRepository;
	
	public UsuarioService(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}
	
	//CRUD
	public List<Usuario> obtenerTodos() {
		return usuarioRepository.findAll();
	}
	
	public Optional<Usuario> obtenerPorId(Long id){
		return usuarioRepository.findById(id);
	}
	
	public Usuario guardar(Usuario u) {
		return usuarioRepository.save(u);
	}
	
	public void eliminarPorId(Long id){
		usuarioRepository.deleteById(id);
	}
}