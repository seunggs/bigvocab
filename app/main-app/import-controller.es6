(() => {
  'use strict';

  class ImportCtrl {
    constructor(ImportService, WordsService, DictionaryService, ConfigService, user, $timeout, $window, $q) {

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

      // helper functions /////////////////////////////////////////////////////////////////

      function importTextfile (userId, data) {
        
        vm.btnState.loading = true;

        ImportService.anki(userId, data)
          .then(dbRes => {
            let dbResData = angular.fromJson(dbRes).data;
            let collectionId = dbResData.generated_keys[0];

            return WordsService.getAll(collectionId);
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
            
            $timeout(() => {
              vm.btnState.success = false;
              $window.location.href = '/#/main-app/collections';
            }, 1500);
          })
          .catch(err => {
            vm.btnState.loading = false;
            console.log('Something went wrong: ', err);
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
