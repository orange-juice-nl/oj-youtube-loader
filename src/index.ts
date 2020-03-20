import { EventAggregator } from "oj-eventaggregator"

export interface IOptions {
  autoplay?: boolean
  loop?: boolean
  id?: string
}

export const randomString = () =>
  Math.random().toString(36).substring(2)

export const getRootElements = <T extends HTMLElement>(selector: string, loaded: boolean = false) => {
  let elements = (Array.from(document.querySelectorAll(selector)) as T[])
  if (loaded) {
    elements = elements.filter(x => x.getAttribute("data-loaded") !== null)
    elements.forEach(x => x.setAttribute("data-loaded", "loaded"))
  }
  return elements
}

export const parseHTML = <T extends HTMLElement>(html: string) => {
  const container = document.createElement("div")
  container.innerHTML = html
  return container.childNodes[0] as T
}

export class YoutubeLoader extends EventAggregator<"load" | "pause" | "play" | "stop"> {
  options: IOptions = {}
  root: HTMLElement
  iframe: HTMLIFrameElement

  constructor(root: HTMLElement, options?: IOptions) {
    super()
    this.root = root
    this.mergeOptions(options)
    const hash = `cbfn_${randomString()}`
    window[hash] = (e => this.emit("load", this)) as any
    this.iframe = parseHTML<HTMLIFrameElement>(`<iframe onload="${hash}(this)" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="100%" height="100%" type="text/html" src="https://www.youtube.com/embed/${this.options.id}?enablejsapi=1&autoplay=${this.options.autoplay ? 1 : 0}&loop=${this.options.loop ? 1 : 0}&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0"></iframe>`)
    this.root.appendChild(this.iframe)
  }

  play() {
    this.postMessage("playVideo")
    this.emit("play", this)
  }

  pause() {
    this.postMessage("pauseVideo")
    this.emit("pause", this)
  }

  stop() {
    this.postMessage("stopVideo")
    this.emit("stop", this)
  }

  private mergeOptions(options: IOptions = {}) {
    Object.assign(this.options, options)
    const elOptions = {
      id: this.root.getAttribute("data-youtube-loader"),
      loop: this.root.getAttribute("loop"),
      autoplay: this.root.getAttribute("autoplay"),
    }
    Object.entries(elOptions)
      .filter(([k, v]) => v)
      .forEach(([k, v]) => this.options[k] = v)
  }

  private postMessage(func: string) {
    this.iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func }), "https://www.youtube.com")
  }
}

export const mount = (options?: IOptions) =>
  getRootElements("[data-youtube-loader]", true)
    .map(x => new YoutubeLoader(x as HTMLElement, options))