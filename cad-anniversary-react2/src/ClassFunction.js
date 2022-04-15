module.exports.getTimeStamp = ()=>{
    const today = new Date();
    const month = today.getMonth()+1;
    const day = today.getDate();
    const date = today.getFullYear()+'-'+(month<10?`0${month}`:month)+'-'+(day<10?`0${day}`:day);
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    return dateTime;
}

/*
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
*/
module.exports.numberWCommas = (number)=>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}