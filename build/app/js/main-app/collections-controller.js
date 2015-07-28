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
        var tempCollections = angular.fromJson(res).data;

        vm.collectionList = tempCollections.map(function (collection) {
          collection.dueWordCount = getDueWordCount(collection.id);
          console.log(collection.dueWordCount);
          return collection;
        });

        console.log(vm.collectionList);
      })['catch'](function (err) {
        console.log('Something went wrong: ', err);
      });
    }

    function getDueWordCount(collectionId) {
      console.log(collectionId);
      WordsService.getDueCount(collectionId).then(function (dueWordCount) {
        return angular.fromJson(dueWordCount).data;
      })['catch'](function (err) {
        console.log('Something went wrong: ', err);
      });
    }
    console.log(getDueWordCount('095c1429-f5d9-49ff-996f-0d5368395658'));

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
        vm.btnState.success = true;
        getAllCollections();

        $timeout(function () {
          vm.btnState.success = false;
        }, 1500);
      })['catch'](function (err) {
        console.log('Something went wrong: ', err);
      })['finally'](function () {
        vm.btnState.loading = false;
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