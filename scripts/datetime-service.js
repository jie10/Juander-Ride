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
    }
}
