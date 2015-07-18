'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var AddWordsCtrl = function AddWordsCtrl(Config, Dictionary) {
    _classCallCheck(this, AddWordsCtrl);

    var vm = this;

    Dictionary.getDefinition(Config.mashapeKey, vm.word).then(function (res) {
      vm.definitions = res.definitions;
    });
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:AddWordsCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('AddWordsCtrl', AddWordsCtrl);
})();
//# sourceMappingURL=../main-app/add-words-controller.js.map