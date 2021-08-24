export abstract class HTMLComponent extends HTMLElement{
    constructor() {
        super();
    }
    public mount(parent: HTMLElement): void {
        parent.appendChild(this);
    }
}
