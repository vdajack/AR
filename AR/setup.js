#!/usr/bin/env node

/**
 * Quick Setup Script for AR QR Code Viewer
 * 
 * This script helps you quickly configure and test your AR viewer
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(colors[color] + message + colors.reset);
}

function checkFile(filename) {
    return fs.existsSync(filename);
}

async function runCommand(command, description) {
    return new Promise((resolve, reject) => {
        log(`🔄 ${description}...`, 'cyan');
        exec(command, (error, stdout, stderr) => {
            if (error) {
                log(`❌ Error: ${error.message}`, 'red');
                reject(error);
            } else {
                log(`✅ ${description} completed`, 'green');
                if (stdout) console.log(stdout);
                resolve(stdout);
            }
        });
    });
}

async function setup() {
    log('\n🚀 AR QR Code Viewer Setup', 'bright');
    log('================================\n', 'bright');

    // Check required files
    log('📋 Checking project files...', 'yellow');
    
    const requiredFiles = [
        'index.html',
        'config.js', 
        'package.json',
        'README.md'
    ];

    let allFilesPresent = true;
    for (const file of requiredFiles) {
        if (checkFile(file)) {
            log(`   ✅ ${file}`, 'green');
        } else {
            log(`   ❌ Missing: ${file}`, 'red');
            allFilesPresent = false;
        }
    }

    if (!allFilesPresent) {
        log('\n❌ Some required files are missing. Please ensure all files are present.', 'red');
        process.exit(1);
    }

    // Check if Node.js dependencies are installed
    log('\n📦 Checking dependencies...', 'yellow');
    
    if (!checkFile('node_modules')) {
        try {
            await runCommand('npm install', 'Installing dependencies');
        } catch (error) {
            log('⚠️  Could not install dependencies. You may need to run "npm install" manually.', 'yellow');
        }
    } else {
        log('   ✅ Dependencies already installed', 'green');
    }

    // Test local server
    log('\n🌐 Testing local server...', 'yellow');
    
    const serverCommands = [
        { cmd: 'npx serve --version', name: 'serve' },
        { cmd: 'python --version', name: 'python' },
        { cmd: 'php --version', name: 'php' }
    ];

    let serverAvailable = false;
    for (const server of serverCommands) {
        try {
            await runCommand(server.cmd, `Checking ${server.name}`);
            serverAvailable = true;
            break;
        } catch (error) {
            // Continue to next server option
        }
    }

    if (!serverAvailable) {
        log('⚠️  No local server found. Install one of: serve, python, or php', 'yellow');
    }

    // Configuration guidance
    log('\n⚙️  Configuration Options', 'yellow');
    log('=========================\n', 'yellow');
    
    log('1. 📝 Edit config.js to customize your AR experience:', 'cyan');
    log('   - Change the 3D model URL');
    log('   - Customize UI text and colors');
    log('   - Add multiple model options');
    
    log('\n2. 🎨 Replace the sample 3D model:', 'cyan');
    log('   - Add your .glb/.gltf files to a "models" folder');
    log('   - Update the model URL in config.js');
    log('   - Ensure models are under 5MB for mobile');

    log('\n3. 🎯 Test locally:', 'cyan');
    if (serverAvailable) {
        log('   npm start          # Start development server');
        log('   npm run serve      # Alternative server command');
    } else {
        log('   Install a local server first:');
        log('   npm install -g serve');
    }

    log('\n4. 🚀 Deploy to web:', 'cyan');
    log('   - GitHub Pages (free)');
    log('   - Netlify (drag & drop)');
    log('   - Vercel (git integration)');
    log('   See DEPLOYMENT.md for detailed instructions');

    log('\n5. 📱 Generate QR code:', 'cyan');
    log('   npm run generate-qr https://your-deployed-url.com');

    // Quick test
    log('\n🧪 Quick Test', 'yellow');
    log('=============\n', 'yellow');
    
    log('Want to test the AR viewer now? Choose an option:', 'cyan');
    log('1. Test in browser: npm start');
    log('2. Generate sample QR: npm run generate-qr https://example.com');
    log('3. Skip for now\n');

    // Final tips
    log('💡 Pro Tips:', 'yellow');
    log('============\n', 'yellow');
    log('• Test on actual mobile devices for best AR experience');
    log('• Ensure HTTPS when deployed (required for AR)');
    log('• Keep 3D models optimized (under 5MB)');
    log('• Use GLB format for better compatibility');
    log('• Test QR codes at different sizes (min 2cm x 2cm)');

    log('\n✨ Setup complete! Check README.md for detailed usage instructions.', 'green');
    log('🚀 Ready to create amazing AR experiences!', 'bright');
}

// Add command line options
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
    log('\n🔧 AR QR Code Viewer Setup Script', 'bright');
    log('==================================\n', 'bright');
    log('Usage: node setup.js [options]');
    log('\nOptions:');
    log('  --help, -h    Show this help message');
    log('  --test        Run quick functionality test');
    log('  --install     Install dependencies only');
    log('\nThis script will:');
    log('• Check required project files');
    log('• Install Node.js dependencies');
    log('• Verify local server availability');
    log('• Provide configuration guidance');
    log('• Show deployment and QR generation steps\n');
} else if (args.includes('--test')) {
    log('🧪 Running quick test...', 'cyan');
    // Add test functionality here
} else if (args.includes('--install')) {
    log('📦 Installing dependencies only...', 'cyan');
    runCommand('npm install', 'Installing Node.js dependencies')
        .then(() => log('✅ Dependencies installed successfully!', 'green'))
        .catch(() => log('❌ Failed to install dependencies', 'red'));
} else {
    setup().catch(error => {
        log(`\n❌ Setup failed: ${error.message}`, 'red');
        process.exit(1);
    });
}