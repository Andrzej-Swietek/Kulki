import { UIComponent } from "../decorators/UIComponent";
import {LifeCycle} from "../interfaces/LifeCycle";
import {HTMLComponent} from "../HTMLComponent";

@UIComponent({
    selector: 'component-points-counter',
    template: `<h3> Your Score</h3>
               <hr/ >`,
})
export class PointsCounter extends HTMLComponent implements LifeCycle {
    private points: number;
    private pointsHtmlRef: HTMLElement;
    constructor() {
        super();
        this.points = 0;
    }

    public connectedCallback(): void {
        this.pointsHtmlRef= document.createElement('p');
        this.updatePoints(0);
        this.appendChild(this.pointsHtmlRef);
        console.log('connected callback');
    }

    public updatePoints(points: number=0): void {
        this.points = points;
        this.pointsHtmlRef.innerHTML = `<p> <span>${ this.points }</span> Points </p>`
    }

    get numPoints() {
        return this.points;
    }

    disconnectedCallback() {
        console.log('disconnected callback');
    }

    componentWillMount() {
        console.log('component will mount');
    }

    componentDidMount() {
        console.log('component did mount');
    }

    componentWillUnmount() {
        console.log('component will unmount');
    }

    componentDidUnmount() {
        console.log('component did unmount');
    }

}
