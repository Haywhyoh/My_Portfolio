#!/usr/bin/env node

/**
 * Blog System Test Script
 * This script validates the blog system functionality
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Starting Blog System Tests...\n');

// Test 1: Check if all required files exist
console.log('📁 Testing file structure...');

const requiredFiles = [
  'src/app/blog/page.tsx',
  'src/app/blog/[slug]/page.tsx',
  'src/app/blog/[slug]/loading.tsx',
  'src/app/blog/[slug]/opengraph-image.tsx',
  'src/app/blog/feed.xml/route.ts',
  'src/app/sitemap.ts',
  'src/components/blog/BlogDetail.tsx',
  'src/components/blog/ArticleNavigation.tsx',
  'src/components/blog/SocialShare.tsx',
  'src/components/blog/RelatedPosts.tsx',
  'src/components/ui/Breadcrumb.tsx',
  'src/lib/blog.ts',
  'src/lib/markdown.ts',
  'src/lib/structuredData.ts',
  'src/lib/types.ts',
  'src/lib/pagination.ts',
];

let filesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    filesExist = false;
  }
});

if (!filesExist) {
  console.log('\n❌ Some required files are missing!');
  process.exit(1);
}

console.log('\n✅ All required files exist!\n');

// Test 2: Check blog data structure
console.log('📊 Testing blog data structure...');

try {
  const blogDataPath = path.join(__dirname, '..', 'src', 'assets', 'jsonData', 'blog', 'BlogData.json');
  const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));
  
  if (!Array.isArray(blogData)) {
    throw new Error('Blog data is not an array');
  }
  
  if (blogData.length === 0) {
    throw new Error('Blog data is empty');
  }
  
  // Check required fields
  const requiredFields = ['id', 'title', 'author', 'date', 'text', 'thumb'];
  blogData.forEach((blog, index) => {
    requiredFields.forEach(field => {
      if (!(field in blog)) {
        throw new Error(`Blog item ${index} is missing required field: ${field}`);
      }
    });
  });
  
  console.log(`✅ Blog data structure is valid (${blogData.length} posts)`);
} catch (error) {
  console.log(`❌ Blog data validation failed: ${error.message}`);
  process.exit(1);
}

// Test 3: Check TypeScript compilation
console.log('\n🔧 Testing TypeScript compilation...');

const { execSync } = require('child_process');

try {
  execSync('npx tsc --noEmit', { 
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe'
  });
  console.log('✅ TypeScript compilation successful');
} catch (error) {
  console.log('❌ TypeScript compilation failed');
  console.log(error.stdout?.toString() || error.message);
  process.exit(1);
}

// Test 4: Check for common issues
console.log('\n🔍 Checking for common issues...');

// Check for console.log statements in production code
const sourceFiles = [
  'src/components/blog/BlogDetail.tsx',
  'src/components/blog/ArticleNavigation.tsx',
  'src/components/blog/SocialShare.tsx',
  'src/components/blog/RelatedPosts.tsx',
  'src/lib/blog.ts',
  'src/lib/markdown.ts',
];

let hasConsoleLogs = false;
sourceFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('console.log')) {
      console.log(`⚠️  ${file} contains console.log statements`);
      hasConsoleLogs = true;
    }
  }
});

if (!hasConsoleLogs) {
  console.log('✅ No console.log statements found in production code');
}

// Test 5: Check for TODO comments
console.log('\n📝 Checking for TODO comments...');

let hasTodos = false;
sourceFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('TODO') || content.includes('FIXME')) {
      console.log(`⚠️  ${file} contains TODO/FIXME comments`);
      hasTodos = true;
    }
  }
});

if (!hasTodos) {
  console.log('✅ No TODO/FIXME comments found');
}

// Test 6: Check for proper imports
console.log('\n📦 Checking import statements...');

const blogDetailPath = path.join(__dirname, '..', 'src', 'components', 'blog', 'BlogDetail.tsx');
if (fs.existsSync(blogDetailPath)) {
  const content = fs.readFileSync(blogDetailPath, 'utf8');
  
  const requiredImports = [
    'useState',
    'useEffect',
    'Image',
    'Link',
    'BlogPost',
    'parseMarkdown',
    'formatDate',
    'formatReadTime',
    'ArticleNavigation',
    'SocialShare',
    'RelatedPosts'
  ];
  
  let missingImports = [];
  requiredImports.forEach(importName => {
    if (!content.includes(importName)) {
      missingImports.push(importName);
    }
  });
  
  if (missingImports.length === 0) {
    console.log('✅ All required imports are present');
  } else {
    console.log(`⚠️  Missing imports: ${missingImports.join(', ')}`);
  }
}

// Test 7: Check for proper error handling
console.log('\n🛡️  Checking error handling...');

const blogLibPath = path.join(__dirname, '..', 'src', 'lib', 'blog.ts');
if (fs.existsSync(blogLibPath)) {
  const content = fs.readFileSync(blogLibPath, 'utf8');
  
  if (content.includes('try') && content.includes('catch')) {
    console.log('✅ Error handling is present in blog utilities');
  } else {
    console.log('⚠️  Error handling may be missing in blog utilities');
  }
}

// Test 8: Check for accessibility features
console.log('\n♿ Checking accessibility features...');

const blogDetailPath2 = path.join(__dirname, '..', 'src', 'components', 'blog', 'BlogDetail.tsx');
if (fs.existsSync(blogDetailPath2)) {
  const content = fs.readFileSync(blogDetailPath2, 'utf8');
  
  const accessibilityFeatures = [
    'alt=',
    'aria-label',
    'role=',
    'tabindex'
  ];
  
  let hasAccessibilityFeatures = false;
  accessibilityFeatures.forEach(feature => {
    if (content.includes(feature)) {
      hasAccessibilityFeatures = true;
    }
  });
  
  if (hasAccessibilityFeatures) {
    console.log('✅ Accessibility features are present');
  } else {
    console.log('⚠️  Accessibility features may be missing');
  }
}

console.log('\n🎉 Blog system tests completed!');
console.log('\n📋 Next steps:');
console.log('1. Run the development server: npm run dev');
console.log('2. Test the blog functionality manually');
console.log('3. Check the testing checklist: BLOG_TESTING_CHECKLIST.md');
console.log('4. Run performance tests with Lighthouse');
console.log('5. Test on different devices and browsers');

console.log('\n✨ Happy testing!');
