module.exports = {
  // Global options:
  verbose: true,
  // Command options:
  build: {
    overwriteDest: true
  },
  ignoreFiles: [
    "yarn.lock",
    "package.json",
    "src/",
    "config.js",
    "README.md",
    "yarn-error.log"
  ]
};
