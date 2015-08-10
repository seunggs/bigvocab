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
    ConfigServiceBase.forvoKey = 'f850390038cd293954cb5bdf7dc36d8a';
    ConfigServiceBase.mwKey = 'e1f9d411-f40e-40b0-bdae-7c1903daf229';

    return ConfigServiceBase;

  }
}());
