'use strict';

(function () {
  'use strict';

  angular.module('home').config(config);

  function config($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'home/home.tpl.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    }).state('root', {
      abstract: true,
      url: '',
      views: {
        '': {},
        'nav-home@': {
          templateUrl: 'home/nav-home.tpl.html',
          controller: 'NavHomeCtrl',
          controllerAs: 'navHome'
        }
      }
    });
  }
})();
//# sourceMappingURL=../home/home-routes.js.map