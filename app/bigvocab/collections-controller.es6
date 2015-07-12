(() => {
  'use strict';

  class CollectionsCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'CollectionsCtrl';
    }
  }

  /**
   * @ngdoc object
   * @name bigvocab.controller:CollectionsCtrl
   *
   * @description
   *
   */
  angular
    .module('bigvocab')
    .controller('CollectionsCtrl', CollectionsCtrl);
}());
