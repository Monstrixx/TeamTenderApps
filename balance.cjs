const fs = require('fs');
const content = fs.readFileSync('src/pages/Workspace.jsx', 'utf8');

const rkkBlock = content.substring(content.indexOf("{teknisSubTab === 'rkk' && ("), content.indexOf("{teknisSubTab === 'dukungan' && ("));
const openRkk = (rkkBlock.match(/<div/g) || []).length;
const closeRkk = (rkkBlock.match(/<\/div>/g) || []).length;
console.log("RKK - Open:", openRkk, "Close:", closeRkk);

const scheduleBlock = content.substring(content.indexOf("{teknisSubTab === 'jadwal' && ("), content.indexOf("{teknisSubTab === 'metode' && ("));
const openSchedule = (scheduleBlock.match(/<div/g) || []).length;
const closeSchedule = (scheduleBlock.match(/<\/div>/g) || []).length;
console.log("Schedule - Open:", openSchedule, "Close:", closeSchedule);
