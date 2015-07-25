(() => {
  'use strict';

  /**
   * @ngdoc directive
   * @name common.directive:modal
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <modal modal-bg="bg-red" yesCb="confirm()" noCb="abort()">
     </modal>
   *
   */
  angular
    .module('common')
    .directive('modal', modal);

  function modal() {
    return {
      restrict: 'EA',
      scope: {
        yesCb: '&',
        noCb: '&'
      },
      templateUrl: 'common/modal-directive.tpl.html',
      replace: false,
      transclude: true,
      link(scope, element, attrs) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
        scope.modalBg = attrs.modalBg || '';

        if (scope.yesCb === undefined && scope.noCb === undefined) {

        }
      }
    };
  }
}());
