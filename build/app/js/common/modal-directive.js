'use strict';

(function () {
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
     <modal show="collections.showModal" 
            modal-bg="bg-red" 
            yes-cb="collections.confirmModal()" 
            no-cb="collections.closeModal()" 
            yes-message="Yes, delete" 
            no-message="No, abort">
     </modal>
   *
   */
  angular.module('common').directive('modal', modal);

  function modal() {
    return {
      restrict: 'EA',
      scope: {
        show: '=',
        yesCb: '&?',
        noCb: '&?'
      },
      templateUrl: 'common/modal-directive.tpl.html',
      replace: false,
      transclude: true,
      link: function link(scope, element, attrs) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
        scope.modalBg = attrs.modalBg || '';
        scope.yesMessage = attrs.yesMessage || 'Yes';
        scope.noMessage = attrs.noMessage || 'No';

        if (scope.yesCb !== undefined && scope.noCb !== undefined) {
          scope.showButtons = true;
        } else {
          scope.showButtons = false;
        }
      }
    };
  }
})();
//# sourceMappingURL=../common/modal-directive.js.map