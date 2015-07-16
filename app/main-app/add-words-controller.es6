(() => {
  'use strict';

  class AddWordsCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'AddWordsCtrl';
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
