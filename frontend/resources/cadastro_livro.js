$(document).ready(function () {
  if ($.cookie('jwt_token') == null || $.cookie('jwt_token') == undefined) {
      alert("Usuário não autenticado");
      location.href = "./login.html";
  }
});

$('#form-cadastro-livro').submit(function (event) {

  event.preventDefault();

  //validação dos campos  
  let titulo = $('#input-titulo').val().trim();
  let autor = $('#input-autor').val().trim();
  let edicao = $('#input-edicao').val().trim();
  let editora = $('#input-editora').val().trim();
  let anoPublicacao = $('#input-ano-publicacao').val().trim();
  let numeroDePaginas = $('#input-numero-paginas').val().trim();
  let isbn10 = $('#input-isbn-10').val();
  let isbn13 = $('#input-isbn-13').val();
  let descricao = $('#input-descricao').val().trim();

  const tituloValido = titulo !== "";
  const autorValido = autor !== "";
  const edicaoValido = !isNaN(edicao) && parseInt(edicao) > 0;
  const anoPublicacaoValido = !isNaN(anoPublicacao) && parseInt(anoPublicacao) > 0;
  const numeroPaginasValido = !isNaN(numeroDePaginas) && parseInt(numeroDePaginas) > 0;
  const editoraValido = editora !== "";
  const descricaoValida = descricao !== "";


  let dadosValidos = tituloValido && autorValido && anoPublicacaoValido
    && numeroPaginasValido && editoraValido && descricaoValida;

  if (dadosValidos) {

    var formData = {
      'titulo': titulo,
      'autor': autor,
      'edicao': edicao,
      'editora': editora,
      'anoPublicacao': anoPublicacao,
      'numeroDePaginas': numeroDePaginas,
      'isbn10': isbn10 && isbn10 !== "" ? isbn10 : null,
      'isbn13': isbn13 && isbn13 !== "" ? isbn13 : null,
      'descricao': descricao
    }

    $.ajax({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Beaver ' + $.cookie('jwt_token')
      },
      type: 'POST',
      url: 'http://localhost:8080/api/livros/incluir',
      data: JSON.stringify(formData),
      dataType: 'json',
      encode: true,
      success: function (data) {
        if (!Array.isArray(data)) {
          toastr.success("Livro cadastrado com sucesso",
            "Cadastro de Livro",
            {
              positionClass: "toast-top-right",
              showDuration: "300",
              hideDuration: "1000",
              timeOut: "10000",
              extendedTimeOut: "1000",
              showEasing: "swing",
              hideEasing: "linear",
              showMethod: "slideDown",
              hideMethod: "slideUp"
            }
          );
          setTimeout(() => {
            location.href = 'livros_cadastrados.html';
          }, 11000);          
        }
        else {
          if (data.length) {
            let htmlValidacao = constroiMensagemValidacao(data);
            toastr.error(htmlValidacao,
              "Cadastro de Livro",
              {
                positionClass: "toast-top-right",
                showDuration: "300",
                hideDuration: "1000",
                timeOut: "10000",
                extendedTimeOut: "1000",
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "slideDown",
                hideMethod: "slideUp"
              }
            );
          }
        }

      },
      error: function (data) {
        console.log('erro');
      }
    });
  }
  else {
    let htmlValidacao = "<ul>";

    if (!tituloValido) htmlValidacao += "<li>Título inválido.</li>";
    if (!autorValido) htmlValidacao += "<li>Autor inválido.</li>";
    if (!edicaoValido) htmlValidacao += "<li>Edição inválida.</li>";
    if (!editoraValido) htmlValidacao += "<li>Editora inválida.</li>";
    if (!anoPublicacaoValido) htmlValidacao += "<li>Ano de publicação inválido.</li>";
    if (!numeroPaginasValido) htmlValidacao += "<li>Número de páginas inválido.</li>";
    if (!descricaoValida) htmlValidacao += "<li>Descrição inválida.</li>";

    htmlValidacao += "</ul>";

    toastr.error(htmlValidacao, "Cadastro de Livro",
      {
        positionClass: "toast-top-right",
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "10000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "slideDown",
        hideMethod: "slideUp"
      });
  }

});

function constroiMensagemValidacao(dados) {
  let htmlValidacao = "<ul>";
  dados.forEach(mensagem => {
    htmlValidacao += "<li>" + mensagem + "</li>";
  });  
  htmlValidacao += "</ul>";

  return htmlValidacao;
}