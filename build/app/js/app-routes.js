'use strict';

(function () {
  'use strict';

  angular.module('bigvocab').config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
})();
//# sourceMappingURL=app-routes.js.map