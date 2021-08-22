import {UIComponent} from "../decorators/UIComponent";
import {Colors} from "../enums/Colors";
import {HTMLComponent} from "../HTMLComponent";

@UIComponent({
    selector: `graph-node`,
    template: ` <div class="ball"></div>  `,
})
export class GraphNode extends HTMLComponent{
    public state: Colors;
    public x: number;
    public y: number;
    public visited: Boolean = false;
    public parentGraphNode : GraphNode | null = null;
    public distance: number = -1;

    constructor(x, y,state) {
        super();
        this.x = x;
        this.y = y;
        this.state = state;

        this.onmouseover = () => {

        }
        this.onmouseleave = () => {

        }
    }

    emptyNode() {
        this.state = Colors.EMPTY;
    }

    insertBall(color: Colors) {
        this.state = color;
    }
    colorField() {
        this.style.background = `rgba(44,253,97,.7)`
    }
    visit(){
        this.visited = true;
    }

}
