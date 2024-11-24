// module.exports = {
//     presets: [['@babel/preset-env'], '@babel/preset-react'],
//     plugins: ['@babel/plugin-transform-runtime'],
//   };

module.exports = {
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "current" } }],

    "@babel/preset-react",

    [
      "babel-preset-vite",
      {
        "env": true,
        "glob": false
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-runtime']
}