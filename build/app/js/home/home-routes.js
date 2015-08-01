'use strict';

(function () {
  'use strict';

  angular.module('home').config(config);

  function config($stateProvider) {
    $stateProvider.state('root', {
      abstract: true,
      views: {
        '': {
          templateUrl: 'home/root.tpl.html'
        },
        'nav-home@root': {
          templateUrl: 'home/nav-home.tpl.html',
          controller: 'NavHomeCtrl',
          controllerAs: 'navHome'
        }
      }
    }).state('root.home', {
      url: '/home',
      templateUrl: 'home/home.tpl.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    });
  }
})();
//# sourceMappingURL=../home/home-routes.js.map