module.exports = function (api) {
  api.cache(false);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "babel-plugin-module-resolver",
        {
          alias: {
            "@src": "./src",
          },
          root: ["./src"],
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
      ],
      "module:react-native-dotenv",
    ],
  };
};
