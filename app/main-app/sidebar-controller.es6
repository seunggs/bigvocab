(() => {
  'use strict';

  class SidebarCtrl {
    constructor() {

      let vm = this;

      vm.toggle = false;
      vm.toggleSidebar = () => {
        vm.toggle = !vm.toggle;
      };

      vm.navItems = [
        {
          id: 1,
          title: 'Collections',
          icon: 'ti-layers-alt',
          link: 'mainApp.collections'
        },
        {
          id: 2,
          title: 'Test',
          icon: 'ti-check-box',
          link: 'mainApp.test-words'
        },
        {
          id: 3,
          title: 'Import',
          icon: 'ti-import',
          link: 'mainApp.import'
        },
        {
          id: 4,
          title: 'Log Out',
          icon: 'ti-arrow-left',
          link: 'mainApp.logout'
        }
      ];

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:SidebarCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('SidebarCtrl', SidebarCtrl);
}());
