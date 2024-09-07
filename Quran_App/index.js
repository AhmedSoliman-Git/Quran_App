
let SoraName = document.getElementById("SoraSpace");
let Artist = document.getElementById("Artist");
let Disk = document.querySelector(".disk");
let Slider = document.getElementById("range");
let TimeBegin = document.querySelector(".time-begin");
let TimeEnd = document.querySelector(".time-end");
let PreviousButton = document.querySelector(".prev");
let NextButton = document.querySelector(".next");
let Audio = document.getElementById("Audio");
let Pause_PlayBtn = document.querySelector(".control_div");
let CurrentSora = 0 ;

Pause_PlayBtn.classList.add("pause")
Pause_PlayBtn.addEventListener("click",function(){
    if(Pause_PlayBtn.className.includes("pause")){
        Audio.play();
        Pause_PlayBtn.classList.toggle("pause");
        Disk.classList.toggle("play")
    }else{
        Audio.pause();
        Pause_PlayBtn.classList.toggle("pause");
        Disk.classList.toggle("play")
    }
})

function SetMusic(i){
    Slider.value = 0 ;
    let soras = Quran[i];
    SoraName.innerHTML = soras.name;
    Artist.innerHTML = soras.Artist ;
    Audio.src = soras.sora ;
    Disk.style.backgroundImage =`url(${soras.Image})`;
    TimeBegin.innerHTML = "00:00";
    setTimeout(function(){
        Slider.max = Audio.duration;
        TimeEnd.innerHTML= GetRealTime(Audio.duration); // duration to get the length of  any audio means the time of it    


    },200)
    
}
SetMusic(0);

function GetRealTime (Time){
    let minTime = Math.floor(Time/60); //to get it by Minutes ;
    if(minTime < 10){
        minTime = `0${minTime}`
    }
    let seconds = Math.floor(Time%60) ;
    if(seconds < 10){
        seconds = `0${seconds}`;
    }
    return `${minTime} : ${seconds}`

}
setInterval(function(){
Slider.value = Audio.currentTime; // current time is a method to get the time that we stands in it just for remember
TimeBegin.innerHTML= GetRealTime(Audio.currentTime)
if(Math.floor(Audio.currentTime) == Math.floor(Slider.max)){
    PreviousButton.click()
}
},500);


Slider.addEventListener("change",function(){
    Audio.currentTime = Slider.value  ;
})

PreviousButton.addEventListener("click",()=>{
    if(CurrentSora >= Quran.length -1){
        CurrentSora = 0 ;
    }else{
        CurrentSora++;
    }
    SetMusic(CurrentSora);
    PlaySora()
})


NextButton.addEventListener("click",()=>{
    if(CurrentSora <= 0){
        CurrentSora = Quran.length - 1 ;
    }else{
        CurrentSora--;
    }
    SetMusic(CurrentSora);
    PlaySora();
})

function PlaySora(){
Audio.play();
Pause_PlayBtn.classList.remove("pause");
Disk.classList.add("play")
}