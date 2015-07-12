(() => {
  'use strict';

  class RegisterCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'RegisterCtrl';
    }
  }

  /**
   * @ngdoc object
   * @name auth.controller:RegisterCtrl
   *
   * @description
   *
   */
  angular
    .module('auth')
    .controller('RegisterCtrl', RegisterCtrl);
}());
