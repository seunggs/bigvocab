(() => {
  'use strict';

  class ReviewWordsCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'ReviewWordsCtrl';
    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:ReviewWordsCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('ReviewWordsCtrl', ReviewWordsCtrl);
}());
