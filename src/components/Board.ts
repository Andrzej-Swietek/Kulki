import { UIComponent } from "../decorators/UIComponent";
import { HTMLComponent } from "../HTMLComponent";
import {create, query} from "../utils/domQuery";
import { GraphNode } from "./GraphNode";
import { Colors } from "../enums/Colors";
import {Required} from "../decorators/Required";
import {Stack} from "../Types/Stack";
import {PointsCounter} from "./PointsCounter";

/**
 * Class that represents Game board
 * @decorator `@UIComponent`
 */

@UIComponent({
    selector: 'component-board',
    template: `
                 <div id="mainGrid"></div>
              `,
    style: `#mainGrid { background: rgba(255,255,255,.4); }`,
    // useShadow: true
})
export class Board extends HTMLComponent{

    public Graph : Array<GraphNode[]> = []

    /**
     * Method that generates all board elements
     */
    public generateBoardElement(): void {
        for (let i = 0; i < 10; i++) {

            const list: GraphNode[] = [];
            for (let j = 0; j < 10; j++) {
                const node = new GraphNode(j,i, Colors.EMPTY)
                node.id = ((i)+"-"+(j)).toString()
                document.querySelector('#mainGrid').appendChild(node)
                list.push(node);
            }
            this.Graph.push(list);
        }
    }

    public forEachNode(callback):void {
        this.Graph.forEach( (row) => (row.forEach( node => callback(node) )))
    }

    /**
     * Function that captures balls in row
     * 1st step: 3 in row or in column of the same color
     * 2nd step: go forward till empty field or different color
     * 3rd step: Recursivly up and down or left and right
     */
    public captureBalls() {
        console.log("%c ZBIJANKO", 'color: red')
        const requiredToCapture:number = 3;
        // const stackToCapture = new Stack<GraphNode>();
        //
        // const capture = ( x:number, y:number, color: Colors, counter:number, direction: 'H'|'V' ) => {
        //     if ( x > 9 || y > 9 ) return;
        //     // const node = this.Graph[y][x] as GraphNode;
        //     // console.log(counter, node)
        //     // if ( node.state == Colors.EMPTY ) return false;
        //     // if( node.state != color && counter > requiredToCapture) return true;
        //     // else if (node.state != color && counter >= requiredToCapture) return false;
        //     // else if (node.state == color)  {
        //     //     stackToCapture.push(node);
        //     //     if (direction == 'V') capture( x,y+1, color, counter+1, 'V'  )
        //     //     if (direction == 'H') capture( x+1,y, color, counter+1, 'H'  )
        //     // }
        //     let arr = []
        //     let isNBallsValid: boolean = true;
        //     let parameter:number = (direction=='H')? x : y;
        //     for ( let i = parameter ; (i < parameter + requiredToCapture && i <= 9); i++ ){
        //         const node = (direction == 'H')? this.Graph[y][i] as GraphNode : this.Graph[i][x] as GraphNode;
        //         if ( node.state != color || node.state == Colors.EMPTY ) { isNBallsValid = false; break; }
        //         else arr.push(node)
        //     }
        //
        //     (arr.length > 1) && console.log(x,y,isNBallsValid, arr);
        //     const pointCounter = (query`component-points-counter` as PointsCounter);
        //     (arr.length >= 3 ) && (pointCounter.updatePoints(pointCounter.numPoints+arr.length));
        //     (arr.length >= 3 ) && arr.forEach( (node: GraphNode) => node.emptyNode())
        //
        //
        // }
        //
        // this.Graph.forEach( (col,y)=> {
        //     col.forEach( (node,x) => { capture(x,y, node.state ,0,'V');capture(x,y, node.state ,0,'H'); } )
        //     // while ( stackToCapture.size() ) {
        //         // stackToCapture.pop()
        //     // }
        // })
        // // capture(0,0, (this.Graph[0][0] as GraphNode).state ,0,'V')
        // // w petli wywołuje i czyszcze stosik
        // console.log( stackToCapture )

        
    }
}
