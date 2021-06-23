$(document).ready(function () {

  // if ($.cookie('jwt_token') == null || $.cookie('jwt_token') == undefined) {
  //     alert("Usuário não autenticado");
  //     location.href = "/academifyfrontend/login.html";
  // }

  $.ajax({
    headers: {
      'Content-Type': 'application/json'
      // 'Authorization': 'Beaver ' + $.cookie('jwt_token'),          
    },
    url: 'http://localhost:8080/api/livros',
    type: 'get',
    dataType: 'json',
    success: function (result) {
      var painelLivros = $("#painel-livros");
      let htmlPnlLivro = "";

      if (painelLivros && result && result.length) {        
        result.forEach(livro => {
          htmlPnlLivro +=
            "<div class='col mt-3'>" +
            "<div class='card'>" +
            "<div class='bg-image hover-overlay ripple' data-mdb-ripple-color='light'>" +
            "<img src='images/book_or.svg' class='img-fluid' />" +
            "<a href='#'>" +
            "<div class='mask' style='background-color: rgba(251, 251, 251, 0.15);'></div>" +
            "</a>" +
            "</div>" +
            "<div class='card-body'>" +
            "<h5 class='card-title'>" + livro.titulo + "</h5>" +
            "<h4>" + livro.autor + "</h4>" +
            "<br>" +
            "<a href='livro.html?id=" + livro.id + "' class='btn btn-primary'>DAR UMA ESPIADA</a>" +
            "</div>" +
            "</div>" +
            "</div>";
        });

        painelLivros.html(htmlPnlLivro);
      }
      console.log({result});
    }
  })
});