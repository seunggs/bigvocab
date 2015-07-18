(() => {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:Config
   *
   * @description
   *
   */
  angular
    .module('common')
    .factory('Config', Config);

  function Config() {

    let ConfigBase = {};
    
    ConfigBase.mashapeKey = 'S4DvXSr43Cmsh5Kww0kOuX9QxNbXp1hjhkYjsn84TFraf8SlG3';
    
    return ConfigBase;

  }
}());
