angular.module('newSpeakApp')
.factory('treeConvert', function() {

  var service = {
    arrayToObject: function(array) {
      if (array.length === 0) { return array; }
      var miniTree = {};
      miniTree.word = array[0];
      miniTree.children = [];
      for (var i = 1; i < array.length; i++) {
        miniTree.children[i - 1] = { word: array[i], size: 6 - i };
      }
      return miniTree;
    },

    insertOnTree: function(miniTree, mainTree, word, id) {
      if (!mainTree) {
        miniTree.size = 6;
        return miniTree;
      }
      if (Array.isArray(miniTree)) { return mainTree; }
      var recurse = function(miniTree, mainTree, word) {
        for (var i = 0; i < mainTree.children.length; i++) {
          if (mainTree.children[i].children) {
            recurse(miniTree, mainTree.children[i], word);
          } else if (mainTree.children[i].word === word && mainTree.children[i].id === id) {
            mainTree.children[i].children = miniTree.children;
          }
        }
      };
      recurse(miniTree, mainTree, word);
      return mainTree;
    }//end of insertOnTree
  };//end of service object
  return service;
});