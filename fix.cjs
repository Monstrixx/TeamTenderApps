const fs = require('fs');
const content = fs.readFileSync('src/pages/Workspace.jsx', 'utf8');

const importStr = "import React, { useState, useEffect } from 'react';";
const secondImportIdx = content.indexOf(importStr, 10);

if (secondImportIdx !== -1) {
    const originalContent = content.substring(secondImportIdx);
    fs.writeFileSync('src/pages/Workspace.jsx', originalContent);
    console.log("Recovered original file to Workspace.jsx");
} else {
    console.log("Could not find second import.");
}
