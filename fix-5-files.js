const fs = require('fs');

const files = [
    "src/components/voca/admin/AdminPanel.tsx",
    "src/components/voca/chat/FloatingCallBar.tsx",
    "src/components/voca/chat/MessageBubble.tsx",
    "src/components/voca/chat/UserProfileSettings.tsx",
    "src/lib/data.ts"
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // We know that `//` swallowed the code.
    // However, because of the way the previous script worked, we can actually just restore from the original file (git HEAD),
    // and then apply the SPECIFIC changes we made!
    
    // What changes did I make or the user make since March 28?
    // Let's just fix the comments.
    // A comment starts with `//` and ends where valid code begins.
    // Example: `// Fetch ALL messages (God Mode) useEffect(() => {` -> `// Fetch ALL messages (God Mode)\nuseEffect(() => {`
    // Example: `// --- Settings --- const SettingsView = () => {` -> `// --- Settings ---\nconst SettingsView = () => {`
    
    // For `// --- Word ---`
    content = content.replace(/(\/\/ --- [a-zA-Z\s()]+ ---) (const|export|let|function)/g, '\n$1\n$2');
    
    // For `// ...` comments
    content = content.replace(/(\/\/ [a-zA-Z0-9\s.,!?()[\]'":;-]+) (const|export|let|function|if|return|try|catch|class|interface|type|useEffect|useState|toast|sendBroadcast|console|return|updateSystemSettings|deleteUser|\} )/g, '\n$1\n$2');

    // MessageBubble.tsx has `// Show avatar for first message in group`
    content = content.replace(/(\/\/ Show avatar for first message in group) (const)/g, '\n$1\n$2');
    
    // data.ts has `// IDs of favorite contacts password?: string; blockedUsers?: string[];`
    content = content.replace(/(\/\/ IDs of favorite contacts) (password\?:)/g, '\n$1\n$2');
    content = content.replace(/(\/\/ IDs of blocked users) (archivedChats\?:)/g, '\n$1\n$2');
    content = content.replace(/(\/\/ IDs of archived chats \(per user\)) (isSunsanTeam\?:)/g, '\n$1\n$2');
    content = content.replace(/(\/\/ Special flag for Sunsan Team official account \(pink badge\)) (\})/g, '\n$1\n$2');
    content = content.replace(/(\/\/ Arrays of user IDs who starred this) (mediaUrl\?:)/g, '\n$1\n$2');
    content = content.replace(/(\/\/ For images\/videos) (duration\?:)/g, '\n$1\n$2');
    content = content.replace(/(\/\/ For voice notes) (fileName\?:)/g, '\n$1\n$2');
    content = content.replace(/(\/\/ For docs) (isDeleted\?:)/g, '\n$1\n$2');
    content = content.replace(/(\/\/ Deleted for everyone \(unsent\)) (isEdited\?:)/g, '\n$1\n$2');
    content = content.replace(/(\/\/ Edited message) (deletedFor\?:)/g, '\n$1\n$2');
    content = content.replace(/(\/\/ IDs of users who deleted this message for themselves) (replyToId\?:)/g, '\n$1\n$2');
    content = content.replace(/(\/\/ Optimistic UI: true if currently uploading) (progress\?:)/g, '\n$1\n$2');
    content = content.replace(/(\/\/ Upload progress 0-100) (\})/g, '\n$1\n$2');
    content = content.replace(/(\/\/ For groups) (groupImage\?:)/g, '\n$1\n$2');
    content = content.replace(/(\/\/ Track call direction) (\})/g, '\n$1\n$2');

    // FloatingCallBar.tsx
    content = content.replace(/(\/\/ User accepted the call) (const)/g, '\n$1\n$2');
    
    // UserProfileSettings.tsx
    content = content.replace(/(\/\/ Generate a UI Avatars URL based on the name) (const)/g, '\n$1\n$2');
    
    fs.writeFileSync(file, content);
    console.log(`Patched ${file}`);
}
