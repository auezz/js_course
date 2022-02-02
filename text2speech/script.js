(()=>{

    const message = new SpeechSynthesisUtterance();

    function onVoicesChanged(){
        const voice = speechSynthesis.getVoices();
        //const thVoice = voice.find(voice => voice.lang === 'th-TH');
        const enVoice = voice[27];
        //console.log(voice);
        //console.log(enVoice);
        message.voice = enVoice;
    }

    function onClick(event){
        message.text = event.target.getAttribute('alt');
        speechSynthesis.speak(message);

    }

    function run(){
        speechSynthesis.addEventListener('voiceschanged',onVoicesChanged);

        const imgElems = Array.from(document.querySelectorAll('img'));
        //console.log(imgElem);

        imgElems.forEach(imgElem => imgElem.addEventListener('click',onClick));

    }

    run();


})();