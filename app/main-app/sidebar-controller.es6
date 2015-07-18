(() => {
  'use strict';

  class SidebarCtrl {
    constructor() {

      let vm = this;

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
          title: 'Account',
          icon: 'ti-user',
          link: 'mainApp.account'
        },
        {
          id: 4,
          title: 'Log Out',
          icon: 'ti-arrow-left',
          link: 'logout'
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
