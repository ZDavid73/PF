import { addObserver, appState } from "../../store";
import lists from "./list.css";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export class Appproductslist extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  connectedCallback() {
    this.render();
    this.fetchData();
  }

  async fetchData() {
    const firebaseConfig = {
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    try {
      const q = query(collection(db, "products"), orderBy("date", "desc")); 
      const querySnapshot = await onSnapshot(q, (snapshot) => {
        const products: any = [];
        snapshot.forEach((doc) => {
          const product = doc.data();
          products.push(product);
        });
        appState.products = products;
        this.render();
      });
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

  handleLike(product: any) {
    console.log("Like:", product);
  }

  handleDislike(product:any) {
    console.log("No like:", product);
  }

  render() {
    if (this.shadowRoot) this.shadowRoot.innerHTML = "";

    appState.products.forEach((product) => {
      const pcontainer = this.ownerDocument.createElement("article");
      const pcontainertitle = this.ownerDocument.createElement("h3");
      pcontainertitle.textContent = product.namefood;

      const pcontainerprice = this.ownerDocument.createElement("h4");
      pcontainerprice.textContent = product.price;

      const pcontainerdate = this.ownerDocument.createElement("p");

      const pcontainerigrfood = this.ownerDocument.createElement("h5");
      pcontainerigrfood.textContent = product.igrfood;

      const pcontainerfoodlist = this.ownerDocument.createElement("h6");
      pcontainerfoodlist.textContent = product.foodlist;

      const date = new Date(product.date);
      const dateString = date.toDateString();
      const timeString = date.toLocaleTimeString();

      pcontainerdate.textContent = `${dateString} ${timeString}`;

      const likeButton = this.ownerDocument.createElement("button");
      likeButton.textContent = "like";
      likeButton.addEventListener("click", () => this.handleLike(product));

      const dislikeButton = this.ownerDocument.createElement("button");
      dislikeButton.textContent = "No like";
      dislikeButton.addEventListener("click", () => this.handleDislike(product));

      pcontainer?.appendChild(pcontainertitle);
      pcontainer?.appendChild(pcontainerigrfood);
      pcontainer?.appendChild(pcontainerfoodlist);
      pcontainer?.appendChild(pcontainerprice);
      pcontainer?.appendChild(pcontainerdate);
      pcontainer?.appendChild(likeButton);
      pcontainer?.appendChild(dislikeButton);
      this.shadowRoot?.appendChild(pcontainer);
    });

    const css = this.ownerDocument.createElement("style");
    css.innerHTML = lists;
    this.shadowRoot?.appendChild(css);
  }
}

customElements.define("app-productlist", Appproductslist);
