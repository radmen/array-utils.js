import expect from 'expect';
import {excludeEmpty, replaceWith, extendWith, pushToBottom, pushToTop} from './index';

describe('array-utils', () => {
  it('excludes empty values', () => {
    const values = ['foo', 0, 'bar'];

    expect(values.filter(excludeEmpty)).toEqual(['foo', 'bar']);
  });

  it('replaces values for given predicate', () => {
    const values = ['foo', 'bar'];
    const replacer = replaceWith(item => item === 'foo', 'FOO');

    expect(values.map(replacer)).toEqual(['FOO', 'bar']);
  });

  it('replaces values with result of callback function', () => {
    const values = ['foo', 'bar'];
    const replacer = replaceWith(item => item === 'foo', item => `${item}Bar`);

    expect(values.map(replacer)).toEqual(['fooBar', 'bar']);
  });

  it('extends values with given object', () => {
    const values = [
      {name: 'foo'},
      {name: 'bar'},
    ];
    const replacer = extendWith(item => item.name === 'foo', {
      active: true,
    });

    const expectedValues = [
      {name: 'foo', active: true},
      {name: 'bar'},
    ];

    expect(values.map(replacer)).toEqual(expectedValues);
  });

  describe('sorting', () => {
    it('pushes to bottom values matching predicate', () => {
      const values = ['foo', 'bar', 'baz', 'foo'];
      const expected = ['bar', 'baz', 'foo', 'foo'];

      const result = values.sort(pushToBottom(item => item === 'foo'));
      expect(result).toEqual(expected);
    });

    it('pushes to top values matching predicate', () => {
      const values = ['foo', 'bar', 'baz', 'foo'];
      const expected = ['foo', 'foo', 'bar', 'baz'];

      const result = values.sort(pushToTop(item => item === 'foo'));
      expect(result).toEqual(expected);
    });

    it('should be chainable', () => {
      const values = ['foo', 'bar', 'baz', 'foo'];
      const expected = ['foo', 'foo', 'baz', 'bar'];

      const result = values.sort(pushToTop(item => item === 'foo'))
        .sort(pushToBottom(item => item === 'bar'));

      expect(result).toEqual(expected);
    });
  });
});
