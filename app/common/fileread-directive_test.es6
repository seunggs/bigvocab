/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('fileread', () => {
  let scope
    , element;

  beforeEach(module('common', 'common/fileread-directive.tpl.html'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope.$new();
    element = $compile(angular.element('<fileread></fileread>'))(scope);
  }));

  it('should have correct text', () => {
    scope.$apply();
    expect(element.isolateScope().fileread.name).toEqual('fileread');
  });
});
