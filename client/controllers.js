angular.module('newSpeakApp')
.controller('MainController', function ($scope) {
  $scope.test = 'this worked!';
  $scope.greeting = "Resize the page to see the re-rendering";
  $scope.data = [
    {name: "Greg", score: 98},
    {name: "Ari", score: 96},
    {name: 'Q', score: 75},
    {name: "Loser", score: 48}
  ];
})
.controller('collocationAndFrequencyController', function ($scope, grabSOTUinfo, treeConvert, graphConvert) {
  $scope.hello = function(pres) {
    alert(pres);
  };
  //original array
  //temporary - change to null
  $scope.colData = {
      word: "democracy",
      size: 6,
      children: [
        {word: 'freedom', size: 5},
        {word: 'health care', size: 4, children: [
          {word: 'insurance', size: 5},
          {word: 'website', size: 4},
          {word: 'republican', size: 3},
          {word: 'hospital', size: 2},
          {word: 'healthcare.gov', size: 1}
        ]},
        {word: 'economy', size: 3},
        {word: 'michelle', size: 2},
        {word: 'putin', size: 1}
      ]
    };
  $scope.president = '';
  $scope.word = '';
  var series1 = [{x:1, y: 400}, {x:2, y: 30}, {x:3, y: 905}, {x:4, y: 150}];
  var series2 = [{x:1, y: 800}, {x:2, y: 300}, {x:3, y: 95}, {x:4, y: 550}];
  var series3 = [{x:1, y: 100}, {x:2, y: 320}, {x:3, y: 50}, {x:4, y: 550}];
  $scope.freqData = [{values: series1, key: "democracy"},{values: series2, key: 'freedom'},{values: series3, key: 'onemore'}];
  $scope.presidents = ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison', 'James Monroe',
  'John Quincy Adams', 'Andrew Jackson', 'Martin Van Buren', 'William H. Harrison', 'John Tyler', 'James K. Polk',
  'Zachary Taylor', 'Millard Fillmore', 'Franklin Pierce', 'James Buchanan', 'Abraham Lincoln', 'Andrew Johnson',
  'Ulysses S. Grant', 'Rutherford B. Hayes', 'James A. Garfield', 'Chester A. Arthur', 'Grover Cleveland',
  'Benjamin Harrison', 'William McKinley', 'Theodore Roosevelt', 'William H. Taft',
  'Woodrow Wilson', 'Warren G. Harding', 'Calvin Coolidge', 'Herbert Hoover', 'Franklin D. Roosevelt',
  'Harry S. Truman', 'Dwight D. Eisenhower', 'John F. Kennedy', 'Lyndon B. Johnson', 'Richard M. Nixon',
  'Gerald R. Ford', 'Jimmy Carter', 'Ronald Reagan','George H. W. Bush', 'Bill Clinton', 'George W. Bush', 'Barack Obama'
];
  
  $scope.getSotus = function(word, mainTree) {
    grabSOTUinfo.collocation($scope.president, word)
    .then(function(data) {
      return JSON.parse(data);
    })
    .then(function(parsed) {
      return treeConvert.arrayToObject(parsed);
    })
    .then(function(miniTree) {
      $scope.colData = treeConvert.insertOnTree(miniTree, mainTree, word);
    });//end of grabSOTUinfo.collocation

    grabSOTUinfo.frequency($scope.president, word)
    .then(function(data) {
      return JSON.parse(data);
    })
    .then(function(parsed) {
      $scope.freqData = graphConvert.addToGraphData(parsed, $scope.freqData);
    });//end of grabSOTUinfo.frequency

  }; //end of $scope.getSotus
}); //end of collocationController