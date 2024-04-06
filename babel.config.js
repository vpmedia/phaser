/**
 * Babel configuration function.
 * @param {import('@babel/core').ConfigAPI} api - Configuration API reference.
 * @returns {import('@babel/core').TransformOptions} Configuration options.
 */
const config = (api) => {
  api.cache(false);
  const presets = ['@babel/preset-env'];
  return {
    presets,
  };
};

export default config;
