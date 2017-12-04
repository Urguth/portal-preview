import { renderFile } from 'ejs';
import { readFileSync, writeFileSync } from 'fs';

/**
 * Render page from layout
 * @param language 
 * @param json 
 * @param path 
 */
function render(language: string, json:{}, path:string){
    renderFile('./themes/sukl-pristupy-theme/layout/layout.ejs', { language, json }, (err, str) => {
        if (err) {
            console.error(err)
        } else {
            writeFileSync(path, str);
        }
    })
}

render('cz', JSON.parse(readFileSync('./source/_data/content_cz.json', 'utf8')),'./themes/sukl-pristupy-theme/source/index.html');
render('en', JSON.parse(readFileSync('./source/_data/content_en.json', 'utf8')),'./themes/sukl-pristupy-theme/source/index_en.html');