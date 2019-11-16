//LIRI BOT
//11.13
//update spotfiy response to find song
//update omdb to find rotten rating
//update bandintown api to display 
//update defatult and do what it says function 
//record s
//maybe add inqiirer if time allows 

require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var search = process.argv[2]; //concert-this, spotify-this-song, movie-this, do-what-it-says
var term = process.argv.slice(3).join(" "); //song, actor, moview 
function start(search, term) {
    switch (search) {
        case "concert-this":
            console.log("Searching for concert");
            bandsintownApi(term)
            break;
        case "spotify-this-song":
            // code block
            console.log("Searching for song :" + term);
            spotifyAPI(term);
            break;
        case "movie-this":
            // code block
            console.log("Searching movie :" + term);
            omdbApi(term);

            break;
        case "do-what-it-says":
            // code block
            doWhatItSays();

            console.log("Searching for you");
            break;
        default:
            console.log("please enter movie-this, concert-this, spotify-this-song");
    }

}
start(search, term)

function doWhatItSays() {
    console.log("do-what-it-says");
    fs.readFile("random.txt", "utf-8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data


        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        start(dataArr[0], dataArr[1]);

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

    });
}

function spotifyAPI(song) {
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            console.log("=====SpotifyResponse=======");
            var stringData = (JSON.stringify(response, null, 2));
            var jsonData = response.tracks.items[0];

            console.log("=====SpotifyResponse=======");
            // console.log("=====SpotifyResponse=======");

            var showData = [
                "Artist: " + jsonData.artists[0].name,
                "Song Name: " + jsonData.name,
                "Link: " + jsonData.artists[0].href,
                "Album: " + jsonData.album.name,
            ].join("\n\n");
            // Artist(s)
            // The song's name
            // A preview link of the song from Spotify
            // The album that the song is from

            console.log(showData);
            fs.appendFile("log.txt", stringData, function (err) {
                if (err) throw err;
                //console.log(jsonData);
            });
        })
        .catch(function (err) {
            console.log(err);
        });

}

function omdbApi(movieName) {
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("=====OMDBResponse=======");
            // console.log(response);
            console.log("=====OMDBResponse=======");
            var jsonData = response.data;
            var showData = [
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "Rating: " + jsonData.imdbRating,
                "Rotten Rating: " + jsonData.imdbRating,
                "Country Produced: " + jsonData.Country,
                "Lang: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors/Actresses: " + jsonData.Actors
            ].join("\n\n");

            console.log(showData);
            console.log("=====OMDBResponse=======");
            //             Title of the movie.
            //    * Year the movie came out.
            //    * IMDB Rating of the movie. response.data.imdbRating
            //    * Rotten Tomatoes Rating of the movie.
            //    * Country where the movie was produced.
            //    * Language of the movie.
            //    * Plot of the movie.
            //    * Actors in the movie.

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}
//BandsinTown API

function bandsintownApi(artist) {


    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function (response) {

            console.log(response);
            console.log("=====bandResponse=======");
            var jsonData = response.data;
            for (var i = 0; i < jsonData.length; i++) {
                console.log("Venue  name: " + jsonData[i].venue.name);
                console.log("Venue  location: " + jsonData[i].venue.country + " " + jsonData[i].venue.region + " " + jsonData[i].venue.city);
                console.log("Venue  date: " + jsonData[i].datetime);
                console.log("---------------------------")
            }

            fs.appendFile("log.txt", JSON.stringify(response.data, null, 2), function (err) {
                if (err) throw err;

            });
            // var showData = [
            //     "Venue: " + jsonData.Title,
            //     "Location: " + jsonData.Year,
            //     "Date: " + jsonData.imdbRating
            // ].join("\n\n");

            // console.log(showData);

            // Name of the venue
            // Venue location
            // Date of the Event(use moment to format this as "MM/DD/YYYY")
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

