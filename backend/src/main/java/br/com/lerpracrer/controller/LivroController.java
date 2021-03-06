package br.com.lerpracrer.controller;

import br.com.lerpracrer.model.Livro;
import br.com.lerpracrer.validator.ControllerValidator;

public class LivroController {
    final int ANO_PUBLICACAO_BASE = 1455;
    final int TAMANHO_MINIMO_TITULO = 2;
    final int TAMANHO_MINIMO_AUTOR = 5;
    final int TAMANHO_MINIMO_DESCRICAO = 10;
    private ControllerValidator validator;

    public LivroController() {
        validator = new ControllerValidator();
    }

    public ControllerValidator getValidator() {
        return validator;
    }

    /*
    * Valida os dados de um livro.
    */
    public void validar(Livro livro) {
        if(!isTituloValido(livro.getTitulo())) {
            this.getValidator().setMensagemValidacao("Título não pode ser vazio ou ter menos de 3 caracteres.");
        }

        if (!isAutorValido(livro.getAutor())) {
            this.getValidator().setMensagemValidacao("Autor não pode ser vazio ou ter menos de 5 caracteres.");
        }
        if (!isEditoraValida(livro.getEditora())) {
            this.getValidator().setMensagemValidacao("Editora não pode ser vazio.");
        }

        if (!isAnoPublicacaoValido(livro.getAnoPublicacao())) {
            this.getValidator().setMensagemValidacao("Ano de publicação inválido (ano base válido: " + ANO_PUBLICACAO_BASE + ".");
        }

        if (!isNumeroDePaginasValido(livro.getNumeroDePaginas())) {
            this.getValidator().setMensagemValidacao("Número de páginas inválido.");
        }

        if (!isDescricaoValida(livro.getDescricao())) {
            this.getValidator().setMensagemValidacao("Descrição não pode ser vazia");
        }
    }

    /*
    * Funções Validadoras
    */
    private boolean isTituloValido(String titulo) {
        return titulo != null && (!titulo.isEmpty() && titulo.length() >  TAMANHO_MINIMO_TITULO);
    }

    private boolean isAutorValido(String autor) {
        return autor != null && (!autor.isEmpty() && autor.length() > TAMANHO_MINIMO_AUTOR);
    }

    private boolean isEditoraValida(String editora) {
        return editora != null && !editora.isEmpty();
    }

    private boolean isAnoPublicacaoValido(int anoPublicacao) {
        return anoPublicacao > 0 && anoPublicacao >= ANO_PUBLICACAO_BASE;
    }

    private boolean isNumeroDePaginasValido(int numeroDePaginas) {
        return numeroDePaginas > 0;
    }

    private boolean isDescricaoValida(String descricao) {
        return descricao != null && !descricao.isEmpty() && descricao.length() > TAMANHO_MINIMO_DESCRICAO;
    }
}
