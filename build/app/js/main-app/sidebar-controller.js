'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var SidebarCtrl = function SidebarCtrl() {
    _classCallCheck(this, SidebarCtrl);

    var vm = this;

    vm.navItems = [{
      id: 1,
      title: 'Collections',
      icon: 'ti-layers-alt',
      link: 'mainApp.collections'
    }, {
      id: 2,
      title: 'Test',
      icon: 'ti-check-box',
      link: 'mainApp.test'
    }, {
      id: 3,
      title: 'Account',
      icon: 'ti-user',
      link: 'mainApp.account'
    }, {
      id: 4,
      title: 'Log Out',
      icon: 'ti-arrow-left',
      link: 'logout'
    }];
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:SidebarCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('SidebarCtrl', SidebarCtrl);
})();
//# sourceMappingURL=../main-app/sidebar-controller.js.map