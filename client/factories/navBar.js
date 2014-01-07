angular.module('newSpeakApp')
.factory('navBar', function() {

  var service = {
    highlight: function() {
			var menu = document.getElementById('menu');
			var menuAnchors = menu.getElementsByTagName('a');
			
			var checkCurrent = function() {
				for (a = 0; a < menuAnchors.length; a++) {
					menuAnchors[a].className = null;
					if (window.location.hash === menuAnchors[a].hash) {
						menuAnchors[a].className += 'current';
					} else if (window.location.hash === '#/choices' && menuAnchors[0].className !== 'current') {
						menuAnchors[0].className += 'current';
					}
				}
			};

			//run initially
			checkCurrent();

			//set up listeners
			for (var i = 0; i<menuAnchors.length; i++) {
				menuAnchors[i].onclick = function() {
					setTimeout(checkCurrent, 50);
				};
			}
    }

  };//end of service object
  
  return service;
});
