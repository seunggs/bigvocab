(() => {
  'use strict';

  class TestWordsCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'TestWordsCtrl';
    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:TestWordsCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('TestWordsCtrl', TestWordsCtrl);
}());
