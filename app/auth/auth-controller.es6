(() => {
  'use strict';

  class AuthCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'AuthCtrl';
    }
  }

  /**
   * @ngdoc object
   * @name auth.controller:AuthCtrl
   *
   * @description
   *
   */
  angular
    .module('auth')
    .controller('AuthCtrl', AuthCtrl);
}());
