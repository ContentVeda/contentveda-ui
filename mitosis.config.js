module.exports = {
  files: 'src/components/**',
  targets: ['react', 'svelte', 'webcomponent', 'vue', 'solid', 'angular'],
  dest: 'dist',
  options: {
    react: {
      typescript: true,
      stylesType: 'style-tag'
    },
    svelte: {
      typescript: true
    },
    webcomponent: {
      typescript: true
    },
    vue: {
      typescript: true
    },
    solid: {
      typescript: true
    },
    angular: {
      typescript: true
    }
  }
};
