'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var ImportCtrl = function ImportCtrl(ImportService, WordsService, ConfigService, SettingsService, user, $timeout, $window) {
    _classCallCheck(this, ImportCtrl);

    var vm = this;

    // config ///////////////////////////////////////////////////////////////////////////

    vm.formData = {};
    vm.btnState = {
      loading: false,
      success: false
    };
    vm.placeholder = {
      files: 'Click to upload anki text files',
      collectionTitle: 'Add collection title here'
    };
    vm.notification = {
      success: false,
      error: false
    };
    vm.msg = {
      success: 'Words successfully imported!',
      error: 'Something went wrong. Please try again.'
    };
    vm.notificationSuccessMsg = vm.msg.success;
    vm.notificationErrorMsg = vm.msg.error;

    // helper functions /////////////////////////////////////////////////////////////////

    function importTextfile(userId, data) {

      vm.btnState.loading = true;

      ImportService.anki(userId, data).then(function (dbRes) {
        var dbResData = angular.fromJson(dbRes).data;
        var collectionId = dbResData.generated_keys[0];

        return WordsService.getAll(collectionId);
      }).then(function () {
        vm.btnState.loading = false;
        vm.btnState.success = true;

        vm.notification.success = true;

        $timeout(function () {
          vm.btnState.success = false;
          $window.location.href = '/#/main-app/collections';
        }, 1500);
      })['catch'](function (err) {
        vm.btnState.loading = false;

        vm.notification.error = true;

        console.log('Something went wrong with importing', err);
      });
    }

    // main /////////////////////////////////////////////////////////////////////////////

    vm.importTextfile = function (isValid, formData) {

      if (!isValid) {
        return;
      }

      importTextfile(user.id, formData);
    };
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:ImportCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('ImportCtrl', ImportCtrl);
})();
//# sourceMappingURL=../main-app/import-controller.js.map