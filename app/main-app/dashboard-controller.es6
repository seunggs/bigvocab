(() => {
  'use strict';

  class DashboardCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'DashboardCtrl';
    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:DashboardCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('DashboardCtrl', DashboardCtrl);
}());
