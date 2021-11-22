(()=>{
    const second = 1000;
    const minute = second*60;
    const hour = minute*60;
    const day = hour*24;

    function setElementInnerText(id, text){
        const element = document.getElementById(id);
        element.innerText = text;
    }
    
    function countdown(){
        const now = new Date().getTime();
        const newYear = new Date('December 31, 2021 23:59:59').getTime();
        const unixTimeLeft = newYear-now;
        console.log(unixTimeLeft);
        // const daysElem = document.getElementById('days');
        // daysElem.innerText = Math.floor(unixTimeLeft/day);
        setElementInnerText('days',Math.floor(unixTimeLeft/day));
        setElementInnerText('hours', Math.floor(unixTimeLeft % day / hour));
        setElementInnerText('minutes', Math.floor(unixTimeLeft % hour / minute));
        setElementInnerText('seconds', Math.floor(unixTimeLeft % minute / second));
    }
    function run(){
        setInterval(() => {
            countdown();    
        }, second);
        
        
    }
    run();

})();