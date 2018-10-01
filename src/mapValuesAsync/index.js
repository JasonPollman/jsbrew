import global from '../internal/global';
import map from '../map';

export const MapValuesAsyncFactory = Promise => (collection, iteratee) => {
  const results = {};

  const deferred = Promise.all(map(collection, (value, key) => Promise.resolve()
    .then(() => iteratee(value, key, collection))
    .then((resolved) => { results[key] = resolved; }),
  ));

  return deferred.then(() => results);
};

const mapValuesAsync = MapValuesAsyncFactory(global.Promise);
mapValuesAsync.using = MapValuesAsyncFactory;

export default mapValuesAsync;
