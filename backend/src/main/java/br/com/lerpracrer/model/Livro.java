// ---------------
// Classe Livro
// ---------------
// Título
// Autor
// Edição
// Editora
// Número de páginas
// Ano de publicação
// Sinopse
// ISBN-10 : 9999999999
// ISBN-13:  999-9999999999
// ---------------

package br.com.lerpracrer.model;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="livro")
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String autor;

    private byte edicao;

    @Column(nullable = false)
    private String editora;

    @Column(nullable = false)
    private int anoPublicacao;

    @Column(nullable = false)
    private int numeroDePaginas;

    @Column(length = 300)
    private String sinopse;

    @Column(length = 10)
    private String isbn10;

    @Column(length = 14)
    private String isbn13;

    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private Date cadastradoEm;

    protected Livro() {
        this.cadastradoEm = new Date();
    }

    public Livro(String titulo, String autor, String editora, int numeroDePaginas) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.numeroDePaginas = numeroDePaginas;
        this.cadastradoEm = new Date();
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public byte getEdicao() {
        return edicao;
    }

    public void setEdicao(byte edicao) {
        this.edicao = edicao;
    }

    public String getEditora() {
        return editora;
    }

    public void setEditora(String editora) {
        this.editora = editora;
    }

    public int getAnoPublicacao() {
        return anoPublicacao;
    }

    public void setAnoPublicacao(int anoPublicacao) {
        this.anoPublicacao = anoPublicacao;
    }

    public int getNumeroDePaginas() {
        return numeroDePaginas;
    }

    public void setNumeroDePaginas(int numeroDePaginas) {
        this.numeroDePaginas = numeroDePaginas;
    }

    public String getSinopse() {
        return sinopse;
    }

    public void setSinopse(String sinopse) {
        this.sinopse = sinopse;
    }

    public String getIsbn10() {
        return isbn10;
    }

    public void setIsbn10(String isbn10) {
        this.isbn10 = isbn10;
    }

    public String getIsbn13() {
        return isbn13;
    }

    public void setIsbn13(String isbn13) {
        this.isbn13 = isbn13;
    }

    public Date getCadastradoEm() {
        return cadastradoEm;
    }
}
