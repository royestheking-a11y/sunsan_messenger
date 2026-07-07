const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const badFiles = [];
walkDir('./src', function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        try {
            // we can use node to syntax check if we just try to parse it, but node doesn't support JSX natively.
            // Let's use Vite's esbuild!
            execSync(`npx esbuild "${filePath}" --format=esm --log-level=silent`, { stdio: 'ignore' });
        } catch (e) {
            console.log("Syntax error in:", filePath);
            badFiles.push(filePath);
        }
    }
});
console.log("Total bad files:", badFiles.length);
