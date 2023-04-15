// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See labwork 7 writeup for more hints and details.
class MenuScreen {
    constructor() {
        this.song = document.getElementById('song-selector');
        this.gif = document.getElementById('query-input');
        this.containerElement = document.getElementById('menu');
        this.nameSong = document.createElement('option');

        this.getListSong();
        this.getListTopics();

        this.onSubmit = this.onSubmit.bind(this);
        const form = document.querySelector('form');
        form.addEventListener('submit', this.onSubmit);
    }

    getListSong() {
        fetch('https://yayinternet.github.io/hw4-music/songs.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                for (const song in data) {
                    this.nameSong.text = data[song].title;
                    this.nameSong.value = data[song].songUrl;
                    this.song.appendChild(this.nameSong.cloneNode(true));
                }
            });
    }

    getListTopics() {
        const topics = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
        const topic = topics[Math.floor(Math.random() * 10)];
        this.gif.value = topic;
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }

    onSubmit(event) {
        event.preventDefault();
        const gifAndSong = {
            gif: this.gif.value,
            song: this.song.value
        }
        document.dispatchEvent(new CustomEvent('open-music-screen', { detail: gifAndSong }));
    }
}