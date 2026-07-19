const fs = require('fs');
const content = fs.readFileSync('src/pages/Workspace.jsx', 'utf8');

const rkkBlock = content.substring(content.indexOf("{teknisSubTab === 'rkk' && ("), content.indexOf("{teknisSubTab === 'dukungan' && ("));
console.log(rkkBlock);
