import {UIComponent} from "../decorators/UIComponent";
import {Colors} from "../enums/Colors";
import {HTMLComponent} from "../HTMLComponent";
import {store} from "../store";
import {shortestPath} from "../algorithms/ShortestPath";
import {Board} from "./Board";
import {create, query, queryAll} from "../utils/domQuery";

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
            this.parentNode.querySelectorAll('.ball')
                .forEach( (field:GraphNode) => (field.classList.contains('path')) && field.classList.remove('path'));

            if ( store.target ){
                const board: Board = query`component-board` as Board;
                shortestPath( board.Graph, store.target, this )
            }

        }
        this.onmouseleave = () => {
            document.querySelectorAll('.path')
                .forEach( (field:GraphNode) => (field.classList.contains('path')) && field.classList.remove('path'));
        }

        this.onclick = () => {
            console.log('click', store.target);
            if ( this === store.target) store.target = null
            else if (this.state != Colors.EMPTY) store.target = this;
            else {
                type ColorsString = keyof typeof Colors;
                const x: Colors | undefined =  store.target?.state
                console.log( Colors[Colors[x]], store.target?.state )
                this.insertBall( Colors[Colors[x]] );
                store.target.emptyNode();
                store.target = null;
                document.querySelectorAll('.path')
                    .forEach( (field:GraphNode) => (field.classList.contains('path')) && field.classList.remove('path'));

            }
        }
    }

    emptyNode() {
        this.state = Colors.EMPTY;
        this.removeChild(this.querySelector('.ball'))
        this.append( create`div${'ball'}` )
    }

    insertBall(color: Colors) {
        console.log(color)
        this.state = color;
        this.children[0].classList.add( color.toString() )
    }
    colorField() {
        this.classList.add('path');
    }
    visit(){
        this.visited = true;
    }

}
