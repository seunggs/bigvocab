(() => {
  'use strict';

  class CollectionsCtrl {
    constructor(CollectionsService, $timeout, user) {

      let vm = this;

      // setup
      vm.formData = {};
      vm.placeholder = {
        collectionTitle: 'Enter Collection name here'
      };
      vm.btnState = {
        loading: false,
        success: false
      };
      vm.user = user;

      // init
      getAllCollections();

      // main
      vm.createCollection = collection => {
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
            vm.formData = {};
          });
      };

      // helper functions
      function getAllCollections() {
        CollectionsService.getAll()
          .then(res => {
            vm.collectionList = angular.fromJson(res).data;
          })
          .catch(err => {
            console.log('Something went wrong: ', err);
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
