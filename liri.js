//------------------------------------------------------
// Rough week for me due to personal reasons. I don't have working code.
//I tried my hardest to code what I thought was going to be working.
//At one point in time things were working until I added more functions
//code stopped working as I tried to write the spotify and beyond functions
//---------------------------------------------------------



// The node imports that are required for the app
var fs = require("fs");
var request = require("request");
var keys = require("key.js");
var twitter = require("twitter");
var spotify = require ("node-spotify-api");
var argument = process.argv[2];


switch(argument) {
  case "my-tweets": myTwitter(); break;
  case "spotify-this-song": thisSong(); break;
  case "movie-this": movies(); break;
  case "do-what-it-says": doWhatItSays(); break;
  // User based instructions in order to improve UX
  default: console.log("\r\n" +"These are the commands for my program' : " +"\r\n"+
    "1. my-tweets 'user twitter name' " +"\r\n"+
    "2. spotify-this-song 'song name' "+"\r\n"+
    "3. movie-this 'movie name' "+"\r\n"+
    "4. do-what-it-says."+"\r\n"+
    "Movie needs to have quotes if multiple words!");
};

// The OMBD funtion for the movies. Most of the code not WORKING
//code not functional due to previous code and upcoming code as well.
//double checked my logic here as well by taking the user input in bash.
// this documentation was also taken from their website and tweaked.
//parsing the body as it assigns it things to var movieObject."x"
function movies(){
  var movie = process.argv[3];
  //if there is no movie in input
  if(!movie){
    movie = "the matrix";
  }
  var paramaters = movie
  request("http://www.omdbapi.com/?t=" + paramaters + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var movieObject = JSON.parse(body);
      //test out in console log if not working
      //these are all selecting directly from their object key names!
      var movieResults =
      "Title: " + movieObject.Title+"\r\n"+
      "Year: " + movieObject.Year+"\r\n"+
      "Imdb Rating: " + movieObject.imdbRating+"\r\n"+
      "Country: " + movieObject.Country+"\r\n"+
      "Language: " + movieObject.Language+"\r\n"+
      "Plot: " + movieObject.Plot+"\r\n"+
      "Actors: " + movieObject.Actors+"\r\n"+
      "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
      "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" +
      console.log(movieResults);
      log(movieResults);
    } else {
      console.log("Error :"+ error);
      return;
    }
  });
};
// Twitter function using the API. Access tokens from my twitter app in other file
//kept giving me error that they aren't defined.
//pulling the object from variable KEYS on the top that is required the module key.js that has my consumer keys.
//most of this code taken from their website documentation as well.
function myTwitter() {
  var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
  });
  var twitterUsername = process.argv[3];
  if(!twitterUsername){
    twitterUsername = "lirinode145";
  }
   var paramaters = {screen_name: twitterUsername};
  client.get("statuses/user_timeline/", paramaters, function(error, data, response){
    if (!error) {
      for(var i = 0; i < data.length; i++) {
        //console log results here to check code if necessary.
        var twitterResults =
        "@" + data[i].user.screen_name + ": " +
        data[i].text + "\r\n" +
        data[i].created_at + "\r\n" +
        "------------------------------ " + i + " ------------------------------" + "\r\n";
        console.log(twitterResults);
        log(twitterResults);
      }
      //error necessary if there is nothing to return
    }  else {
      console.log("Error :"+ error);
      return;
    }
  });
}
// Function for spotify. Uses spotify API
//not fully functional, I took a lot from their website and tried many things.
//Attempted to refresh my ID and still not working
//Double checked my logic, everything is defined from their website. My code might be bad.
var spotify = new Spotify({
  id: "95298420cd1247fdb982925da2e565ec",
  secret: "257bf390aa33428dafbb19ce677ed631"
});
function thisSong(songName) {
  var songName = process.argv[3];
  if(!songName){
    songName = "Gravity";
  }
  var paramaters = songName;

  //literally TAKEN FROM THE WEBSITE AND NOT WORKING
  spotify.search({ type: "track", query: paramaters }, function(err, data) {
    if(!err){
      var songInfo = data.tracks.items;
      for (var i = 0; i < 5; i++) {
        if (songInfo[i] != undefined) {
          var spotifyResults =
          "Artist: " + songInfo[i].artists[0].name + "\r\n" +
          "Song: " + songInfo[i].name + "\r\n" +
          "Album the song is from: " + songInfo[i].album.name + "\r\n" +
          "Preview Url: " + songInfo[i].preview_url + "\r\n" +
          "------------------------------ " + i + " ------------------------------" + "\r\n";
          console.log(spotifyResults);
          log(spotifyResults);
        }
      }
    }	else {
      console.log("Error :"+ err);
      return;
    }
  });
};
//Function that writes to the random txt file
//most of it not working due to previous code also not functional
//decided to leave this out.


// would write a code to append results to the txt file here.
