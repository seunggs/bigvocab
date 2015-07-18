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
     <example module="common">
       <file name="index.html">
        <modal></modal>
       </file>
     </example>
   *
   */
  angular
    .module('common')
    .directive('modal', modal);

  function modal() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'common/modal-directive.tpl.html',
      replace: false,
      controllerAs: 'modal',
      controller() {
        let vm = this;
        vm.name = 'modal';
      },
      link(scope, element, attrs) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    };
  }
}());
