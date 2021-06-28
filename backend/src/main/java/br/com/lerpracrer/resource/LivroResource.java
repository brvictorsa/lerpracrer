package br.com.lerpracrer.resource;

import br.com.lerpracrer.controller.LivroController;
import br.com.lerpracrer.model.Livro;
import br.com.lerpracrer.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value ="/api/livros")
public class LivroResource {

    @Autowired
    private LivroRepository livroRepository;

    @GetMapping
    public List<Livro> getAll() {
        return livroRepository.findAll();
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<Livro> get(@PathVariable(value = "id") long id) {
        Livro livro = livroRepository.findById(id);

        if(livro == null) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
        else {
            return new ResponseEntity<>(livro, HttpStatus.OK);
        }
    }

    @PostMapping(value="/incluir")
    public ResponseEntity<Livro> include(@RequestBody Livro livro) {
        LivroController livroController = new LivroController();
        livroController.validar(livro);

        if(livroController.getValidator().isValid()) {
            livro = livroRepository.save(livro);
            return new ResponseEntity<Livro>(livro, HttpStatus.OK);
        } else {
            return new ResponseEntity(livroController.getValidator().getMensagensValidacao(), HttpStatus.OK);
        }
    }

    @PutMapping(value="/editar/{id}")
    public ResponseEntity<Livro> edit(@PathVariable(value="id") long id, @RequestBody Livro dadosLivro) {
        LivroController livroController = new LivroController();
        livroController.validar(dadosLivro);

        if(livroController.getValidator().isValid()) {
            Livro dbLivro = livroRepository.findById(id);
            if(dbLivro != null) {
                Livro livro = dbLivro;
                livro.setTitulo(dadosLivro.getTitulo());
                livro.setAutor(dadosLivro.getAutor());
                livro.setEdicao(dadosLivro.getEdicao());
                livro.setEditora(dadosLivro.getEditora());
                livro.setAnoPublicacao(dadosLivro.getAnoPublicacao());
                livro.setNumeroDePaginas(dadosLivro.getNumeroDePaginas());
                livro.setDescricao(dadosLivro.getDescricao());
                if(dadosLivro.getIsbn10() != null) {
                    livro.setIsbn10(dadosLivro.getIsbn10());
                }
                if(dadosLivro.getIsbn13() != null) {
                    livro.setIsbn13(dadosLivro.getIsbn13());
                }

                livro = livroRepository.save(livro);
                return new ResponseEntity(livro, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity(livroController.getValidator().getMensagensValidacao(), HttpStatus.OK);
        }
    }

    @DeleteMapping(value = "/remover/{id}")
    public @ResponseBody String remover(@PathVariable(value="id") long id) {
        Livro livro = livroRepository.findById(id);

        if(livro != null) {
            livroRepository.delete(livro);
            return livro.getTitulo();
        }
        else {
            return "Nenhum livro com o id: " + id + " foi encontrado.";
        }
    }
}
