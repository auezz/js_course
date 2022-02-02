(()=>{

    // 1. class vs prototype
    // class Person{



    // } 
    

    // const aue = new Person();
    // console.log(aue);

    // // 2. what's prototype
    // const name = 'Aueangkul';
    // //console.log(name.__proto__);

    // const arr = [];
    //console.log(arr.__proto__);
    
    // 3. prototype chain
    // const name = 'Aueangkul';
    // console.log(name.toLocaleString());


    // 4. extend a prototype
    const name = 'Aueangkul';

    function sayHello(val){
        console.log(`Hello ${val}`);
    }

    String.prototype.sayHello = sayHello;
    name.sayHello('world');

})();