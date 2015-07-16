(() => {
  'use strict';

  class SidebarCtrl {
    constructor() {

      let vm = this;

      vm.navItems = {
        collection: {
          order: 1,
          title: 'Collections',
          icon: 'ti-layers-alt',
          link: 'collections'
        },
        test: {
          order: 2,
          title: 'Test',
          icon: 'ti-check-box',
          link: 'test'
        },
        account: {
          order: 4,
          title: 'Account',
          icon: 'ti-user',
          link: 'account'
        },
        logout: {
          order: 3,
          title: 'Log Out',
          icon: 'ti-arrow-left',
          link: 'logout'
        }
      };

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
