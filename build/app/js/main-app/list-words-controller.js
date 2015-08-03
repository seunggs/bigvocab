'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var ListWordsCtrl = function ListWordsCtrl($stateParams, WordsService) {
    _classCallCheck(this, ListWordsCtrl);

    var vm = this;

    // config
    vm.collectionTitle = $stateParams.collectionTitle;
    var collectionId = $stateParams.collectionId;

    // main
    WordsService.getAll(collectionId).then(function (words) {
      console.log(angular.fromJson(words).data);
      vm.words = angular.fromJson(words).data;
    })['catch'](function (err) {
      console.log('Something went wrong: ', err);
    });
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:ListWordsCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('ListWordsCtrl', ListWordsCtrl);
})();
//# sourceMappingURL=../main-app/list-words-controller.js.map