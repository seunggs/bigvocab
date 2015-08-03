'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var CollectionsCtrl = function CollectionsCtrl(CollectionsService, WordsService, $timeout, user) {
    _classCallCheck(this, CollectionsCtrl);

    var vm = this;

    // config ///////////////////////////////////////////////////////////////////////////

    vm.formData = {};
    vm.placeholder = {
      collectionTitle: 'Enter Collection name here'
    };
    vm.btnState = {
      loading: false,
      success: false
    };
    vm.user = user;

    // init /////////////////////////////////////////////////////////////////////////////

    getAllCollections();

    // helper functions //////////////////////////////////////////////////////////////////

    function getAllCollections() {
      CollectionsService.getAll(user.id).then(function (res) {
        vm.collectionList = angular.fromJson(res).data;
      })['catch'](function (err) {
        console.log('Something went wrong: ', err);
      });
    }

    function resetForm() {
      vm.addCollectionForm.collectionTitle.$touched = false;
      vm.addCollectionForm.$submitted = false;
      vm.formData = {};
    }

    // main /////////////////////////////////////////////////////////////////////////////

    vm.createCollection = function (isValid, collection) {
      if (!isValid) {
        return;
      }

      vm.btnState.loading = true;

      CollectionsService.create(collection).then(function (dbRes) {
        vm.btnState.loading = false;
        vm.btnState.success = true;
        getAllCollections();

        $timeout(function () {
          vm.btnState.success = false;
        }, 1500);
      })['catch'](function (err) {
        vm.btnState.loading = false;
        console.log('Something went wrong: ', err);
      });
    };
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:CollectionsCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('CollectionsCtrl', CollectionsCtrl);
})();
//# sourceMappingURL=../main-app/collections-controller.js.map