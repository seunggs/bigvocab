'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var SettingsCtrl = function SettingsCtrl() {
    _classCallCheck(this, SettingsCtrl);

    var vm = this;

    // config ////////////////////////////////////////////////////////////////////////////

    vm.formData = {};
    vm.placeholder = {
      maxWords: 'i.e. 150'
    };

    // helper functions /////////////////////////////////////////////////////////////////

    // main //////////////////////////////////////////////////////////////////////////////

    vm.saveSettings = function () {};
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:SettingsCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('SettingsCtrl', SettingsCtrl);
})();
//# sourceMappingURL=../main-app/settings-controller.js.map