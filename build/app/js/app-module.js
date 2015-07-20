'use strict';

(function () {
  'use strict';

  /* @ngdoc object
   * @name bigvocab
   * @description
   *
   */
  angular.module('bigvocab', ['ngAria', 'ngAnimate', 'ui.router', 'home', 'auth', 'mainApp', 'ramda', 'common', '720kb.tooltips']);

  // ramda module
  angular.module('ramda', []);
  angular.module('ramda').factory('R', function ($window) {
    return $window.R;
  });
})();
//# sourceMappingURL=app-module.js.map