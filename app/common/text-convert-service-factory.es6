(() => {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:TextConvertService
   *
   * @description
   *
   */
  angular
    .module('common')
    .factory('TextConvertService', TextConvertService);

  function TextConvertService() {

    let TextConvertServiceBase = {};

    TextConvertServiceBase.toHtml = text => {
      if (text === undefined) { return ''; }
      
      let convertedText = text.replace(/\n/g, '<br>');
      return convertedText;
    };

    TextConvertServiceBase.fromHtml = text => {
      if (text === undefined) { return ''; }

      let convertedText = text.replace(/<br>/g, '\n')
                              .replace(/<div>/g, '\n')
                              .replace(/<\/div>/g, '\n')
                              .replace(/&amp;/g, '&')
                              .replace(/&nbsp;/g, ' ')
                              .replace(/&gt;/g, '>');
      return convertedText;
    };

    return TextConvertServiceBase;
  }
}());
