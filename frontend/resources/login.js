//Sliding
const sign_in_btn = document.querySelector("#btn-login");
const sign_up_btn = document.querySelector("#btn-registrar");
const container = document.querySelector(".container");
let alertToast = null;

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

//Configurar o Toastr
$(document).ready(function(){
	// códigos jQuery a serem executados quando a página carregar

  toastr.options = {
    "closeButton": true,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "10000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "slideDown",
    "hideMethod": "slideUp"
  };

  alertToast = toastr;
  //console.log(alertToast);

})

//Submeter formulário de login
$('#form-login').submit(function (event) { 
  event.preventDefault();

  //valida os campos preenchidos
  let usuario = $('#user').val();
  let senha = $('#password').val();
  const dadosPreenchidos = usuario.length && senha.length;

  if(dadosPreenchidos) {
    //Cria o formData
    let formData = {
      'username': usuario.trim(),
      'password': senha.trim()
    }

    $.ajax({
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'http://localhost:8080/api/auth/authenticate',
      data: JSON.stringify(formData),
      dataType: 'json',
      encode: true,
      success: function (data) {
          $.cookie('jwt_token', data.jwt);
          location.href = 'inicial.html';
      },
      error: function (data) {
        alertToast.warning('Usuário ou senha inválidos.', 'Login');
      }
  });

  } else {
    alertToast.warning('Usuário e senha são obrigatórios.', 'Login');
  }
})

//Submeter formulário de registro (criar conta)
// $('#form-register').submit(function (event) {
//   event.preventDefault();

//   const resultado = validarCriacaoDeConta();

//   if(!resultado.valido) {
//     alertToast.options.positionClass = "toast-top-left";
//     alertToast.warning(resultado.mensagemValidacao, 'Aviso - Nova Conta');
//   }

//   //console.log('criar conta');
// })

// function validarCriacaoDeConta(usuario, telefone, senha, confirmacaoSenha) {
//   //valida os campos preenchidos
//   const usuarioR = $('#userRegister').val().trim();
//   const telefoneR = $('#phoneRegister').val().trim();
//   const senhaR = $('#passwordRegister').val().trim();
//   const confirmacaoSenhaR = $('#confirmPasswordRegister').val().trim();

//   const msgUsuarioRInvalido = (usuarioR.length === 0) ? criarMensagemCampoObrigatorio('Usuário') : "";
//   const msgTelefoneRInvalido = (telefoneR.length === 0) ? criarMensagemCampoObrigatorio('Telefone') : "";
//   const msgSenhaRInvalida = (!senhaR.length === 0) ? criarMensagemCampoObrigatorio('Senha', 'F') : "";
//   const msgConfirmacaoSenhaRInvalida = (confirmacaoSenhaR.length === 0) ? criarMensagemCampoObrigatorio('Confirmação de senha', 'F') : "";

//   //const senhasConferem = true; (senha && confirmacaoSenhaR && senhaR === confirmacaoSenhaR) ? 

//   let mensagensCampos = msgUsuarioRInvalido + msgTelefoneRInvalido + msgSenhaRInvalida + msgConfirmacaoSenhaRInvalida;
//   let mensagemValidacao =  mensagemCampos.length ? '<ul>' + mensagemCampos + '</ul>' : "";   

//   return {
//     valido: !mensagem.length,
//     mensagemValidacao: mensagemValidacao,
//   };
// }

// function criarMensagem (usuario, telefone, ) {

// }

// function criarMensagemCampoObrigatorio(campo, genero ='M') {
//   return '<li>' + campo + ' obrigatóri' + (genero === 'M' ? 'o' : 'a') + '<li>';
// }

