/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('Sm2Service', () => {
  let factory;

  beforeEach(module('common'));

  beforeEach(inject((Sm2Service) => {
    factory = Sm2Service;
  }));

  it('ease factor should return a correct value', () => {
    var currentEaseFactor = 2.5;
    var choices = ['again', 'hard', 'good', 'easy'];
    var newEaseFactor = [2.3, 2.35, 2.5, 2.65];

    choices.forEach((choice, index) => {
      expect(factory.calcEaseFactor(currentEaseFactor, choice)).toEqual(newEaseFactor[index]);
    });
  });

});
