import "./screens/export"
import "./components/export"
import { dispatch } from "./store";
import { getProducts } from "./store/actions";


class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }

    async connectedCallback() {
        dispatch(await getProducts())
        this.render()
    }

    
    render() {

        const Appfoodlist = this.ownerDocument.createElement("app-foodlist");
        this.shadowRoot?.appendChild(Appfoodlist);

        
    }
}

customElements.define('app-container', AppContainer)