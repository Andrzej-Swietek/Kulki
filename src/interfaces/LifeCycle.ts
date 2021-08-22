export interface LifeCycle {
    connectedCallback: () => void,
    componentWillMount?: () => void,
    componentDidMount?: () => void,
    componentWillUnmount?: () => void,
    componentDidUnmount?: () => void
}
