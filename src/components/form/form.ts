import { dispatch } from "../../store";
import { saveProduct } from "../../store/actions";
import { Product } from "../../types/products";
import appformstyles from "./form.css";

const UserInputs: Product = {
    namefood: "",
    igrfood: "",
    foodlist: "",
    id: "",
    date: "",
    price: "",
}

export class AppForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const labelnamefood = this.ownerDocument.createElement("label");
    labelnamefood.textContent = "Name";
    const namefood = this.ownerDocument.createElement("input");
    namefood.type = "text";
    namefood.addEventListener("change", (e: any) => {
      UserInputs.namefood = e.target.value;
    });

    const labeligrfood = this.ownerDocument.createElement("label");
    labeligrfood.textContent = "ingredientes";
    const igrfood = this.ownerDocument.createElement("input");
    igrfood.type = "text";
    igrfood.addEventListener("change", (e: any) => {
      UserInputs.igrfood = e.target.value;
    });

    const labelfoodlist = this.ownerDocument.createElement("label");
    labelfoodlist.textContent = "proceso";
    const foodlist = this.ownerDocument.createElement("input");
    foodlist.type = "text";
    foodlist.addEventListener("change", (e: any) => {
      UserInputs.foodlist = e.target.value;
    });

    const labelprice = this.ownerDocument.createElement("label");
    labelprice.textContent = "Precio del platillo";
    const price = this.ownerDocument.createElement("input");
    price.type = "number";
    price.addEventListener("change", (e: any) => {
      UserInputs.price = e.target.value;
    });

    const button = this.ownerDocument.createElement("button");
    button.textContent = "Save";
    button.addEventListener("click", async () => {
      const currentDate = new Date();
      const UserInputs: Product = {
        namefood: namefood.value,
        igrfood: igrfood.value,
        foodlist: foodlist.value,
        id: "",
        price: price.value,
        date: currentDate.toLocaleString(), 
      };
      console.log(UserInputs);
      dispatch(await saveProduct(UserInputs));
    });

    this.shadowRoot?.appendChild(labelnamefood);
    this.shadowRoot?.appendChild(namefood);
    this.shadowRoot?.appendChild(labeligrfood);
    this.shadowRoot?.appendChild(igrfood);
    this.shadowRoot?.appendChild(labelfoodlist);
    this.shadowRoot?.appendChild(foodlist);
    this.shadowRoot?.appendChild(labelprice);
    this.shadowRoot?.appendChild(price);
    this.shadowRoot?.appendChild(button);

    const css = this.ownerDocument.createElement("style");
    css.innerHTML = appformstyles;
    this.shadowRoot?.appendChild(css);
  }
}

customElements.define("app-form", AppForm);

