var Spotify = function () {
    
    this.search = function (request) {
        request.search({
            type: 'track',
            query: 'All the Small Things'
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(data);
        });
    }

}

module.exports = Spotify; 