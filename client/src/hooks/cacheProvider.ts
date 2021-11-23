import { Cache } from 'swr';

const symCompareKey = Symbol('CompareKey');

interface ICacheItem {
  value: unknown;
  [symCompareKey]: number;
}

const cacheProvider = (
  maxPolygons: number,
  policy: 'LFU' | 'LRU' = 'LFU',
): Cache => {
  const polygonCache = new Map<string, ICacheItem>();
  const generalCache = new Map();

  const get = (key: string) => {
    if (!key.includes('polygon')) {
      return generalCache.get(key);
    } else {
      if (polygonCache.has(key)) {
        const cacheItem = polygonCache.get(key) as ICacheItem;

        if (policy === 'LFU') {
          cacheItem[symCompareKey]++;
        } else {
          cacheItem[symCompareKey] = Date.now();
        }
      }
      return polygonCache.get(key)?.value;
    }
  };

  const set = (key: string, value: unknown) => {
    if (!key.includes('polygon')) {
      generalCache.set(key, value);
      return;
    }

    if (polygonCache.size >= maxPolygons) {
      const evictedKey = Array.from(polygonCache.entries()).sort(
        ([, a], [, b]) => a[symCompareKey] - b[symCompareKey],
      )[0][0];
      polygonCache.delete(evictedKey);
    }

    let compareKey: number;
    if (policy === 'LFU') {
      compareKey = 1;
    } else {
      compareKey = Date.now();
    }
    polygonCache.set(key, {
      value: value,
      [symCompareKey]: compareKey,
    });
  };

  const cacheDelete = (key: string) => {
    if (!key.includes('polygon')) {
      generalCache.delete(key);
    } else {
      polygonCache.delete(key);
    }
  };

  return {
    get,
    set,
    delete: cacheDelete,
  };
};

export default cacheProvider;
