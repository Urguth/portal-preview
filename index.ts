import { renderFile } from 'ejs';
import { readFileSync, writeFileSync } from 'fs';

/**
 * Load data and replace $vars with actual argumets
 * @param path 
 */
function load(path: string) {
    return JSON.parse(readFileSync(path, 'utf8')
        .replace(/\$PORTAL_URL/g, process.argv[2])
        .replace(/\$API_URL/g, process.argv[3])
    );
}

/**
 * Render page from layout
 * @param language 
 * @param json 
 * @param path 
 */
function render(language: string, json: {}, path: string) {
    renderFile('./themes/sukl-pristupy-theme/layout/layout.ejs', { language, json }, (err, str) => {
        if (err) {
            console.error(err)
        } else {
            writeFileSync(path, str);
        }
    })
}
if (process.argv.length < 4) {
    console.error('Needs at least 2 arguments: PORTAL_URL API_URL')
    console.dir(process.argv);
    process.exit(1);
}
render('cz', load('./source/_data/content_cz.json'), './themes/sukl-pristupy-theme/source/index.html');
render('en', load('./source/_data/content_en.json'), './themes/sukl-pristupy-theme/source/index_en.html');
render('cz', load('./source/_data/content_api_cz.json'), './themes/sukl-api-theme/source/api.html');
render('en', load('./source/_data/content_api_en.json'), './themes/sukl-api-theme/source/api_en.html');