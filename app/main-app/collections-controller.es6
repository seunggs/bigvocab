(() => {
  'use strict';

  class CollectionsCtrl {
    constructor(CollectionsService) {

      let vm = this;

      CollectionsService.getAll()
        .then(res => {
          vm.collectionList = res;
        })
        .catch(errHandler);

      vm.createCollection = collection => {
        CollectionsService.create()
          .then()
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
