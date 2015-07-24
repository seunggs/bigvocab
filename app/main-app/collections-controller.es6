(() => {
  'use strict';

  class CollectionsCtrl {
    constructor(CollectionsService) {

      let vm = this;

      vm.formData = {};
      vm.placeholder = {
        collectionTitle: 'Enter Collection name here'
      };

      CollectionsService.getAll()
        .then(res => {
          vm.collectionList = angular.fromJson(res);
        })
        .catch(errHandler);

      vm.newCollection = {
        userId: '',
        title: '',
        wordCount: 0
      };

      vm.createCollection = collection => {
        CollectionsService.create()
          .then(dbRes => {
            console.log(dbRes);
          })
          .catch(errHandler);
      };

      var errHandler = err => {
        console.log(err);
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
