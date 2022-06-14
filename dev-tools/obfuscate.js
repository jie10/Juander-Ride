const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

function ensureDirectoryExistence(dirname) {
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname);
        console.log('Path directtory has been created!')
    } else {
        console.log('Path directory has already been created!');
    }
  }

function obfuscate(file, directory) {
    let originPath = path.join(directory, file);
    let filename = fs.readFileSync(originPath);
    console.log(originPath)
    let obfuscationResult = JavaScriptObfuscator.obfuscate(filename.toString(),
    {
        compact: false,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1
    });

    return obfuscationResult.getObfuscatedCode();
}

function delay(callback, TIMEOUT_IN_MILLISECONDS) {
    setTimeout(function () {
        callback();
    }, TIMEOUT_IN_MILLISECONDS);
}

function createScriptsFolder() {
    let scriptFolderPath = path.join(__dirname, '..', '/scripts');
    let distFolderPath = path.join(__dirname, '..', '/dist');

    fs.readdir(scriptFolderPath, (err, files) => {
        if (err)
          console.log(err);
        else {
            ensureDirectoryExistence(distFolderPath);
            files.filter(function (file) {
                return file !== '.DS_Store' && file !== 'components';
            }).forEach(function (file) {
                let obfuscatedCode = obfuscate(file, scriptFolderPath);

                let destinationPath = path.join(__dirname, '..', '/dist', file);
                fs.writeFileSync(destinationPath, obfuscatedCode);
            });
        }
    });
}

function createScriptsComponentsFolder() {
    let scriptFolderPath = path.join(__dirname, '..', '/scripts', '/components');
    let distFolderPath = path.join(__dirname, '..', '/dist', '/components');

    fs.readdir(scriptFolderPath, (err, files) => {
        if (err)
          console.log(err);
        else {
            ensureDirectoryExistence(distFolderPath);
            files.filter(function (file) {
                return file !== 'lib';
            }).forEach(function (file) {
                let obfuscatedCode = obfuscate(file, scriptFolderPath);
                let destinationPath = path.join(__dirname, '..', '/dist', '/components', file);
                fs.writeFileSync(destinationPath, obfuscatedCode);
            });
        }
    });
}

function createScriptsComponentsLibFolder() {
    let scriptFolderPath = path.join(__dirname, '..', '/scripts', '/components', '/lib');
    let distFolderPath = path.join(__dirname, '..', '/dist', '/components', '/lib');

    fs.readdir(scriptFolderPath, (err, files) => {
        if (err)
          console.log(err);
        else {
            ensureDirectoryExistence(distFolderPath);
            files.filter(function (file) {
                return file !== 'lib';
            }).forEach(function (file) {
                let obfuscatedCode = obfuscate(file, scriptFolderPath);
                let destinationPath = path.join(__dirname, '..', '/dist', '/components', '/lib', file);
                fs.writeFileSync(destinationPath, obfuscatedCode);
            });
        }
    });
}

delay(createScriptsFolder, 2000);

delay(createScriptsComponentsFolder, 3000);

delay(createScriptsComponentsLibFolder, 4000);