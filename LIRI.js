//LIRI BOT
require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);


// var Spotify = require('node-spotify-api');

// var spotify = new Spotify({
//     id: "13d8120ac5544765826f214de0cbb4d3",
//     secret: "67e627adc4c544da86cbd729080b29c0"
// });




spotify
    .search({ type: 'track', query: 'All the Small Things' })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (err) {
        console.log(err);
    });




// Then run a request with axios to the OMDB API with the movie specified
axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
    function (response) {
        console.log("The movie's rating is: " + response.data.imdbRating);
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





