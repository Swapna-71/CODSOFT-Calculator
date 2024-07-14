console.log("Welcome to Music Player");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let currentSongName = document.getElementById('currentSongName');
let currentSongCover = document.getElementById('currentSongCover');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "Lover", filepath: "songs/1.mp3", coverPath: "cover pages/1.jpeg" },
    { songName: "Espresso", filepath: "songs/2.mp3", coverPath: "cover pages/2.webp" },
    { songName: "we can't be friends", filepath: "songs/3.mp3", coverPath: "cover pages/3.jpeg" },
    { songName: "DIE FOR YOU", filepath: "songs/4.mp3", coverPath: "cover pages/4.jpeg" },
    { songName: "STUPID IN LOVE", filepath: "songs/5.mp3", coverPath: "cover pages/5.webp" },
    { songName: "DYNAMITE", filepath: "songs/6.mp3", coverPath: "cover pages/6.png" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

masterPlay.addEventListener('click', () => {
    console.log('Master play button clicked');
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
       
    }
});

audioElement.addEventListener('timeupdate', () => {
    console.log('Time update event');
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    console.log('Seekbar changed');
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

const updateCurrentSong = () => {
    currentSongName.innerText = songs[songIndex].songName;
    currentSongCover.src = songs[songIndex].coverPath;
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        console.log('Song item play button clicked');
        makeAllPlays();
        songIndex = index;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filepath;
        masterSongName.innerText = songs[songIndex].songName;
        updateCurrentSong();
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
      
    });
});

document.getElementById('next').addEventListener('click', () => {
    console.log('Next button clicked');
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    updateCurrentSong();
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    console.log('Previous button clicked');
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateCurrentSong(songIndex);
});
