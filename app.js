// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played.
//
// See labwork 7 writeup for more hints and details.
class App {
    constructor() {
        this.menu = new MenuScreen();
        this.music = new MusicScreen();

        this.showMusicScreen = this.showMusicScreen.bind(this);
        document.addEventListener('open-music-screen', this.showMusicScreen);
    }

    showMusicScreen(event) {
        this.music.show(event.detail);
    }

}