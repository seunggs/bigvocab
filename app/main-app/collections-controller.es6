(() => {
  'use strict';

  class CollectionsCtrl {
    constructor(CollectionsService, WordsService, $timeout, user, $q) {

      let vm = this;

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
      
      function getAllCollections (user) {
        
        CollectionsService.getAll(user.id)
          .then(res => {
            vm.collectionList = angular.fromJson(res).data;

            // intiialize checks to all false
            vm.checks = initChecks(vm.collectionList);
          })
          .catch(err => {
            console.log('Something went wrong: ', err);
          });
      }

      function mergeCollections (collectionIds) {
        let mainCollectionId = collectionIds[0];
        let remainingCollectionIds = collectionIds.filter(collectionId => {
          return collectionId !== mainCollectionId;
        });

        let promises = [];

        remainingCollectionIds.forEach(collectionId => {
          promises.push(CollectionsService.merge(collectionId, { newCollectionId: mainCollectionId }));
        });

        return $q.all(promises);
      }

      function deleteCollections (collectionIds) {
        let promises = [];

        collectionIds.forEach(collectionId => {
          promises.push(CollectionsService.delete(collectionId));
        });

        return $q.all(promises);
      }

      function initChecks(collections) {
        let checks = {};

        collections.forEach(collection => {
          checks[collection.id] = false;
        });

        return checks;
      }

      function resetForm () {
        vm.addCollectionForm.collectionTitle.$touched = false;
        vm.addCollectionForm.$submitted = false;
        vm.formData = {};
      }

      // main /////////////////////////////////////////////////////////////////////////////
      
      vm.toggleEdit = () => {
        vm.showEdit = !vm.showEdit;
      };

      vm.toggleSuccessNotification = (successMessage) => {
        vm.notification.success = true;
        vm.notificationSuccessMsg = successMessage;
      };

      vm.toggleErrorNotification = (errorMessage) => {
        vm.notification.error = true;
        vm.notificationErrorMsg = errorMessage;
      };

      vm.createCollection = (isValid, collection) => {
        if (!isValid) { return; }

        vm.btnState.loading = true;

        CollectionsService.create(collection)
          .then(() => {
            vm.btnState.loading = false;
            vm.btnState.success = true;

            vm.toggleSuccessNotification(vm.msg.success);

            getAllCollections(user);
            resetForm();

            $timeout(() => {
              vm.btnState.success = false;
            }, 1500);
          })
          .catch(err => {
            vm.btnState.loading = false;
            vm.toggleErrorNotification(vm.msg.mergeError);
            
            console.log('Something went wrong: ', err);
          });
      };

      vm.mergeCollections = (collections, checks) => {

        let mergeList = [];

        collections.forEach((collection) => {
          if (checks[collection.id] === true) {
            mergeList.push(collection.id);
          }
        });

        if (mergeList.length >= 2) {
          mergeCollections(mergeList)
            .then(() => {
              vm.toggleSuccessNotification(vm.msg.success);
              getAllCollections(user);
            })
            .catch(err => {
              vm.toggleErrorNotification(vm.msg.error);
              console.log('Something went wrong: ', err);
            });
        } else {
          vm.toggleErrorNotification(vm.msg.mergeError);
        }

      };

      vm.deleteCollections = (collections, checks) => {

        let deleteList = [];

        collections.forEach((collection) => {
          if (checks[collection.id] === true) {
            deleteList.push(collection.id);
          }
        });

        if (deleteList.length >= 1) {
          deleteCollections(deleteList)
            .then(() => {
              vm.toggleSuccessNotification(vm.msg.success);
              getAllCollections(user);
            })
            .catch(err => {
              vm.toggleErrorNotification(vm.msg.error);
              console.log('Something went wrong: ', err);
            });
        } else {
          vm.toggleErrorNotification(vm.msg.noneSelectedError);
        }

      };

      vm.showConfirmDeleteModal = (collections, checks) => {
        let deleteList = [];

        collections.forEach((collection) => {
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

      vm.confirmModal = () => {
        vm.deleteCollections(vm.collectionList, vm.checks);
      };

      vm.closeModal = () => {
        vm.showModal = false;
      };

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:CollectionsCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('CollectionsCtrl', CollectionsCtrl);
}());
