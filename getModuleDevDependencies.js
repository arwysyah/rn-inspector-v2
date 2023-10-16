const getCommand = require('./getCommand');
const scanModule = require('./filterModule');
const pc = require('picocolors')

async function getModuleDependencies() {
  const response = await scanModule('devDependencies');
  const res = getCommand(response);
  console.log(pc.green(res));
}
getModuleDependencies();
