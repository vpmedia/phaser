/** @type {import('@babel/core').ConfigFunction} */
const config = (api) => {
  api.cache(false);
  const presets = ['@babel/preset-env'];
  return {
    presets,
  };
};

export default config;
