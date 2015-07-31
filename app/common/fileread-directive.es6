(() => {
  'use strict';

  /**
   * @ngdoc directive
   * @name common.directive:fileread
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="common">
       <file name="index.html">
        <fileread></fileread>
       </file>
     </example>
   *
   */
  angular
    .module('common')
    .directive('fileread', fileread);

  function fileread() {
    return {
      restrict: 'A',
      scope: {
        fileread: '='
      },
      replace: false,
      link(scope, element, attrs) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/

        element.bind("change", function (changeEvent) {
          scope.fileread = [];
          var files = changeEvent.target.files;

          for (let i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();

            reader.onload = (function (file) {
              return function (loadEvent) {
                scope.$apply(function () {
                  scope.fileread.push({ name: file.name, content: loadEvent.target.result });
                });
              };
            })(f);

            reader.readAsText(f);
          }
        });      
      }
    };
  }
}());
