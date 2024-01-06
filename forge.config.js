module.exports = {
  packagerConfig: {
    asar: true,
    icon: './src/icons/logo',
    appBundleId: 'Desk Habitum v2'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip'
    },
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Dolphin Dev',
        description: 'App para manias compulsivas'
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
