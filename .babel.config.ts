module.exports = (api: { cache: (arg0: boolean) => void }) => {
  api.cache(false);

  const plugins = [
    'babel-plugin-styled-components',
    'styled-components',
  ];

  const presets = [
    '@babel/preset-react',
    '@babel/preset-env',
    '@babel/preset-typescript',
    'next/babel',
  ];

  return { presets, plugins };
};
