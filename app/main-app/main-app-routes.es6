(() => {
  'use strict';

  angular
    .module('mainApp')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('mainApp', {
        abstract: true,
        url: '/main-app',
        views: {
          '': {
            templateUrl: 'main-app/main-app.tpl.html',
          },
          'sidebar@mainApp': {
            templateUrl: 'main-app/sidebar.tpl.html',
            controller: 'SidebarCtrl',
            controllerAs: 'sidebar'
          },
          'top-menu@mainApp': {
            templateUrl: 'main-app/top-menu.tpl.html',
            controller: 'TopMenuCtrl',
            controllerAs: 'topMenu'
          }
        }
      })
      .state('mainApp.collections', {
        url: '/collections',
        templateUrl: 'main-app/collections.tpl.html',
        controller: 'CollectionsCtrl',
        controllerAs: 'collections',
        resolve: {
          user: AuthService => {
            return AuthService.checkLoggedIn();
          }
        }
      })
      .state('mainApp.add-words', {
        url: '/collections/:collectionId/add-words',
        templateUrl: 'main-app/add-words.tpl.html',
        controller: 'AddWordsCtrl',
        controllerAs: 'addWords',
        resolve: {
          user: AuthService => {
            return AuthService.checkLoggedIn();
          }
        }
      })
      .state('mainApp.review-words', {
        url: '/collections/:collectionId/review-words',
        templateUrl: 'main-app/review-words.tpl.html',
        controller: 'ReviewWordsCtrl',
        controllerAs: 'reviewWords',
        resolve: {
          user: AuthService => {
            return AuthService.checkLoggedIn();
          }
        }
      })
      .state('mainApp.list-words', {
        url: '/list-words',
        templateUrl: 'main-app/list-words.tpl.html',
        controller: 'ListWordsCtrl',
        controllerAs: 'listWords',
        resolve: {
          user: AuthService => {
            return AuthService.checkLoggedIn();
          }
        },
        params: { searchString: null }
      })
      .state('mainApp.test-words', {
        url: '/test-words',
        templateUrl: 'main-app/test-words.tpl.html',
        controller: 'TestWordsCtrl',
        controllerAs: 'testWords',
        resolve: {
          user: AuthService => {
            return AuthService.checkLoggedIn();
          }
        }
      })
      .state('mainApp.logout', {
        url: '/logout',
        templateUrl: 'main-app/logout.tpl.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout',
        resolve: {
          user: AuthService => {
            return AuthService.checkLoggedIn();
          }
        }
      })
      .state('mainApp.import', {
        url: '/import',
        templateUrl: 'main-app/import.tpl.html',
        controller: 'ImportCtrl',
        controllerAs: 'import',
        resolve: {
          user: AuthService => {
            return AuthService.checkLoggedIn();
          }
        }
      })
      .state('mainApp.settings', {
        url: '/settings',
        templateUrl: 'main-app/settings.tpl.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings',
        resolve: {
          user: AuthService => {
            return AuthService.checkLoggedIn();
          }
        }
      });
  }
}());
