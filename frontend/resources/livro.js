$(document).ready(function () {

  var id_livro = GetURLParameter("id");
    
  if ($.cookie('jwt_token') == null || $.cookie('jwt_token') == undefined) {
      alert("Usuário não autenticado");
      location.href = "./login.html";
  }

  $.ajax({
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Beaver ' + $.cookie('jwt_token')
      },
      url: 'http://localhost:8080/api/livros/' + id_livro,
      type: 'get',
      dataType: 'json',
      success: function (result) {
          
          console.log({result});

          $('#titulo').text("Título: " + result.titulo);
          $('#autor').text("Autor: " + result.autor);
          $('#edicao').text("Edição:" + result.edicao);
          $('#editora').text("Editora: " + result.editora);
          $('#numeroPaginas').text("Número de Páginas: " + result.numeroDePaginas);
          $('#anoPublicacao').text("Ano de Publicação: " + result.anoPublicacao);
          $('#isbn10').text("ISBN10: " + (result.isbn10 !== null ? result.isbn10 : "-"));
          $('#isbn13').text("ISBN13: " + (result.isbn10 !== null ? result.isbn13 : "-"));
          // $('#').text("value", result.);
      }
  });
});