'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name mainApp.factory:SettingsService
   *
   * @description
   *
   */
  angular.module('mainApp').factory('SettingsService', SettingsService);

  function SettingsService($http) {

    var SettingsServiceBase = {};

    SettingsServiceBase.update = function (userId, settingsUpdate) {
      return $http.put('/api/users/' + userId, settingsUpdate);
    };

    return SettingsServiceBase;
  }
})();
//# sourceMappingURL=../main-app/settings-service-factory.js.map