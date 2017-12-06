"use strict";
exports.__esModule = true;
var ejs_1 = require("ejs");
var fs_1 = require("fs");
/**
 * Load data and replace $vars with actual argumets
 * @param path
 */
function load(path) {
    return JSON.parse(fs_1.readFileSync(path, 'utf8')
        .replace(/\$PORTAL_URL/g, process.argv[2])
        .replace(/\$API_URL/g, process.argv[3]));
}
/**
 * Render page from layout
 * @param language
 * @param json
 * @param path
 */
function render(language, json, path) {
    ejs_1.renderFile('./themes/sukl-pristupy-theme/layout/layout.ejs', { language: language, json: json }, function (err, str) {
        if (err) {
            console.error(err);
        }
        else {
            fs_1.writeFileSync(path, str);
        }
    });
}
if (process.argv.length < 4) {
    console.error('Needs at least 2 arguments: PORTAL_URL API_URL');
    console.dir(process.argv);
    process.exit(1);
}
render('cz', load('./source/_data/content_cz.json'), './themes/sukl-pristupy-theme/source/index.html');
render('en', load('./source/_data/content_en.json'), './themes/sukl-pristupy-theme/source/index_en.html');
