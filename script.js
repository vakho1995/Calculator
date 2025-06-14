const DefoultTheme = document.getElementById("theme1");
const LightTheme = document.getElementById("theme2");
const DarkTheme = document.getElementById("theme3");
const radios = [...document.querySelectorAll("input")];

function changeTheme(e) {
  const radio = e.target;
  if (radio.checked === true) {
    if (radio.id === "radio2") {
      DefoultTheme.disabled = true;
      LightTheme.disabled = false;
      DarkTheme.disabled = true;
    } else if (radio.id === "radio3") {
      DefoultTheme.disabled = true;
      LightTheme.disabled = true;
      DarkTheme.disabled = false;
    } else {
      DefoultTheme.disabled = false;
      LightTheme.disabled = true;
      DarkTheme.disabled = true;
    }
  }
}

radios.forEach((radio) => {
  radio.addEventListener("change", changeTheme);
});
