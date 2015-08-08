'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var TopMenuCtrl = function TopMenuCtrl($state) {
    _classCallCheck(this, TopMenuCtrl);

    var vm = this;

    vm.formData = {};

    function resetForm() {
      vm.formData = {};
    }

    vm.submitSearch = function (isValid, searchString) {
      if (!isValid) {
        return;
      }

      resetForm();
      $state.go('mainApp.list-words', { searchString: searchString });
    };
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:TopMenuCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('TopMenuCtrl', TopMenuCtrl);
})();
//# sourceMappingURL=../main-app/top-menu-controller.js.map