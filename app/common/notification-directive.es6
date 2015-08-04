(() => {
  'use strict';

  /**
   * @ngdoc directive
   * @name common.directive:notification
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <notification show="collections.showNotification" color="green">Some message</notification>
   *
   */
  angular
    .module('common')
    .directive('notification', notification);

  function notification($timeout) {
    return {
      restrict: 'EA',
      scope: {
        show: '=',
        color: '@'
      },
      templateUrl: 'common/notification-directive.tpl.html',
      transclude: true,
      replace: false,
      link(scope, element, attrs) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
        scope.$watch('show', function () {
          $timeout(() => {
            scope.show = false;
          }, 2500);
        });
      }
    };
  }
}());
