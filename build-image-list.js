const fs = require('fs');
const path = require('path');
const endOfLine = require('os').EOL;

const { readdirSync } = require('fs');
const { join } = require('path');
const [dir] = process.argv.slice(2);
const files = readdirSync(dir);

const htmlBuilder = () => {
    let filledTemplate = '';
    let keyword = 'slojni_pokrivi';
    files.forEach((el, index) => {
        filledTemplate += `
        <div><a class="uk-inline" href="/${keyword}/${index}.jpg"><img style="border-radius: 6.25px; display: block; width: 350px; height: 200px" src="/${keyword}/${index}.jpg" draggable="false"></a></div>`;
    })
    fs.writeFileSync(path.join(`./build.html`), filledTemplate, 'utf8');
}

htmlBuilder(true);