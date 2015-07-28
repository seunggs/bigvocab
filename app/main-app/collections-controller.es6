(() => {
  'use strict';

  class CollectionsCtrl {
    constructor(CollectionsService, WordsService, $timeout, user) {

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

      // init /////////////////////////////////////////////////////////////////////////////
      
      getAllCollections();

      // helper functions //////////////////////////////////////////////////////////////////
      
      function getAllCollections () {
        CollectionsService.getAll(user.id)
          .then(res => {
            var tempCollections = angular.fromJson(res).data;
             
            vm.collectionList = tempCollections.map(collection => {
              collection.dueWordCount = getDueWordCount(collection.id);
              console.log(collection.dueWordCount);
              return collection;
            })

            console.log(vm.collectionList);
          })
          .catch(err => {
            console.log('Something went wrong: ', err);
          });
      }

      function getDueWordCount (collectionId) {
        console.log(collectionId);
        WordsService.getDueCount(collectionId)
          .then(dueWordCount => {
            return angular.fromJson(dueWordCount).data;
          })
          .catch(err => {
            console.log('Something went wrong: ', err);
          })
      }
      console.log(getDueWordCount('095c1429-f5d9-49ff-996f-0d5368395658'));

      function resetForm () {
        vm.addCollectionForm.collectionTitle.$touched = false;
        vm.addCollectionForm.$submitted = false;
        vm.formData = {};
      }
      
      // main /////////////////////////////////////////////////////////////////////////////
      
      vm.createCollection = (isValid, collection) => {
        if (!isValid) { return; }

        vm.btnState.loading = true;

        CollectionsService.create(collection)
          .then(dbRes => {
            vm.btnState.success = true;
            getAllCollections();

            $timeout(() => {
              vm.btnState.success = false;
            }, 1500);
          })
          .catch(err => {
            console.log('Something went wrong: ', err);
          })
          .finally(() => {
            vm.btnState.loading = false;
          });
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
