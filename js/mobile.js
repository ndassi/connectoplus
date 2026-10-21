let mb_btns = document.getElementsByClassName("mobile-btn");
let tl_btns = document.getElementsByClassName("tele-btn");
let modal = document.getElementById("modal");
let modal_quit = document.getElementsByClassName("modal-quit");
let plan_list = document.getElementById("plan-list");
let forfait = "";
let form = document.getElementById("form");
let a_choisis = document.getElementById("a-choisis");
let plan_type ={"mobile":"mb", "tv":"tl"};

forfaits = {
  super: {
    num: 5,
    prix: 50,
    contenue: ["Textos illimité", "Appel illimité", "Accest gratuit à C-Staff"],
  },
  "ultra-super": {
    num: 7,
    prix: 55,
    contenue: ["Textos illimité", "Streaming HD illimité", "Internet illimité"],
  },
  max: {
    num: 8,
    prix: 60,
    contenue: ["Internet illimité", "Streaming HD illimité", "Gaming illimité"],
  },
  "télé-super": {
    num: 4,
    prix: 25,
    contenue: ["Textos illimité", "Appel illimité", "Accest gratuit à C-Staff"],
  },
  "télé-ultra": {
    num: 5,
    prix: 30,
    contenue: ["Textos illimité", "Streaming HD illimité", "Internet illimité"],
  },
  "télé-max": {
    num: 6,
    prix: 35,
    contenue: ["Internet illimité", "Streaming HD illimité", "Gaming illimité"],
  },
};
plans = [
  "Réseau 5G/5G+",
  "Textos Illimité",
  "C-streaming",
  "C-game",
  "C-staff",
  "Internet illimité",
  "Vidéo en continu",
  "Gaming illimité",
];
tele_plans = [
  "Réseau 5G / 5G +",
  "Point d'accès",
  "plusieurs appareils",
  "Internet illimité",
  "Vidéo en continu en ",
  "Gaming illimité",
];

function getLocalStorage() {
  let nom = localStorage.getItem("clmbl-nom") || "";
  let prenom = localStorage.getItem("clmbl-prenom") || "";
  let email = localStorage.getItem("clmbl-email") || "";
  let date_naiss = localStorage.getItem("clmbl-date_naiss") || "";
  let message = localStorage.getItem("clmbl-message") || "";

  if (nom && prenom && email && date_naiss && message) {
    document.getElementById("list-nom").textContent = nom;
    document.getElementById("list-prenom").textContent = prenom;
    document.getElementById("list-email").textContent = email;
    document.getElementById("list-date-naiss").textContent = date_naiss;
    document.getElementById("list-message").textContent = message;
    return true;
  }
  return false;
}
function setForfait(forfait,ptype) {
   if (ptype == "mb") {
     localStorage.setItem("clmbl-forfait", forfait);
   }
   if (ptype == "tl") {
     localStorage.setItem("cltv-forfait", forfait);
   }
}
function anime(btns, plans, ptype) {
  for (let i of btns) {
    i.addEventListener("click", function () {
      if (getLocalStorage()) {
        a_choisis.style.display = "block";
        form.parentNode.style.display = "none";
      } else {
        form.parentNode.style.display = "block";
        a_choisis.style.display = "none";
      }

      forfait = this.getAttribute("data-forfait");
      
      setForfait(forfait, ptype);

      let details = forfaits[forfait];

      let votre_plan = document.getElementById("votre-plan");
      votre_plan.innerHTML = `${forfait} - ${details.prix}$/mois`;

      let j = 0;
      plan_list.innerHTML = "";
      while (j < details.num) {
        plan_list.innerHTML += `<label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" checked=true disabled>
                                    ${plans[j]}
                                </label>`;
        j++;
      }
      // let contenue = details.contenue.map(item => `<li>${item}</li>`).join("");
      modal.classList.add("show");
    });
  }
}

getLocalStorage();

anime(mb_btns, plans, plan_type["mobile"]);
anime(tl_btns, tele_plans, plan_type["tv"]);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let email = document.getElementById("email").value;
  let date_naiss = document.getElementById("date-naiss").value;
  let message = document.getElementById("message").value;
  console.log(nom, prenom, email, date_naiss, message);
  localStorage.setItem("clmbl-nom", nom);
  localStorage.setItem("clmbl-prenom", prenom);
  localStorage.setItem("clmbl-email", email);
  localStorage.setItem("clmbl-date_naiss", date_naiss);
  localStorage.setItem("clmbl-message", message);
  modal.classList.remove("show");
});

for (let i of modal_quit) {
  i.addEventListener("click", function () {
    modal.classList.remove("show");
  });
}
// modal.addEventListener("click", function(){
//   modal.style.display = "none";
// }
