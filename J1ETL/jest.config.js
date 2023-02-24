module.exports = {
  preset: "ts-jest",
  transform: {
    "\\.(t|j)s$": ["babel-jest", { configFile: "./.babelrc.js" }]
  },
};
