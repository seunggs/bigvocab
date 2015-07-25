/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('Sm2Service', () => {
  let factory;

  beforeEach(module('common'));

  beforeEach(inject((Sm2Service) => {
    factory = Sm2Service;
  }));

  it('should have someValue be Sm2Service', () => {
    expect(factory.someValue).toEqual('Sm2Service');
  });

  it('should have someMethod return Sm2Service', () => {
    expect(factory.someMethod()).toEqual('Sm2Service');
  });
});
