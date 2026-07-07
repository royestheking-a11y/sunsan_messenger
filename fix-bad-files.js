const fs = require('fs');
const { execSync } = require('child_process');

const badFiles = [
    "src/components/figma/ImageWithFallback.tsx",
    "src/components/ui/sidebar.tsx",
    "src/components/voca/SplashScreen.tsx",
    "src/components/voca/admin/AdminPanel.tsx",
    "src/components/voca/admin/ImageCropper.tsx",
    "src/components/voca/chat/AttachmentMenu.tsx",
    "src/components/voca/chat/ContactPickerDialog.tsx",
    "src/components/voca/chat/CreatePostDialog.tsx",
    "src/components/voca/chat/CreateStatusDialog.tsx",
    "src/components/voca/chat/FloatingCallBar.tsx",
    "src/components/voca/chat/ImageViewer.tsx",
    "src/components/voca/chat/MessageBubble.tsx",
    "src/components/voca/chat/NewChatDialog.tsx",
    "src/components/voca/chat/StatusViewer.tsx",
    "src/components/voca/chat/UserProfileSettings.tsx",
    "src/components/voca/shared/ImageCropper.tsx",
    "src/lib/api.ts",
    "src/lib/data.ts",
    "src/lib/email.ts",
    "src/lib/googleAuth.ts",
    "src/lib/pushNotifications.ts",
    "src/lib/webrtc.ts"
];

let autoFixed = 0;
let needsManualFix = [];

for (const file of badFiles) {
    try {
        // Get the March 28 version (HEAD)
        const headContent = execSync(`git show HEAD:"${file}"`, { encoding: 'utf-8' });
        
        // Remove dark mode classes using a safe regex that doesn't touch newlines
        let cleanedHead = headContent.replace(/dark:[a-zA-Z0-9_/-]+/g, '');
        
        // Compare semantic content (ignore whitespace)
        const currentBroken = fs.readFileSync(file, 'utf8');
        
        // Let's also apply the fix-tw.js replacements to the cleanedHead if it's MessageBubble.tsx or similar
        // Because fix-tw.js was run earlier
        cleanedHead = cleanedHead.replace(/\[var\(--([a-zA-Z0-9_-]+)\)\]/g, '(--$1)');
        
        const normalize = str => str.replace(/\s+/g, ' ').trim();
        
        if (normalize(cleanedHead) === normalize(currentBroken)) {
            // It's safe to revert and apply our safe changes!
            fs.writeFileSync(file, cleanedHead);
            autoFixed++;
            console.log(`Auto-fixed: ${file}`);
        } else {
            console.log(`Requires manual fix: ${file}`);
            needsManualFix.push(file);
        }
    } catch (err) {
        console.log(`Error processing ${file}: ${err.message}`);
        needsManualFix.push(file);
    }
}

console.log(`\nAuto-fixed: ${autoFixed}`);
console.log(`Needs manual fix: ${needsManualFix.length}`);
