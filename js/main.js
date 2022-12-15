const links = document.querySelectorAll("a");
const example = document.querySelector("#example");
const code = document.querySelector("code");
const menuBtn = document.querySelector(".hbg-button");
const copyBtn = document.querySelector("#copybtn");
const codeContent = document.querySelector("code");

addEvents();

function addEvents() {
  links.forEach((link) => {
    link.addEventListener("click", buildExample);
  });
  menuBtn.addEventListener("click", toggleMenu);
  copyBtn.addEventListener("click", () => {
    copyToClipboard(codeContent);
  });
}

function buildExample(e) {
  e.preventDefault;
  console.log(e.target);

  // insert the parent content
  example.innerHTML = `
    <h2 class="section-content__title">Example using: ${e.target.textContent}</h2>
    <div class="parent">
        <p class="parent__title">parent</p>
        <div class="parent__child">child</div>
    </div>
  `;

  applyCode();

  function applyCode() {
    const parent = document.querySelector(".parent");
    const exampleChild = document.querySelector(".parent__child");

    switch (e.target.id) {
      case "auto":
        code.innerText = `/* Warning: only applied for horizontal marings */

        .parent {width: 100%;}
        \n
        .child {margin: 0 auto;}
            `;
        exampleChild.classList = "parent__child auto-center";
        break;

      case "abs":
        code.innerText = `.parent {position: relative;}
            \n
            .child {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
                `;
        exampleChild.classList = "parent__child abs-center";
        break;

      case "flex":
        code.innerText = `.parent {
                display: flex;
                justify-content: center;
                align-items: center;
            }
                `;

        parent.classList = "parent flex-center";
        break;

      case "grid":
        code.innerText = `
            .parent {
                display: grid;
                place-items: center;
            }
                `;
        parent.classList = "parent grid-center";
        break;

      default:
        code.innerText = "The Code here...";
        break;
    }
    toggleMenu();
  }
}

function toggleMenu() {
  const nav_lateral = document.querySelector(".nav__lateral");
  nav_lateral.classList.toggle("nav__lateral--open");
}

function copyToClipboard(elemento) {
  const inputHide = document.createElement("INPUT");
  inputHide.classList.add("input-hide");
  inputHide.setAttribute("value", elemento.innerText);

  document.body.appendChild(inputHide);
  inputHide.select();
  document.execCommand("copy");
  inputHide.remove();
  copyAlert();
}

function copyAlert() {
  const message = document.createElement("P");
  message.textContent = "Copied to Clipboard!";
  message.classList.add("message-alert", "message-alert--show");
  const main = document.querySelector("main");

  main.insertBefore(message, main.children[2]);
  console.log(main.children);
  setTimeout(() => {
    message.remove();
  }, 4000);
}
