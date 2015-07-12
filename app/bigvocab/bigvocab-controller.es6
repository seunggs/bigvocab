(() => {
  'use strict';

  class BigvocabCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'BigvocabCtrl';
    }
  }

  /**
   * @ngdoc object
   * @name bigvocab.controller:BigvocabCtrl
   *
   * @description
   *
   */
  angular
    .module('bigvocab')
    .controller('BigvocabCtrl', BigvocabCtrl);
}());
