module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-typescript"],
    plugins: [
        ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
        ["@babel/plugin-syntax-decorators", { decoratorsBeforeExport: true }]
    ]
};