import './scss/main.scss';
import { PointsCounter } from "./components/PointsCounter";
import { NextThree } from "./components/NextThree";
import { Board } from "./components/Board";
import {shortestPath} from "./algorithms/ShortestPath";
import {Colors} from "./enums/Colors";
import {query} from "./utils/domQuery";
import {randomNumber} from "./utils/random";
import {GraphNode} from "./components/GraphNode";
import {store} from "./store";


/**
 * Main class responsible for creating game, starting it and checking for endgame
 */
class Game {
    private pointsCounter: PointsCounter;
    private nextThree: NextThree;
    private board: Board;
    protected target: GraphNode | null;

    constructor() {
        this.pointsCounter = new PointsCounter();
        this.pointsCounter.mount(document.body);

        this.board = new Board();
        this.board.mount(document.body);
        this.board.generateBoardElement();

        this.nextThree = new NextThree();
        this.nextThree.mount(document.body);
    }

    private putBalls( balls: Array<Colors> ) {
        balls.forEach( ball => {
            let field = this.board.Graph[randomNumber(0,10)][randomNumber(0,10)];
            while (field.state !== Colors.EMPTY)
                field = this.board.Graph[randomNumber(0,10)][randomNumber(0,10)];

            // console.log(field.state == Colors.EMPTY)
            field.insertBall( ball )
        })
    }

    /**
     * Method that starts game
     */
    public start() {
        this.nextThree.drawNewBalls();
        this.putBalls( this.nextThree.state );
        this.nextThree.drawNewBalls();

        document.body.addEventListener('place-ball', ()=> {
            this.putBalls( this.nextThree.state );
            this.nextThree.drawNewBalls();
            this.checkIfEnd()
            this.board.captureBalls();
            // this.board.Graph.forEach( (row) => (row.forEach( node => (node.visited) && (node.visited = false) )))
            this.board.forEachNode( (node: GraphNode)=> {
                (node.visited) && (node.visited = false);
                (node.parentGraphNode) && (node.parentGraphNode = null);
                (node.distance > 0) && (node.distance = -1);
                (node.isStarting) && (node.isStarting = false);
            })

            this.board.forEachNode( (node: GraphNode)=> {
                if ( node.visited || node.state != Colors.EMPTY ) node.style.background="purple";
                (node.distance > 0 || node.visited || node.parentGraphNode) && (node.style.background="red")
            })
            localStorage.setItem("selected", "")
        })
        // shortestPath(this.board.Graph,this.board.Graph[0][0],this.board.Graph[7][4])
    }

    /**
     * Method that checks if game is over
     */
    public checkIfEnd() {
        let count:number = 0;
        this.board.Graph.forEach(arr => arr.forEach(
                (box: GraphNode)=> (box.state === Colors.EMPTY) && count++
            ))

        if ( count <= 0 ) alert( 'GAME OVER, YOU WON A CHANCE TOO START OVER AGAIN' )
    }

}
document.addEventListener('DOMContentLoaded', ()=>{
    localStorage.setItem("selected", "")
    const game: Game = new Game();
    game.start();
})

