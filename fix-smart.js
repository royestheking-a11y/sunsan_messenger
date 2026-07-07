const fs = require('fs');
const { execSync } = require('child_process');

const files = [
    "src/components/voca/admin/AdminPanel.tsx",
    "src/components/voca/chat/FloatingCallBar.tsx",
    "src/components/voca/chat/MessageBubble.tsx",
    "src/components/voca/chat/UserProfileSettings.tsx",
    "src/lib/data.ts"
];

for (const file of files) {
    try {
        // Read original HEAD to find all single-line comments
        const headContent = execSync(`git show HEAD:"${file}"`, { encoding: 'utf-8' });
        
        // Extract all single line comments.
        // A single line comment is // followed by everything up to \n
        const comments = [];
        const lines = headContent.split('\n');
        for (const line of lines) {
            const match = line.match(/(\/\/.*)$/);
            if (match) {
                // Ensure it's not inside a string like https://
                // Simple heuristic: if it has a space after // or is a known comment, it's a comment.
                const c = match[1].trim();
                if (c.startsWith('// ') || c.startsWith('//-') || c === '//') {
                     comments.push(c);
                }
            }
        }
        
        // Now sort comments by length descending, so we match longer comments first
        comments.sort((a, b) => b.length - a.length);
        
        // Read the current broken file
        let currentBroken = fs.readFileSync(file, 'utf8');
        
        // Remove the botched newlines from previous script attempt
        currentBroken = currentBroken.replace(/\n/g, ' ');
        currentBroken = currentBroken.replace(/\s+/g, ' ');
        
        // Now, for each comment, find it in the broken file and append a newline.
        // We have to be careful about replacing multiple times.
        // Let's use a special token to mark newlines so we don't mess up indexing,
        // then replace the token with \n at the end.
        let result = currentBroken;
        for (const c of comments) {
            // Escape special regex characters
            const escapedC = c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Match the comment followed by a space (since we replaced all whitespace with spaces)
            const regex = new RegExp(`(${escapedC})\\s+(?=\\S)`, 'g');
            result = result.replace(regex, `$1\n`);
        }
        
        fs.writeFileSync(file, result);
        console.log(`Smart patched ${file}`);
    } catch (e) {
        console.error(`Failed on ${file}:`, e);
    }
}
