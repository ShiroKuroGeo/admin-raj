module.exports = function (ctx) {
  return {
    // ... other config ...
    build: {
      // ... other build options ...
      extendWebpack (cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          '@': path.resolve(__dirname, './src'),
          'pages': path.resolve(__dirname, './src/pages')
        }
      }
    }
  }
}
