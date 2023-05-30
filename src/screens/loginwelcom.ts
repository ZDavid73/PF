import "../components/export"
import { dispatch } from "../store";
import { getProducts } from "../store/actions";

export class alogin extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }

    async connectedCallback() {
        dispatch(await getProducts())
        this.render()
    }

    
    render() {
        const login = this.ownerDocument.createElement("app-login");
        this.shadowRoot?.appendChild(login);


        
    }
}

customElements.define("app-alogin", alogin)