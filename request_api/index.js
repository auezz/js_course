(()=>{
    //const {axios} = require('axios');
    /*
    function run(){
        console.log("heloo");
        const request = new XMLHttpRequest();
        // request.onload = function() {
        //     console.log(this.responseText);
        // }
        request.onload = () => {
            console.log(request.status);
            console.log(request.responseText);
            const getData = JSON.parse(request.responseText);
        }
        request.open("GET","https://jsonplaceholder.typicode.com/users");
        request.send();
    }
    run();
    */

    //method 2
    /*
    async function getUser(){
        let response = await fetch('https://jsonplaceholder.typicode.com/users')
        //console.log(response);
        let getData = await response.json();
        //console.log(getData);
        return getData;
    }
    getUser().then(data => console.log(data));
    */
    
    //method 3
    axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
        console.log(res.data);

    })







})();