(() => {
  'use strict';

  class CollectionsCtrl {
    constructor(CollectionsService, $timeout) {

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

      // init
      CollectionsService.getAll()
        .then(res => {
          console.log(angular.fromJson(res).data);
          vm.collectionList = angular.fromJson(res).data;
        })
        .catch(err => {
          console.log('Something went wrong: ', err);
        });

      // main
      vm.createCollection = collection => {
        console.log(collection);
        vm.btnState.loading = true;

        CollectionsService.create(collection)
          .then(dbRes => {
            vm.btnState.success = true;
            $timeout(() => {
              vm.btnState.success = false;
            }, 1500);

            console.log(dbRes);
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
