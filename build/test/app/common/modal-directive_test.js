/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('modal', function () {
  var scope = undefined,
      element = undefined;

  beforeEach(module('common', 'common/modal-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<modal></modal>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().modal.name).toEqual('modal');
  });
});