/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

/*
	WHAT TO TEST:
	- can the user edit things? Does the work flow work properly? DB call + Success msg + 
 */

describe('ReviewWordsCtrl', () => {
  let ctrl;

  beforeEach(module('mainApp'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('ReviewWordsCtrl');
  }));

  // it('should have ctrlName as ReviewWordsCtrl', () => {
  //   expect(ctrl.ctrlName).toEqual('ReviewWordsCtrl');
  // });
});
