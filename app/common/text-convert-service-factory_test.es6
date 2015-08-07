/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('TextConvertService', () => {
  let factory;

  beforeEach(module('common'));

  beforeEach(inject((TextConvertService) => {
    factory = TextConvertService;
  }));

  it('should have someValue be TextConvertService', () => {
    expect(factory.someValue).toEqual('TextConvertService');
  });

  it('should have someMethod return TextConvertService', () => {
    expect(factory.someMethod()).toEqual('TextConvertService');
  });
});
