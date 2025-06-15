const radios = [...document.querySelectorAll("input[name=theme]")];
const htmlElement = document.documentElement;
const savedTheme = localStorage.getItem("theme");

// Applies the selected theme to the root HTML element
const themeObj = {
  theme1: () => htmlElement.setAttribute("data-theme", "theme1"),
  theme2: () => htmlElement.setAttribute("data-theme", "theme2"),
  theme3: () => htmlElement.setAttribute("data-theme", "theme3"),
};

// If a theme is saved in localStorage
// apply that theme to the HTML element
// and check the corresponding radio button
if (savedTheme) {
  const activeRadio = radios.find(
    (radio) => radio.id === "radio" + savedTheme.slice(-1)
  );
  htmlElement.setAttribute("data-theme", savedTheme);
  activeRadio.checked = true;
} else {
  themeObj.theme1();
}

// apply the selected theme to the HTML element
// save the selected theme to localStorage
function setTheme(themeName) {
  themeObj[themeName]();
  localStorage.setItem("theme", themeName);
}

// Change the theme when a radio button is selected
function changeTheme(e) {
  const radio = e.target;
  console.log(radio.id);
  if (radio) {
    switch (radio.id) {
      case "radio2":
        setTheme("theme2");
        break;
      case "radio3":
        setTheme("theme3");
        break;
      default:
        setTheme("theme1");
    }
  }
}
radios.forEach((radio) => {
  radio.addEventListener("change", changeTheme);
});
