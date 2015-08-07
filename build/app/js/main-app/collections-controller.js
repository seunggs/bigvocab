'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var CollectionsCtrl = function CollectionsCtrl(CollectionsService, WordsService, $timeout, user, $q) {
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
    vm.checks = {};
    vm.showEdit = false;
    vm.notification = {
      success: false,
      error: false
    };
    vm.msg = {
      success: 'Success!',
      error: 'Something went wrong - please try again.',
      mergeError: 'Please select two or more collections.',
      noneSelectedError: 'Please select one or more collections.'
    };
    vm.notificationSuccessMsg = vm.msg.success;
    vm.notificationErrorMsg = vm.msg.error;
    vm.showModal = false;

    // init /////////////////////////////////////////////////////////////////////////////

    getAllCollections(user);

    // helper functions //////////////////////////////////////////////////////////////////

    function getAllCollections(user) {

      CollectionsService.getAll(user.id).then(function (res) {
        vm.collectionList = angular.fromJson(res).data;

        // intiialize checks to all false
        vm.checks = initChecks(vm.collectionList);
      })['catch'](function (err) {
        console.log('Something went wrong: ', err);
      });
    }

    function mergeCollections(collectionIds) {
      var mainCollectionId = collectionIds[0];
      var remainingCollectionIds = collectionIds.filter(function (collectionId) {
        return collectionId !== mainCollectionId;
      });

      var promises = [];

      remainingCollectionIds.forEach(function (collectionId) {
        promises.push(CollectionsService.merge(collectionId, { newCollectionId: mainCollectionId }));
      });

      return $q.all(promises);
    }

    function deleteCollections(collectionIds) {
      var promises = [];

      collectionIds.forEach(function (collectionId) {
        promises.push(CollectionsService['delete'](collectionId));
      });

      return $q.all(promises);
    }

    function initChecks(collections) {
      var checks = {};

      collections.forEach(function (collection) {
        checks[collection.id] = false;
      });

      return checks;
    }

    function resetForm() {
      vm.addCollectionForm.collectionTitle.$touched = false;
      vm.addCollectionForm.$submitted = false;
      vm.formData = {};
    }

    // main /////////////////////////////////////////////////////////////////////////////

    vm.toggleEdit = function () {
      vm.showEdit = !vm.showEdit;
    };

    vm.toggleSuccessNotification = function (successMessage) {
      vm.notification.success = true;
      vm.notificationSuccessMsg = successMessage;
    };

    vm.toggleErrorNotification = function (errorMessage) {
      vm.notification.error = true;
      vm.notificationErrorMsg = errorMessage;
    };

    vm.createCollection = function (isValid, collection) {
      if (!isValid) {
        return;
      }

      vm.btnState.loading = true;

      CollectionsService.create(collection).then(function () {
        vm.btnState.loading = false;
        vm.btnState.success = true;

        vm.toggleSuccessNotification(vm.msg.success);

        getAllCollections(user);
        resetForm();

        $timeout(function () {
          vm.btnState.success = false;
        }, 1500);
      })['catch'](function (err) {
        vm.btnState.loading = false;
        vm.toggleErrorNotification(vm.msg.mergeError);

        console.log('Something went wrong: ', err);
      });
    };

    vm.mergeCollections = function (collections, checks) {

      var mergeList = [];

      collections.forEach(function (collection) {
        if (checks[collection.id] === true) {
          mergeList.push(collection.id);
        }
      });

      if (mergeList.length >= 2) {
        mergeCollections(mergeList).then(function () {
          vm.toggleSuccessNotification(vm.msg.success);
          getAllCollections(user);
        })['catch'](function (err) {
          vm.toggleErrorNotification(vm.msg.error);
          console.log('Something went wrong: ', err);
        });
      } else {
        vm.toggleErrorNotification(vm.msg.mergeError);
      }
    };

    vm.deleteCollections = function (collections, checks) {

      var deleteList = [];

      collections.forEach(function (collection) {
        if (checks[collection.id] === true) {
          deleteList.push(collection.id);
        }
      });

      if (deleteList.length >= 1) {
        deleteCollections(deleteList).then(function () {
          vm.toggleSuccessNotification(vm.msg.success);
          getAllCollections(user);
        })['catch'](function (err) {
          vm.toggleErrorNotification(vm.msg.error);
          console.log('Something went wrong: ', err);
        });
      } else {
        vm.toggleErrorNotification(vm.msg.noneSelectedError);
      }
    };

    vm.showConfirmDeleteModal = function (collections, checks) {
      var deleteList = [];

      collections.forEach(function (collection) {
        if (checks[collection.id] === true) {
          deleteList.push(collection.id);
        }
      });

      if (deleteList.length >= 1) {
        vm.showModal = true;
      } else {
        vm.toggleErrorNotification(vm.msg.noneSelectedError);
      }
    };

    vm.confirmModal = function () {
      vm.deleteCollections(vm.collectionList, vm.checks);
    };

    vm.closeModal = function () {
      vm.showModal = false;
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