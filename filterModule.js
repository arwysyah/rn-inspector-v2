const fs = require('fs');
const path = require('path');
const getPackage = require('./getPackage');
const formatSize = require('./formatSize');
const getDirectorySize = require('./getDirectorySize');
const pc = require('picocolors')
const { currentDirectory } = require('./config');


const projectDirectory = path.resolve(
  currentDirectory,
  '..',
  '../node_modules',
);

const nodeModulesPath = projectDirectory;

const modules = fs.readdirSync(nodeModulesPath);

async function filterModule(arg) {
  let obj = {};
  try {
    const res = await getPackage(arg);

    if (res) {
      modules
        .filter(elem => res.includes(elem))
        .forEach(moduleName => {
          const modulePath = path.join(nodeModulesPath, moduleName);
          if (moduleName === '.yarn-integrity') {
            return;
          }

          try {
            const moduleSize = getDirectorySize(modulePath);
            obj[moduleName.toString()] = formatSize(moduleSize);
          } catch (error) {
            console.error(
              pc.red(
              `Error calculating size for module ${moduleName}: ${error.message}`),
            );
          }
        });
      return obj;
    }
  } catch (err) {
    console.log(pc.red(err));
  }
}

module.exports = filterModule;
