const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('.').filter(f => 
    !f.includes('node_modules') && 
    !f.includes('.git') && 
    !f.includes('dist') && 
    !f.includes('rename.js') &&
    (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.html') || f.endsWith('.json'))
);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content
        .replace(/Magic/g, 'Digi')
        .replace(/magic/g, 'digi')
        .replace(/MAGIC/g, 'DIGI');
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated content in ${file}`);
    }
});

// Rename files and directories
const renamePaths = (dir) => {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fullPath.includes('node_modules') || fullPath.includes('.git') || fullPath.includes('dist')) continue;
        
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            renamePaths(fullPath);
        }
        
        if (item.includes('Magic') || item.includes('magic')) {
            const newItem = item.replace(/Magic/g, 'Digi').replace(/magic/g, 'digi');
            const newFullPath = path.join(dir, newItem);
            fs.renameSync(fullPath, newFullPath);
            console.log(`Renamed ${fullPath} to ${newFullPath}`);
        }
    }
};

renamePaths('.');
