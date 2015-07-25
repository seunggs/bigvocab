'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var NavHomeCtrl = function NavHomeCtrl(AuthService, $window) {
    _classCallCheck(this, NavHomeCtrl);

    var vm = this;

    // config
    vm.user = false;

    vm.setActive = function (page) {
      vm.active = page;
    };

    // init
    AuthService.isLoggedIn().then(function (user) {
      if (user.data !== false) {
        vm.user = true;
        $window.location = '/#/main-app/collections';
      }
    })['catch'](function (err) {
      console.log('Something went wrong: ', err);
    });
  };

  /**
   * @ngdoc object
   * @name home.controller:NavHomeCtrl
   *
   * @description
   *
   */
  angular.module('home').controller('NavHomeCtrl', NavHomeCtrl);
})();
//# sourceMappingURL=../home/nav-home-controller.js.map