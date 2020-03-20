import { EventAggregator } from "oj-eventaggregator";
export interface IOptions {
    autoplay?: boolean;
    loop?: boolean;
    id?: string;
}
export declare const randomString: () => string;
export declare const getRootElements: <T extends HTMLElement>(selector: string, loaded?: boolean) => T[];
export declare const parseHTML: <T extends HTMLElement>(html: string) => T;
export declare class YoutubeLoader extends EventAggregator<"load" | "pause" | "play" | "stop"> {
    options: IOptions;
    root: HTMLElement;
    iframe: HTMLIFrameElement;
    constructor(root: HTMLElement, options?: IOptions);
    play(): void;
    pause(): void;
    stop(): void;
    private mergeOptions;
    private postMessage;
}
export declare const mount: (options?: IOptions) => YoutubeLoader[];
