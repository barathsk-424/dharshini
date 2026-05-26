const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'dharshini-creations/src/admin/pages');
fs.mkdirSync(dir, { recursive: true });
const pages = ['Dashboard', 'Users', 'Orders', 'Products', 'Analytics', 'Messages', 'Settings'];
pages.forEach(p => {
  const content = `import React from 'react';\n\nexport default function ${p}() {\n  return (\n    <div className="p-4">\n      <h2 className="text-2xl font-bold mb-4">${p}</h2>\n      <p>This is the ${p} admin page.</p>\n    </div>\n  );\n}`;
  fs.writeFileSync(path.join(dir, `${p}.jsx`), content);
});
console.log('Pages created successfully.');
