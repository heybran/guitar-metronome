export default {
  build: {
    outDir: "dist",
  },
  server: {
    watch: {
      include: "src/components/**/*.css",
    },
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@sounds': '/src/sounds',
    }
  }
};
