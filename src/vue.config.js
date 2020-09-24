const { NamedModulesPlugin } = require("webpack");

module.exports = {
    devServer = {
        proxy: {
            '/api': {
                target: 'http://www.api.com/index.php/'
            },
            '/shose': {
                target: 'http://www.api.com/inedx.php/'
            }
        }
    }
}