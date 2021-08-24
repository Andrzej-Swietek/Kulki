import {Colors} from "./enums/Colors";
import {random} from "./utils/random";
import {Frozen} from "./decorators/Frozen";

@Frozen
export default class BallsGenerator {
    private generator;
    constructor() {
        this.generator = this.generateBalls()
    }
    *generateBalls(){
        while(true){
            yield [ Colors[random(Colors, [Colors.EMPTY])], Colors[random(Colors, [Colors.EMPTY])], Colors[random(Colors, [Colors.EMPTY])] ]
        }
    }
    getNextBalls() {
        return this.generator.next();
    }

}
