'use strict';

(function () {
  'use strict';

  angular.module('mainApp').config(config);

  function config($stateProvider) {
    $stateProvider.state('mainApp', {
      abstract: true,
      url: '/main-app',
      views: {
        '': {
          templateUrl: 'main-app/main-app.tpl.html'
        },
        'sidebar@mainApp': {
          templateUrl: 'main-app/sidebar.tpl.html',
          controller: 'SidebarCtrl',
          controllerAs: 'sidebar'
        }
      }
    }).state('mainApp.collections', {
      url: '/collections',
      templateUrl: 'main-app/collections.tpl.html',
      controller: 'CollectionsCtrl',
      controllerAs: 'collections'
    }).state('mainApp.add-words', {
      url: '/collections/:collectionId/add-words',
      templateUrl: 'main-app/add-words.tpl.html',
      controller: 'AddWordsCtrl',
      controllerAs: 'addWords'
    }).state('mainApp.review-words', {
      url: '/collections/:collectionId/review-words',
      templateUrl: 'main-app/review-words.tpl.html',
      controller: 'ReviewWordsCtrl',
      controllerAs: 'reviewWords'
    }).state('mainApp.list-words', {
      url: '/collections/:collectionId/list-words',
      templateUrl: 'main-app/list-words.tpl.html',
      controller: 'ListWordsCtrl',
      controllerAs: 'listWords',
      params: { collectionTitle: null }
    }).state('mainApp.test-words', {
      url: '/test-words',
      templateUrl: 'main-app/test-words.tpl.html',
      controller: 'TestWordsCtrl',
      controllerAs: 'testWords'
    });
  }
})();
//# sourceMappingURL=../main-app/main-app-routes.js.map