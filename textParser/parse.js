var http = require("http");


var webAddress = [];
var stateOfUnionSpeeches = [];
var counter = 0;

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

var getSpeechDate = function(title) {
	var startOfDate = getIndicesOf(' - ', title, false)[0] + 3;
	// console.log('the index start Date is ' + startOfDate);
	stateOfUnionSpeeches[counter].date = title.slice(startOfDate).slice(-4);
	// console.log(stateOfUnionSpeeches[counter].date);

	counter++;
	if (counter < webAddress.length) { // webaddress.length gives the entire set of speeches
		runHTTP(webAddress[counter], parseSpeech);
	} else {
		outputData = JSON.stringify(stateOfUnionSpeeches);
		console.log(outputData);
		return outputData;
	}
};

var getPresidentName = function(title) {
	var endOfPresident = getIndicesOf(':', title, false);
	stateOfUnionSpeeches[counter].president = title.slice(0, endOfPresident[0]);
	getSpeechDate(title);
};

var getSOTUmetaData = function(speechData) {
	var startOfTitle = getIndicesOf('<meta name="title" content="', speechData, false);
	var endOfTitle = getIndicesOf('" /><link rel="image_src" href=', speechData, false);
	var title = speechData.slice(startOfTitle[0] + 28, endOfTitle[0]);
	getPresidentName(title);
};

var parseSpeech = function (speechData) {
	var startOfSpeech = getIndicesOf('span class="displaytext">', speechData, false);
	var endOfSpeech = getIndicesOf('</span><hr noshade="noshade" size="1"><span', speechData, false);
	stateOfUnionSpeeches[counter] = {};
	stateOfUnionSpeeches[counter].speech = speechData.slice( startOfSpeech[0] + 25 , endOfSpeech[0]).replace(/<p>/g, '  ');
	getSOTUmetaData(speechData);
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
		runHTTP(webAddress[counter], parseSpeech);
};

var runHTTP = function(path, cb) {
	http.get(path, function(result) {
			var data = '';
			result.on("data", function(chunk) {
				data += chunk;
			});
			result.on('end', function() {
				cb(data);
			});
	}).on('error', function(e) {
		// console.log("Error: " + options.host + "\n" + e.message);
		console.log( e.stack );
	});
};

runHTTP('http://www.presidency.ucsb.edu/sou.php', potusLinks);

