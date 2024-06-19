// Write your javascript here

tracks = [
    {
        name: "Let me down slowly",
        artist: "Alec Benjamin",
        cover: "alec.jpg",
        source: "Let me down slowly.mp3",
    },
    {
        name: "Let me love you",
        artist: "DJ Snake/Justin Beiber",
        cover: "dj.jpg",
        source: "Let me love you.mp3",
    },
    {
        name: "Perfect",
        artist: "Ed Sheeran",
        cover: "ed.jpg",
        source: "Perfect.mp3",
    },

];

let title = document.querySelector('.audio-title');
let image = document.querySelector('.audio-img');
let singer = document.querySelector('.audio-singer');
let audio = new Audio();
let playPause = document.querySelector('.play');
let prev = document.querySelector('.skip-back');
let next = document.querySelector('.skip-forward');
let currentTimeElement = document.querySelector('.current-time');
let durationElement = document.querySelector('.duration');
let progressBar = document.querySelector('.progress-bar');
let progressHead = document.querySelector('.progress-head');

let song_play = false;

// Function to play the song
function playSong() {
    song_play = true;
    audio.play();
}

// Function to pause the song
function pauseSong() {
    song_play = false;
    audio.pause();
}

// Function to load a song
function loadSong(track) {
    title.textContent = track.name;
    image.style.backgroundImage = `url("${track.cover}")`;
    audio.src = track.source;
    singer.textContent = track.artist;
    song_play ? audio.play() : audio.pause();
}

// Load the first song initially
let i = 0;


function prevSong() {
    i--;
    if (i < 0) {
        i = tracks.length - 1;
    }
    loadSong(tracks[i]);
}

function nextSong() {
    i++;
    if (i >= tracks.length) {
        i = 0;
    }
    loadSong(tracks[i]);
}

prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);

// Add event listener for play/pause button
playPause.addEventListener('click', function () {
    const icon = this.querySelector('i');
    if (song_play) {
        pauseSong();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    } else {
        playSong();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
});

function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressHead.style.left = `${progressPercent}%`;
    currentTimeElement.textContent = formatTime(currentTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function seek(event) {
    const progress = document.getElementById('progress');
    const rect = progress.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const clickPercent = (clickX / width) * 100;
    const newTime = (clickPercent / 100) * audio.duration;
    audio.currentTime = newTime;

    updateProgress();
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', () => {
    durationElement.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', nextSong);

loadSong(tracks[i]);