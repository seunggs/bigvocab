(() => {
  'use strict';

  class NavHomeCtrl {
    constructor(AuthService, $window) {

      let vm = this;

      // config
      vm.user = false;

      vm.setActive = page => {
        vm.active = page;
      };
      
      // init
      AuthService.isLoggedIn()
        .then(user => {
          if (user.data !== false) {
            vm.user = true;
            $window.location = '/#/main-app/collections';
          } 
        })
        .catch(err => {
          console.log('Something went wrong: ', err);
        })

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
