import expect from 'expect';
import * as utils from './index';

describe('array-utils', () => {
  it('replaces values for given predicate', () => {
    const values = ['foo', 'bar'];
    const replacer = utils.replaceWith(item => item === 'foo', 'FOO');

    expect(values.map(replacer)).toEqual(['FOO', 'bar']);
  });

  it('replaces values with result of callback function', () => {
    const values = ['foo', 'bar'];
    const replacer = utils.replaceWith(item => item === 'foo', item => `${item}Bar`);

    expect(values.map(replacer)).toEqual(['fooBar', 'bar']);
  });

  it('extends values with given object', () => {
    const values = [
      {name: 'foo'},
      {name: 'bar'},
    ];
    const replacer = utils.extendWith(item => item.name === 'foo', {
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

      const result = values.sort(utils.pushToBottom(item => item === 'foo'));
      expect(result).toEqual(expected);
    });

    it('pushes to top values matching predicate', () => {
      const values = ['foo', 'bar', 'baz', 'foo'];
      const expected = ['foo', 'foo', 'bar', 'baz'];

      const result = values.sort(utils.pushToTop(item => item === 'foo'));
      expect(result).toEqual(expected);
    });

    it('should be chainable', () => {
      const values = ['foo', 'bar', 'baz', 'foo'];
      const expected = ['foo', 'foo', 'baz', 'bar'];

      const result = values.sort(utils.pushToTop(item => item === 'foo'))
        .sort(utils.pushToBottom(item => item === 'bar'));

      expect(result).toEqual(expected);
    });
  });

  describe('filtering', () => {
    it('excludes empty values', () => {
      const values = ['foo', 0, 'bar'];
      expect(values.filter(utils.excludeEmpty())).toEqual(['foo', 'bar']);
    });

    it('filters array by value', () => {
      const values = ['foo', 'bar'];
      expect(values.filter(utils.filterByValue('foo'))).toEqual(['foo']);
    });

    it('filter array by values list', () => {
      const values = ['a', 'b', 'c', 'd'];
      const filter = utils.filterByValue('a', 'b');
      expect(values.filter(filter)).toEqual(['a', 'b']);
    });

    it('filter array of objects by key value', () => {
      const values = [
        {name: 'foo'},
        {name: 'bar'},
        {name: 'bar'},
      ];
      const filter = utils.filterByKeyValue('name', 'foo');
      expect(values.filter(filter)).toEqual([
        {name: 'foo'},
      ]);
    });

    it('filter array of objects by key values list', () => {
      const values = [
        {name: 'foo'},
        {name: 'bar'},
        {name: 'baz'},
      ];
      const filter = utils.filterByKeyValue('name', 'foo', 'baz');
      expect(values.filter(filter)).toEqual([
        {name: 'foo'},
        {name: 'baz'},
      ]);
    });
  });

  describe('reducing', () => {
    it('collapses arrays', () => {
      const values = [[1, 2], [3, 4], [5]];
      expect(values.reduce(utils.collapse())).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
