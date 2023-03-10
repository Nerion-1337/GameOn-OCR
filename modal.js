// Nav Mobile
const icon = document.querySelector(".icon");
const topNav = document.getElementById("myTopnav");

icon.addEventListener("click", () => {
  topNav.classList.toggle("responsive");
  screen();
});

//Select Nav Animation
const mql = window.matchMedia("(min-width: 800px)");
const nav = document.querySelectorAll(".nav");
const lien = document.querySelectorAll("a");
const home = document.getElementById("home");
const indicator = document.querySelector(".indicator");
const url = window.location.href;

function screen() {
  lien.forEach((link) => {
    if (link.href === url) {
      link.classList.add("active");
      const top = link.offsetTop;
      const left = link.offsetLeft;
      const height = link.offsetHeight;
      const width = link.offsetWidth;
      indicator.style.left = left + "px";
      indicator.style.top = top + "px";
      indicator.style.width = width + "px";
      indicator.style.height = height + "px";
    }
  });

  nav.forEach((item) => {
    item.addEventListener("mousemove", (e) => {
      indicator.style.transitionDelay = "0s";
      indicator.style.top = e.target.offsetTop + "px";
      indicator.style.left = e.target.offsetLeft + "px";
      indicator.style.width = e.target.offsetWidth + "px";
      indicator.style.height = e.target.offsetHeight + "px";
      lien.forEach((link) => {
        if (link.href === url) {
          link.classList.remove("active");
        }
      });
    });
  });

  nav.forEach((item) => {
    item.addEventListener("mouseout", () => {
      lien.forEach((link) => {
        if (link.href === url) {
          link.classList.add("active");
          const top = link.offsetTop;
          const left = link.offsetLeft;
          const height = link.offsetHeight;
          const width = link.offsetWidth;
          indicator.style.left = left + "px";
          indicator.style.top = top + "px";
          indicator.style.width = width + "px";
          indicator.style.height = height + "px";
        }
      });
    });
  });
}
screen();
window.addEventListener("resize", () => {
  screen();
});

//Open/CLose Formulaire
const btn_signup = document.querySelectorAll(".btn-signup");
const bground = document.querySelector(".bground");
const close = document.querySelectorAll(".toclose");
const bground_thanks = document.querySelector(".bground-thanks");
const closelater = document.querySelector(".closelater")

btn_signup.forEach((button) => {
  button.addEventListener("click", () => {
    bground.style.display = "block";
  });
});

close.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.reload();
  });
});

closelater.addEventListener("click", () =>{
  bground.style.display = "none";
})


//Condition Formulaire
const form = document.querySelector("#form");
const first = document.querySelector("#first");
const last = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const gps = document.getElementById("location6");
const checkbox1 = document.querySelector("#checkbox1");

const nameReg = /[a-zA-ZÀ-ÿ -]+/;
const emailReg = /^[a-zA-ZÀ-ÿ0-9._%+-]+/;
const emailReg2 = /@/;
const emailReg3 =
  /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const dualReg = /(.)\1{2,}/;
const numbReg = /^[a-zA-ZÀ-ÿ -]{2,20}$/;
const quantiReg = /^[0-9]{1,2}$/;
const dateReg = /^\d{4}-\d{2}-\d{2}$/;
const trancheReg = /^(19[0-9][0-9]|20[0-1][0-5])$/;

function setErreur(input, message) {
  const formInput = input.parentElement;
  const small = formInput.querySelector("small");

  small.innerText = message;
  input.classList.remove("input-valid");
  input.classList.add("input-error");
}

function setValid(input) {
  const formInput = input.parentElement;
  const small = formInput.querySelector("small");

  small.innerText = "";
  input.classList.remove("input-error");
  input.classList.add("input-valid");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  valid();

  if (
    validfirst() === true &&
    validlast() === true &&
    validemail() === true &&
    validBirthdate() === true &&
    validQuantity() === true &&
    validLocalisation() === true &&
    validCGV() === true
  ) {
    bground.style.display = "none";
    bground_thanks.style.display = "block";
  }
});

function valid() {
  validfirst();
  validlast();
  validemail();
  validBirthdate();
  validQuantity();
  validLocalisation();
  validCGV();
}

function validfirst() {
  const value = first.value.trim();

  if (first.value.trim() === "") {
    setErreur(first, "Veuillez renseigner un prénom.");
    return false;
  } else if (numbReg.test(value) === false) {
    setErreur(first, "Veuillez entrer au minimum 2 lettres.");
    return false;
  } else if (nameReg.test(value) === false) {
    setErreur(first, "Veuillez entrer un prénom valide.");
    return false;
  } else if (dualReg.test(value) === true) {
    setErreur(first, "Veuillez entrer un prénom valide.");
    return false;
  } else {
    setValid(first);
    return true;
  }
}

function validlast() {
  const value = last.value.trim();

  if (value === "") {
    setErreur(last, "Veuillez renseigner un nom.");
    return false;
  } else if (numbReg.test(value) === false) {
    setErreur(last, "Veuillez entrer entre 2 et 20 lettres.");
    return false;
  } else if (nameReg.test(value) === false) {
    setErreur(last, "Veuillez entrer un nom valide.");
    return false;
  } else if (dualReg.test(value) === true) {
    setErreur(last, "Veuillez entrer un nom valide.");
    return false;
  } else {
    setValid(last);
    return true;
  }
}

function validemail() {
  const value = email.value.trim();

  if (value === "") {
    setErreur(email, "Veuillez renseigner un email.");
    return false;
  } else if (emailReg.test(value) === false) {
    setErreur(email, "Veuillez verifier votre nom d'utilisateur.");
    return false;
  } else if (emailReg2.test(value) === false) {
    setErreur(email, "N'oublier pas le @.");
    return false;
  } else if (emailReg3.test(value) === false) {
    setErreur(email, "Veuillez vérifier le nom de domaine.");
    return false;
  } else {
    setValid(email);
    return true;
  }
}

function validBirthdate() {
  const value = birthdate.value.trim();
  const value2 = value.slice(0, 4);

  if (!value) {
    setErreur(birthdate, "Veuillez saisir votre date de naissance.");
    return false;
  } else if (dateReg.test(value) === false) {
    setErreur(birthdate, "Veuillez saisir un format valide jj/mm/aaaa.");
    return false;
  } else if (trancheReg.test(value2) === false) {
    setErreur(
      birthdate,
      "Veuillez saisir une année de naissance entre 1900 et 2015."
    );
    return false;
  } else {
    setValid(birthdate);
    return true;
  }
}

function validQuantity() {
  const value = quantity.value.trim();

  if (!value) {
    setErreur(quantity, "Veuillez saisir un nombre, même zéro.");
    return false;
  } else if (quantiReg.test(value) === false) {
    setErreur(quantity, "Renseigner juste des chiffres entre 0 et 99");
    return false;
  } else {
    setValid(quantity);
    return true;
  }
}

function validLocalisation() {
  let loc = document.querySelector('input[name = "location"]:checked');
  if (loc != null) {
    setValid(gps);
    return true;
  } else {
    setErreur(gps, "Veuillez renseigner une localisation.");
    return false;
  }
}

function validCGV() {
  if (checkbox1.checked) {
    setValid(checkbox1);
    return true;
  } else {
    setErreur(checkbox1, "Veuillez accepter les CGV.");
    return false;
  }
}