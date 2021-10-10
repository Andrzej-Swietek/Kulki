import {GraphNode} from "./components/GraphNode";

interface storeI {
    target: GraphNode | null;
}
interface setStoreI {
    (value: GraphNode|null): void
}

export let store: storeI = {
    target: null,
}
export const setStore:setStoreI = (value: GraphNode|null) => {
    store = {
        target: value
    }
    if (value != null) {
        localStorage.setItem("selected", `${ value.id }`);
        (document.getElementById(localStorage.getItem("selected")) as GraphNode).unvisit()
    }else  {
        localStorage.setItem("selected", "")
    }
    console.log(store)
}
