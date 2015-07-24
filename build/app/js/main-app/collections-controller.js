'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var CollectionsCtrl = function CollectionsCtrl(CollectionsService) {
    _classCallCheck(this, CollectionsCtrl);

    var vm = this;

    vm.formData = {};
    vm.placeholder = {
      collectionTitle: 'Enter Collection name here'
    };

    CollectionsService.getAll().then(function (res) {
      vm.collectionList = angular.fromJson(res);
    })['catch'](errHandler);

    vm.newCollection = {
      userId: '',
      title: '',
      wordCount: 0
    };

    vm.createCollection = function (collection) {
      CollectionsService.create().then(function (dbRes) {
        console.log(dbRes);
      })['catch'](errHandler);
    };

    var errHandler = function errHandler(err) {
      console.log(err);
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