const fs = require('fs');
const path = require('path');

const SITE_DIR = path.join(__dirname, '..');
const COMPONENTS_DIR = path.join(SITE_DIR, 'components');

const navTemplate = fs.readFileSync(path.join(COMPONENTS_DIR, 'nav.html'), 'utf8');
const footerTemplate = fs.readFileSync(path.join(COMPONENTS_DIR, 'footer.html'), 'utf8');

// Get all HTML files in the site
function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'components' && file !== 'node_modules' && file !== '.git' && file !== 'scripts' && file !== 'data' && file !== 'docs' && file !== 'netlify') {
        getHtmlFiles(filePath, fileList);
      }
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getHtmlFiles(SITE_DIR);

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. Inject Navigation
  // Figure out the active path
  let activePath = '/';
  const relativeDir = path.relative(SITE_DIR, path.dirname(file));
  if (relativeDir && relativeDir !== '.') {
    activePath = `/${relativeDir.replace(/\\/g, '/')}/`;
  }

  // Add the active class to the nav template
  // Example: href="/about/" -> href="/about/" class="active"
  // For the homepage, the logo is href="/" but there isn't a list item for home.
  let currentNav = navTemplate;
  if (activePath !== '/') {
    // Escape for regex, though simple replace works if exact
    const targetHref = `href="${activePath}"`;
    currentNav = currentNav.replace(targetHref, `${targetHref} class="active"`);
  }

  // Replace existing <nav class="nav" id="nav">...</nav>
  const navRegex = /<nav class="nav" id="nav">[\s\S]*?<\/nav>/;
  if (navRegex.test(content)) {
    content = content.replace(navRegex, currentNav.trim());
    modified = true;
  }

  // 2. Inject Footer
  const footerRegex = /<footer class="footer">[\s\S]*?<\/footer>/;
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, footerTemplate.trim());
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${path.relative(SITE_DIR, file)}`);
  }
}

console.log('HTML build complete.');
