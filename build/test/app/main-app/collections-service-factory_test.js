/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('CollectionsService', function () {
  var factory = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function (CollectionsService) {
    factory = CollectionsService;
  }));

  // it('should have someValue be CollectionsService', () => {
  //   expect(factory.someValue).toEqual('CollectionsService');
  // });

  // it('should have someMethod return CollectionsService', () => {
  //   expect(factory.someMethod()).toEqual('CollectionsService');
  // });
});