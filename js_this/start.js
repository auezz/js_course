(()=>{
    //1. lexical scope & Dynamic Scope
    // function printName(){
    //     console.log(this);
    // }

    // printName();

    // 2. How to know whis is this
    // function printName(){
    //     console.log(this);
    //     console.log(`My name is ${this.name}`);
    // }

    // 2.1 invoker object
    // const aueangkul = {name:'Aueangkul', printName};
    // const jane = {name:'Jane', printName};

    // aueangkul.printName()
    // jane.printName();

    // // 2.2 Global object (window, global)
    // name = 'Global';
    // printName();

    // 2.3 Construction Function
    // function Person(name){
    //     this.name = name;
    //     this.printName = printName;

    // }
    // const aueangkul = new Person('Aueangkul');
    // aueangkul.printName();

    // 3. call(), apply(), and bind()
    function printName(nationality, city){
        console.log(this);
        console.log(`My name is ${this.name}, I'm ${nationality} and am living in ${city}`);
    }

    function Person(name, nationality, city){
        this.name = name;
        this.nationality = nationality;
        this.city = city;

        printName(this.nationality, this.city);
        printName.call(this, this.nationality, this.city);
        printName.apply(this, [this.nationality, this.city]);

        const printAue = printName.bind(this);
        printAue(this.nationality, this.city);
    }

    const text = new Person('Aueangkul','Thai','BBK');




})();