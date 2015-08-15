'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var LogoutCtrl = function LogoutCtrl(AuthService, $window) {
    _classCallCheck(this, LogoutCtrl);

    var vm = this;

    vm.logout = function () {
      AuthService.logout().then(function () {
        console.log('User logged out successfully');
        $window.location = '/#/home';
      })['catch'](function (err) {
        console.log('Something went wrong: ', err);
      });
    };

    vm.goBack = function () {
      $window.history.go(-1);
    };
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:LogoutCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('LogoutCtrl', LogoutCtrl);
})();
//# sourceMappingURL=../main-app/logout-controller.js.map