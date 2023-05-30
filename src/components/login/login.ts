import Firebase from "../../utils/firebase";
import logins from "./login.css";


const credentials = { email: "", password: "" };

export class login extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  async handleLoginButton() {
    Firebase.loginUser(credentials);
  }

  render() {
    const title = this.ownerDocument.createElement("h1");
    title.innerText = "Hola a recetas.com";
    this.shadowRoot?.appendChild(title);

    const email = this.ownerDocument.createElement("input");
    email.placeholder = "email";
    email.type = "email";
    email.addEventListener(
      "change",
      (e: any) => (credentials.email = e.target.value)
    );
    this.shadowRoot?.appendChild(email);

    const password = this.ownerDocument.createElement("input");
    password.placeholder = "*********";
    password.type = "password";
    password.addEventListener(
      "change",
      (e: any) => (credentials.password = e.target.value)
    );
    this.shadowRoot?.appendChild(password);

    const loginBtn = this.ownerDocument.createElement("button");
    loginBtn.innerText = "login";
    loginBtn.addEventListener("click", this.handleLoginButton);
    this.shadowRoot?.appendChild(loginBtn);

    const css = this.ownerDocument.createElement("style");
    css.innerHTML = logins
    this.shadowRoot?.appendChild(css);
  }
}

customElements.define("app-login", login);
