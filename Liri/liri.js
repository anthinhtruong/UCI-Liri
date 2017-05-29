var key = require("./key.js")
var fs = require('fs');
var spotify = require("spotify")
var request = require("request")


if (process.argv[2] === "my-tweets"){
    mahTweeting();
}
else if (process.argv[2] === "movie-this"){
    letMovie();
}
else if (process.argv[2] === "spotify-this-song"){
    nowSpotifying();
}

//Twitter
function mahTweeting(){
// if (process.argv[2] === "my-tweets"){

    var user = key.twitterKeys;
    // console.log(user)
    var params = {screen_name: 'anaa_truong'};

    user.get('statuses/user_timeline', params, function(error, tweets, response) {
            for (var i = 0; i < tweets.length; i++){
                if (!error) {
                console.log("Date: " + tweets[i].created_at);
                console.log("Tweet: " + tweets[i].text);
                console.log("======================")
                }
            }
            
    });
// }
};


//Spotify
function nowSpotifying(){

// if (process.argv[2] === "spotify-this-song") {
     console.log("Sing for me")
    
     var songRequest = process.argv[3];

     if (songRequest === undefined){
                songRequest = "The Sign Ace of Base"
    }

     spotify.search({ type: 'track', query: songRequest }, function(err, data) {

            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }

          
            
            var spotifyResponse = data.tracks.items;

            // for (var i = 0; i < spotifyResponse.length; i++){

                     console.log("======================")
                //Artist Name
                    console.log("Artist: " + spotifyResponse[0].artists[0].name)
                //Song Name
                    console.log("Song: " + spotifyResponse[0].name)
                 //Song Link
                    console.log("Link: " + spotifyResponse[0].album.external_urls.spotify)
                //Album Name
                    console.log("Album: " + spotifyResponse[0].album.name)

                    console.log("======================")
            // }

    });
// }
};


//Movies
function letMovie(){
// if (process.argv[2] === "movie-this"){
     console.log("I hate Movies")

     var movie = process.argv[3];

    //  var movie = process.argv[3]+ "+" + process.argv[4];


     request('http://www.omdbapi.com/?apikey=40e9cece&t='+ movie +'&plot=full', function (error, response,body )
            {
            if (error){console.log('error:', error); // Print the error if one occurred 
            }
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
            
            console.log(body)

            console.log("=========================")

           
            //    * Title of the movie.
            console.log("Title: " + JSON.parse(body)['Title']);

            //    * Year the movie came out.
            console.log("Year: " + JSON.parse(body)['Year']);

            //    * IMDB Rating of the movie.
            console.log("IMDB Rating: " + JSON.parse(body)['imdbRating']);

            //    * Country where the movie was produced.
            console.log("Country: " + JSON.parse(body)['Country']);

            //    * Language of the movie.
            console.log("Language: " + JSON.parse(body)['Language']);

            //    * Plot of the movie.
            console.log("Plot: " + JSON.parse(body)['Plot']);

            //    * Actors in the movie.
            console.log("Actors: " + JSON.parse(body)['Actors']);

            //    * Rotten Tomatoes URL.
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body)['Ratings']['Value']);
            
            console.log("=========================");
            });
    

// }
};


//FS
if (process.argv[2] === "do-what-it-says"){
     console.log("Huh?")

     fs.readFile("./random.txt", "utf8", function(error,data){

           var returnedData =  data.split(",");
           console.log(returnedData);

           var action = returnedData[0];
           var searchFor = returnedData[1];

           switch(action){
               case "spotify-this-song": 
                //Run Spotify function
                nowSpotifying();

                console.log("Spotifying");
                break;

                case "movie-this": 
                //Run Movie function
                letMovie();
                console.log("Movie-ing");
                break;

                case "my-tweets": 
                //Run Twitter function
                mahTweeting();
                console.log("Tweeting");
                break;
           }
     }


     )};