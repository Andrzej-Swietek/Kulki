import {UIComponent} from "../decorators/UIComponent";
import {Colors} from "../enums/Colors";
import {HTMLComponent} from "../HTMLComponent";
import {setStore, store} from "../store";
import {shortestPath} from "../algorithms/ShortestPath";
import {Board} from "./Board";
import {create, query, queryAll} from "../utils/domQuery";
import {placeEvent} from "../Events";
import {DFS} from "../algorithms/DFS";

/**
 * Class that represents a single tile on a board, which is equivalent to a Graph Node In Path finding Algorithm
 * @decorator `@UIComponent`
 */
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

    public dfsVisited: boolean = false;

    /**
     * Initialise Graph Node values and add event listeners for click, mouseover and mouse leave
     * @constructor
     * @param x: number - Node x position
     * @param y: number - Node Y position
     * @param state: Color - Node color/Empty
     */
    constructor(x, y,state) {
        super();
        this.x = x;
        this.y = y;
        this.state = state;

        this.onmouseover = async () => {

            this.parentNode.querySelectorAll('.ball')
                .forEach( (field:GraphNode) => (field.classList.contains('path')) && field.unvisit());
                // .forEach( (field:GraphNode) => (field.classList.contains('path')) && field.classList.remove('path'));

            if ( localStorage.getItem("selected") != "" ){
                const board: Board = query`component-board` as Board;
                shortestPath( board.Graph, document.getElementById(localStorage.getItem("selected")) as GraphNode, this )
            }

        }
        this.onmouseleave = () => {

            document.querySelectorAll('.path')
                .forEach( (field:GraphNode) => (field.classList.contains('path')) && field.unvisit());

        }

        this.onclick = async () => {
            console.log('click', store.target);
            const startPoint: GraphNode | null = (document.getElementById(localStorage.getItem("selected")) as GraphNode)
            if (this === startPoint) {
                this.isStarting = false
                // store.target = null
                setStore(null)
            } else if (this.state != Colors.EMPTY) {
                // store.target = this;
                setStore(this)
                this.isStarting = true
                console.log('after click', store.target);
            } else {
                // if ( localStorage.getItem("selected")!="" ){
                type ColorsString = keyof typeof Colors;
                // const x: Colors | undefined =  store.target?.state
                const x = (document.getElementById(localStorage.getItem("selected")) as GraphNode)?.state;

                if ( x ) {
                    this.insertBall(Colors[Colors[x]]);

                    (document.getElementById(localStorage.getItem("selected")) as GraphNode).emptyNode();
                    setStore(null);
                    GraphNode.markPathForGranted();
                    let oldOnMouseOver = this.onmouseover;
                    this.onmouseover = () => {};
                    await setTimeout(() => this.onmouseover = oldOnMouseOver, 1000)
                    document.querySelectorAll('.path')
                        .forEach((field: GraphNode) => (field.classList.contains('path')) && field.unvisit());


                    // ZBIJAM
                    const board: Board = query`component-board` as Board;
                    const toCapture: GraphNode[] = DFS(board.Graph, this);
                    console.log( toCapture )
                    toCapture.forEach( node => node.style.background = 'yellow' )
                    document.body.dispatchEvent(placeEvent)
                }




                // }
            }
        }
    }

    /**
     * Function that leaves the mark of the shortest path for given time and then removes it
     * @static
     */
    static markPathForGranted(){
        document.querySelectorAll<GraphNode>('.path').forEach( item => item.classList.add('path2'))
        setTimeout( () => {
            document.querySelectorAll<GraphNode>('.path2').forEach( item => item.classList.remove('path2'))
        },800 )
    }

    /**
     * Method that resets all values ( classList, child, state, visited, parentGraphNode, distance )  of node
     */
    emptyNode() {
        this.state = Colors.EMPTY;
        this.removeChild(this.querySelector('.ball'))
        this.append( create`div${'ball'}` )
        this.visited = false;
        this.classList.remove('path');
        this.parentGraphNode = null;
        this.distance = -1;
    }

    /**
     * Method responsible for inserting ball to the field action
     * @param color - Color of inserted ball
     */
    insertBall(color: Colors) {
        // console.log(color)
        this.state = color;
        this.children[0].classList.add( color.toString() )
    }

    /**
     * Method ment for adding selected graph node to the shortest path by adding visual ".path" class to graph node class list
     */
    colorField() {
        this.classList.add('path');
    }

    /**
     * Method that finds usage in shortest path algorithm - marks the node as already visited
     */
    visit(){
        this.visited = true;
    }

    /**
     * Method that purpose is cleaning shortest path from graph nodes along with all values like distance parent node
     */
    unvisit() {
        this.visited = false;
        this.classList.remove('path');
        this.parentGraphNode = null;
        this.distance = -1;
        // this.state = Colors.EMPTY;
    }

}
