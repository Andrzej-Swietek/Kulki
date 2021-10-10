import {UIComponent} from "../decorators/UIComponent";
import {Colors} from "../enums/Colors";
import {HTMLComponent} from "../HTMLComponent";
import {setStore, store} from "../store";
import {shortestPath} from "../algorithms/ShortestPath";
import {Board} from "./Board";
import {create, query, queryAll} from "../utils/domQuery";
import {placeEvent} from "../Events";

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
    public isStarting: boolean = false;
    constructor(x, y,state) {
        super();
        this.x = x;
        this.y = y;
        this.state = state;

        this.onmouseover = () => {
            this.parentNode.querySelectorAll('.ball')
                .forEach( (field:GraphNode) => (field.classList.contains('path')) && field.unvisit());
                // .forEach( (field:GraphNode) => (field.classList.contains('path')) && field.classList.remove('path'));

            // if ( store.target ){
            if ( localStorage.getItem("selected") != "" ){
                const board: Board = query`component-board` as Board;
                shortestPath( board.Graph, document.getElementById(localStorage.getItem("selected")) as GraphNode, this )
                // shortestPath( board.Graph, store.target, this )
            }

        }
        this.onmouseleave = () => {
            document.querySelectorAll('.path')
                .forEach( (field:GraphNode) => (field.classList.contains('path')) && field.unvisit());
                // .forEach( (field:GraphNode) => (field.classList.contains('path')) && field.classList.remove('path'));
        }

        this.onclick = () => {
            console.log('click', store.target);
            const startPoint: GraphNode|null = (document.getElementById(localStorage.getItem("selected")) as GraphNode)
            if ( this === startPoint) {
                this.isStarting = false
                // store.target = null
                setStore(null)
            }
            else if (this.state != Colors.EMPTY) {
                // store.target = this;
                setStore(this)
                this.isStarting = true
                console.log('after click', store.target);
            }

            else {
                // if ( localStorage.getItem("selected")!="" ){
                    type ColorsString = keyof typeof Colors;
                    // const x: Colors | undefined =  store.target?.state
                    const x = (document.getElementById(localStorage.getItem("selected")) as GraphNode).state;
                    console.log( Colors[Colors[x]], store.target?.state );

                    this.insertBall( Colors[Colors[x]] );
                    // store.target.emptyNode();
                    // store.target = null;
                    (document.getElementById(localStorage.getItem("selected")) as GraphNode ).emptyNode();
                    setStore(null);

                    document.querySelectorAll('.path')
                        .forEach( (field:GraphNode) => (field.classList.contains('path')) && field.unvisit());

                    document.body.dispatchEvent(placeEvent)
                // }
            }
        }
    }

    emptyNode() {
        this.state = Colors.EMPTY;
        this.removeChild(this.querySelector('.ball'))
        this.append( create`div${'ball'}` )
        this.visited = false;
        this.classList.remove('path');
        this.parentGraphNode = null;
        this.distance = -1;
    }

    insertBall(color: Colors) {
        // console.log(color)
        this.state = color;
        this.children[0].classList.add( color.toString() )
    }
    colorField() {
        this.classList.add('path');
    }
    visit(){
        this.visited = true;
    }
    unvisit() {
        this.visited = false;
        this.classList.remove('path');
        this.parentGraphNode = null;
        this.distance = -1;

        console.log('x')
    }

}
