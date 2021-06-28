var id_livro = GetURLParameter("id");

$(document).ready(function () {
  // if ($.cookie('jwt_token') == null || $.cookie('jwt_token') == undefined) {
  //   alert("Usuário não autenticado");
  //   location.href = "/academifyfrontend/login.html";
  // }

  $.ajax({
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': 'Beaver ' + $.cookie('jwt_token'),
    },
    url: 'http://localhost:8080/api/livros/' + id_livro,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data) {
        $('#input-id-livro').val(data.id);
        $('#input-titulo').val(data.titulo);
        $('#input-autor').val(data.autor);
        $('#input-edicao').val(data.edicao);
        $('#input-editora').val(data.editora);
        $('#input-ano-publicacao').val(data.anoPublicacao);
        $('#input-numero-paginas').val(data.numeroDePaginas);
        if(data.isbn10) {
          $('#input-isbn-10').val(data.isbn10);
        }
        if(data.isbn13) {
          $('#input-isbn-13').val(data.isbn13);
        }
        $('#input-descricao').val(data.descricao);
      }
      else {
        toastr.warning("Não foram encontrados dados para o id de livro informado",
          "Edição de Livro",
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
      // $("#input-nome").val(data.nome);
      // $("#input-matricula").val(data.matricula);
      // $("#input-nascimento").val(formatDate(new Date(data.nascimento)));
      // $("#input-dataHoraCadastro").val(formatDateTime(new Date(data.dataHoraCadastro)));
    }
  });

});

$('#form-edicao-livro').submit(function (event) {
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
        //'Authorization': 'Beaver ' + $.cookie('jwt_token'),
      },
      type: 'PUT',
      url: 'http://localhost:8080/api/livros/editar/' + id_livro,
      data: JSON.stringify(formData),
      dataType: 'json',
      encode: true,
      success: function (data) {
        if (!Array.isArray(data)) {
          toastr.success("Livro alterado com sucesso",
            "Edição de Livro",
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
          // location.href = 'livros_cadastrados.html';
        }
        else {
          if (data.length) {
            let htmlValidacao = constroiMensagemValidacao(data);
            toastr.error(htmlValidacao,
              "Edição de Livro",
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

    toastr.error(htmlValidacao, "Edição de Livro",
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