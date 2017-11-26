var request = require("request");
var keys = require('./keys.js')
var command = process.argv[2]
var nameOfSomething = process.argv.slice(3, process.argv.length)

if ( !command ) {
	console.log("Please do something!")
} else if (command !== "movie-this") {
	console.log("")
} else {
	var queryUrlOMDB = "http://www.omdbapi.com/?t=" + nameOfSomething + "&y=&plot=short&apikey=40e9cece";
	request(queryUrlOMDB, function(error, response, body) {
	  if (!error && response.statusCode === 200) {
	  	console.log("Title: " + JSON.parse(body).Title)
	    console.log("Release Year: " + JSON.parse(body).Year);
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
	    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1]["Value"])
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language)
	    console.log("Plot: " + JSON.parse(body).Plot)
	    console.log("Actors: " + JSON.parse(body).Actors)
	  }
	});
}

if ( !command ) {
	console.log("Please do something!")
} else if (command !== "my-tweets") {
	console.log("")
} else {
	doTwitter()	
}

if (!command) {
	console.log("Please do something!")
} else if (command !== "spotify-this-song") {
	console.log("")
} else {
	doSpotify()
}

if (!command) {
	console.log("Please do something!")
} else if (command !== "do-what-it-says") {
	console.log("")
} else {
	doIt()
}


function doTwitter() {

	var Twitter = require('twitter');
	var client = new Twitter ({
  		consumer_key: keys.twitter.consumer_key,
  		consumer_secret: keys.twitter.consumer_secret,
  		access_token_key: keys.twitter.access_token_key,
  		access_token_secret: keys.twitter.access_token_secret
	})


	var params = {user_id: '932996475717550081', count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {

	  if (!error) {
	  	for ( var i = 0; i < tweets.length; i++ ) {
	  		console.log('--------------------------------');
	  		console.log('TWEETS :: ', tweets[i].text);
	  		console.log('--------------------------------');
	  	}

	  } else {
	  	console.log('error :: ', error)
	  }
	});
}


function doSpotify() {
	var Spotify = require('node-spotify-api'); 
	var spotify = new Spotify({
	  id: keys.spotify.id,
	  secret: keys.spotify.secret
	});

	if (!nameOfSomething) {
		nameOfSomething = "The Sign"
		spotify.search({ type: "track", query: nameOfSomething, limit: 1}, function(err, data) {
			if (err) {
				return console.log('Error occurred: ' + err)
			}

			console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
			console.log('Song Title: ' + nameOfSomething); 
			console.log('Preview: ' + data.tracks.items[0].album.external_urls.spotify); 
			console.log('Album: ' + data.tracks.items[0].album.name); 
		})

	} else {
		spotify.search({ type: 'track', query: nameOfSomething, limit: 1 }, function(err, data) {
		
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		 
		console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
		console.log('Song Title: ' + nameOfSomething); 
		console.log('Preview: ' + data.tracks.items[0].album.external_urls.spotify); 
		console.log('Album: ' + data.tracks.items[0].album.name); 
		});
	}
}


function doIt() {
	var fs = require('fs')
	fs.readFile('random.txt', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  content = data;
	  var randomText = data
	  var textArray = randomText.split(',');	  
	  var textCommand = textArray[0];	   
	  queryString = textArray[1];
	  console.log(queryString)
	  if(command === 'do-what-it-says'){
	    if(textCommand === 'spotify-this-song') {
	    	var Spotify = require('node-spotify-api'); 
			var spotify = new Spotify({
			  id: keys.spotify.id,
			  secret: keys.spotify.secret
			});
	    	spotify.search({ type: 'track', query: queryString, limit: 1 }, function(err, data) {
		
			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }
			 
			console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
			console.log('Song Title: ' + queryString); 
			console.log('Preview: ' + data.tracks.items[0].album.external_urls.spotify); 
			console.log('Album: ' + data.tracks.items[0].album.name); 
			});
	    	}
		}
	})
}

