
    

    function setup(){
        const canvas = document.getElementById('falling-snow-canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return{
            canvas,
            canvasContext: canvas.getContext('2d'),
            numberOfSnowBalls: 250 
        }
    }

    function random(min, max){
        return Math.floor(Math.random() * (max-min+1))+min;
    }

    function createSnowBalls(canvas, numberOfSnowBalls){
        return [...Array(numberOfSnowBalls)].map(()=>{
           return {
               x: random(0, canvas.width),
               y: random(0, canvas.height),
               opacity: random(0.5,1),
               radius: random(2,4),
               speedX: random(-5, 5),
               speedY: random(1, 3) 
           };
        });
       //console.log(x);
    }

    function drawSnowBalls(canvasContext, snowBalls){
        canvasContext.beginPath();
        canvasContext.arc(snowBalls.x, snowBalls.y, snowBalls.radius, 0, Math.PI*2);
        canvasContext.fillStyle = `rgba(255,255,255, ${snowBalls.opacity})`;
        canvasContext.fill();
    }

    function moveSnowBalls(canvas ,snowBalls){
        snowBalls.x += snowBalls.speedX;
        snowBalls.y += snowBalls.speedY;
        if(snowBalls.x > canvas.width){
            snowBalls.x = 0;
        }else if(snowBalls.x < 0){
            snowBalls.x = canvas.width;
        }

        if(snowBalls.y > canvas.height){
            snowBalls.y = 0;
        }

    }
    function startSnowing(){
        const {canvas, canvasContext, numberOfSnowBalls} = setup();
        const snowBalls = createSnowBalls(canvas, numberOfSnowBalls);
        console.log(snowBalls);
        //drawSnowBalls(canvasContext, snowBalls[0]);
        
        setInterval(() => {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            snowBalls.forEach((snowBalls)=> drawSnowBalls(canvasContext, snowBalls));
            snowBalls.forEach((snowBalls)=> moveSnowBalls(canvas,snowBalls));    
        }, 50);
    }
    //run();
