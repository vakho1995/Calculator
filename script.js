function theme() {
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
}
theme();

// ////////set up calculator logic
/**
 *
 *
 *
 *
 */

const numberBtns = [...document.querySelectorAll(".number")];
const display = document.querySelector(".display");
const operatorBtns = [...document.querySelectorAll(".operator")];
const equal = document.querySelector(".equal");
const reset = document.querySelector(".reset");
const deleteBtn = document.querySelector(".del");
// object for math operacions
const operationObj = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  x: (x, y) => x * y,
  "/": (x, y) => x / y,
};
// set up temporary vatiable
let firstNumber = "";
let operator = "";
let secondNumber = "";
let isSecondNumber = false;

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!isSecondNumber) {
      firstNumber += btn.innerText;
      displayFormat(firstNumber);
    } else {
      secondNumber += btn.innerText;
      displayFormat(secondNumber);
    }
  });
});

deleteBtn.addEventListener("click", () => {
  if (!isSecondNumber) {
    firstNumber = firstNumber.slice(0, -1);
    displayFormat(firstNumber);
  } else {
    secondNumber = secondNumber.slice(0, -1);
    displayFormat(secondNumber);
  }
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    operator = btn.innerText;
    isSecondNumber = true;
  });
});

equal.addEventListener("click", () => {
  if (firstNumber && secondNumber && operator) {
    const x = Number(firstNumber);
    const y = Number(secondNumber);
    const result = operationObj[operator](x, y);
    displayFormat(result);
    /// for chining
    firstNumber = result.toString();
    secondNumber = "";
    operator = "";
    isSecondNumber = false;
  }
});
// reset calculator.
reset.addEventListener("click", () => {
  display.textContent = "";
  firstNumber = "";
  secondNumber = "";
  operator = "";
  isSecondNumber = false;
});
// "The more digits the number has, the smaller the font size becomes."
function displayFormat(input) {
  const displayContent = input.toString();
  if (displayContent.length < 10) {
    display.style.fontSize = "40px";
  } else {
    switch (displayContent.length) {
      case 10:
        display.style.fontSize = "30px";
        break;
      case 15:
        display.style.fontSize = "20px";
        break;
      case 20:
        display.style.fontSize = "15px";
        break;
    }
  }
  display.textContent = displayContent;
}
