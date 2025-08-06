# 🚀 Deployment Guide

This guide will help you deploy your AR QR code viewer to the web so it can be accessed via QR codes.

## 📋 Prerequisites

- Your 3D model files (GLB/GLTF format recommended)
- A web hosting service (many free options available)
- A QR code generator (script provided)

## 🌐 Hosting Options

### 1. GitHub Pages (Recommended - Free)

**Advantages:** Free, easy setup, automatic HTTPS, custom domains supported
**Best for:** Personal projects, portfolios, open source

#### Steps:
1. **Create GitHub Repository:**
   ```bash
   # Create new repository on GitHub.com
   # Upload your AR project files
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "Deploy from a branch"
   - Branch: "main" 
   - Folder: "/ (root)"
   - Click "Save"

3. **Access Your Site:**
   - URL: `https://yourusername.github.io/repositoryname`
   - Usually takes 5-10 minutes to deploy

4. **Custom Domain (Optional):**
   - Add `CNAME` file with your domain
   - Configure DNS settings

### 2. Netlify (Easy Deploy - Free)

**Advantages:** Drag-and-drop deployment, instant previews, form handling
**Best for:** Quick prototypes, client demos

#### Steps:
1. **Visit [netlify.com](https://netlify.com)**
2. **Drag & Drop Deployment:**
   - Simply drag your project folder to Netlify
   - Instant deployment with random URL
   - Example: `https://amazing-pasteur-123abc.netlify.app`

3. **Custom Domain:**
   - Upgrade for custom domain
   - Or use free `.netlify.app` subdomain

### 3. Vercel (Developer-Friendly - Free)

**Advantages:** Git integration, serverless functions, automatic deployments
**Best for:** React/Next.js projects, API integration

#### Steps:
1. **Connect Repository:**
   - Import from GitHub/GitLab/Bitbucket
   - Automatic deployments on git push

2. **Zero Configuration:**
   - Automatic HTTPS
   - Global CDN
   - Custom domains

### 4. Firebase Hosting (Google - Free)

**Advantages:** Google infrastructure, analytics integration, PWA support
**Best for:** Google ecosystem integration

#### Steps:
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
firebase deploy
```

### 5. AWS S3 + CloudFront (Scalable)

**Advantages:** Enterprise-grade, global CDN, advanced features
**Best for:** Production applications, high traffic

#### Quick Setup:
```bash
# Upload to S3 bucket with static website hosting
# Configure CloudFront distribution
# Enable HTTPS via Certificate Manager
```

## 📱 HTTPS Requirement

**CRITICAL:** AR features require HTTPS on mobile devices!

✅ **All recommended hosts provide automatic HTTPS**
- GitHub Pages: Auto HTTPS
- Netlify: Auto HTTPS  
- Vercel: Auto HTTPS
- Firebase: Auto HTTPS

❌ **HTTP will not work for AR on mobile**

## 🔧 Pre-Deployment Checklist

### 1. Test Locally
```bash
# Serve locally with HTTPS (required for AR testing)
npx serve . --ssl-cert localhost.pem --ssl-key localhost-key.pem

# Or use simple HTTP for basic testing
npx serve .
```

### 2. Optimize 3D Models
- **File Size:** Keep under 5MB for mobile
- **Format:** GLB preferred over GLTF + assets
- **Textures:** Compress images, use power-of-2 dimensions
- **Geometry:** Optimize polygon count (5k-20k triangles)

### 3. Test Model URLs
```javascript
// Verify models load correctly
const testModel = "https://your-site.com/model.glb";
fetch(testModel).then(response => {
    console.log('Model accessible:', response.ok);
});
```

### 4. Configure CORS (if needed)
```javascript
// Add to your server if hosting models separately
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Content-Type");
```

## 🎯 Deployment Workflow

### Step 1: Prepare Files
```
your-ar-project/
├── index.html         # Main AR viewer
├── config.js          # Configuration 
├── models/           # Your 3D models
│   └── my-model.glb
├── assets/           # Images, icons
└── README.md         # Documentation
```

### Step 2: Deploy
Choose your hosting method and upload files.

### Step 3: Generate QR Code
```bash
# Install dependencies
npm install

# Generate QR code with your deployed URL
node scripts/generate-qr.js https://your-site.com

# Creates:
# - qr-code.png (for printing)
# - qr-code.svg (vector format)
# - qr-code-preview.html (test page)
```

### Step 4: Test End-to-End
1. Open deployed URL on mobile device
2. Verify 3D model loads
3. Test AR button functionality
4. Scan QR code from another device
5. Test on both iOS and Android

## 📊 Performance Optimization

### Content Delivery Network (CDN)
```html
<!-- Host models on CDN for faster loading -->
<model-viewer 
    src="https://cdn.yoursite.com/models/optimized-model.glb">
</model-viewer>
```

### Compression
```bash
# Enable gzip compression on your server
# Most hosting services enable this automatically
```

### Caching Headers
```javascript
// Configure browser caching for assets
Cache-Control: public, max-age=31536000  // 1 year for models
Cache-Control: public, max-age=86400     // 1 day for HTML
```

## 🔍 Troubleshooting

### Common Deployment Issues

**Model Not Loading:**
```
❌ Mixed content (HTTP model on HTTPS site)
✅ Use HTTPS URLs for all assets

❌ CORS blocked
✅ Host models on same domain or configure CORS

❌ File not found (404)
✅ Check file paths and case sensitivity
```

**AR Not Working:**
```
❌ HTTP site
✅ Deploy with HTTPS

❌ Browser compatibility
✅ Test on latest Chrome (Android) and Safari (iOS)

❌ Device support
✅ Verify ARCore/ARKit availability
```

### Testing Commands
```bash
# Check HTTPS certificate
curl -I https://your-site.com

# Test model accessibility
curl -I https://your-site.com/model.glb

# Check mobile user agent
curl -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)" https://your-site.com
```

## 📈 Analytics & Monitoring

### Google Analytics
```html
<!-- Add to index.html for usage tracking -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Monitor AR Usage
```javascript
// Track AR interactions
modelViewer.addEventListener('ar-status', (event) => {
    gtag('event', 'ar_interaction', {
        event_category: 'AR',
        event_label: event.detail.status
    });
});
```

## 🎨 Custom Domain Setup

### GitHub Pages
```
# Add CNAME file with your domain
echo "ar.yourdomain.com" > CNAME

# Configure DNS:
# CNAME: ar -> yourusername.github.io
```

### Netlify
```
# In Netlify dashboard:
# Domain settings → Add custom domain
# Follow DNS configuration instructions
```

## 🔐 Security Considerations

- **HTTPS Only:** Required for AR features
- **Content Security Policy:** Restrict resource loading
- **Asset Validation:** Verify 3D model sources
- **Rate Limiting:** Prevent abuse of your hosting

## 📞 Support Resources

- [Model Viewer Documentation](https://modelviewer.dev/)
- [WebXR Browser Support](https://immersiveweb.dev/)
- [GitHub Pages Guide](https://pages.github.com/)
- [Netlify Documentation](https://docs.netlify.com/)
- [AR Development Best Practices](https://developers.google.com/ar/develop/web)

Ready to deploy? Choose your hosting option and follow the steps above! 🚀