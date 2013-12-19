var http = require("http");


var data = '';
var webAddress = [];
var speechText = [];
var counter = 0;

var stateThatUnion = function (websites) {
	for (var i = 0; i < websites.length; i++) {
		runHTTP(websites[i], parseSpeech)
	}
};

var getIndicesOf = function (searchStr, str, caseSensitive) {
    var startIndex = 0, searchStrLen = searchStr.length;
    var index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
};

var parseSpeech = function (speechData) {
	var startOfSpeech = getIndicesOf('span class="displaytext">', speechData, false);
	var endOfSpeech = getIndicesOf('</span><hr noshade="noshade" size="1"><span', speechData, false);
	speechText[counter] = speechData.slice( startOfSpeech[0] + 25 , endOfSpeech[0]).replace(/<p>/g, '  ');
	counter++;
	console.log(counter);
};


var potusLinks = function(data) {

		var links = getIndicesOf('class="doclist"><a href=', data, false);
		for (var i = 0; i < links.length; i++) {
			var temp = links[i] + 25;
			if (data.slice(temp + 54, temp + 55) === '"') {
				webAddress[i] = data.slice(temp, temp + 54);
			} else if (data.slice(temp + 54, temp + 55) === '>') {
				webAddress[i] = data.slice(temp, temp + 53);
			} else {
				webAddress[i] = data.slice(temp, temp + 52);
			}
		}
		stateThatUnion(webAddress);
};

var runHTTP = function(path, cb) {
	http.get(path, function(result) {
			result.on("data", function(chunk) {
				data += chunk;
			});
			result.on('end', function() {
				cb(data);
			});
	}).on('error', function(e) {
		console.log("Error: " + options.host + "\n" + e.message); 
		console.log( e.stack );
	});
};

runHTTP('http://www.presidency.ucsb.edu/sou.php', potusLinks);

