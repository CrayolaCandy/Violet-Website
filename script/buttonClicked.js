
function clickedMode(m){
  const clicked = document.querySelector(`.${m}`);
  if(!clicked.classList.contains('clicked')){
    check();
    clicked.classList.add('clicked');
  }
}
function check(){
  const clickedButton = document.querySelector('.clicked');
  if(clickedButton){
    clickedButton.classList.remove('clicked');
  }
}
function clickedCurrency(m){
  const clicked = document.querySelector(`.${m}`);
  if(!clicked.classList.contains('xpCoinclicked')){
    checkCurrency();
    clicked.classList.add('xpCoinclicked');
  }
}
function checkCurrency(){
  const clickedButton = document.querySelector('.xpCoinclicked');
  if(clickedButton){
    clickedButton.classList.remove('xpCoinclicked');
  }
}
/*
function loginButton(){
  const loginButtonClicked = document.querySelector(".loginButton");

  if(!loginButtonClicked.classList.contains("loginClicked")){
    loginButtonClicked.classList.toggle("loginClicked")
    console.log(1)
  }
  else{
    loginButtonClicked.classList.toggle("loginClicked")
    console.log(2)
  }
}
  */
/*
document.addEventListener("click", function(e){
  const loginButtonClicked = document.querySelector(".loginForm");
  if(e.target.classList.contains("loginButton")){
    if(!loginButtonClicked.classList.contains("loginClicked")){
      
      loginButtonClicked.classList.toggle("loginClicked")
      console.log(1)
    }
  }
  else{
    if(e.target.classList.contains("loginForm")){
      console.log(3)
    }
    else{
      loginButtonClicked.classList.remove("loginClicked");
      console.log(2);
    }
  }
})
*/
/*
document.addEventListener("DOMContentLoaded", function(){
  //LogIn Button
  const loginButton = document.querySelector(".loginButton");
  const loginForm = document.querySelector(".loginForm");

  loginButton.addEventListener("click", (e) => {
    if(e.target.closest(".loginForm"))
      return;
      loginForm.classList.toggle("loginClicked");
  });
  document.addEventListener("click", (e)=>{
    if(!loginButton.contains(e.target)){
      loginForm.classList.remove("loginClicked")
    }
  })

  //SignUp Button
  const signupButton = document.querySelector(".signupButton");
  const signupForm = document.querySelector(".signupForm");

  signupButton.addEventListener("click", (e) => {
    if(e.target.closest(".signupForm"))
      return;
      signupForm.classList.toggle("signupClicked");
  });
  document.addEventListener("click", (e)=>{
    if(!signupButton.contains(e.target)){
      signupForm.classList.remove("signupClicked")
    }
  })
})
*/
function User(){
  const userList = document.querySelector(".userList");
  const formList = document.querySelector(".formList");

  userList.addEventListener("click", (e) => {
    if(e.target.closest(".formList"))
      return;
      formList.classList.toggle("formClicked");
  });
  document.addEventListener("click", (e)=>{
    if(!userList.contains(e.target)){
      formList.classList.remove("formClicked")
    }
  })
}

