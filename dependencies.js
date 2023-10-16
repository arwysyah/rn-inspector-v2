const fs = require('fs');
const path = require('path');
const getPackage = require('./getPackage');
const pc = require('picocolors');
const { projectDirectory, node_modules_inside } = require('./config');




function detectNodeModules() {
  const nodeModulesPath = node_modules_inside

  getPackage().then((response, error) => {
    if (error) {
      throw error;
    }
    if (response) {
      fs.readdir(nodeModulesPath, (err, files) => {
        if (err) {
          console.error('Error reading node_modules directory:', err);
          return;
        }

        const nodeModulesList = files.filter(file =>
          fs.statSync(path.join(nodeModulesPath, file)).isDirectory(),
        );

        if (nodeModulesList.length === 0) {
          console.log(pc.red('No Node modules found in the project.'));
        } else {
          nodeModulesList
            .filter(i => response.includes(i))
            .forEach(module => console.log(pc.green(`- ${module}`)));
        }
      });
    }
  });
}

detectNodeModules();
