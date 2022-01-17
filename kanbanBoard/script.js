(()=>{

    let dragingElem;

    function onDragStart(){
        dragingElem = this;
        console.log(dragingElem);
    }

    function onDrop(){
        console.log('droping');
        this.append(dragingElem);
        dragingElem = null;
    }

    function onDragOver(event){
        event.preventDefault();
    }

    function onDragEnter(event){
        event.preventDefault();
    }

    function run(){
        const taskElems = Array.from(document.querySelectorAll('.task'));
        //console.log(taskElem);
        const dropzoneElems = Array.from(document.querySelectorAll('.drop-zone'));
        //console.log(dropzoneElem);

        taskElems.forEach((taskElem)=>{
            taskElem.addEventListener('dragstart', onDragStart);
        });

        dropzoneElems.forEach((dropzoneElem)=>{
            dropzoneElem.addEventListener('drop', onDrop);
            dropzoneElem.addEventListener('dragover', onDragOver);
            dropzoneElem.addEventListener('dragenter', onDragEnter);

        })

    }

    run();


})();