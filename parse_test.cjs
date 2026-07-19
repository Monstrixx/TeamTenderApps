const babel = require('@babel/core');
const fs = require('fs');
const content = fs.readFileSync('src/pages/Workspace.jsx', 'utf8');

const rkkBlock = content.substring(content.indexOf("{teknisSubTab === 'rkk' && ("), content.indexOf("{teknisSubTab === 'dukungan' && ("));

try {
  babel.transformSync(`const App = () => ( <>{ ${rkkBlock} }</> );`, {
    presets: ['@babel/preset-react']
  });
  console.log("RKK parsed successfully!");
} catch (e) {
  console.log("RKK parse error:", e.message);
}

const scheduleBlock = content.substring(content.indexOf("{teknisSubTab === 'jadwal' && ("), content.indexOf("{teknisSubTab === 'metode' && ("));
try {
  babel.transformSync(`const App = () => ( <>{ ${scheduleBlock} }</> );`, {
    presets: ['@babel/preset-react']
  });
  console.log("Schedule parsed successfully!");
} catch (e) {
  console.log("Schedule parse error:", e.message);
}
