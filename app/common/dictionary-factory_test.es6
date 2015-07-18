/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('Dictionary', () => {
  let factory;

  beforeEach(module('common'));

  beforeEach(inject((Dictionary) => {
    factory = Dictionary;
  }));

  it('should have someValue be Dictionary', () => {
    expect(factory.someValue).toEqual('Dictionary');
  });

  it('should have someMethod return Dictionary', () => {
    expect(factory.someMethod()).toEqual('Dictionary');
  });
});
