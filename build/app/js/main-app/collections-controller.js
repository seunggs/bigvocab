'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var CollectionsCtrl = function CollectionsCtrl(CollectionsService, $timeout) {
    _classCallCheck(this, CollectionsCtrl);

    var vm = this;

    // setup
    vm.formData = {};
    vm.placeholder = {
      collectionTitle: 'Enter Collection name here'
    };
    vm.btnState = {
      loading: false,
      success: false
    };

    // init
    CollectionsService.getAll().then(function (res) {
      console.log(angular.fromJson(res).data);
      vm.collectionList = angular.fromJson(res).data;
    })['catch'](function (err) {
      console.log('Something went wrong: ', err);
    });

    // main
    vm.createCollection = function (collection) {
      console.log(collection);
      vm.btnState.loading = true;

      CollectionsService.create(collection).then(function (dbRes) {
        vm.btnState.success = true;
        $timeout(function () {
          vm.btnState.success = false;
        }, 1500);

        console.log(dbRes);
      })['catch'](function (err) {
        console.log('Something went wrong: ', err);
      })['finally'](function () {
        vm.btnState.loading = false;
      });
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