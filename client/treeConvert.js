angular.module('newSpeakApp')
.factory('treeConvert', function($q) {

  var service = {
    arrayToObject: function(array) {
      var miniTree = {};
      miniTree.word = array[0];
      miniTree.children = [];
      for (var i = 1; i < array.length; i++) {
        miniTree[i - 1] = { word: array[i], size: 6 - i };
      }
      return miniTree;
    },

    insertOnTree: function(miniTree, mainTree, word) {
      if (!mainTree) {
        miniTree.size = 6;
        return miniTree;
      }
      var recurse = function(miniTree, mainTree, word) {
        for (var i = 0; i < mainTree.children.length; i++) {
          if (mainTree.children[i].children) {
            return recurse(miniTree, moreNodes, mainTree.children[i], word);
          } else if (mainTree.children[i] === word) {
            miniTree.size = 5 - i;
            mainTree.children[i] = miniTree;
            return mainTree;
          }
        }
      };
      return recurse(miniTree, mainTree, word);
    }//end of insertOnTree
  };//end of service object
  return service;
});