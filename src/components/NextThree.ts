import { UIComponent } from "../decorators/UIComponent";
import BallsGenerator from "../BallsGenerator";
import {create, query, queryAll} from "../utils/domQuery";
import { Colors } from "../enums/Colors";
import { LifeCycle } from "../interfaces/LifeCycle";
import { HTMLComponent } from "../HTMLComponent";
import { Log } from "../decorators/Log";

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
        this._state = this.ballsGenerator.getNextBalls().value
        console.log(this._state)
    }
    connectedCallback(){}
    componentDidMount() {
        this._state.forEach(ball => {
            query`.balls`.appendChild( create`div${ ['ball' , ball.toString()] }${ '<h1> ⚬ </h1>' }`)
        })
    }

    get state(): Array<Colors> {
        return this._state;
    }

    @Log
    public drawNewBalls() {
        this.ballsGenerator.getNextBalls().value;
        // TODO: UPDATE HTML
        const children = query`.balls`.children;
        for (let i = 0; i < children.length; i++) {
            children[i]
        }

    }
}
