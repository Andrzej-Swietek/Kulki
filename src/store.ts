import {GraphNode} from "./components/GraphNode";

interface storeI {
    target: GraphNode | null;
}

export const store: storeI = {
    target: null
}
