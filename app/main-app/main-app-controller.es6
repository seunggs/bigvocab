(() => {
  'use strict';

  class MainAppCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'MainAppCtrl';
    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:MainAppCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('MainAppCtrl', MainAppCtrl);
}());
