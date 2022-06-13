const DATETIMESERVICE = {
    timeCheck: (timeObj, isLocal) => {
        var current = new Date();
        var given = moment(timeObj, "YYYY-MM-DDTHH:mm:ss.fZ");
        var duration = moment.duration(given.diff(current)).asHours();

        // add this in dev due to server time
        if(isLocal){
           duration = duration - 8; 
        }

        return duration;
    },
    getDateTime: () => {
        var today = new Date()
        today.setHours( today.getHours())
    
        var dd = String(today.getDate())
        if(dd.length == 1){dd = '0' + dd}
        var mm = String(today.getMonth() + 1)
        if(mm.length == 1){mm = '0' + mm}
        var yyyy = today.getFullYear()
        
        var hour = String(today.getHours())
        if(hour.length == 1){hour = '0' + hour}
        var min = String(today.getMinutes())
        if(min.length == 1){min = '0' + min}
        var sec = String(today.getSeconds())
        if(sec.length == 1){sec = '0' + sec}
        var millisec = String(today.getMilliseconds())
        
        today = yyyy + '-' + mm + '-' + dd +'T'+ hour + ':' + min + ':' + sec + '.' + millisec + 'Z';
        return today
    }
}
