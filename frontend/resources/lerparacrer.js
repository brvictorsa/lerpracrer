function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++)
  {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam)
      {
          return sParameterName[1];
      }
  }
}

function sair() {
  if ($.cookie('jwt_token') !== null || $.cookie('jwt_token') !== undefined) {
    $.removeCookie('jwt_token');
    location.href = "./login.html";
  }
}