(() => {
  'use strict';

  class AddWordsCtrl {
    constructor(Config, Dictionary) {

      let vm = this;

      vm.wordPlaceholder = 'i.e. audacious';
      vm.definitionPlaceholder = 'i.e. Fearlessly, often recklessly daring; bold. See Synonyms at adventurous, brave.';

      vm.getDefinition = word => {
        if (word !== undefined) {
          Dictionary.getDefinition(Config.mashapeKey, word)
            .then(res => {
              vm.definitions = res.data.definitions;
            });          
        }
      };

      vm.copyDefinition = definition => {
        vm.definition = definition;
      };

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:AddWordsCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('AddWordsCtrl', AddWordsCtrl);
}());
