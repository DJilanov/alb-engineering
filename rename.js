const { join } = require('path');
const { readdirSync, renameSync } = require('fs');
const [dir] = process.argv.slice(2);
const files = readdirSync(dir);

console.log('Files: ', files);

files
  .forEach((file, index) => {
    const filePath = join(dir, file);
    let ending = file.split('.');
    console.log('FIle: ', file)
    console.log('New name: ', index + '.' + ending[ending.length - 1]);
    const newFilePath = join(dir, index + ending[ending.length - 1]);

    renameSync(filePath, newFilePath);
});