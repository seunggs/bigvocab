(() => {
  'use strict';

  class SettingsCtrl {
    constructor(UsersService, user, $timeout) {

      let vm = this;

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

      function changeSettings (userId, maxDailyWords) {
      	let settingsUpdate = { maxDailyWords: maxDailyWords };
      	console.log(settingsUpdate);

      	return UsersService.update(userId, settingsUpdate);
      }

      // main //////////////////////////////////////////////////////////////////////////////

      vm.saveSettings = maxDailyWords => {
      	changeSettings(user.id, maxDailyWords)
      		.then(dbRes => {

      			console.log(dbRes);
            vm.btnState.loading = false;
            vm.btnState.success = true;

            vm.notification.success = true;

            $timeout(() => {
              vm.btnState.success = false;
            }, 1500);
          })
          .catch(() => {
            vm.btnState.loading = false;

            vm.notification.error = true;
          });
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
