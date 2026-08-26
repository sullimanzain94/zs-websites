const lock = require('./package-lock.json');
console.log('lockfileVersion:', lock.lockfileVersion);
console.log('name:', lock.name);
console.log('version:', lock.version);
console.log('top-level keys:', Object.keys(lock));
if (lock.dependencies) {
  console.log('dependency names:', Object.keys(lock.dependencies));
}
if (lock.packages) {
  console.log('packages[\"\"]:', JSON.stringify(lock.packages[''], null, 2));
}
