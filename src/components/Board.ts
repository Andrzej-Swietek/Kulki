import { UIComponent } from "../decorators/UIComponent";
import { HTMLComponent } from "../HTMLComponent";
import {create} from "../utils/domQuery";
import {GraphNode} from "./GraphNode";
import {Colors} from "../enums/Colors";

@UIComponent({
    selector: 'component-board',
    template: `
                 <div id="mainGrid"></div>
              `,
    style: `#mainGrid { background: rgba(255,255,255,.4); }`,
    // useShadow: true
})
export class Board extends HTMLComponent{

    public Graph : Array<GraphNode[]> = []
    public generateBoardElement(): void {
        for (let i = 0; i < 10; i++) {

            const list: GraphNode[] = [];
            for (let j = 0; j < 10; j++) {
                const node = new GraphNode(j,i, Colors.EMPTY)
                node.id = ((i)+"-"+(j)).toString()
                document.querySelector('#mainGrid').appendChild(node)
                list.push(node);
            }
            this.Graph.push(list);
        }
    }
}
