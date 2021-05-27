package br.com.lerpracrer.resource;

import br.com.lerpracrer.model.Livro;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.ws.Response;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value ="/api/livros")
public class LivroResource {

    @GetMapping
    public List<Livro> getAll() {
        Livro livro1 = new Livro("Código limpo: habilidades práticas do Agile Software",
                "Robert C. Martin",
                "Alta Books",
                456);

        Livro livro2 = new Livro("Data science para negócios",
                "Foster Provost",
                "Alta Books",
                404);

        ArrayList<Livro> livros = new ArrayList<>();
        livros.add(livro1);
        livros.add(livro2);

        return livros;
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<Livro> get(@PathVariable(value = "id") long id) {
        Livro livro = new Livro("Código limpo: habilidades práticas do Agile Software",
                "Robert C. Martin",
                "Alta Books",
                456);

        return new ResponseEntity<Livro>(livro, HttpStatus.OK);
    }
}
