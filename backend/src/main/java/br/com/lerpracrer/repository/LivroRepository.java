package br.com.lerpracrer.repository;

import br.com.lerpracrer.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {
        Livro findById(long id);
}
