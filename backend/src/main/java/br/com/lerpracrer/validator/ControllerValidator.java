package br.com.lerpracrer.validator;

import java.util.ArrayList;

/*
* Classe utilizada para armazenar as validações de um controller
*/
public class ControllerValidator {
    private ArrayList<String> mensagensValidacao;

    public ControllerValidator() {
        this.mensagensValidacao = new ArrayList<>();
    }

    public ArrayList<String> getMensagensValidacao() {
        return mensagensValidacao;
    }

    public void setMensagensValidacao(ArrayList<String> mensagensValidacao) {
        this.mensagensValidacao = mensagensValidacao;
    }

    public void setMensagemValidacao(String mensagemValidacao) {
        this.mensagensValidacao.add(mensagemValidacao);
    }

    public boolean isValid() {
        return this.mensagensValidacao.isEmpty();
    }
}
