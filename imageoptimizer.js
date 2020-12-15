const resizeOptimizeImages = require('resize-optimize-images');

const { readdirSync } = require('fs');
const { join } = require('path');
const [dir] = process.argv.slice(2);
const files = readdirSync(dir);

(async () => {
    // Set the options.
    const options = {
        images: files.map((file, index) => {
            let ending = file.split('.');
            return join(dir, index + '.' + ending[ending.length - 1]);
        }),
        quality: 60
    };
 
    // Run the module.
    await resizeOptimizeImages(options);
})();