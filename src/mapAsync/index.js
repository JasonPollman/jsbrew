import map from '../map';
import global from '../internal/global';

export const MapAsyncFactory = Promise => (collection, iteratee) => (
  Promise.all(map(collection, iteratee))
);

const mapAsync = MapAsyncFactory(global.Promise);
mapAsync.using = MapAsyncFactory;

export default mapAsync;
