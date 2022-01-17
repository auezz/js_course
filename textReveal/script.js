(()=>{

    function onScroll(){
        const sectionElems = Array.from(document.querySelectorAll('section'));
        sectionElems.forEach((sectionElem)=>{
            const imgElem = sectionElem.querySelector('img');
            const textElem = sectionElem.querySelector('.text');

            const scrollposition = window.pageYOffset;
            const revealPosition = imgElem.offsetTop + imgElem.offsetHeight / 10;

            if(scrollposition>=revealPosition){
                textElem.classList.add('reveal');
            }
        });

    }

    function run(){
        document.addEventListener('scroll', onScroll);

    }

    //run();
    const API = {
        getWeather: (cityName) => {
            return cityName==='bangkok'?'extremely hot':'kinda cold weather';
        }
    };

    function getWeather(cityName){
        // console.log(API.getWeather(cityName || 'Bangkok'));
        return API.getWeather(cityName || 'Bangkok');
    }

    // function getWeather(cityName = requireCityName()){
    //     return API.getWeather(cityName);
    // }

    // function requireCityName(){
    //     throw new Error('cityName parameter is required');
    // }

    console.log(getWeather('bangkokd'));
    


})();