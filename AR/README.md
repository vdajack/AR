# QR Code AR 3D Model Viewer

This project creates a web-based AR experience that can be accessed via QR code. When users scan the QR code with their mobile devices, they can view and interact with 3D models in augmented reality.

## 🌟 Features

- **Universal Compatibility**: Works on iOS and Android devices through web browsers
- **No App Required**: Users don't need to install any apps
- **Multiple AR Modes**: Supports WebXR, Scene Viewer (Android), and Quick Look (iOS)
- **Interactive 3D Preview**: Users can rotate and examine models before entering AR
- **Responsive Design**: Optimized for mobile devices
- **Real-time AR Support Detection**: Automatically detects and displays AR capabilities

## 📱 Supported Devices

### iOS (iPhone/iPad)
- **iOS 12+** with Safari
- Uses Apple's Quick Look AR
- Supports USDZ and GLB formats

### Android
- **Android 7.0+** with Chrome
- Uses Google's Scene Viewer
- Supports GLB/GLTF formats
- Some devices support WebXR for more advanced AR

## 🚀 Quick Start

### 1. Test Locally
```bash
# Serve the files locally (Python 3)
python -m http.server 8000

# Or use Node.js
npx serve .

# Or use PHP
php -S localhost:8000
```

Visit `http://localhost:8000` to test the AR viewer.

### 2. Deploy to Web

#### Option A: GitHub Pages (Free)
1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch" → "main"
5. Your site will be available at `https://yourusername.github.io/repositoryname`

#### Option B: Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Get instant deployment with custom URL

#### Option C: Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Automatic deployment with custom domain

### 3. Generate QR Code

Once deployed, create a QR code pointing to your URL:

#### Online QR Generators:
- [QR Code Generator](https://www.qr-code-generator.com/)
- [QRCode Monkey](https://www.qrcode-monkey.com/)
- [Google Charts QR API](https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=YOUR_URL)

#### Programmatic QR Generation:
```javascript
// Using qrcode library
npm install qrcode
const QRCode = require('qrcode');
QRCode.toFile('qrcode.png', 'https://your-ar-site.com');
```

## 🎨 Customization

### Adding Your Own 3D Model

1. **Prepare Your Model:**
   - Export as GLB or GLTF format
   - Keep file size under 5MB for better loading
   - Optimize textures for mobile

2. **Upload Model:**
   - Add your `.glb` file to the project folder
   - Or host it on a CDN like AWS S3, Google Cloud Storage

3. **Update HTML:**
   ```html
   <model-viewer 
       src="your-model.glb"
       alt="Your custom 3D model"
       ar
       camera-controls
       auto-rotate>
   </model-viewer>
   ```

### Styling Customization

Edit the CSS in `index.html`:

```css
/* Change colors */
.container {
    background: #your-color;
}

.ar-button {
    background: #your-brand-color;
}

/* Modify layout */
model-viewer {
    height: 500px; /* Adjust viewer size */
}
```

### Advanced Configuration

```html
<model-viewer 
    src="model.glb"
    ar
    ar-modes="webxr scene-viewer quick-look"
    camera-controls
    touch-action="pan-y"
    auto-rotate
    auto-rotate-delay="3000"
    rotation-per-second="30deg"
    field-of-view="45deg"
    min-camera-orbit="auto auto 2m"
    max-camera-orbit="auto auto 10m"
    shadow-intensity="1"
    exposure="1"
    environment-image="neutral">
</model-viewer>
```

## 🔧 Troubleshooting

### Common Issues

**AR Button Not Appearing:**
- Ensure you're testing on a mobile device
- Check that the browser supports AR
- Verify the 3D model loads correctly

**Model Not Loading:**
- Check the model file path
- Ensure the model is in GLB/GLTF format
- Check browser console for errors

**AR Not Working on iOS:**
- iOS requires HTTPS for AR features
- Make sure your site is served over HTTPS

**AR Not Working on Android:**
- Ensure Google Play Services for AR is installed
- Chrome should be updated to latest version

### Browser Support

| Platform | Browser | AR Support |
|----------|---------|------------|
| iOS 12+ | Safari | ✅ Quick Look |
| Android 7+ | Chrome | ✅ Scene Viewer |
| Android 8+ | Chrome | ✅ WebXR (select devices) |

## 📂 File Structure

```
AR/
├── index.html          # Main AR viewer page
├── README.md          # This documentation
├── package.json       # Node.js configuration (optional)
└── models/           # Directory for your 3D models (optional)
    └── your-model.glb
```

## 🎯 Best Practices

### 3D Model Optimization
- **File Size**: Keep under 5MB for mobile
- **Polygons**: Use 5,000-20,000 triangles max
- **Textures**: Use compressed formats (JPG for color, PNG for transparency)
- **Lighting**: Bake lighting into textures when possible

### QR Code Placement
- **Size**: Minimum 2cm x 2cm for easy scanning
- **Contrast**: Dark QR code on light background
- **Context**: Add instructions like "Scan to view in AR"
- **Testing**: Test scanning from various distances

### Performance Tips
- Use CDN for hosting 3D models
- Enable gzip compression on your server
- Consider progressive loading for large models
- Test on various mobile devices

## 🔗 Resources

- [Model Viewer Documentation](https://modelviewer.dev/)
- [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [3D Model Formats Guide](https://modelviewer.dev/docs/#entrylevel-usagegltf)
- [AR Development Best Practices](https://developers.google.com/ar/develop/web)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!