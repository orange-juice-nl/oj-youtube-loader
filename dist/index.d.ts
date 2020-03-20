import Component from "oj-component";
export interface IOptions {
    autoplay?: boolean;
    loop?: boolean;
}
export default class YoutubeLoader extends Component<string> {
    iframe: HTMLIFrameElement;
    private autoplay;
    private loop;
    static mount(options?: IOptions): YoutubeLoader[];
    private url;
    constructor(root: HTMLElement, options?: IOptions);
    protected initialize(url: any): void;
    private load;
    play(): void;
    pause(): void;
    stop(): void;
    unmount(): void;
}
