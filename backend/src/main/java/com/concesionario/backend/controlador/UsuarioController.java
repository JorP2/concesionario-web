package com.concesionario.backend.controlador;

import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.concesionario.backend.dominio.Usuario;
import com.concesionario.backend.servicio.UsuarioService;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins="*")
public class UsuarioController {
	private final UsuarioService usuarioService;
	
	public UsuarioController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}
	
	//GET
	@GetMapping
	public List<Usuario> listarTodos(){
		return usuarioService.obtenerTodos();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Usuario> obtenerPorId(Long id){
		Optional<Usuario> u = usuarioService.obtenerPorId(id);
		return u.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	//POST
	@PostMapping
	public Usuario crear (@RequestBody Usuario usuario) {
		return usuarioService.guardar(usuario);
	}
	
	//PUT
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        Optional<Usuario> uExistente = usuarioService.obtenerPorId(id);
        if (uExistente.isPresent()) {
            usuario.setId(id);
            return ResponseEntity.ok(usuarioService.guardar(usuario));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id){
    	Optional<Usuario> u = usuarioService.obtenerPorId(id);
    	if(u.isPresent()) {
    		usuarioService.eliminarPorId(id);
    		return ResponseEntity.noContent().build();
    	}else {
    		return ResponseEntity.notFound().build();
    	}
    }
}
