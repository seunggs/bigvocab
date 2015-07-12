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
   * @name bigvocab.controller:ReviewWordsCtrl
   *
   * @description
   *
   */
  angular
    .module('bigvocab')
    .controller('ReviewWordsCtrl', ReviewWordsCtrl);
}());
