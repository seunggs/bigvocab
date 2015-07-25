(() => {
  'use strict';

  class LogoutCtrl {
    constructor(AuthService, $window) {

      let vm = this;
      
      vm.logout = () => {
        AuthService.logout()
          .then(() => {
            console.log('User logged out successfully');
            $window.location = '/#/home';
          })
          .catch(err => {
            console.log('Something went wrong: ', err);
          });
      };

      vm.goBack = () => {
        $window.history.go(-1);
      };

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:LogoutCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('LogoutCtrl', LogoutCtrl);
}());
