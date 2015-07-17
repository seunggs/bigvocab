(() => {
  'use strict';

  class CommonCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'CommonCtrl';
    }
  }

  /**
   * @ngdoc object
   * @name common.controller:CommonCtrl
   *
   * @description
   *
   */
  angular
    .module('common')
    .controller('CommonCtrl', CommonCtrl);
}());
