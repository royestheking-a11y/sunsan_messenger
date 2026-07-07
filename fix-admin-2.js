const fs = require('fs');
let content = fs.readFileSync('src/components/voca/admin/AdminPanel.tsx', 'utf8');

// fix ASI failure
content = content.replace(/toast\.success\("User deleted successfully"\); \} \} return \(/g, 'toast.success("User deleted successfully"); } }; return (');

fs.writeFileSync('src/components/voca/admin/AdminPanel.tsx', content);
