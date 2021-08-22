import './scss/main.scss';
import { PointsCounter } from "./components/PointsCounter";
import { NextThree } from "./components/NextThree";
import { Board } from "./components/Board";
import {query, queryAll} from "./utils/domQuery";
import {GraphNode} from "./components/GraphNode";
import {shortestPath} from "./algorithms/ShortestPath";
import {Colors} from "./enums/Colors";



class Game {
    private pointsCounter: PointsCounter;
    private nextThree: NextThree;
    private board: Board;

    constructor() {
        this.pointsCounter = new PointsCounter();
        this.pointsCounter.mount(document.body);

        this.board = new Board();
        this.board.mount(document.body);
        this.board.generateBoardElement();

        this.nextThree = new NextThree();
        this.nextThree.mount(document.body);
    }

    public start() {
        console.log(this.nextThree.state);
        this.nextThree.drawNewBalls();
        this.board.Graph[2][0].state = Colors.RED;
        this.board.Graph[2][1].state = Colors.RED;
        this.board.Graph[2][2].state = Colors.RED;
        this.board.Graph[4][2].state = Colors.RED;
        this.board.Graph[5][3].state = Colors.RED;
        this.board.Graph[7][2].state = Colors.RED;
        shortestPath(this.board.Graph,this.board.Graph[1][9], this.board.Graph[8][1] )


    }

}
document.addEventListener('DOMContentLoaded', ()=>{
    const game: Game = new Game();
    game.start();
})



