/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('ImportService', function () {
  var factory = undefined;

  beforeEach(module('common'));

  beforeEach(inject(function (ImportService) {
    factory = ImportService;
  }));

  // it('should have someValue be ImportService', () => {
  //   expect(factory.someValue).toEqual('ImportService');
  // });

  // it('should have someMethod return ImportService', () => {
  //   expect(factory.someMethod()).toEqual('ImportService');
  // });
});