module.exports = (api: { cache: (arg0: boolean) => void; }) => {
    api.cache(false);
 
    const presets = [
      '@babel/preset-react',
      '@babel/preset-env',
      '@babel/preset-typescript',
      'next/babel',
    ]

    const plugins = [
      ["styled-components"],
      ["babel-plugin-styled-components"],
    ];

    return { plugins, presets };
  }
