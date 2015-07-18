/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('modal', () => {
  let scope
    , element;

  beforeEach(module('common', 'common/modal-directive.tpl.html'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope.$new();
    element = $compile(angular.element('<modal></modal>'))(scope);
  }));

  it('should have correct text', () => {
    scope.$apply();
    expect(element.isolateScope().modal.name).toEqual('modal');
  });
});
