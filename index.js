const negatePredicate = predicate => (...args) => !predicate(...args);

export const excludeEmpty = item => !!item;

export const replaceWith = (predicate, replaceWithData) => item => {
  if (!predicate(item)) {
    return item;
  }

  return typeof replaceWithData === 'function' ? replaceWithData(item) : replaceWithData;
};

export const extendWith = (predicate, extendWithData) =>
  replaceWith(predicate, item => Object.assign({}, item, extendWithData));

export const pushToBottom = predicate => (a, b) => {
  const predicateOfA = predicate(a);
  const predicateOfB = predicate(b);

  if (predicateOfA === predicateOfB) {
    return 0;
  }

  return predicateOfA ? 1 : -1;
};

export const pushToTop = predicate => pushToBottom(negatePredicate(predicate));

// @TODO equals helper - equals(value) => item => item === value;
// @TODO keyEquals helper - keyEquals(key, value) => item => item[key] === value;
