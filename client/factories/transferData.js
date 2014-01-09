angular.module('newSpeakApp')
.factory('transferData', function() {

  var service = {
    suggested: null,
    president: null,
    tempPresident: '',
    word: null,

    presidents: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison', 'James Monroe',
        'John Quincy Adams', 'Andrew Jackson', 'Martin Van Buren', 'William H. Harrison', 'John Tyler', 'James K. Polk',
        'Zachary Taylor', 'Millard Fillmore', 'Franklin Pierce', 'James Buchanan', 'Abraham Lincoln', 'Andrew Johnson',
        'Ulysses S. Grant', 'Rutherford B. Hayes', 'James A. Garfield', 'Chester A. Arthur', 'Grover Cleveland',
        'Benjamin Harrison', 'William McKinley', 'Theodore Roosevelt', 'William H. Taft',
        'Woodrow Wilson', 'Warren G. Harding', 'Calvin Coolidge', 'Herbert Hoover', 'Franklin D. Roosevelt',
        'Harry S. Truman', 'Dwight D. Eisenhower', 'John F. Kennedy', 'Lyndon B. Johnson', 'Richard M. Nixon',
        'Gerald R. Ford', 'Jimmy Carter', 'Ronald Reagan','George H. W. Bush', 'Bill Clinton', 'George W. Bush', 'Barack Obama'
      ],

      noSpacePresidents: ['GeorgeWashington', 'JohnAdams', 'ThomasJefferson', 'JamesMadison', 'JamesMonroe',
        'JohnQuincyAdams', 'AndrewJackson', 'MartinVanBuren', 'WilliamHHarrison', 'JohnTyler', 'JamesKPolk',
        'ZacharyTaylor', 'MillardFillmore', 'FranklinPierce', 'JamesBuchanan', 'AbrahamLincoln', 'AndrewJohnson',
        'UlyssesSGrant', 'RutherfordBHayes', 'JamesAGarfield', 'ChesterAArthur', 'GroverCleveland',
        'BenjaminHarrison', 'WilliamMcKinley', 'TheodoreRoosevelt', 'WilliamHTaft',
        'WoodrowWilson', 'WarrenGHarding', 'CalvinCoolidge', 'HerbertHoover', 'FranklinDRoosevelt',
        'HarrySTruman', 'DwightDEisenhower', 'JohnFKennedy', 'LyndonBJohnson', 'RichardMNixon',
        'GeraldRFord', 'JimmyCarter', 'RonaldReagan','GeorgeBush', 'WilliamJClinton', 'GeorgeWBush', 'BarackObama'
      ],



    save: function(words, president, tempPresident) {
      this.suggested = words;
      this.president = president;
      this.tempPresident = tempPresident;
    },

    saveWord: function(word) {
      this.word = word;
    },

  };//end of service object
  
  return service;
});
