$(document).ready(function () {
  buscarLivros();
});

function buscarLivros() {
  $.ajax({
    headers: {
      'Content-Type': 'application/json'
      // 'Authorization': 'Beaver ' + $.cookie('jwt_token'),          
    },
    url: 'http://localhost:8080/api/livros',
    type: 'get',
    dataType: 'json',
    success: function (result) {
      var divLivros = $("#livros");
      let linhasLivros = "";

      if (divLivros && result && result.length) {
        result.forEach((livro, index) => {
          linhasLivros += "<div class='row' style='border-bottom: dashed 1px #212529;'>"
            + "<div class='col-md-9'>"
            + " <h2 class='m-3'>" + (index + 1) + " - " + livro.titulo + " (" + livro.autor + ")</h2>"
            + "</div>"
            + "<div class='col-md-3 d-md-flex justify-content-md-end'>"
            + " <button class='btn btn-primary me-md-2' type='button' onclick='editarLivro(" + livro.id + ")'>Editar</button>"
            + "	<button class='btn btn-primary me-md-2' type='button' onclick='removerLivro(" + livro.id + ")'>Excluir</button>"
            + "</div>"
            + "</div>";
        });

        divLivros.html(linhasLivros);
      }
      // console.log({result});
    }
  })
}

function editarLivro(id) {
  alert("Redirecionar para editar o livro id: ", id);
}

function removerLivro(id) {
  let htmlInfo = "<br /><button type='button' id='confirmarExclusao' " +
    "style='outline: none; border: none; color: #fff; background-color: #f89406;'>Sim</button>"

  toastr.warning(htmlInfo, 'Deseja realmente remover o livro?',
    {
      closeButton: false,
      timeout: 0,
      extendedTimeout: 0,
      positionClass: "toast-top-center",
      allowHtml: true,
      onShown: function (toast) {
        $("#confirmarExclusao").click(function () {
          // Remover o livro
          $.ajax({
            headers: {
              'Content-Type': 'application/json'
              // 'Authorization': 'Beaver ' + $.cookie('jwt_token'),          
            },
            url: 'http://localhost:8080/api/livros/remover/' + id,
            type: 'delete',
            success: function (result) {
              if(result) {
                toastr.success("O livro'" + result + "' foi removido com sucesso.", 
                  "Exclusão de Livro", 
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
                buscarLivros();
              }              
            },
            error: function (error) {
              toastr.error("Ocorreu um erro ao tentar remover o livro.", "Erro");
            }
          })

        });
      }
    });
}