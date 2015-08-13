/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('Sm2Service', function () {
  var factory = undefined;

  beforeEach(module('common'));

  beforeEach(inject(function (Sm2Service) {
    factory = Sm2Service;
  }));

  it('ease factor should return a correct value', function () {
    var currentEaseFactor = 2.5;
    var choices = ['again', 'hard', 'good', 'easy'];
    var newEaseFactor = [2.3, 2.35, 2.5, 2.65];

    choices.forEach(function (choice, index) {
      expect(factory.calcEaseFactor(currentEaseFactor, choice)).toEqual(newEaseFactor[index]);
    });
  });
});