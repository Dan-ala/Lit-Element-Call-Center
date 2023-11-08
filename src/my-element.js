import { LitElement, html } from "lit-element";

export class MyElement extends LitElement{
    constructor(){
        super()
        this.message='Hello World'
    }

    static get properties(){
        return{
            message: {
                type: String
            }
        }
    }

    render(){
        return html
        `<p>${this.message}</p>`;
    }
}

customElements.define('my-element',MyElement);