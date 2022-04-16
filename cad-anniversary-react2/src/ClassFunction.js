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

module.exports.dateTh = (dateTimestamp)=>{
    console.log(dateTimestamp);

    const monthTh = (month)=>{
        const monthInt = parseInt(month);
        let monthText = null;
        switch (monthInt) {
            case 1:
                monthText = 'มกราคม';
                break;
            case 2:
                monthText = 'กุมภาพันธ์';
                break;
            case 3:
                monthText = 'มีนาคม';
                break;
            case 4:
                monthText = 'เมษายน';
                break;                        
            case 5:
                monthText = 'พฤษภาคม';
                break;
            case 6:
                monthText = 'มิถุนายน';
                break;
            case 7:
                monthText = 'กรกฎาคม';
                break;
            case 8:
                monthText = 'สิงหาคม';
                break;                        
            case 9:
                monthText = 'กันยายน';
                break;
            case 10:
                monthText = 'ตุลาคม';
                break;
            case 11:
                monthText = 'พฤศจิกายน';
                break;
            case 12:
                monthText = 'ธันวาคม';
                break;
            default:
                    break;    
                                                                        
        }
        
        return monthText;
    }

    const checkDate = (date)=>{
        console.log('checkDate', date);
        const dateParse = Date.parse(date[0]);
        let dateTh = "";
        if(!isNaN(dateParse)){
            console.log('in');
            const splitDate = date[0].split("-");
            const day = parseInt(splitDate[2]);
            const month = monthTh(splitDate[1]);
            const year = parseInt(splitDate[0])+543;
            dateTh = `${day} ${month} ${year}`;
        }
        return dateTh;
    }
    const date = checkDate(dateTimestamp.split(" "));
    console.log('hello');
    return date;

    
    //if(isNaN(Date))
}