'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var ImportCtrl = function ImportCtrl(ImportService, WordsService, DictionaryService, ConfigService, SettingsService, user, $timeout, $window, $q) {
    _classCallCheck(this, ImportCtrl);

    var vm = this;

    // config ///////////////////////////////////////////////////////////////////////////

    vm.formData = {};
    vm.btnState = {
      loading: false,
      success: false
    };
    vm.placeholder = {
      files: 'Click to upload anki text files',
      collectionTitle: 'Add collection title here'
    };
    vm.notification = {
      success: false,
      error: false
    };
    vm.msg = {
      success: 'Words successfully imported!',
      error: 'Something went wrong. Please try again.'
    };
    vm.notificationSuccessMsg = vm.msg.success;
    vm.notificationErrorMsg = vm.msg.error;

    // helper functions /////////////////////////////////////////////////////////////////

    function importTextfile(userId, data) {

      vm.btnState.loading = true;

      var promises = [ImportService.anki(userId, data), SettingsService.update(user.id, { maxWords: 150 })];

      $q.all(promises).then(function (dbRes) {
        var dbResData = angular.fromJson(dbRes[0]).data;
        var collectionId = dbResData.generated_keys[0];

        return WordsService.getAll(collectionId);
      })['catch'](function (err) {
        vm.btnState.loading = false;

        vm.notification.error = true;

        console.log('Something went wrong with importing', err);

        return $q.reject(err);
      }).then(function (res) {
        var words = angular.fromJson(res).data;
        var promises = [];

        words.forEach(function (word) {
          promises.push(addPronunciation(ConfigService.forvoKey, word));
        });

        return $q.all(promises);
      }).then(function () {
        vm.btnState.loading = false;
        vm.btnState.success = true;

        vm.notification.success = true;

        $timeout(function () {
          vm.btnState.success = false;
          $window.location.href = '/#/main-app/collections';
        }, 1500);
      })['catch'](function (err) {
        vm.btnState.loading = false;
        vm.btnState.success = true;

        vm.notification.success = true;

        $timeout(function () {
          vm.btnState.success = false;
          $window.location.href = '/#/main-app/collections';
        }, 1500);

        console.log('Import successful, but adding pronunciations failed: ', err);
      });
    }

    function addPronunciation(forvoKey, word) {
      var deferred = $q.defer();

      DictionaryService.getPronunciation(forvoKey, word.word).then(function (res) {
        var pronunciationData = angular.fromJson(res).data;
        var pronunciationPath = pronunciationData.attributes.total !== 0 ? pronunciationData.items[0].pathmp3 : null;

        var wordUpdate = {
          pronunciationPath: pronunciationPath
        };

        return WordsService.update(word.id, wordUpdate);
      }).then(function (dbRes) {
        deferred.resolve(dbRes);
      })['catch'](function (err) {
        deferred.reject(err);
        console.log('Something went wrong: ', err);
      });

      return deferred.promise;
    }

    // main /////////////////////////////////////////////////////////////////////////////

    vm.importTextfile = function (isValid, formData) {

      if (!isValid) {
        return;
      }

      importTextfile(user.id, formData);
    };
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:ImportCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('ImportCtrl', ImportCtrl);
})();
//# sourceMappingURL=../main-app/import-controller.js.map