(() => {
  'use strict';

  angular
    .module('bigvocab')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('bigvocab', {
        url: '/bigvocab',
        templateUrl: 'bigvocab/bigvocab.tpl.html',
        controller: 'BigvocabCtrl',
        controllerAs: 'bigvocab'
      })
      .state('collections', {
        url: '/collections',
        templateUrl: 'bigvocab/collections.tpl.html',
        controller: 'CollectionsCtrl',
        controllerAs: 'collections'
      })
      .state('collection', {
        url: '/collection',
        templateUrl: 'bigvocab/collection.tpl.html',
        controller: 'CollectionCtrl',
        controllerAs: 'collection'
      })
      .state('nav', {
        url: '/nav',
        templateUrl: 'bigvocab/nav.tpl.html',
        controller: 'NavCtrl',
        controllerAs: 'nav'
      })
      .state('add-words', {
        url: '/add-words',
        templateUrl: 'bigvocab/add-words.tpl.html',
        controller: 'AddWordsCtrl',
        controllerAs: 'addWords'
      })
      .state('review-words', {
        url: '/review-words',
        templateUrl: 'bigvocab/review-words.tpl.html',
        controller: 'ReviewWordsCtrl',
        controllerAs: 'reviewWords'
      });
  }
}());
