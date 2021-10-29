import { UIComponent } from "../decorators/UIComponent";
import { HTMLComponent } from "../HTMLComponent";
import {create, query} from "../utils/domQuery";

@UIComponent({
    selector: 'component-popup',
    template: `<div></div>`,
    style: ``,
    // useShadow: true
})
export default class Popup extends HTMLComponent {
    constructor(score: string|number) {
        super();
        const contentDiv: HTMLElement = create`div${'popupContent'}`;
        contentDiv.innerHTML = `
            <h1 class="gameoverText"> GAME OVER </h1>
            <h2> YOU WON ... A CHANCE TO START OVER AGAIN !!! </h2> 
            <h1 class="scorePointsPoopup"> YOUR POINTS: ${ score } </h1>
        `
        this.onclick = () => {
            location.reload();
        }
        this.append(contentDiv);
    }
}
