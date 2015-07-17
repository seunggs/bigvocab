'use strict';

(function () {
  'use strict';

  angular.module('mainApp').config(config);

  function config($stateProvider) {
    $stateProvider.state('mainApp', {
      url: '/main-app',
      templateUrl: 'main-app/main-app.tpl.html',
      controller: 'MainAppCtrl',
      controllerAs: 'mainApp'
    }).state('mainApp.collections', {
      url: '/collections',
      templateUrl: 'main-app/collections.tpl.html',
      controller: 'CollectionsCtrl',
      controllerAs: 'collections'
    }).state('mainApp.addWords', {
      url: '/collections/:collectionId/add-words',
      templateUrl: 'main-app/add-words.tpl.html',
      controller: 'AddWordsCtrl',
      controllerAs: 'addWords'
    }).state('mainApp.reviewWords', {
      url: '/collections/:collectionId/review-words',
      templateUrl: 'main-app/review-words.tpl.html',
      controller: 'ReviewWordsCtrl',
      controllerAs: 'reviewWords'
    });
  }
})();
//# sourceMappingURL=../main-app/main-app-routes.js.map