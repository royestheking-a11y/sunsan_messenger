const fs = require('fs');
let content = fs.readFileSync('src/components/voca/admin/AdminPanel.tsx', 'utf8');

// The problematic comment:
// // If user not in context (lazy loaded), try to find in message population if available // But for now, fallback to ID is okay return user?.name || userId; };
content = content.replace(/\/\/ If user not in context \(lazy loaded\), try to find in message population if available \/\/ But for now, fallback to ID is okay return/g, '// If user not in context (lazy loaded), try to find in message population if available\n// But for now, fallback to ID is okay\nreturn');

// Are there other comments in ModerationView?
// // Filter messages for display const filteredMessages = ...
content = content.replace(/\/\/ Filter messages for display const/g, '// Filter messages for display\nconst');

// // senderId might be populated object or string depending on backend response, verify backend // In backend routes\/admin.js: \.populate\('senderId', 'name avatar'\) // So msg\.senderId is object \{ _id:\.\.\., name:\.\.\., avatar:\.\.\. \} // Fallback to getUserName\(id\) if name is missing senderName:/g, '// senderId might be populated object or string depending on backend response, verify backend\n// In backend routes/admin.js: .populate(\'senderId\', \'name avatar\')\n// So msg.senderId is object { _id:..., name:..., avatar:... }\n// Fallback to getUserName(id) if name is missing\nsenderName:');

// // Helper for deletion \}\)\)\.filter/g, '// Helper for deletion\n})).filter');

// // Show deleted messages based on toggle if/g, '// Show deleted messages based on toggle\nif');

// // Search filter const searchLower =/g, '// Search filter\nconst searchLower =');

// // Scanner Effect <div/g, '// Scanner Effect\n<div');

// // Convert base64 to File const response/g, '// Convert base64 to File\nconst response');

// // Upload to Cloudinary const \{ uploadAPI \}/g, '// Upload to Cloudinary\nconst { uploadAPI }');

fs.writeFileSync('src/components/voca/admin/AdminPanel.tsx', content);
