(() => {
  'use strict';

  class CollectionsCtrl {
    constructor(R) {

      let vm = this;

      vm.list = {
        collection1: {
          id: 1,
          title: 'Nami\'s Collection',
          words: 1234
        },
        collection2: {
          id: 2,
          title: 'Nami\'s Second Collection',
          words: 19
        },
        collection3: {
          id: 3,
          title: 'Nami\'s Third Collection',
          words: 124
        }
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
