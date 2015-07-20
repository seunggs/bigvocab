'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var ListWordsCtrl = function ListWordsCtrl($stateParams) {
    _classCallCheck(this, ListWordsCtrl);

    var vm = this;

    vm.collectionTitle = $stateParams.collectionTitle;
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