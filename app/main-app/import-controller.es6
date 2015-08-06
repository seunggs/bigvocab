(() => {
  'use strict';

  class ImportCtrl {
    constructor(ImportService, WordsService, DictionaryService, ConfigService, SettingsService, user, $timeout, $window, $q) {

      let vm = this;
      
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

      function importTextfile (userId, data) {
        
        vm.btnState.loading = true;

        let promises = [
        	ImportService.anki(userId, data), 
        	SettingsService.update(user.id, { maxWords: 150 })
        ];

        $q.all(promises)
          .then(dbRes => {
            let dbResData = angular.fromJson(dbRes[0]).data;
            let collectionId = dbResData.generated_keys[0];

            return WordsService.getAll(collectionId);
          })
          .catch(err => {
            vm.btnState.loading = false;

            vm.notification.error = true;

            console.log('Something went wrong with importing', err);

            return $q.reject(err);
          })
          .then(res => {
            let words = angular.fromJson(res).data;
            let promises = [];

            words.forEach(word => {
              promises.push(addPronunciation(ConfigService.forvoKey, word));
            });

            return $q.all(promises);
          })
          .then(() => {
            vm.btnState.loading = false;
            vm.btnState.success = true;

            vm.notification.success = true;
            
            $timeout(() => {
              vm.btnState.success = false;
              $window.location.href = '/#/main-app/collections';
            }, 1500);
          })
          .catch(err => {
            vm.btnState.loading = false;
            vm.btnState.success = true;

            vm.notification.success = true;

            $timeout(() => {
              vm.btnState.success = false;
              $window.location.href = '/#/main-app/collections';
            }, 1500);

            console.log('Import successful, but adding pronunciations failed: ', err);
          });

      }

      function addPronunciation (forvoKey, word) {
        let deferred = $q.defer();

        DictionaryService.getPronunciation(forvoKey, word.word)
          .then(res => {
            let pronunciationData = angular.fromJson(res).data;
            let pronunciationPath = pronunciationData.attributes.total !== 0 ? pronunciationData.items[0].pathmp3 : null;

            let wordUpdate = {
              pronunciationPath: pronunciationPath
            };

            return WordsService.update(word.id, wordUpdate);
          })
          .then(dbRes => {
            deferred.resolve(dbRes);
          })
          .catch(err => {
            deferred.reject(err);
            console.log('Something went wrong: ', err);
          });

        return deferred.promise;
      }

      // main /////////////////////////////////////////////////////////////////////////////

      vm.importTextfile = (isValid, formData) => {

        if (!isValid) { return; }

        importTextfile(user.id, formData);

      };

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:ImportCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('ImportCtrl', ImportCtrl);
}());
