const musicName = document.querySelector("#music-name");
const artistName = document.querySelector("#artist-name");
const music = document.querySelector("#audio");
const musicCover = document.querySelector("#music-cover");
// Buttons
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");

// TIME
const currentTimeArea = document.querySelector("#current-time");
const musicDurationArea = document.querySelector("#duration");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");

prevBtn.addEventListener("click",prevSong);
nextBtn.addEventListener("click",nextSong);

let songs = [
    {
       name:"Arasan Da",
       path:"./audios/ArasanDa.mp3",
       artist:"UZI",
       cover:"./img/UZI.png"
    },
  
    {
        name:"Pembe Mezarliklar",
        path:"./audios/pembemezarliklar.mp3",
        artist:"Model",
        cover:"./img/pembeMezarlik.jpg"
    },
  
    {
        name:"Bella Ciao",
        path:"./audios/BellaCiao.mp3",
        artist:"Becky G",
        cover:"./img/bellaCiao.jpg"
    }
  ];


  let isPlaying = false;

  function playSong(){
    isPlaying = true;
    playBtn.classList.replace("fa-play","fa-pause");
    playBtn.setAttribute("title","Pause");
    music.play();
    
  }

  
  function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace("fa-pause","fa-play");
    playBtn.setAttribute("title","Play");
    music.pause();
  }

  playBtn.addEventListener("click",()=>(isPlaying ? pauseSong() : playSong()));

  function loadSong(song){
    musicCover.src = song.cover;
    musicName.textContent = song.name;
    artistName.textContent = song.artist;
    music.src = song.path;
  }

  let songIndex = 0;

  function prevSong(){
   songIndex--;
   if(songIndex < 0){
     songIndex = songs.length - 1;
   }
   loadSong(songs[songIndex]);
   pauseSong();
  }

  function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
          songIndex = 0;
    }
    loadSong(songs[songIndex]);
    pauseSong();
  }

  loadSong(songs[songIndex]);

  function updateProgress(e){
    if(isPlaying){
      const {currentTime,duration} = e.srcElement;
      const progressPercent = (currentTime / duration )* 100;
      progress.style.width = `${progressPercent}%`

      let currMinute = Math.floor(currentTime / 60);
      let currSecond = Math.floor(currentTime - currMinute * 60);
  
      let durMinute = Math.floor(duration / 60);
      let durSecond = Math.floor(duration - durMinute * 60)

       if(currSecond < 10) {currSecond = `0${currSecond}`}
       if(durSecond < 10) {durSecond = `0${durSecond}`}
       if(currMinute < 10) {currMinute = `0${currMinute}`}
       if(durMinute < 10) {durMinute = `0${durMinute}`}
      

       currentTimeArea.textContent = `${currMinute}:${currSecond}`;
       musicDurationArea.textContent = `${durMinute}:${durSecond}`;
      
    }
  }

  function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;

    music.currentTime = (clickX / width)*duration;
  }

  music.addEventListener("timeupdate",updateProgress);
  progressContainer.addEventListener("click",setProgress);


