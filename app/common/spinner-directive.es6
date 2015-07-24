(() => {
  'use strict';

  /**
   * @ngdoc directive
   * @name common.directive:spinner
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="common">
       <file name="index.html">
        <spinner></spinner>
       </file>
     </example>
   *
   */
  angular
    .module('common')
    .directive('spinner', spinner);

  function spinner() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'common/spinner-directive.tpl.html',
      replace: true,
      link(scope, element, attrs) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
        scope.width = attrs.width;
      }
    };
  }
}());
