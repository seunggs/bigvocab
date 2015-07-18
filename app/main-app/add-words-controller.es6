(() => {
  'use strict';

  class AddWordsCtrl {
    constructor(Config, Dictionary) {

      let vm = this;
      
      Dictionary.getDefinition(Config.mashapeKey, vm.word)
        .then(res => {
          vm.definitions = res.definitions;
        });

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
