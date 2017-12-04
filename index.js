"use strict";
exports.__esModule = true;
var ejs_1 = require("ejs");
var fs_1 = require("fs");
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
render('cz', JSON.parse(fs_1.readFileSync('./source/_data/content_cz.json', 'utf8')), './themes/sukl-pristupy-theme/source/index.html');
render('en', JSON.parse(fs_1.readFileSync('./source/_data/content_en.json', 'utf8')), './themes/sukl-pristupy-theme/source/index_en.html');
