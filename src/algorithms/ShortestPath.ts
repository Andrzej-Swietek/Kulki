import {GraphNode} from "../components/GraphNode";
import {Queue} from "../Types/Queue";
import {Colors} from "../enums/Colors";

/**
 * Function that finds the shortest path in between 2 points in the graph
 * @param graph
 * @param startPoint
 * @param endPoint
 * @example
 * ```ts
 * // Shortest Path from point (0,0) to (4,7)
 * shortestPath(this.board.Graph,this.board.Graph[0][0],this.board.Graph[7][4])
 * ```
 */
export const shortestPath = (graph: Array<GraphNode[]>, startPoint: GraphNode, endPoint: GraphNode) => {
    BFS(graph, startPoint, endPoint);
    let V: GraphNode = endPoint;
    while (V != startPoint) {
        if (V == null) break;
        V.colorField();
        V = V.parentGraphNode;
    }
    startPoint.colorField()
    // graph.forEach( row=> row.forEach( node => node.unvisit() ) )
}

/**
 * BFS Algorithm
 * @param graph - Graph in 2D Array form
 * @param startPoint - Point in the graph where BFS starts from
 * @param endPoint - Point in the graph where BFS is trying to get to
 * @constructor
 */
const BFS = (graph: Array<GraphNode[]>, startPoint: GraphNode, endPoint: GraphNode) => {
    const Q = new Queue<GraphNode>();
    Q.push( startPoint );
    startPoint.distance = 0;
    startPoint.visit();
    while (!Q.empty()) {
        const u: GraphNode = Q.pop();
        if ( u.x - 1  >= 0 && !graph[ u.y ][ u.x -1 ].visited && graph[ u.y ][ u.x -1].state == Colors.EMPTY){
            /**
             * LEFT NEIGHBOUR
             */
            const V = graph[ u.y ][ u.x -1 ];
            V.distance = u.distance+1;
            Q.push( V );
            V.parentGraphNode = u;
            V.visit();
            // V.style.background = "tomato";
            if (V.x == endPoint.x && V.y == endPoint.y ) {
                // startPoint.unvisit();
                // break;
            };
        }
        if ( u.x + 1  < 10 && !graph[ u.y ][ u.x + 1 ].visited && graph[ u.y ][ u.x +1 ].state == Colors.EMPTY){
            /**
             * RIGHT NEIGHBOUR
             */
            const V = graph[ u.y ][ u.x + 1 ];
            V.distance = u.distance+1;
            Q.push( V );
            V.parentGraphNode = u;
            V.visit();
            // V.style.background = "tomato";
            if (V.x == endPoint.x && V.y == endPoint.y ) {
                // startPoint.unvisit();
                // break;
            };
        }
        if ( u.y - 1  >= 0 && !graph[ u.y -1][ u.x ].visited && graph[ u.y -1 ][ u.x ].state == Colors.EMPTY){
            /**
             * LOWER NEIGHBOUR
             */
            const V = graph[ u.y -1][ u.x ];
            V.distance = u.distance+1;
            Q.push( V );
            V.parentGraphNode = u;
            V.visit();
            // V.style.background = "tomato";
            if (V.x == endPoint.x && V.y == endPoint.y ) {
                // startPoint.unvisit();
                // break;
            };
        }
        if ( u.y + 1 < 10 && !graph[ u.y +1][ u.x ].visited && graph[ u.y +1 ][ u.x ].state == Colors.EMPTY){
            /**
             * TOP NEIGHBOUR
             */
            const V = graph[ u.y +1][ u.x ];
            V.distance = u.distance+1;
            Q.push( V );
            V.parentGraphNode = u;
            V.visit();
            // V.style.background = "tomato";
            if (V.x == endPoint.x && V.y == endPoint.y ) {
                // startPoint.unvisit();
                // break;
            };
        }

    }

}
