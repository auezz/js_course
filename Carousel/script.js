(()=>{

    let currentIndex = 0;

    function displayImage(imgElems, newIndex){
        const lastIndex = imgElems.length-1;
        if(newIndex<0){
            newIndex = lastIndex
        }else if(newIndex>lastIndex){
            newIndex = 0;
        }
        
        const newImg = imgElems[newIndex];
        newImg.scrollIntoView({behavior: 'smooth'});
        currentIndex = newIndex;
    }

    function run(){
        const imgElems = document.querySelectorAll('img');
        const prevBtnElem = document.querySelector('.previous');
        const nextBtnElem = document.querySelector('.next');

        prevBtnElem.addEventListener('click', ()=> displayImage(imgElems, currentIndex-1));
        nextBtnElem.addEventListener('click', ()=> displayImage(imgElems, currentIndex+1));
        


    }

    run();

})();