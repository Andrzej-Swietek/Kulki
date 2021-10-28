import {GraphNode} from "../components/GraphNode";
import {Colors} from "../enums/Colors";

export const DFS =  (graph: Array<GraphNode[]>, startNode: GraphNode): GraphNode[] => {
    const toCapture: GraphNode[] = [ startNode ];
    DFSVisit( graph, startNode, toCapture );
    const result : GraphNode[] = doesVectorContainLine(graph, toCapture)? toCapture : [];
    console.log( result )
    return result
}

const DFSVisit = (graph: Array<GraphNode[]>, startNode: GraphNode, toCapture: GraphNode[]) => {
    let color: Colors = startNode.state;
    startNode.dfsVisited = true;
    console.log( startNode )
    // NEIGHBOURS
    //  LEFT / RIGHT  TOP / BOTTOM
    if ( startNode.x-1 >= 0 && !graph[ startNode.y ][ startNode.x-1 ].dfsVisited && startNode.x - 1  >= 0 && graph[ startNode.y ][ startNode.x-1 ].state == color ) {
        const node : GraphNode = graph[ startNode.y ][ startNode.x-1 ];

        toCapture.push( node );
        DFSVisit(graph, node, toCapture );
    }

    if (startNode.x+1 < 10 && !graph[ startNode.y ][ startNode.x+1 ].dfsVisited && startNode.x + 1  < 10 && graph[ startNode.y ][ startNode.x+1 ].state == color ) {
        const node : GraphNode = graph[ startNode.y ][ startNode.x+1 ]
        toCapture.push( node );

        DFSVisit(graph,  node, toCapture );
    }

    if (startNode.y - 1  >= 0 && !graph[ startNode.y-1 ][ startNode.x ].dfsVisited &&  graph[ startNode.y-1 ][ startNode.x ].state == color ) {
        const node : GraphNode = graph[ startNode.y-1 ][ startNode.x ]
        toCapture.push( node );

        DFSVisit(graph,  node, toCapture );
    }

    if (startNode.y + 1  < 10 && !graph[ startNode.y+1 ][ startNode.x ].dfsVisited &&  graph[ startNode.y+1 ][ startNode.x ].state == color ) {
        const node : GraphNode = graph[ startNode.y+1 ][ startNode.x ]
        toCapture.push( node );

        DFSVisit(graph,  node, toCapture );
    }

    // TOP LEFT / TOP RIGHT / BOTTOM LEFT / BOTTOM RIGHT
    if (startNode.x - 1  >= 0 && startNode.y - 1  >= 0 && !graph[ startNode.y-1 ][ startNode.x-1 ].dfsVisited &&  graph[ startNode.y-1 ][ startNode.x-1 ].state == color ) {
        const node : GraphNode = graph[ startNode.y-1 ][ startNode.x-1 ]
        toCapture.push( node );

        DFSVisit(graph,  node, toCapture );
    }

    if (startNode.x + 1  < 10 && startNode.y - 1  >= 0 && !graph[ startNode.y-1 ][ startNode.x+1 ].dfsVisited &&  graph[ startNode.y-1 ][ startNode.x+1 ].state == color ) {
        const node : GraphNode = graph[ startNode.y-1 ][ startNode.x+1 ]
        toCapture.push( node );

        DFSVisit(graph, node, toCapture );
    }

    if (startNode.x + 1  < 10 && startNode.y + 1  < 10 && !graph[ startNode.y+1 ][ startNode.x+1 ].dfsVisited &&  graph[ startNode.y+1 ][ startNode.x+1 ].state == color ) {
        const node : GraphNode = graph[ startNode.y+1 ][ startNode.x+1 ]
        toCapture.push( node );

        DFSVisit(graph, node, toCapture );
    }

    if (startNode.x - 1  >= 0 && startNode.y + 1  < 10 && !graph[ startNode.y+1 ][ startNode.x-1 ].dfsVisited && graph[ startNode.y+1 ][ startNode.x-1 ].state == color ) {
        const node : GraphNode = graph[ startNode.y+1 ][ startNode.x-1 ]
        toCapture.push( node );

        DFSVisit(graph, node, toCapture );
    }

}

const doesVectorContainLine = (graph: Array<GraphNode[]> ,vector: GraphNode[] ):boolean => {
    let valid = false;
    // HORIZONTAL
    vector.forEach( node=>  ( node.x-1 >= 0 && node.x+1 < 10 && graph[node.y][node.x-1]?.dfsVisited && graph[node.y][node.x+1]?.dfsVisited && node?.dfsVisited ) && (valid = true)  );
    // VERTICAL
    vector.forEach( node=>  ( node.y-1 >= 0 && node.y+1 < 10 && graph[node.y-1][node.x]?.dfsVisited && graph[node.y+1][node.x]?.dfsVisited && node?.dfsVisited ) && (valid = true)  );
    // LEFT CROSS
    vector.forEach( node=>  ( node.x-1 >= 0 && node.y-1 >= 0 && node.x+1 < 10 && node.y+1 < 10 && graph[node.y-1][node.x-1]?.dfsVisited && graph[node.y+1][node.x+1]?.dfsVisited && node?.dfsVisited ) && (valid = true)  );
    // RIGHT CROSS
    vector.forEach( node=>  ( node.x-1 >= 0 && node.y-1 >= 0 && node.x+1 < 10 && node.y+1 < 10 &&  graph[node.y-1][node.x+1]?.dfsVisited && graph[node.y+1][node.x-1]?.dfsVisited && node?.dfsVisited ) && (valid = true)  );

    return valid;
}
