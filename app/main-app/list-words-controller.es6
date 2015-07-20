(() => {
  'use strict';

  class ListWordsCtrl {
    constructor($stateParams) {

      let vm = this;

      vm.collectionTitle = $stateParams.collectionTitle;

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:ListWordsCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('ListWordsCtrl', ListWordsCtrl);
}());
