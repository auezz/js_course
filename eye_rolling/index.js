(()=>{
    function run(){
        const bodyElem = document.querySelector('body');
        const eyeElems = document.querySelectorAll('.eye');

        function onMouseMove({pageX, pageY}){
            //console.log(pageX,pageY);
            eyeElems.forEach((eyeElem)=>{
                const {left, top} = eyeElem.getBoundingClientRect();
                //console.log(left, top);
                const eyeCenterX = left+eyeElem.offsetWidth/2;
                const eyeCenterY = top+eyeElem.offsetHeight/2;
                const radian = Math.atan2(pageX - eyeCenterX, pageY - eyeCenterY);
                const angle = radian*180/Math.PI*-1;
                console.log(angle);
                eyeElem.style.transform = `rotate(${angle}deg)`;
            });


        }

        bodyElem.addEventListener('mousemove', onMouseMove);

    }

    run();

})();