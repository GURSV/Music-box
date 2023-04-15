// NOTE: We are expecting you to *create* an AudioPlayer, but we are *not*
// expecting you to modify the contents of this file.
class AudioPlayer {
    constructor() {
        this._onKickCallback = this._onKickCallback.bind(this);

        this.lastKickTime = -1;

        this.dancer = new Dancer();

        this.kick = this.dancer.createKick({
            onKick: this._onKickCallback
        });
        this.kick.on();
    }

    setSong(songUrl) {
        let audio = new Audio();
        audio.crossOrigin = 'anonymous';
        audio.loop = 'true';
        audio.src = songUrl;
        this.dancer.pause();
        this.dancer.load(audio);
    }

    play() {
        this.dancer.play();
        const nowTime = Date.now();
        if (this.lastKickTime === -1) {
            this.lastKickTime = nowTime;
        }
    }

    pause() {
        this.dancer.pause();
    }

    setKickCallback(kickCallback) {
        this.kickCallback = kickCallback;
    }

    _onKickCallback() {
        if (!this.kickCallback) {
            return;
        }
        const KICK_THRESHOLD = 0.2;
        const nowTime = Date.now();
        const diff = (nowTime - this.lastKickTime) / 1000;
        if (diff > KICK_THRESHOLD) {
            this.lastKickTime = nowTime;
            this.kickCallback();
        }
    }
}