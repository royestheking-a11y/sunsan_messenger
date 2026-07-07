const fs = require('fs');
let content = fs.readFileSync('src/lib/data.ts', 'utf8');
content = content.replace(/\/\/ User IDs who liked\nthis comment/g, '// User IDs who liked this comment');
content = content.replace(/\/\/ User IDs who liked\ncomments:/g, '// User IDs who liked\ncomments:');
content = content.replace(/\/\/ Optimistic UI: true\nif currently uploading/g, '// Optimistic UI: true if currently uploading');
content = content.replace(/name\?: string;\s*\n\/\/ For groups/g, "name?: string; // For groups\n");
fs.writeFileSync('src/lib/data.ts', content);
