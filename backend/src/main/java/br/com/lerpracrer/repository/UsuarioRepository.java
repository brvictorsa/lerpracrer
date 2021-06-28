package br.com.lerpracrer.repository;

import br.com.lerpracrer.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    public Usuario findByUsuario(String usuario);


}
