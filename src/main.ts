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

            console.log(field.state == Colors.EMPTY)
            field.insertBall( ball )
        })
    }
    public start() {
        this.nextThree.drawNewBalls();
        this.putBalls( this.nextThree.state );
        this.nextThree.drawNewBalls();

        document.body.addEventListener('place-ball', ()=> {
            this.putBalls( this.nextThree.state );
            this.nextThree.drawNewBalls();
            this.checkIfEnd()
            this.board.captureBalls();
        })
        // shortestPath(this.board.Graph,this.board.Graph[0][0],this.board.Graph[7][4])
    }

    public checkIfEnd() {
        let count:number = 0;
        this.board.Graph.forEach(
            arr => arr.forEach(
                (box: GraphNode)=> (box.state === Colors.EMPTY) && count++
            ))

        if ( count <= 0 ) alert( 'GAME OVER' )
    }

}
document.addEventListener('DOMContentLoaded', ()=>{
    localStorage.setItem("selected", "")
    const game: Game = new Game();
    game.start();
})



