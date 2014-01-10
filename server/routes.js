
var pg = require('pg');
var url = require('url');

var conString = 'postgres://awsuser:mypassword@mydbinstance.cxod0usrhuqb.us-west-1.rds.amazonaws.com:5432/mydb';

var client = new pg.Client(conString);

client.connect();

module.exports.words = function(request, response) {
  var queryArgs = url.parse(request.url, true).query;
  client.query("SELECT word FROM " + queryArgs.president + ";", function(err, result) {
    var temp = [];
    if (result === undefined) {
      response.json([]);
    } else {
      for (var i=0;i<result.rows.length;i++) {
        temp.push(result.rows[i].word);
      }
      response.json(temp);
    }
  });
};

module.exports.collocation = function(request, response) {
  var queryArgs = url.parse(request.url, true).query;

  client.query("SELECT * FROM " + queryArgs.president + " WHERE word = '" + queryArgs.word + "';", function(err, result) {
    if (err) {
      return console.error('error running query', err);
    }
    var row = result.rows[0];
    if (row !== undefined) {
      response.json([row.word, row.collo1, row.collo2, row.collo3, row.collo4, row.collo5]); 
    } else {
    response.json([]);
    }
  });
};

module.exports.frequency = function(request, response) {
  var queryArgs = url.parse(request.url, true).query;

  client.query("SELECT * FROM " + queryArgs.president + " WHERE word = '" + queryArgs.word + "';", function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    var row = result.rows[0];
    if (row === undefined) {
      response.json([]);
      response.end();
    } else {
      var temp = [row.word];
      for (var i=1;i<14;i++) {
        if (row['year'+i] !== undefined)
          temp.push(row['year'+i]);
      }
      response.json(temp);
    }
  });
};

