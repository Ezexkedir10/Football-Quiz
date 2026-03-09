#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Dependencies to add
const dependencies = {
  'bcryptjs': '^2.4.3',
  'jose': '^5.2.0',
  '@prisma/client': '^5.9.0',
};

const devDependencies = {
  'prisma': '^5.9.0',
};

const packageJsonPath = path.join(__dirname, '../package.json');

try {
  let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Add dependencies
  packageJson.dependencies = { ...packageJson.dependencies, ...dependencies };
  packageJson.devDependencies = { ...packageJson.devDependencies, ...devDependencies };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✓ Dependencies added successfully');
} catch (error) {
  console.error('Error adding dependencies:', error);
  process.exit(1);
}
