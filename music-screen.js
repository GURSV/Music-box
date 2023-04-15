// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See labwork 7 writeup for more hints and details.
class MusicScreen {
    constructor() {
        this.gifDisplay = new GifDisplay();
        this.playButton = new PlayButton();
        this.audioPlayer;
        this.containerElement = document.getElementById('audio-player');

        this.showNewGif = this.showNewGif.bind(this);
        this.audioPlay = this.audioPlay.bind(this);
        this.audioPause = this.audioPause.bind(this);

        document.addEventListener('show-new-gif', this.showNewGif);
        document.addEventListener('audio-pause', this.audioPause);
        document.addEventListener('audio-play', this.audioPlay);
    }

    async show(gifAndSong) {
        try {
            await this.gifDisplay.viewGif(gifAndSong.gif);
            if (this.gifDisplay.arrUrls.length < 3) {
                throw new Error('Not enough gifs for this theme. Please try another')
            }
            this.gifDisplay.loadGIF();
            document.getElementById('menu').classList.add('inactive');
            this.startPlayer(gifAndSong.song);
        } catch (error) {
            console.error(error);
            document.getElementById('error').classList.remove('inactive');
        }
    }

    startPlayer(song) {
        this.audioPlayer = new AudioPlayer();
        this.containerElement.classList.remove('inactive');
        this.audioPlayer.setSong(song);
        this.audioPlayer.play();
        this.audioPlayer.setKickCallback(this.kick);
    }

    kick() {
        document.dispatchEvent(new CustomEvent('show-new-gif'));
    }

    showNewGif() {
        console.log(this.gifDisplay.arrGIF.length);
        this.gifDisplay.bufferGif();
    }

    audioPlay() {
        this.audioPlayer.play();
    }

    audioPause() {
        this.audioPlayer.pause();
    }
}