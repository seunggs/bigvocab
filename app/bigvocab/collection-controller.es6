(() => {
  'use strict';

  class CollectionCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'CollectionCtrl';
    }
  }

  /**
   * @ngdoc object
   * @name bigvocab.controller:CollectionCtrl
   *
   * @description
   *
   */
  angular
    .module('bigvocab')
    .controller('CollectionCtrl', CollectionCtrl);
}());
