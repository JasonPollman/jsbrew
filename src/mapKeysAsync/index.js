import map from '../map';
import global from '../internal/global';

export const MapKeysAsyncFactory = Promise => (collection, iteratee) => {
  const results = {};

  const deferred = Promise.all(map(collection, (value, key) => Promise.resolve()
    .then(() => iteratee(value, key, collection))
    .then((resolved) => { results[resolved] = value; }),
  ));

  return deferred.then(() => results);
};

const mapKeysAsync = MapKeysAsyncFactory(global.Promise);
mapKeysAsync.using = MapKeysAsyncFactory;

export default mapKeysAsync;
