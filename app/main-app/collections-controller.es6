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
            vm.collectionList = angular.fromJson(res).data;
          })
          .catch(err => {
            console.log('Something went wrong: ', err);
          });
      }

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
