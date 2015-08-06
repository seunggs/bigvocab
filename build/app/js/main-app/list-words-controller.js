'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
      'use strict';

      var ListWordsCtrl = function ListWordsCtrl(CollectionsService, WordsService, $timeout, user) {
            _classCallCheck(this, ListWordsCtrl);

            var vm = this;

            // config ////////////////////////////////////////////////////////////////////////////

            vm.formData = {};
            vm.showEdit = {};
            vm.btnState = {
                  loading: false,
                  success: false
            };
            vm.notification = {
                  success: false,
                  error: false
            };
            vm.msg = {
                  success: 'Change successfully saved!',
                  error: 'Something went wrong. Please try again.'
            };
            vm.notificationSuccessMsg = vm.msg.success;
            vm.notificationErrorMsg = vm.msg.error;

            // init //////////////////////////////////////////////////////////////////////////////

            getAllWords(user.id);

            // helper functions //////////////////////////////////////////////////////////////////

            function getAllWords(userId) {
                  WordsService.getUserAll(userId).then(function (res) {
                        var words = angular.fromJson(res).data;

                        vm.words = words;

                        initShowEdit(words);
                  })['catch'](errHandler);
            }

            function initShowEdit(words) {
                  words.map(function (word) {
                        vm.showEdit[word.id] = false;
                        return word;
                  });
            }

            function errHandler(err) {
                  vm.btnState.loading = false;
                  vm.notification.error = true;
                  console.log('Something went wrong: ', err);
            }

            // main //////////////////////////////////////////////////////////////////////////////

            vm.toggleEdit = function (word) {
                  vm.formData.word = word.word;
                  vm.formData.definition = word.definition;

                  vm.showEdit[word.id] = !vm.showEdit[word.id];
            };

            vm.saveChanges = function (isValid, wordId, formData) {
                  if (!isValid) {
                        return;
                  }

                  WordsService.update(wordId, formData).then(function () {
                        vm.btnState.loading = false;
                        vm.btnState.success = true;

                        vm.notification.success = true;

                        $timeout(function () {
                              vm.btnState.success = false;

                              vm.showEdit[wordId] = !vm.showEdit[wordId];
                              getAllWords(user.id);
                        }, 1500);
                  })['catch'](errHandler);
            };
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