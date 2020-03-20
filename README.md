# Youtube Loader

## mount
`mount(options?: IOptions): YoutubeLoader[]`
mounts all html elements containing the `data-youtube-loader` attribute that do not contain the `data-loaded` attribute.

```html
<div data-youtube-loader="VFZNvj-HfBU"></div>
<div data-youtube-loader="VFZNvj-HfBU" autoplay loop></div>
```
```typescript
mount()
```

## constructor
`new YoutubeLoader(root: HTMLElement, options?: IOptions): YoutubeLoader`
Load a single Youtube video.
The video is loaded as an IFrame as a child of the given root element.
A "load" event is emitted when the iframe has been loaded and the video can be played.

```typescript
new YoutubeLoader(document.querySelector("video"), { id: "VFZNvj-HfBU" })
  .on("load", yt => {
    yt.play()
  })
```

## play
`play(): void`
Starts / resumes the video playback.
A "play" will be emitted.

## pause
`pause(): void`
Pauses the video playback.
A "pause" will be emitted.

## stop
`stop(): void`
Stops the video playback.
A "stop" will be emitted.

## Events
### Load
The IFrame has been loaded, the video can be played.

### Play
The video is started.

### Pause
The video is paused.

### Stop
The video is stopped.

## Types
### IOptions
```typescript
{
  autoplay?: boolean
  loop?: boolean
  id?: string
}
```