//the only security we have right now is through obfuscation..
module.exports.receiveData = function(request, response) {
  console.log('Receiving data..');
  var data = request.body;
  for (var president in data) {
    client.query("CREATE TABLE "+president+" ("
      +"id      SERIAL PRIMARY KEY,"
      +"word    varchar(40),"
      +"collo1  varchar(40),"
      +"collo2  varchar(40),"
      +"collo3  varchar(40),"
      +"collo4  varchar(40),"
      +"collo5  varchar(40),"
      +"year1   integer,"
      +"year2   integer,"
      +"year3   integer,"
      +"year4   integer,"
      +"year5   integer,"
      +"year6   integer,"
      +"year7   integer,"
      +"year8   integer,"
      +"year9   integer,"
      +"year10   integer,"
      +"year11   integer,"
      +"year12   integer,"
      +"year13   integer"
      +");");
    console.log('Create Table for '+president);
  }
  


//######################################################  

var presidentObject = {'Barack Obama': {'February 12, 2013': {'right': {'count': 16, 'collocates': {'lets': 3, 'right': 18, 'cant': 3, 'america': 4, 'keep': 3}}, 'help': {'count': 12, 'collocates': {'need': 3, 'create': 2, 'help': 12, 'want': 2, 'back': 2}}, 'people': {'count': 18, 'collocates': {'many': 3, 'american': 6, 'get': 2, 'young': 2, 'people': 18}}, 'energy': {'count': 18, 'collocates': {'sources': 2, 'energy': 18, 'lets': 3, 'nearly': 2, 'years': 2}}, 'tax': {'count': 13, 'collocates': {'move': 2, 'businesses': 3, 'code': 3, 'tax': 13, 'reform': 4}}, 'years': {'count': 22, 'collocates': {'ago': 5, 'home': 3, 'last': 4, '4': 3, 'years': 22}}, 'tonight': {'count': 19, 'collocates': {'tonight': 19, 'propose': 3, 'im': 6, 'rest': 2, 'announcing': 4}}, 'vote': {'count': 14, 'collocates': {'vote': 24, 'deserve': 14, 'gabby': 3, 'families': 5, 'simple': 4}}, 'cant': {'count': 10, 'collocates': {'afford': 2, 'cant': 10, 'right': 3, 'e': 2, 'lets': 2}}, 'im': {'count': 11, 'collocates': {'tonight': 6, 'partnership': 2, 'im': 11, 'proposing': 3, 'announcing': 4}}, 'together': {'count': 10, 'collocates': {'congress': 2, 'parties': 2, 'reform': 2, 'together': 10, 'years': 2}}, 'want': {'count': 11, 'collocates': {'vote': 2, 'also': 2, 'help': 2, 'want': 13, 'one': 2}}, 'year': {'count': 17, 'collocates': {'wage': 4, 'go': 2, 'minimum': 4, 'last': 4, 'year': 19}}, 'need': {'count': 18, 'collocates': {'need': 18, 'like': 2, 'help': 3, 'stabilize': 2, 'government': 3}}, 'families': {'count': 17, 'collocates': {'vote': 5, 'deserve': 4, 'aurora': 2, 'families': 17, 'stronger': 3}}, 'education': {'count': 14, 'collocates': {'cuts': 2, 'education': 14, 'young': 2, 'th': 2, 'higher': 6}}, 'even': {'count': 16, 'collocates': {'even': 16, 'lets': 3, 'reduce': 2, 'like': 2, 'cuts': 2}}, 'one': {'count': 14, 'collocates': {'long': 2, 'crisis': 2, 'd': 2, 'another': 2, 'one': 14}}, 'would': {'count': 12, 'collocates': {'folks': 2, 'get': 2, 'th': 2, 'would': 14, 'cuts': 3}}, 'make': {'count': 20, 'collocates': {'also': 3, 'make': 20, 'sure': 8, 'works': 3, 'get': 3}}, 'also': {'count': 15, 'collocates': {'also': 15, 'lets': 4, 'america': 3, 'make': 3, 'progress': 2}}, 'lets': {'count': 22, 'collocates': {'also': 4, 'lets': 26, 'america': 4, 'done': 4, 'get': 7}}, 'deficit': {'count': 11, 'collocates': {'reduction': 6, 'trillion': 3, 'reduce': 2, 'deficit': 11, 'goal': 2}}, 'way': {'count': 10, 'collocates': {'describes': 2, 'r': 2, 'made': 4, 'way': 12, 'thats': 3}}, 'new': {'count': 24, 'collocates': {'schools': 3, 'new': 24, 'jobs': 5, 'york': 3, 'thats': 3}}, 'economy': {'count': 12, 'collocates': {'help': 2, 'stronger': 3, 'jobs': 4, 'know': 3, 'economy': 12}}, 'jobs': {'count': 32, 'collocates': {'bringing': 3, 'new': 5, 'american': 6, 'jobs': 32, 'create': 4}}, 'congress': {'count': 17, 'collocates': {'ask': 3, 'years': 2, 'jobs': 3, 'congress': 17, 'act': 3}}, 'get': {'count': 22, 'collocates': {'lets': 7, 'iapplausei': 4, 'done': 12, 'time': 4, 'get': 24}}, 'job': {'count': 13, 'collocates': {'job': 13, 'good': 3, 'kids': 2, 'school': 2, 'like': 2}}, 'every': {'count': 14, 'collocates': {'e': 3, 'every': 14, 'day': 3, 'us': 4, 'expect': 3}}, 'know': {'count': 13, 'collocates': {'done': 2, 'stable': 2, 'stronger': 2, 'know': 13, 'economy': 3}}, 'america': {'count': 23, 'collocates': {'states': 4, 'lets': 4, 'america': 23, 'right': 4, 'united': 4}}, 'must': {'count': 17, 'collocates': {'part': 4, 'keep': 4, 'north': 2, 'threat': 2, 'must': 17}}, 'states': {'count': 14, 'collocates': {'states': 16, 'united': 8, 'right': 2, 'best': 2, 'america': 4}}, 'last': {'count': 11, 'collocates': {'saw': 2, 'year': 4, 'last': 11, 'congress': 2, 'years': 4}}, 'like': {'count': 17, 'collocates': {'even': 2, 'job': 2, 'energy': 2, 'like': 17, 'countries': 4}}, 'middle': {'count': 10, 'collocates': {'middle': 10, 'east': 2, 'citizens': 2, 'class': 7, 'thriving': 2}}, 'home': {'count': 12, 'collocates': {'home': 12, 'men': 2, 'families': 2, 'fastest': 2, 'years': 3}}, 'country': {'count': 13, 'collocates': {'work': 2, 'country': 13, 'hard': 2, 'across': 3, 'idea': 2}}, 'work': {'count': 19, 'collocates': {'well': 3, 'work': 19, 'hard': 4, 'people': 2, 'get': 2}}, 'well': {'count': 15, 'collocates': {'businesses': 3, 'work': 3, 'well': 15, 'like': 2, 'new': 3}}, 'us': {'count': 19, 'collocates': {'task': 3, 'every': 3, 'expect': 3, 'us': 19, 'thank': 2}}, 'keep': {'count': 11, 'collocates': {'weve': 2, 'promises': 4, 'must': 4, 'right': 3, 'keep': 13}}, 'american': {'count': 19, 'collocates': {'american': 21, 'years': 2, 'jobs': 6, 'opportunities': 2, 'people': 6}}, 'done': {'count': 10, 'collocates': {'lets': 4, 'iapplausei': 4, 'done': 12, 'time': 3, 'get': 12}}, 'time': {'count': 16, 'collocates': {'forms': 2, 'get': 4, 'done': 3, 'reform': 2, 'time': 18}}, 'americans': {'count': 10, 'collocates': {'whose': 2, 'b': 2, 'americans': 10, 'look': 2, 'millions': 2}}, 'security': {'count': 10, 'collocates': {'real': 2, 'security': 10, 'benefits': 2, 'take': 2, 'social': 2}}, 'thats': {'count': 18, 'collocates': {'new': 3, 'made': 3, 'administration': 2, 'way': 3, 'thats': 24}}}, 'January 27, 2010': {'right': {'count': 18, 'collocates': {'americans': 4, 'thing': 3, 'right': 20, 'jobs': 4, 'get': 4}}, 'financial': {'count': 11, 'collocates': {'cant': 2, 'one': 2, 'financial': 13, 'system': 3, 'took': 3}}, 'help': {'count': 11, 'collocates': {'save': 2, 'jobs': 4, 'help': 11, 'working': 2, 'year': 3}}, 'office': {'count': 11, 'collocates': {'day': 2, 'year': 2, 'took': 6, 'office': 11, 'deficit': 3}}, 'people': {'count': 32, 'collocates': {'american': 11, 'lives': 4, 'lets': 5, 'know': 3, 'people': 32}}, 'energy': {'count': 15, 'collocates': {'profitable': 2, 'americans': 2, 'energy': 19, 'jobs': 3, 'clean': 13}}, 'tax': {'count': 13, 'collocates': {'jobs': 3, 'credit': 4, 'tax': 13, 'companies': 3, 'cuts': 6}}, 'years': {'count': 20, 'collocates': {'ago': 8, '200': 4, '100': 3, 'forgiven': 3, 'years': 28}}, 'tonight': {'count': 11, 'collocates': {'tonight': 11, 'americans': 2, 'right': 2, 'im': 5, 'proposing': 2}}, 'go': {'count': 11, 'collocates': {'go': 13, 'care': 2, 'americans': 2, 'broke': 2, 'one': 2}}, 'cant': {'count': 11, 'collocates': {'afford': 4, 'cant': 11, 'financial': 2, 'day': 2, 'know': 2}}, 'americans': {'count': 28, 'collocates': {'work': 4, 'many': 7, 'right': 4, 'americans': 28, 'still': 3}}, 'im': {'count': 13, 'collocates': {'tonight': 5, 'let': 3, 'interested': 3, 'im': 13, 'proposing': 3}}, 'year': {'count': 27, 'collocates': {'help': 3, 'thats': 4, 'last': 11, 'took': 4, 'year': 29}}, 'need': {'count': 14, 'collocates': {'need': 14, 'jobs': 2, 'families': 2, 'still': 2, 'financial': 2}}, 'families': {'count': 17, 'collocates': {'middle': 4, 'families': 17, 'class': 4, 'working': 3, 'years': 2}}, 'still': {'count': 11, 'collocates': {'need': 2, 'still': 11, 'americans': 3, 'democrats': 2, 'would': 2}}, 'one': {'count': 18, 'collocates': {'go': 2, 'small': 2, 'nation': 2, 'move': 2, 'one': 20}}, 'would': {'count': 20, 'collocates': {'americans': 3, 'still': 2, 'approach': 3, 'plan': 3, 'would': 20}}, 'make': {'count': 14, 'collocates': {'big': 2, 'make': 14, 'jobs': 2, 'energy': 2, 'es': 2}}, 'give': {'count': 14, 'collocates': {'small': 2, 'credit': 2, 'people': 2, 'businesses': 2, 'give': 14}}, 'also': {'count': 13, 'collocates': {'even': 2, 'also': 13, 'right': 2, 'know': 2, 'act': 2}}, 'lets': {'count': 15, 'collocates': {'lets': 17, 'get': 4, 'done': 4, 'us': 4, 'people': 5}}, 'health': {'count': 11, 'collocates': {'politics': 2, 'americans': 2, 'health': 11, 'insurance': 3, 'care': 7}}, 'take': {'count': 16, 'collocates': {'d': 2, 'money': 2, 'risks': 2, 'take': 18, 'deposits': 2}}, 'new': {'count': 20, 'collocates': {'small': 4, 'new': 22, 'workers': 3, 'businesses': 3, 'decade': 5}}, 'many': {'count': 13, 'collocates': {'many': 13, 'weve': 2, 'still': 2, 'americans': 7, 'help': 2}}, 'economy': {'count': 15, 'collocates': {'leads': 3, 'nation': 5, 'year': 2, 'took': 3, 'economy': 15}}, 'even': {'count': 14, 'collocates': {'even': 14, 'reform': 2, 'said': 2, 'worse': 2, 'get': 2}}, 'weve': {'count': 11, 'collocates': {'year': 2, 'get': 2, 'weve': 11, 'right': 2, 'terrorists': 2}}, 'jobs': {'count': 23, 'collocates': {'create': 6, 'right': 4, 'jobs': 23, 'help': 4, 'bill': 4}}, 'get': {'count': 15, 'collocates': {'lets': 4, 'right': 4, 'done': 4, 'people': 3, 'get': 19}}, 'government': {'count': 12, 'collocates': {'spending': 4, 'people': 2, 'freeze': 2, 'give': 2, 'government': 12}}, 'took': {'count': 13, 'collocates': {'deficit': 3, 'financial': 3, 'took': 13, 'office': 6, 'year': 4}}, 'nation': {'count': 12, 'collocates': {'one': 2, 'energy': 2, 'economy': 5, 'people': 2, 'nation': 12}}, 'know': {'count': 20, 'collocates': {'eager': 3, 'im': 3, 'let': 9, 'know': 26, 'people': 3}}, 'america': {'count': 18, 'collocates': {'states': 4, 'america': 18, 'jobs': 3, 'united': 4, 'n': 3}}, 'bill': {'count': 13, 'collocates': {'house': 3, 'bill': 13, 'jobs': 4, 'right': 2, 'pass': 2}}, 'last': {'count': 16, 'collocates': {'thats': 3, 'last': 16, 'took': 3, 'lost': 3, 'year': 11}}, 'country': {'count': 13, 'collocates': {'families': 2, 'country': 13, 'love': 2, 'across': 4, 'us': 2}}, 'work': {'count': 21, 'collocates': {'put': 3, 'e': 3, 'work': 23, 'americans': 4, 'people': 3}}, 'us': {'count': 19, 'collocates': {'respond': 2, 'lets': 4, 'decades': 2, 'sent': 2, 'us': 21}}, 'theyre': {'count': 12, 'collocates': {'place': 2, 'lending': 2, 'labor': 2, 'values': 6, 'theyre': 12}}, 'american': {'count': 18, 'collocates': {'american': 18, 'get': 3, 'lives': 4, 'lets': 3, 'people': 11}}, 'values': {'count': 12, 'collocates': {'living': 3, 'labor': 3, 'values': 20, 'business': 3, 'theyre': 6}}, 'clean': {'count': 12, 'collocates': {'new': 2, 'energy': 13, 'jobs': 3, 'th': 2, 'clean': 12}}, 'time': {'count': 18, 'collocates': {'new': 2, 'get': 3, 'lobbyists': 2, 'o': 2, 'time': 20}}, 'businesses': {'count': 18, 'collocates': {'small': 8, 'new': 4, 'workers': 3, 'businesses': 20, 'help': 2}}, 'security': {'count': 12, 'collocates': {'medicare': 3, 'security': 12, 'medicaid': 3, 'national': 3, 'social': 3}}, 'thats': {'count': 26, 'collocates': {'years': 2, 'year': 4, 'last': 3, 'ts': 2, 'thats': 28}}}, 'January 25, 2011': {'people': {'count': 31, 'collocates': {'must': 3, 'thats': 7, 'american': 3, 'us': 3, 'people': 31}}, 'tax': {'count': 10, 'collocates': {'cuts': 2, 'spending': 2, 'code': 2, 'tax': 10, 'years': 2}}, 'one': {'count': 14, 'collocates': {'let': 2, 'nation': 2, 'last': 3, 'people': 2, 'one': 14}}, 'tonight': {'count': 17, 'collocates': {'tonight': 17, 'proposing': 2, 'let': 2, 'o': 2, 'us': 3}}, 'good': {'count': 9, 'collocates': {'schools': 3, 'meant': 2, 'good': 11, 'want': 3, 'thats': 3}}, 'americans': {'count': 12, 'collocates': {'paychecks': 2, 'percent': 3, 'tax': 2, 'americans': 12, 'isnt': 2}}, 'want': {'count': 15, 'collocates': {'win': 2, 'life': 4, 'good': 3, 'future': 3, 'want': 19}}, 'year': {'count': 15, 'collocates': {'go': 2, 'steps': 2, 'last': 5, 'new': 2, 'year': 15}}, 'need': {'count': 16, 'collocates': {'need': 16, 'new': 2, 'jobs': 2, 'take': 3, 'get': 2}}, 'education': {'count': 11, 'collocates': {'high': 3, 'school': 4, 'education': 11, 'beyond': 2, 'goes': 2}}, 'best': {'count': 10, 'collocates': {'repair': 1, 'colleges': 1, 'whats': 3, 'help': 1, 'best': 10}}, 'america': {'count': 18, 'collocates': {'better': 3, 'america': 18, 'place': 3, 'l': 2, 'nation': 2}}, 'would': {'count': 9, 'collocates': {'agreements': 2, 'called': 2, 'idea': 2, 'would': 9, 'trade': 3}}, 'spending': {'count': 11, 'collocates': {'spending': 19, 'health': 4, 'defense': 3, 'domestic': 5, 'care': 4}}, 'make': {'count': 23, 'collocates': {'make': 23, 'sure': 5, 'place': 3, 'lets': 4, 'life': 3}}, 'get': {'count': 12, 'collocates': {'need': 2, 'first': 3, 'well': 3, 'know': 3, 'get': 12}}, 'next': {'count': 10, 'collocates': {'10': 2, 'years': 5, '5': 2, 'back': 2, 'next': 10}}, 'also': {'count': 12, 'collocates': {'also': 12, 'american': 2, 'todays': 1, 'help': 1, 'us': 2}}, 'take': {'count': 14, 'collocates': {'need': 3, 'win': 2, 'school': 2, 'e': 3, 'take': 14}}, 'new': {'count': 36, 'collocates': {'industries': 3, 'new': 46, 'jobs': 7, 'e': 4, 'years': 3}}, 'care': {'count': 9, 'collocates': {'spending': 4, 'law': 3, 'health': 4, 'like': 2, 'care': 9}}, 'law': {'count': 9, 'collocates': {'making': 2, 'law': 9, 'health': 3, 'e': 2, 'care': 3}}, 'deficit': {'count': 10, 'collocates': {'spending': 2, 'e': 2, 'deficit': 10, 'way': 2, 'years': 2}}, 'weve': {'count': 13, 'collocates': {'american': 3, 'weve': 13, 'last': 4, 'begun': 3, 'years': 3}}, 'jobs': {'count': 24, 'collocates': {'industries': 3, 'new': 7, 'create': 3, 'jobs': 24, 'e': 3}}, 'congress': {'count': 10, 'collocates': {'ask': 3, 'republicans': 2, 'well': 2, 'help': 1, 'congress': 10}}, 'government': {'count': 18, 'collocates': {'competent': 3, 'means': 2, 'thats': 5, 'people': 2, 'government': 18}}, 'students': {'count': 9, 'collocates': {'students': 9, 'tech': 2, 'ask': 2, 'come': 2, 'new': 2}}, 'republicans': {'count': 9, 'collocates': {'congress': 2, 'republicans': 9, 'work': 2, 'democrats': 8, 'together': 2}}, 'nation': {'count': 15, 'collocates': {'earth': 3, 'apart': 2, 'difference': 2, 'o': 3, 'nation': 15}}, 'every': {'count': 12, 'collocates': {'country': 2, 'live': 2, 'every': 12, 'day': 2, 'child': 2}}, 'know': {'count': 16, 'collocates': {'deserve': 3, 'people': 2, 'debate': 2, 'know': 20, 'get': 3}}, 'schools': {'count': 11, 'collocates': {'schools': 13, 'away': 2, 'good': 3, 'work': 2, 'want': 2}}, 'world': {'count': 15, 'collocates': {'world': 15, 'require': 2, 'changed': 2, 'change': 2, 'new': 3}}, 'years': {'count': 25, 'collocates': {'ago': 4, 'next': 5, '2': 7, 'last': 6, 'years': 25}}, 'come': {'count': 13, 'collocates': {'students': 2, 'new': 2, 'b': 2, 'come': 13, 'known': 2}}, 'must': {'count': 9, 'collocates': {'powermdashit': 2, 'believe': 2, 'people': 3, 'us': 4, 'must': 11}}, 'last': {'count': 18, 'collocates': {'2': 5, 'weve': 4, 'year': 5, 'last': 18, 'years': 6}}, 'like': {'count': 12, 'collocates': {'feel': 2, 'think': 2, 'nations': 2, 'like': 12, 'care': 2}}, 'country': {'count': 13, 'collocates': {'every': 2, 'country': 13, 'race': 2, 'love': 2, 'across': 2}}, 'work': {'count': 20, 'collocates': {'schools': 2, 'work': 20, 'democrats': 2, 'together': 3, 'd': 2}}, 'well': {'count': 14, 'collocates': {'years': 2, 'well': 14, 'know': 2, 'us': 3, 'get': 3}}, 'us': {'count': 33, 'collocates': {'must': 4, 'people': 3, 'th': 3, 'us': 39, 'apart': 4}}, 'theyre': {'count': 10, 'collocates': {'noticed': 1, 'changed': 2, 'ilaughteri': 2, 'right': 1, 'theyre': 10}}, 'american': {'count': 19, 'collocates': {'jobs': 3, 'american': 23, 'weve': 3, 'people': 3, 'thats': 4}}, 'future': {'count': 15, 'collocates': {'win': 7, 'step': 4, 'future': 15, 'want': 3, 'winning': 3}}, 'time': {'count': 14, 'collocates': {'days': 2, 'act': 2, 'nation': 2, '4': 2, 'time': 16}}, 'im': {'count': 10, 'collocates': {'tonight': 2, 'willing': 7, 'im': 12, 'help': 2, 'asking': 2}}, 'first': {'count': 11, 'collocates': {'go': 2, 'get': 3, 'college': 3, 'time': 2, 'first': 11}}, 'thats': {'count': 24, 'collocates': {'good': 3, 'government': 5, 'people': 7, 'american': 4, 'thats': 30}}}, 'February 24, 2009': {'dont': {'count': 10, 'collocates': {'need': 5, 'end': 2, 'beyond': 2, 'whats': 2, 'dont': 10}}, 'people': {'count': 21, 'collocates': {'helping': 5, 'put': 3, 'american': 6, 'us': 3, 'people': 21}}, 'money': {'count': 10, 'collocates': {'even': 3, 'money': 10, 'enough': 2, 'buy': 2, 'put': 2}}, 'energy': {'count': 14, 'collocates': {'new': 3, 'energy': 16, 'power': 3, 'renewable': 4, 'care': 3}}, 'tax': {'count': 10, 'collocates': {'receive': 3, 'breaks': 5, 'cut': 4, 'tax': 18, 'code': 2}}, 'years': {'count': 15, 'collocates': {'come': 2, 'weve': 2, 'college': 2, '7': 2, 'years': 15}}, 'tonight': {'count': 12, 'collocates': {'tonight': 12, 'american': 4, 'every': 4, 'know': 2, 'stand': 2}}, 'cost': {'count': 11, 'collocates': {'cost': 13, 'health': 5, 'amer': 2, 'oil': 2, 'care': 5}}, 'americans': {'count': 14, 'collocates': {'college': 2, 'ordinary': 2, 'americans': 14, 'lost': 2, 'years': 2}}, 'year': {'count': 9, 'collocates': {'quarter': 2, 'dollars': 2, 'million': 3, 'wait': 2, 'year': 11}}, 'need': {'count': 9, 'collocates': {'need': 11, 'agribusiness': 1, 'dont': 5, 'resources': 2, 'reform': 2}}, 'education': {'count': 14, 'collocates': {'home': 2, 'energy': 3, 'education': 14, 'health': 2, 'economy': 2}}, 'crisis': {'count': 11, 'collocates': {'recession': 2, 'respond': 1, 'work': 2, 'crisis': 11, 'know': 2}}, 'one': {'count': 11, 'collocates': {'single': 2, 'dime': 2, 'major': 1, 'genera': 1, 'one': 11}}, 'recovery': {'count': 11, 'collocates': {'d': 2, 'n': 2, 'recovery': 11, 'passed': 2, 'plan': 8}}, 'know': {'count': 24, 'collocates': {'also': 5, 'american': 4, 'every': 4, 'know': 24, 'w': 3}}, 'reform': {'count': 11, 'collocates': {'need': 2, 'care': 6, 'health': 6, 'wait': 2, 'reform': 11}}, 'make': {'count': 14, 'collocates': {'even': 2, 'make': 14, 'businesses': 2, 'energy': 2, 'economy': 3}}, 'next': {'count': 10, 'collocates': {'years': 2, 'payment': 3, 'quarter': 3, 'budget': 3, 'next': 16}}, 'also': {'count': 16, 'collocates': {'also': 16, 'years': 2, 'health': 2, 'know': 5, 'must': 4}}, 'health': {'count': 20, 'collocates': {'cost': 5, 'must': 3, 'reform': 6, 'health': 20, 'care': 16}}, 'deficit': {'count': 9, 'collocates': {'bring': 3, 'economic': 2, 'crisis': 2, 'deficit': 9, 'worse': 3}}, 'new': {'count': 20, 'collocates': {'industries': 2, 'new': 22, 'energy': 3, 'renewed': 2, 'lead': 2}}, 'care': {'count': 18, 'collocates': {'cost': 5, 'energy': 3, 'reform': 6, 'health': 16, 'care': 18}}, 'economy': {'count': 22, 'collocates': {'depends': 3, 'global': 2, 'education': 2, 'make': 3, 'economy': 24}}, 'even': {'count': 10, 'collocates': {'even': 12, 'money': 3, 'dries': 2, 'make': 2, 'credit': 3}}, 'weve': {'count': 12, 'collocates': {'already': 3, 'weve': 12, 'years': 2, 'investment': 2, 'made': 3}}, 'jobs': {'count': 14, 'collocates': {'sector': 2, 'industries': 2, 'save': 2, 'jobs': 18, 'new': 2}}, 'congress': {'count': 10, 'collocates': {'ask': 4, 'provide': 2, 'legislation': 2, 'send': 3, 'congress': 10}}, 'nation': {'count': 10, 'collocates': {'hanistan': 1, 'en': 1, 'ses': 1, 'dont': 1, 'nation': 10}}, 'every': {'count': 20, 'collocates': {'tonight': 4, 'issue': 4, 'american': 10, 'every': 22, 'know': 4}}, 'plan': {'count': 21, 'collocates': {'stability': 2, 'rec': 2, 'help': 2, 'plan': 23, 'recovery': 8}}, 'meet': {'count': 9, 'collocates': {'meet': 11, 'america': 3, 'goal': 5, 'world': 3, 'know': 3}}, 'put': {'count': 9, 'collocates': {'put': 11, 'money': 2, 'work': 4, 'back': 4, 'people': 3}}, 'world': {'count': 10, 'collocates': {'world': 10, 'thats': 2, 'century': 2, 'ability': 1, 'meet': 3}}, 'america': {'count': 18, 'collocates': {'states': 3, 'meet': 3, 'america': 18, 'united': 3, 'ost': 2}}, 'day': {'count': 11, 'collocates': {'born': 2, 'begin': 2, 'reckoning': 2, 'day': 15, 'time': 3}}, 'must': {'count': 15, 'collocates': {'also': 4, 'address': 3, 'health': 3, 'concerns': 3, 'must': 17}}, 'country': {'count': 12, 'collocates': {'country': 14, 'needs': 2, 'across': 3, 'know': 2, 'quitting': 2}}, 'work': {'count': 9, 'collocates': {'put': 4, 'work': 9, 'end': 2, 'back': 2, 'people': 2}}, 'children': {'count': 9, 'collocates': {'jobs': 2, 'debt': 2, 'responsibility': 2, 'children': 11, 'tell': 2}}, 'budget': {'count': 13, 'collocates': {'reform': 2, 'looks': 2, 'budget': 15, 'submit': 2, 'next': 3}}, 'us': {'count': 19, 'collocates': {'people': 3, 'makes': 6, 'sent': 3, 'us': 29, 'know': 3}}, 'american': {'count': 26, 'collocates': {'tonight': 4, 'american': 28, 'every': 10, 'know': 4, 'people': 6}}, 'future': {'count': 10, 'collocates': {'also': 2, 'future': 10, 'responsibility': 2, 'take': 3, 'time': 2}}, 'responsibility': {'count': 10, 'collocates': {'thats': 2, 'future': 2, 'responsibility': 10, 'children': 2, 'take': 2}}, 'time': {'count': 16, 'collocates': {'know': 2, 'children': 2, 'day': 3, 'taxpayer': 2, 'time': 16}}, 'banks': {'count': 10, 'collocates': {'banks': 10, 'helping': 5, 'little': 2, 'assistance': 2, 'people': 2}}, 'college': {'count': 10, 'collocates': {'loans': 3, 'bill': 1, 'college': 10, 'americans': 2, 'years': 2}}, 'thats': {'count': 14, 'collocates': {'world': 2, 'american': 3, 'issue': 3, 'quitters': 2, 'thats': 14}}}, 'January 24, 2012': {'right': {'count': 26, 'collocates': {'lets': 3, 'right': 30, 'tax': 5, 'know': 4, 'thats': 5}}, 'financial': {'count': 10, 'collocates': {'ab': 1, 'prevent': 1, 'major': 1, 'r': 2, 'financial': 10}}, 'help': {'count': 14, 'collocates': {'plant': 2, 'energy': 2, 'get': 2, 'help': 14, 'people': 3}}, 'people': {'count': 21, 'collocates': {'afford': 4, 'work': 3, 'help': 3, 'young': 2, 'people': 21}}, 'energy': {'count': 23, 'collocates': {'new': 3, 'energy': 23, 'american': 4, 'clean': 8, '3': 3}}, 'tax': {'count': 23, 'collocates': {'code': 4, 'companies': 3, 'right': 5, 'tax': 25, 'get': 9}}, 'back': {'count': 16, 'collocates': {'go': 3, 'bring': 4, 'jobs': 2, 'back': 16, 'home': 2}}, 'one': {'count': 23, 'collocates': {'thought': 5, 'program': 4, 'nation': 5, 'serving': 4, 'one': 39}}, 'tonight': {'count': 12, 'collocates': {'tonight': 12, 'directing': 2, 'im': 5, 'back': 2, 'veterans': 2}}, 'cant': {'count': 14, 'collocates': {'cant': 14, 'united': 3, 'every': 2, 'thats': 2, 'people': 2}}, 'oil': {'count': 10, 'collocates': {'2': 3, 'oil': 14, 'percent': 3, 'right': 2, 'years': 2}}, 'im': {'count': 15, 'collocates': {'tonight': 5, 'directing': 2, 'im': 15, 'milk': 2, 'jobs': 2}}, 'want': {'count': 12, 'collocates': {'home': 2, 'tax': 2, 'business': 3, 'want': 12, 'help': 2}}, 'year': {'count': 19, 'collocates': {'even': 3, 'get': 5, 'every': 3, 'million': 4, 'year': 25}}, 'need': {'count': 13, 'collocates': {'need': 13, 'afford': 2, 'colleges': 2, 'community': 2, 'projects': 2}}, 'home': {'count': 13, 'collocates': {'home': 13, 'come': 3, 'back': 2, 'send': 3, 'bring': 2}}, 'dont': {'count': 13, 'collocates': {'rules': 2, 'away': 3, 'weve': 2, 'dont': 13, 'investments': 3}}, 'america': {'count': 30, 'collocates': {'new': 3, 'weve': 4, 'america': 30, 'jobs': 3, 'last': 3}}, 'built': {'count': 12, 'collocates': {'great': 3, 'america': 3, 'last': 6, 'built': 14, 'economy': 6}}, 'pay': {'count': 11, 'collocates': {'pay': 11, 'use': 2, 'tax': 3, 'taxes': 2, 'means': 2}}, 'make': {'count': 15, 'collocates': {'make': 15, 'weve': 2, 'school': 2, 'difference': 2, 'year': 3}}, 'also': {'count': 12, 'collocates': {'also': 12, 'innovation': 2, 'jobs': 2, 'made': 2, 'making': 3}}, 'lets': {'count': 13, 'collocates': {'lets': 13, 'right': 3, 'done': 2, 'agree': 2, 'get': 2}}, 'new': {'count': 27, 'collocates': {'rules': 3, 'new': 35, 'american': 6, 'weve': 3, 'jobs': 7}}, 'youre': {'count': 12, 'collocates': {'lender': 2, 'ones': 2, 'youre': 12, 'rising': 2, 'manufacturer': 2}}, 'weve': {'count': 19, 'collocates': {'rules': 3, 'new': 3, 'weve': 19, 'deficit': 3, 'hunger': 2}}, 'jobs': {'count': 34, 'collocates': {'new': 7, 'american': 5, 'million': 4, 'jobs': 36, 'created': 4}}, 'congress': {'count': 15, 'collocates': {'members': 2, 'c': 2, 'debt': 2, 'versa': 2, 'congress': 17}}, 'get': {'count': 25, 'collocates': {'done': 3, 'year': 5, 'tax': 9, 'right': 3, 'get': 25}}, 'million': {'count': 11, 'collocates': {'million': 13, 'jobs': 4, '4': 3, 'lost': 3, 'year': 4}}, 'gas': {'count': 10, 'collocates': {'natural': 6, 'gas': 12, 'shale': 3, 'experience': 3, 'new': 2}}, 'every': {'count': 22, 'collocates': {'american': 3, 'work': 3, 'every': 22, 'th': 3, 'year': 3}}, 'know': {'count': 12, 'collocates': {'one': 3, 'behind': 2, 'right': 4, 'know': 14, 'thats': 5}}, 'debt': {'count': 9, 'collocates': {'pay': 2, 'use': 2, 'debt': 11, 'congress': 2, 'tuition': 2}}, 'world': {'count': 15, 'collocates': {'world': 15, 'one': 2, 'products': 2, 'around': 2, 'years': 3}}, 'years': {'count': 18, 'collocates': {'8': 4, 'last': 4, 'us': 4, 'world': 4, 'years': 22}}, 'states': {'count': 10, 'collocates': {'states': 10, 'bless': 2, 'cant': 3, 'united': 6, 'america': 3}}, 'last': {'count': 15, 'collocates': {'year': 3, 'years': 4, 'last': 15, 'built': 6, 'economy': 5}}, 'like': {'count': 19, 'collocates': {'bryan': 2, 'workers': 3, 'like': 19, 'o': 3, 'colleges': 2}}, 'country': {'count': 18, 'collocates': {'back': 2, 'country': 20, 'every': 2, 'd': 2, 'either': 2}}, 'work': {'count': 16, 'collocates': {'everyone': 2, 'means': 2, 'work': 16, 'every': 3, 'people': 3}}, 'companies': {'count': 11, 'collocates': {'jobs': 3, 'tax': 3, 'right': 2, 'companies': 11, 'start': 2}}, 'us': {'count': 15, 'collocates': {'company': 2, 'debt': 2, 'gas': 2, 'us': 15, 'years': 4}}, 'american': {'count': 33, 'collocates': {'values': 5, 'new': 6, 'american': 45, 'jobs': 5, 'workers': 5}}, 'time': {'count': 16, 'collocates': {'years': 2, 'first': 5, 'americans': 3, 'back': 2, 'time': 16}}, 'americans': {'count': 20, 'collocates': {'right': 4, 'americans': 20, 'time': 3, 'innocent': 2, 'millions': 3}}, 'economy': {'count': 12, 'collocates': {'help': 2, 'last': 5, 'built': 6, 'world': 2, 'economy': 14}}, 'workers': {'count': 12, 'collocates': {'workers': 12, 'construction': 2, 'american': 5, 'energy': 2, 'like': 3}}, 'businesses': {'count': 13, 'collocates': {'small': 2, 'new': 2, 'jobs': 2, 'businesses': 13, 'o': 3}}, 'thats': {'count': 24, 'collocates': {'get': 3, 'right': 5, 'last': 3, 'know': 5, 'thats': 28}}}}};

presidentObject = data;

var presidents = {};


for (var pres in presidentObject) {
  // debugger;
  var year;
  var yearRemember = [];
  var term;
  var termList = {};
  president = presidentObject[pres];
  presidents[pres] = [];
  for (var anyo in president) {
    var yearNum = parseInt(anyo.slice(-4));
    yearRemember.push(yearNum);
    year = president[anyo];
    for (var mainWord in year) {
      if (!termList[mainWord]) {
        termList[mainWord] = {};
        termList[mainWord].word = mainWord;
      }
      if (!termList[mainWord].speechYear) { termList[mainWord].speechYear = {}; }
      termList[mainWord].speechYear[yearNum] = 0;
      for (var info in year[mainWord]) {
        if (info === 'count') {
          var wordCountForThisWordForThisYear = year[mainWord][info];
          termList[mainWord].speechYear[yearNum] = wordCountForThisWordForThisYear;
          if (termList[mainWord].wordCount) {
            termList[mainWord].wordCount += wordCountForThisWordForThisYear;
          } else {
            termList[mainWord].wordCount = wordCountForThisWordForThisYear;
          }
        } else {
          var collocationObject = year[mainWord][info];
          for (var cols in collocationObject) {
            if (!termList[mainWord].collocates) { termList[mainWord].collocates = {}; }
            if (!termList[mainWord].collocates[cols]) {
              termList[mainWord].collocates[cols] = {};
              termList[mainWord].collocates[cols].value = collocationObject[cols];
              termList[mainWord].collocates[cols].name = cols;
            } else {
              termList[mainWord].collocates[cols].value += collocationObject[cols];
            }
          }
        }
      }
    }
  }
  var sorted = [];
  for (var wordle in termList){
    sorted.push(termList[wordle]);
  }
  sorted.sort(function (a, b) {
    if (a.wordCount > b.wordCount)
      return -1;
    if (a.wordCount < b.wordCount)
      return 1;
    // a must be equal to b
    return 0;
  });
  for (var p = 0; p < sorted.length; p++) {
    var collocationSort = [];
    for (var z in sorted[p].collocates){
      collocationSort.push(sorted[p].collocates[z]);
    }
    collocationSort.sort(function (a, b) {
      if (a.value > b.value)
        return -1;
      if (a.value < b.value)
        return 1;
      // a must be equal to b
      return 0;
    });
    var tempResult = [];
    tempResult[0] = sorted[p].word;
    tempResult[1] = collocationSort[0].name;
    tempResult[2] = collocationSort[1].name;
    tempResult[3] = collocationSort[2].name;
    tempResult[4] = collocationSort[3].name;
    tempResult[5] = collocationSort[4].name;
    yearRemember.sort(function(a,b) {
      return a - b;
    });
    for (var y = 0; y < yearRemember.length; y++) {
      if (Object.keys(sorted[p].speechYear).indexOf(yearRemember[y].toString()) !== -1) {
        tempResult[y+6] = sorted[p].speechYear[yearRemember[y].toString()];
      } else {
        tempResult[y+6] = 0;
      }
    }
    presidents[pres].push(tempResult);
  }
}

//console.log(presidents);
//console.log('\n\n\n\n\n\n\n\n\n\n');

//#########################################################


for (var president in presidents) {

  var yearString = '';
  for (var i=1;i<presidents[president][0].length-5;i++) {
    yearString += ', ';
    yearString += 'year'+i;
  }

  //console.log('YEARSTRING', yearString);
  

  for (var i=0;i<presidents[president].length;i++) {

    var valueString = "'"+presidents[president][i][0]+"'"
    for (var j=1;j<presidents[president][i].length;j++) {
      valueString += ', ';
      if (typeof(presidents[president][i][j]) === 'string') {
        valueString += "'"+presidents[president][i][j]+"'";
      } else {
        valueString += presidents[president][i][j];
      }
    }

    //console.log('VALUESTRING', valueString);


    client.query("INSERT INTO "+president+" "
      +"(word, collo1, collo2, collo3, collo4, collo5"+yearString+") "
      +"VALUES ("+valueString+");");

    console.log('Inserting '+presidents[president][i][0]+' into '+president);

  }
    
}

  response.writeHead(200);
  response.end('Post successful!');
};






/*  postgres stuff

change the collo entries to integers corresponding to the key of each word

CREATE TABLE Obama (
  id      SERIAL PRIMARY KEY,
  word    varchar(25),
  collo1  varchar(25),
  collo2  varchar(25),
  collo3  varchar(25),
  collo4  varchar(25),
  collo5  varchar(25),
  year1   integer,
  year2   integer,
  year3   integer,
  year4   integer,
  year5   integer,
  year6   integer,
  year7   integer,
  year8   integer,
  year9   integer,
  year10   integer,
  year11   integer,
  year12   integer,
  year13   integer
);

INSERT INTO Obama (word, collo1, collo2, collo3, collo4, collo5, year1, year2, year3, year4, year5, year6, year7, year8) VALUES ('High','Liberty','Happiness','Superfluity','Security','Rapacity',21,84,32,1,2,24,75,32);

*/