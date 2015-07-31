/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('fileread', function () {
  var scope = undefined,
      element = undefined;

  beforeEach(module('common', 'common/fileread-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<fileread></fileread>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().fileread.name).toEqual('fileread');
  });
});