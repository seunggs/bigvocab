/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('TextConvertService', () => {
  let factory;

  beforeEach(module('common'));

  beforeEach(inject((TextConvertService) => {
    factory = TextConvertService;
  }));

  describe('toHtml', () => {
    let text;

    it('should return an empty string if the input text is undefined', () => {
      text = undefined;
      expect(factory.toHtml(text)).toEqual('');
    });

    it('should convert \n to <br>', () => {
      text = 'Some text.\nThen the second line.';
      expect(factory.toHtml(text)).toEqual('Some text.<br>Then the second line.');
    });
  });

  describe('fromHtml', () => {
    let text;

    it('should return an empty string if the input text is undefined', () => {
      text = undefined;
      expect(factory.fromHtml(text)).toEqual('');
    });

    it('should convert a <br> to \n', () => {
      text = 'A line.<br>Then another.'
      expect(factory.fromHtml(text)).toEqual('A line.\nThen another.');
    });

    it('should convert <div> tag groups to wrapping \n characters', () => {
      text = '<div>Some kind of text.</div><div>Another line of text.</div>';
      expect(factory.fromHtml(text)).toEqual('\nSome kind of text.\n\nAnother line of text.\n');
    });

    it('should convert &amp; character to & sign', () => {
      text = 'Hansel &amp; Gretel';
      expect(factory.fromHtml(text)).toEqual('Hansel & Gretel');
    });

    it('should convert &nbsp; to an empty space character', () => {
      text = 'Some kind of text.&nbsp;Another text.';
      expect(factory.fromHtml(text)).toEqual('Some kind of text. Another text.');
    });

    it('should convert &gt; to a > character', () => {
      text = '10 &gt; 5';
      expect(factory.fromHtml(text)).toEqual('10 > 5');
    });

    it('should convert combination of special html chars to proper text chars', () => {
      text = '<div>10 &gt; 5</div><div>First line.<br>Second line &amp; something else.&nbsp;</div>';
      expect(factory.fromHtml(text)).toEqual('\n10 > 5\n\nFirst line.\nSecond line & something else. \n');
    });
  });
});
