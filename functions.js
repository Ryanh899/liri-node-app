var axios = require('axios')


var concerts = function () {
    var artist = 'Bruno Mars'

    this.convertTime = function(str) {
        var time = str

        time = time.split(':'); // convert to array

        // fetch
        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        var seconds = Number(time[2]);

        // calculate
        var timeValue;

        if (hours > 0 && hours <= 12) {
            timeValue = "" + hours;
        } else if (hours > 12) {
            timeValue = "" + (hours - 12);
        } else if (hours == 0) {
            timeValue = "12";
        }

        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get minutes
        timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds; // get seconds
        timeValue += (hours >= 12) ? " P.M." : " A.M."; // get AM/PM

        timeValue = timeValue.split(':');

        timeValue.splice(2)

        timeValue = timeValue.join(':')

        timeValue = `${timeValue} P.M.`

        return timeValue
    }

    this.concert = function () {
        axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`).then(function (resp) {
                var data = resp.data;
                data.forEach((element, i) => {
                    var date = resp.data[i].datetime.split('T')[1];
                    var day = resp.data[i].datetime.split('T')[0]
                    date = `${day}, ${convertTime(date)}`
                    console.log(`Venue: ${data[i].venue.name} 
    Location: ${data[i].venue.city}, ${data[i].venue.country}
    Date: ${date}`)
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }
}




module.exports = concerts