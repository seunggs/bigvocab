'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var SettingsCtrl = function SettingsCtrl(UsersService, user, $timeout) {
    _classCallCheck(this, SettingsCtrl);

    var vm = this;

    // config ////////////////////////////////////////////////////////////////////////////

    vm.formData = {};
    vm.formData.maxDailyWords = user.maxDailyWords;

    vm.placeholder = {
      maxDailyWords: 'i.e. 100 (default: 150)'
    };
    vm.btnState = {
      loading: false,
      success: false
    };
    vm.notification = {
      success: false,
      error: false
    };
    vm.msg = {
      success: 'Change successfully saved!',
      error: 'Something went wrong. Please try again.'
    };
    vm.notificationSuccessMsg = vm.msg.success;
    vm.notificationErrorMsg = vm.msg.error;

    // helper functions /////////////////////////////////////////////////////////////////

    function changeSettings(userId, maxDailyWords) {
      var settingsUpdate = { maxDailyWords: maxDailyWords };
      console.log(settingsUpdate);

      return UsersService.update(userId, settingsUpdate);
    }

    // main //////////////////////////////////////////////////////////////////////////////

    vm.saveSettings = function (maxDailyWords) {
      changeSettings(user.id, maxDailyWords).then(function (dbRes) {

        console.log(dbRes);
        vm.btnState.loading = false;
        vm.btnState.success = true;

        vm.notification.success = true;

        $timeout(function () {
          vm.btnState.success = false;
        }, 1500);
      })['catch'](function () {
        vm.btnState.loading = false;

        vm.notification.error = true;
      });
    };
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