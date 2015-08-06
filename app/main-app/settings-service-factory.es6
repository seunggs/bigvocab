(() => {
  'use strict';

  /**
   * @ngdoc service
   * @name mainApp.factory:SettingsService
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .factory('SettingsService', SettingsService);

  function SettingsService($http) {

    let SettingsServiceBase = {};

    SettingsServiceBase.update = (userId, settingsUpdate) => {
    	return $http.put('/api/users/' + userId, settingsUpdate);
    };

    return SettingsServiceBase;
  }
}());
