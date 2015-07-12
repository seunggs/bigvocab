(() => {
  'use strict';

  class NavCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'NavCtrl';
    }
  }

  /**
   * @ngdoc object
   * @name bigvocab.controller:NavCtrl
   *
   * @description
   *
   */
  angular
    .module('bigvocab')
    .controller('NavCtrl', NavCtrl);
}());
