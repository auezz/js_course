(()=>{

    const audioElem = document.querySelector('audio');
    const playBtn = document.querySelector('.play .fa');
    const progressBarElem = document.querySelector('.progress-bar');
    const startTimeElem = document.querySelector('.start-time');
    const endTimeElem = document.querySelector('.end-time');

    function onClick(){
        if(audioElem.paused){
            audioElem.play();
            playBtn.className = 'fa fa-pause-circle';
        }else{
            audioElem.pause();
            playBtn.className = 'fa fa-play-circle';
        }
    }

    function getDuration(time){
        const minutes = Math.floor(time/60%60).toString();
        const seconds = Math.floor(time%60).toString().padStart(2, '0');

        return `${minutes}:${seconds}`;
    }

    function onTimeUpdate(){
        startTimeElem.innerHTML = getDuration(audioElem.currentTime);
        progressBarElem.value = audioElem.currentTime;
    }

    function onLoadedData(){
        console.log('hello');
        endTimeElem.innerHTML = getDuration(audioElem.duration);
        progressBarElem.max = audioElem.duration;
    }

    function onInput(){
        audioElem.currentTime = progressBarElem.value;
    }

    function onEnded(){
        playBtn.className = 'fa fa-play-circle';
        audioElem.currentTime = 0;
    }

    function run(){
        playBtn.addEventListener('click', onClick);

        audioElem.addEventListener('timeupdate', onTimeUpdate);
        audioElem.addEventListener('loadeddata', onLoadedData);
        audioElem.addEventListener('ended', onEnded);

        progressBarElem.addEventListener('input', onInput);
        
    }

    run();

})();                                                                    