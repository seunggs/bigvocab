(() => {
  'use strict';

  class SettingsCtrl {
    constructor() {

      let vm = this;

      // config ////////////////////////////////////////////////////////////////////////////

      vm.formData = {};
      vm.placeholder = {
        maxWords: 'i.e. 150'
      };

      // helper functions /////////////////////////////////////////////////////////////////



      // main //////////////////////////////////////////////////////////////////////////////

      vm.saveSettings = () => {

      };

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:SettingsCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('SettingsCtrl', SettingsCtrl);
}());
