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
.controller('collocationAndFrequencyController', function ($scope, grabSOTUinfo, treeConvert) {
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
  $scope.president = 'Barack Obama';
  $scope.word = '';
  $scope.freqData;
  $scope.presidents = ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison', 'James Monroe',
  'John Quincy Adams', 'Andrew Jackson', 'Martin Van Buren', 'William H. Harrison', 'John Tyler', 'James K. Polk',
  'Zachary Taylor', 'Millard Fillmore', 'Franklin Pierce', 'James Buchanan', 'Abraham Lincoln', 'Andrew Johnson',
  'Ulysses S. Grant', 'Rutherford B. Hayes', 'James A. Garfield', 'Chester A. Arthur', 'Grover Cleveland',
  'Benjamin Harrison', 'Grover Cleveland', 'William McKinley', 'Theodore Roosevelt', 'William H. Taft',
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
    });//end of grabSOTUinfo
  }; //end of $scope.getSotus
}); //end of collocationController