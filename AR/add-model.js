#!/usr/bin/env node

/**
 * Quick Model Addition Script
 * 
 * This script helps you quickly add new client models to the system
 * 
 * Usage:
 *   node add-model.js
 *   (Interactive prompts will guide you)
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(colors[color] + message + colors.reset);
}

function question(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}

// Scale presets for common use cases
const scalePresets = {
    '1': { value: '1 1 1', name: 'Full Size (1:1)', description: 'Products, furniture, human-scale objects' },
    '2': { value: '0.5 0.5 0.5', name: 'Half Size (1:2)', description: 'Large furniture, small vehicles' },
    '3': { value: '0.1 0.1 0.1', name: 'Architectural (1:10)', description: 'Buildings, landscape, large structures' },
    '4': { value: '0.05 0.05 0.05', name: 'Urban Scale (1:20)', description: 'City blocks, large landscapes' },
    '5': { value: '0.01 0.01 0.01', name: 'Site Plan (1:100)', description: 'Large developments, masterplans' },
    '6': { value: 'custom', name: 'Custom Scale', description: 'Enter your own scale values' }
};

async function collectModelInfo() {
    log('\n🚀 AR Model Addition Wizard', 'bright');
    log('===============================\n', 'bright');

    // Basic information
    const id = await question('📝 Model ID (lowercase, hyphens only): ');
    const name = await question('🏷️  Model Name: ');
    const description = await question('📄 Description: ');
    const client = await question('🏢 Client Name: ');

    // File information
    log('\n📁 File Information', 'yellow');
    const filename = await question('📄 GLB filename (in models folder): ');
    const hasPoster = await question('🖼️  Do you have a poster image? (y/n): ');
    const posterFilename = hasPoster.toLowerCase() === 'y' ? 
        await question('🖼️  Poster filename (in models folder): ') : '';

    // Scale selection
    log('\n📏 AR Scale Selection', 'yellow');
    log('Choose the appropriate scale for your model:\n', 'cyan');
    
    Object.entries(scalePresets).forEach(([key, preset]) => {
        log(`${key}. ${preset.name} - ${preset.description}`, 'cyan');
    });
    
    const scaleChoice = await question('\nSelect scale (1-6): ');
    let arScale = '1 1 1';
    
    if (scalePresets[scaleChoice]) {
        if (scalePresets[scaleChoice].value === 'custom') {
            arScale = await question('Enter custom scale (x y z): ');
        } else {
            arScale = scalePresets[scaleChoice].value;
        }
    }

    // Placement
    const placement = await question('🏠 AR Placement (floor/wall) [floor]: ') || 'floor';

    // Project information
    log('\n📊 Project Information', 'yellow');
    const projectDate = await question('📅 Project Date [2024]: ') || '2024';
    const projectType = await question('🏗️  Project Type: ');
    const projectStatus = await question('📈 Project Status [Active]: ') || 'Active';

    // Theme customization
    log('\n🎨 Theme Customization (optional)', 'yellow');
    const primaryColor = await question('🎨 Primary Color (hex) [#4285f4]: ') || '#4285f4';
    const title = await question('🏷️  Custom Title (optional): ') || name;

    return {
        id,
        name,
        description,
        client,
        filename,
        posterFilename,
        arScale,
        placement,
        projectDate,
        projectType,
        projectStatus,
        primaryColor,
        title
    };
}

function generateModelConfig(info) {
    const backgroundColor = generateGradient(info.primaryColor);
    
    return `
        // ${info.name} - ${info.client}
        "${info.id}": {
            id: "${info.id}",
            name: "${info.name}",
            description: "${info.description}",
            client: "${info.client}",
            
            // File paths
            src: "./models/${info.filename}",
            ${info.posterFilename ? `poster: "./models/${info.posterFilename}",` : 'poster: "",'}
            
            // AR-specific settings
            arScale: "${info.arScale}",
            arPlacement: "${info.placement}",
            
            // Display settings
            autoRotate: true,
            rotationSpeed: "30deg",
            cameraOrbit: "0deg 75deg 105%",
            
            // Client information
            projectInfo: {
                date: "${info.projectDate}",
                type: "${info.projectType}",
                status: "${info.projectStatus}"
            },
            
            // Custom styling
            theme: {
                primaryColor: "${info.primaryColor}",
                backgroundColor: "${backgroundColor}",
                title: "${info.title}"
            }
        },`;
}

function generateGradient(primaryColor) {
    // Simple gradient generation based on primary color
    const darker = primaryColor.replace('#', '#') + '20'; // Simplified darkening
    return `linear-gradient(135deg, ${primaryColor} 0%, ${darker} 100%)`;
}

async function addModelToConfig(modelConfig) {
    const modelsFile = 'models.js';
    
    if (!fs.existsSync(modelsFile)) {
        log('❌ models.js file not found!', 'red');
        return false;
    }

    let content = fs.readFileSync(modelsFile, 'utf8');
    
    // Find the insertion point (before the template)
    const insertPoint = content.indexOf('// Template for adding new client models');
    
    if (insertPoint === -1) {
        log('❌ Could not find insertion point in models.js', 'red');
        return false;
    }

    // Insert the new model config
    const beforeInsert = content.substring(0, insertPoint);
    const afterInsert = content.substring(insertPoint);
    
    const newContent = beforeInsert + modelConfig + '\n\n        ' + afterInsert;
    
    // Write back to file
    fs.writeFileSync(modelsFile, newContent);
    
    return true;
}

async function main() {
    try {
        const info = await collectModelInfo();
        
        log('\n📋 Model Configuration Summary', 'yellow');
        log('===============================', 'yellow');
        log(`ID: ${info.id}`, 'cyan');
        log(`Name: ${info.name}`, 'cyan');
        log(`Client: ${info.client}`, 'cyan');
        log(`File: ./models/${info.filename}`, 'cyan');
        log(`Scale: ${info.arScale}`, 'cyan');
        log(`Placement: ${info.placement}`, 'cyan');
        
        const confirm = await question('\n✅ Add this model to the system? (y/n): ');
        
        if (confirm.toLowerCase() === 'y') {
            const modelConfig = generateModelConfig(info);
            
            if (await addModelToConfig(modelConfig)) {
                log('\n🎉 Model added successfully!', 'green');
                log('\n📌 Next Steps:', 'yellow');
                log(`1. Add ${info.filename} to the models/ folder`, 'cyan');
                if (info.posterFilename) {
                    log(`2. Add ${info.posterFilename} to the models/ folder`, 'cyan');
                }
                log('3. Test locally: npm start', 'cyan');
                log('4. Deploy your updated site', 'cyan');
                log(`5. Individual model URL: model.html?id=${info.id}`, 'cyan');
                log(`6. Generate QR code: npm run generate-qr https://your-site.com/model.html?id=${info.id}`, 'cyan');
            } else {
                log('\n❌ Failed to add model to configuration', 'red');
            }
        } else {
            log('\n❌ Model addition cancelled', 'yellow');
        }
        
    } catch (error) {
        log(`\n❌ Error: ${error.message}`, 'red');
    } finally {
        rl.close();
    }
}

if (require.main === module) {
    main();
}