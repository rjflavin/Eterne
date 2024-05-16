import CustomVideoPlayer from "./custom-video-player.js"

if (!customElements.get('custom-video-player')) {
    customElements.define('custom-video-player', CustomVideoPlayer)
}
