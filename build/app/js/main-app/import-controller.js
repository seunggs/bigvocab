'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var ImportCtrl = function ImportCtrl(ImportService, user, $scope, R) {
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

    // helper functions /////////////////////////////////////////////////////////////////

    function importTextfile(userId, data) {
      ImportService.anki(userId, data).then(function (res) {
        var dbRes = angular.fromJson(res).data;
        console.log(dbRes);
      })['catch'](function (err) {
        console.log('Something went wrong: ', err);
      });
    }

    // main /////////////////////////////////////////////////////////////////////////////

    vm.importTextfile = function (isValid, formData) {

      if (!isValid) {
        return;
      }

      console.log(formData);
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