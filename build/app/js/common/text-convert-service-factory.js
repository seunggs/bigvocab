'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:TextConvertService
   *
   * @description
   *
   */
  angular.module('common').factory('TextConvertService', TextConvertService);

  function TextConvertService() {

    var TextConvertServiceBase = {};

    TextConvertServiceBase.toHtml = function (text) {
      var convertedText = text.replace(/\n/g, '<br>');
      return convertedText;
    };

    TextConvertServiceBase.fromHtml = function (text) {
      var convertedText = text.replace(/<br>/g, '\n').replace(/<div>/g, '\n').replace(/<\/div>/g, '\n').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
      return convertedText;
    };

    return TextConvertServiceBase;
  }
})();
//# sourceMappingURL=../common/text-convert-service-factory.js.map