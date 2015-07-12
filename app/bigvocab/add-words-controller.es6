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
   * @name bigvocab.controller:AddWordsCtrl
   *
   * @description
   *
   */
  angular
    .module('bigvocab')
    .controller('AddWordsCtrl', AddWordsCtrl);
}());
