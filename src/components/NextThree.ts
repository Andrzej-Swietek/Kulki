import { UIComponent } from "../decorators/UIComponent";
import BallsGenerator from "../BallsGenerator";
import { create, query, queryAll } from "../utils/domQuery";
import { Colors } from "../enums/Colors";
import { LifeCycle } from "../interfaces/LifeCycle";
import { HTMLComponent } from "../HTMLComponent";
import { Log } from "../decorators/Log";
import {GraphNode} from "./GraphNode";

/**
 * Class responsible for generating new random ball and displaying the preview of next 3
 * @decorator UIComponent
 */

@UIComponent({
    selector: 'component-next-three',
    template: `
                   <div> Next 3 balls </div>
                   <div class="balls"></div>
              `,
})
export class NextThree extends HTMLComponent implements LifeCycle{

    private ballsGenerator: BallsGenerator;
    private _state: Array<Colors>;

    constructor() {
        super();
        this.ballsGenerator = new BallsGenerator();
        this._state = this.ballsGenerator.getNextBalls().value;
    }
    connectedCallback(){}
    componentDidMount() {
        this._state.forEach(ball => {
            query`.balls`.appendChild( create`div${ ['ball' , ball.toString()] }${ '<h1> ⚬ </h1>' }`)
        })
    }

    /**
     * Method that returns next balls for the moment
     * @return state - colors of next 3 balls
     */
    get state(): Array<Colors> {
        return this._state;
    }


    /**
     * Method that updates the displayed colors of next 3 balls
     * @decorator Log
     */
    @Log
    public drawNewBalls() {
        this._state = this.ballsGenerator.getNextBalls().value
        queryAll`.balls > .ball`.forEach( (ballPreview:HTMLElement,i:number) => {
            ballPreview.classList.forEach( (classListElement:string) => ballPreview.classList.remove(classListElement) )
            ballPreview.classList.add('ball');
            // console.log(ballPreview)
            ballPreview.classList.add(Colors[Colors[this._state[i]]]);
        })
    }
}
