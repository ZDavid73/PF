import "../components/export"
import { dispatch } from "../store";
import { getProducts } from "../store/actions";

export class Appfoodlist extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }

    async connectedCallback() {
        dispatch(await getProducts())
        this.render()
    }

    
    render() {
        const AppForm = this.ownerDocument.createElement("app-form");
        const Appproductslist = this.ownerDocument.createElement("app-productlist");
        this.shadowRoot?.appendChild(AppForm);
        this.shadowRoot?.appendChild(Appproductslist);

        
    }
}

customElements.define("app-foodlist", Appfoodlist)