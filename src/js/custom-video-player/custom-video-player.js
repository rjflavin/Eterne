export default class CustomVideoPlayer extends HTMLElement {
    constructor() {
        super();
        this.sectionId = this.dataset.id;
        this.video = this.querySelector('video')
        this.setListeners();
    }

    setListeners() {
        let touchstartX = 0;
        let touchstartY = 0;
        let touchendX = 0;
        let touchendY = 0;

        window.addEventListener('scroll', (event) => this.pauseVideoOnScroll(true), true);

        this.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, false);

        this.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleGesture(event);
        }, false);

        this.addEventListener('click', this.handleVideoClick)

        const handleGesture = (event) => {
            if (touchendY === touchstartY) {
                this.handleVideoClick(event);
            }
        }
    }

    isVideoPlaying (video) {
        return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    }

    pauseVideoOnScroll () {
        const videoBounding = this.video.getBoundingClientRect();
        const isVisible = !!(videoBounding.top < window.innerHeight && videoBounding.bottom >= 0);
        const isPlaying = this.isVideoPlaying(this.video);
        if (!isVisible && isPlaying) {
            if (this.video) {
                this.video.pause();
                this.classList.remove('play');
            }
        }
    }

    handleVideoClick (event) {
        if (!event.target.classList.contains('caption')
        && !event.target.classList.contains('caption__text')
        && !event.target.classList.contains('caption__link')) {
            event.preventDefault();
            const isPlaying = this.isVideoPlaying(this.video);
            if (!isPlaying) {
                this.video.play();
                this.classList.add('play');
            } else {
                this.video.pause();
                this.classList.remove('play');
            }
        }
    }
}
