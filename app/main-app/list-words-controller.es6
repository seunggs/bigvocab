(() => {
  'use strict';

  class ListWordsCtrl {
    constructor($stateParams, WordsService) {

      let vm = this;

      // config
      vm.collectionTitle = $stateParams.collectionTitle;
      let collectionId = $stateParams.collectionId;

      // main
      WordsService.getAll(collectionId)
        .then(words => {
          console.log(angular.fromJson(words).data);
          vm.words = angular.fromJson(words).data;
        })
        .catch(err => {
          console.log('Something went wrong: ', err);
        });

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:ListWordsCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('ListWordsCtrl', ListWordsCtrl);
}());
