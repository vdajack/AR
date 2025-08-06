#!/usr/bin/env node

/**
 * QR Code Generator for AR Model Viewer
 * 
 * Usage:
 *   node scripts/generate-qr.js [URL] [output-file]
 * 
 * Examples:
 *   node scripts/generate-qr.js https://your-ar-site.com
 *   node scripts/generate-qr.js https://your-ar-site.com qr-code.png
 *   npm run generate-qr
 */

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    // QR Code options
    options: {
        type: 'png',
        quality: 0.92,
        margin: 1,
        color: {
            dark: '#000000',  // QR code color
            light: '#FFFFFF'  // Background color
        },
        width: 512,  // Size in pixels
        errorCorrectionLevel: 'M'  // L, M, Q, H
    },
    
    // Default values
    defaultUrl: 'https://your-ar-site.com',
    defaultOutput: 'qr-code.png'
};

// Get command line arguments
const args = process.argv.slice(2);
const url = args[0] || config.defaultUrl;
const outputFile = args[1] || config.defaultOutput;

// Validate URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Generate QR code
async function generateQRCode(url, outputPath) {
    try {
        console.log('🔄 Generating QR code...');
        console.log(`📍 URL: ${url}`);
        console.log(`💾 Output: ${outputPath}`);
        
        if (!isValidUrl(url)) {
            throw new Error('Invalid URL provided');
        }
        
        // Generate QR code
        await QRCode.toFile(outputPath, url, config.options);
        
        console.log('✅ QR code generated successfully!');
        console.log(`📱 Scan this QR code with a mobile device to access the AR viewer`);
        
        // Display file info
        const stats = fs.statSync(outputPath);
        console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
        
        // Generate additional formats
        const baseName = path.parse(outputPath).name;
        const dir = path.dirname(outputPath);
        
        // Generate SVG version
        const svgPath = path.join(dir, `${baseName}.svg`);
        await QRCode.toFile(svgPath, url, { ...config.options, type: 'svg' });
        console.log(`🎨 SVG version: ${svgPath}`);
        
        // Generate data URL for embedding
        const dataUrl = await QRCode.toDataURL(url, config.options);
        const htmlPath = path.join(dir, `${baseName}-preview.html`);
        
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>QR Code Preview</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .qr-code { 
            margin: 20px 0; 
            border: 2px solid #ddd;
            border-radius: 8px;
            display: inline-block;
            padding: 10px;
            background: white;
        }
        .url { 
            word-break: break-all; 
            background: #f0f0f0; 
            padding: 10px; 
            border-radius: 5px;
            margin: 10px 0;
            font-family: monospace;
        }
        .instructions {
            text-align: left;
            background: #e8f4fd;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .print-button {
            background: #4285f4;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px;
        }
        @media print {
            .no-print { display: none; }
            body { background: white; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📱 AR QR Code</h1>
        <div class="qr-code">
            <img src="${dataUrl}" alt="QR Code for AR Viewer" />
        </div>
        <div class="url">${url}</div>
        
        <div class="instructions no-print">
            <h3>📋 Instructions:</h3>
            <ol>
                <li><strong>Print or Display:</strong> Print this QR code or display it on a screen</li>
                <li><strong>Size:</strong> Ensure the QR code is at least 2cm x 2cm for easy scanning</li>
                <li><strong>Test:</strong> Scan with your mobile device to verify it works</li>
                <li><strong>Share:</strong> Place the QR code where users can easily scan it</li>
            </ol>
            
            <h3>🔧 Technical Details:</h3>
            <ul>
                <li>Format: PNG, ${config.options.width}x${config.options.width} pixels</li>
                <li>Error Correction: Level ${config.options.errorCorrectionLevel}</li>
                <li>Compatible with all QR code scanners</li>
                <li>Works on iOS 12+ and Android 7+</li>
            </ul>
        </div>
        
        <div class="no-print">
            <button class="print-button" onclick="window.print()">🖨️ Print QR Code</button>
            <button class="print-button" onclick="downloadQR()">💾 Download PNG</button>
        </div>
    </div>
    
    <script>
        function downloadQR() {
            const link = document.createElement('a');
            link.download = '${baseName}.png';
            link.href = '${dataUrl}';
            link.click();
        }
    </script>
</body>
</html>`;
        
        fs.writeFileSync(htmlPath, htmlContent);
        console.log(`🌐 Preview page: ${htmlPath}`);
        
        console.log('\n🎉 Complete! You now have:');
        console.log(`   • PNG QR code: ${outputPath}`);
        console.log(`   • SVG QR code: ${svgPath}`);
        console.log(`   • Preview page: ${htmlPath}`);
        
    } catch (error) {
        console.error('❌ Error generating QR code:', error.message);
        process.exit(1);
    }
}

// Show help
function showHelp() {
    console.log(`
🔗 QR Code Generator for AR Model Viewer

Usage:
  node scripts/generate-qr.js [URL] [output-file]

Arguments:
  URL           The URL to encode in the QR code (required)
  output-file   Output filename (default: qr-code.png)

Examples:
  node scripts/generate-qr.js https://my-ar-site.netlify.app
  node scripts/generate-qr.js https://username.github.io/ar-project custom-qr.png
  npm run generate-qr

Options:
  -h, --help    Show this help message

The script will generate:
  • PNG QR code image
  • SVG QR code (vector format)
  • HTML preview page for testing
`);
}

// Main execution
if (args.includes('-h') || args.includes('--help')) {
    showHelp();
} else if (!url || url === config.defaultUrl) {
    console.log('⚠️  Please provide your deployed URL:');
    console.log('   node scripts/generate-qr.js https://your-ar-site.com');
    console.log('');
    showHelp();
} else {
    generateQRCode(url, outputFile);
}