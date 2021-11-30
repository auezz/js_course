(()=>{
    
    const konamoCode = [
        'ArrowUp',
        'ArrowUp',
        'ArrowDown',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowLeft',
        'ArrowRight',
        'b',
        'a'
    ];

    let index = 0;
    function onKeyDown(event){
        console.log(event.key);
        event.key === konamoCode[index] ? index++ : index=0; 
        if(konamoCode.length === index){
            console.log('equal');
            startSnowing();
        }
    }

    function run(){
        document.addEventListener('keydown', onKeyDown);

    }

    run();

})();