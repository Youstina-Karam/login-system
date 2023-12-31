// sign up
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signupBtn = document.getElementById("signupBtn");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginBtn = document.getElementById("loginBtn");
var logoutBtn = document.getElementById("logoutBtn");
var error = "";
var pathparts = location.pathname.split("/");
var baseURL = "";
for (var i = 0; i < pathparts.length - 1; i++) {
  baseURL += "/" + pathparts[i];
}
var usersList = [];
if (localStorage.getItem("usersList")) {
  usersList = JSON.parse(localStorage.getItem("usersList"));
}

var username = localStorage.getItem("usernameLogin");
if (username) {
  document.getElementById("username").innerHTML = "Welcome " + username;
}

signupBtn?.addEventListener("click", register);
loginBtn?.addEventListener("click", login);

function register() {
  if (
    signupName.value == "" ||
    (signupEmail.value == "") | (signupPassword == "")
  ) {
    error = "All inputs is required";
  } else if (checkEmail() == false) {
    error = "email already exists";
  } else {
    var signupData = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };

    usersList.push(signupData);
    localStorage.setItem("usersList", JSON.stringify(usersList));
    clearSignupForm();
    signupName.classList.remove("is-valid");
    signupEmail.classList.remove("is-valid");
    signupPassword.classList.remove("is-valid");
    Swal.fire({
      icon: "success",
      title: "Done!",
    });
          location.replace('/login-system/');
   
  }
  document.getElementById("error").innerHTML = error;
}

function login() {
  if (loginEmail.value == "" || loginPassword.value == "") {
    error = "All inputs is required";
  } else {
    var userData = {
      email: loginEmail.value,
      pass: loginPassword.value,
    };
    for (var i = 0; i < usersList.length; i++) {
      if (
        usersList[i].email.toLowerCase() == userData.email.toLowerCase() &&
        usersList[i].password.toLowerCase() == userData.pass.toLowerCase()
      ) {
        localStorage.setItem("usernameLogin", usersList[i].name);
        
          location.replace('home.html');
      } else {
        error = "email or password not correct";
      }
    }
  }
  document.getElementById("error").innerHTML = error;
}

function clearSignupForm() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
  error = "";
}

/// validation
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
var pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;

signupName?.addEventListener("input", function () {
  validation(signupName, nameRegex, "name");
});
signupEmail?.addEventListener("input", function () {
  validation(signupEmail, email, "email");
});
signupPassword?.addEventListener("input", function () {
  validation(signupPassword, pass, "pass");
});
loginEmail?.addEventListener("input", function () {
  validation(loginEmail, email, "email");
});
loginPassword?.addEventListener("input", function () {
  validation(loginPassword, pass, "pass");
});

var lowerCaseLetters = /[a-z]/g;
var upperCaseLetters = /[A-Z]/g;
var numbers = /[0-9]/g;

function validation(element, regex, type) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    error = "";
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    if (type == "name") error = "Minimum 3 characters";
    else if (type == "email") error = "Invalid email, ex: example@gmail.com";
    else {
      error = `
        Password must contain the following:
        a capital (uppercase) letter,  a lowercase letter, contain a number, Minimum 6 characters and  require a special character
        `;
    }
  }
  document.getElementById("error").innerHTML = error;
}

// check email exist

function checkEmail() {
  for (var i = 0; i < usersList.length; i++) {
    if (usersList[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return false;
    }
  }
}

logoutBtn?.addEventListener("click", function () {
  localStorage.removeItem("usernameLogin");
    location.replace('/login-system/');
 
});
