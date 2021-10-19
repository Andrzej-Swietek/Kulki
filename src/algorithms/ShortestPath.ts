import {GraphNode} from "../components/GraphNode";
import {Queue} from "../Types/Queue";
import {Colors} from "../enums/Colors";

export const shortestPath = (graph: Array<GraphNode[]>, startPoint: GraphNode, endPoint: GraphNode) => {
    BFS(graph, startPoint, endPoint);
    let V: GraphNode = endPoint;
    while (V != startPoint) {
        if (V == null) break;
        V.colorField();
        V = V.parentGraphNode;
    }
    startPoint.colorField()
}
const BFS = (graph: Array<GraphNode[]>, startPoint: GraphNode, endPoint: GraphNode) => {
    const Q = new Queue<GraphNode>();
    Q.push( startPoint );
    startPoint.distance = 0;
    startPoint.visit()
    while (!Q.empty()) {
        const u: GraphNode = Q.pop();
        if ( u.x - 1  >= 0 && !graph[ u.y ][ u.x -1 ].visited && graph[ u.y ][ u.x -1].state == Colors.EMPTY){
            const V = graph[ u.y ][ u.x -1 ];
            V.distance = u.distance+1;
            Q.push( V )
            V.parentGraphNode = u;
            V.visit()
            if (V.x == endPoint.x && V.y == endPoint.y ) break;
        }
        if ( u.x + 1  < 10 && !graph[ u.y ][ u.x + 1 ].visited && graph[ u.y ][ u.x +1 ].state == Colors.EMPTY){
            const V = graph[ u.y ][ u.x + 1 ];
            V.distance = u.distance+1;
            Q.push( V )
            V.parentGraphNode = u;
            V.visit()
            if (V.x == endPoint.x && V.y == endPoint.y ) break;
        }
        if ( u.y - 1  >= 0 && !graph[ u.y -1][ u.x ].visited && graph[ u.y -1 ][ u.x ].state == Colors.EMPTY){
            const V = graph[ u.y -1][ u.x ];
            V.distance = u.distance+1;
            Q.push( V )
            V.parentGraphNode = u;
            V.visit()
            if (V.x == endPoint.x && V.y == endPoint.y ) break;
        }
        if ( u.y + 1 < 10 && !graph[ u.y +1][ u.x ].visited && graph[ u.y +1 ][ u.x ].state == Colors.EMPTY){
            const V = graph[ u.y +1][ u.x ];
            V.distance = u.distance+1;
            Q.push( V )
            V.parentGraphNode = u;
            V.visit()
            if (V.x == endPoint.x && V.y == endPoint.y ) break;
        }

    }

}
