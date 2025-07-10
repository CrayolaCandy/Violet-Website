document.addEventListener("DOMContentLoaded", function(){
  const url = window.location.pathname;
  const segments = url.split('/');
  const chatID = segments[segments.length - 1];

  console.log(chatID);
})
