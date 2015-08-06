'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var SidebarCtrl = function SidebarCtrl() {
    _classCallCheck(this, SidebarCtrl);

    var vm = this;

    vm.toggle = false;
    vm.toggleSidebar = function () {
      vm.toggle = !vm.toggle;
    };

    vm.navItems = [{
      id: 1,
      title: 'Collections',
      icon: 'ti-layers-alt',
      link: 'mainApp.collections'
    }, {
      id: 2,
      title: 'List',
      icon: 'ti-list',
      link: 'mainApp.list-words'
    },
    // {
    //   id: 3,
    //   title: 'Test',
    //   icon: 'ti-check-box',
    //   link: 'mainApp.test-words'
    // },
    {
      id: 4,
      title: 'Import',
      icon: 'ti-import',
      link: 'mainApp.import'
    }, {
      id: 5,
      title: 'Settings',
      icon: 'ti-settings',
      link: 'mainApp.settings'
    }, {
      id: 6,
      title: 'Log Out',
      icon: 'ti-arrow-left',
      link: 'mainApp.logout'
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