(() => {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:ConfigService
   *
   * @description
   *
   */
  angular
    .module('common')
    .factory('ConfigService', ConfigService);

  function ConfigService() {

    let ConfigServiceBase = {};
    
    ConfigServiceBase.mashapeKey = 'S4DvXSr43Cmsh5Kww0kOuX9QxNbXp1hjhkYjsn84TFraf8SlG3';
    
    return ConfigServiceBase;

  }
}());
