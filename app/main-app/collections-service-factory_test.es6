/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('CollectionsService', () => {
  let factory;

  beforeEach(module('mainApp'));

  beforeEach(inject((CollectionsService) => {
    factory = CollectionsService;
  }));

  it('should have someValue be CollectionsService', () => {
    expect(factory.someValue).toEqual('CollectionsService');
  });

  it('should have someMethod return CollectionsService', () => {
    expect(factory.someMethod()).toEqual('CollectionsService');
  });
});
