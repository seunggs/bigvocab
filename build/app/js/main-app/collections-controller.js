'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var CollectionsCtrl = function CollectionsCtrl(R) {
    _classCallCheck(this, CollectionsCtrl);

    var vm = this;

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
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:CollectionsCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('CollectionsCtrl', CollectionsCtrl);
})();
//# sourceMappingURL=../main-app/collections-controller.js.map