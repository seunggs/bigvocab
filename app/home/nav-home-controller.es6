(() => {
  'use strict';

  class NavHomeCtrl {
    constructor() {
      let vm = this;
      vm.ctrlName = 'NavHomeCtrl';
    }
  }

  /**
   * @ngdoc object
   * @name home.controller:NavHomeCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('NavHomeCtrl', NavHomeCtrl);
}());
