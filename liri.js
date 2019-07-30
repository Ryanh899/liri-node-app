//dotenv
require("dotenv").config();
//Spotify imports 
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify)
//Concerts imports
var Functions = require('./CM');
var functions = new Functions();
//Yargs
const argv = require('yargs').argv;
var args = argv._;

//Spotify function
//Find Songs  
var songSearch = function (song) {
    if (song) {
        spotify.search({
            type: 'track',
            query: song 
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var response = data.tracks.items[0];
            console.log(`Artist(s): ${response.artists[0].name}
    Song Name: ${response.name}
    Album: ${response.album.name}
    Preview Link: ${response.external_urls.spotify}`)
        });
    } else if (!song) {
        spotify.search({
            type: 'track',
            query: 'The Sign'
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var response = data.tracks.items[0];
            console.log(`Artist(s): ${response.artists[0].name}
    Song Name: ${response.name}
    Album: ${response.album.name}
    Preview Link: ${response.external_urls.spotify}`)
        });
    }
}


//find concerts
if (args[0].toLowerCase() === ('concert-this')) {
    args.shift()
    var query = args.join(' ')
    functions.concert(functions.convertTime, query);
} else if (args[0].toLowerCase() === ('spotify-this-song')) {
    if (args[1]) {
        args.shift()
        songSearch(args.join(' '))
    } else {
        songSearch(); 
    }
} else if (args[0].toLowerCase() === 'movie-this') {
    args.shift(); 
    functions.movies(args.join('')); 
}


