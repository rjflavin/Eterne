export default class CustomVideoPlayer extends HTMLElement {
    constructor() {
        super();
        this.sectionId = this.dataset.id;
        this.videoDesk = this.querySelector('video.desktop-video');
        this.videoMob = (this.querySelector('video.mobile-video')) ? this.querySelector('video.mobile-video') : this.videoDesk;
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
        this.querySelectorAll('video').forEach((videoElem) => {
            const videoBounding = videoElem.getBoundingClientRect();
            const isVisible = !!(videoBounding.top < window.innerHeight && videoBounding.bottom >= 0);
            const isPlaying = this.isVideoPlaying(videoElem);
            if (!isVisible && isPlaying) {
                if (videoElem) {
                    videoElem.pause();
                    this.classList.remove('play');
                }
            }
        });
    }

    handleVideoClick () {
        let videoElem = (!this.videoMob || window.innerWidth >= 1024) ? this.videoDesk : this.videoMob;
        console.log(videoElem);
        if (!event.target.classList.contains('caption')
            && !event.target.classList.contains('caption__text')
            && !event.target.classList.contains('caption__link')) {

            event.preventDefault();
            const isPlaying = this.isVideoPlaying(videoElem);
            if (!isPlaying) {
                videoElem.play();
                this.classList.add('play');
            } else {
                videoElem.pause();
                this.classList.remove('play');
            }
        }
    }
}
