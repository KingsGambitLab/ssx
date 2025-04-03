function deepMerge(...inputObjects: any[]) {
  const isObject = (o: any) => o && typeof o === 'object';
  return inputObjects.reduce((accumulated, current) => {
      if (!current) {
          return accumulated;
      }
      Object.keys(current).forEach((key) => {
          if (Array.isArray(accumulated[key]) && Array.isArray(current[key])) {
              accumulated[key] = accumulated[key].concat(...current[key]);
          } else if (isObject(accumulated[key]) && isObject(current[key])) {
              accumulated[key] = deepMerge(accumulated[key], current[key]);
          } else {
              accumulated[key] = current[key];
          }
      });
      return accumulated;
  }, {});
}

export default deepMerge;
