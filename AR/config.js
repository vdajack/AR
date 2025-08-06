// AR Model Viewer Configuration
// Edit this file to customize your AR experience

const ARConfig = {
    // 3D Model Settings
    model: {
        // Primary model source (GLB/GLTF format recommended)
        src: "./models/TerracedScene.glb",
        
        // Poster image (shown while loading) - optional, you can add your own
        poster: "", // Add "./models/TerracedScene.jpg" if you have a poster image
        
        // Model description for accessibility
        alt: "Terraced Scene 3D Model for AR viewing",
        
        // Scale factor (1.0 = original size)
        scale: "1 1 1",
        
        // Initial camera position (optional)
        cameraOrbit: "0deg 75deg 105%"
    },

    // AR Behavior Settings
    ar: {
        // AR modes to enable (in order of preference)
        modes: ["webxr", "scene-viewer", "quick-look"],
        
        // Scale limits in AR mode
        arScale: "auto auto auto",
        
        // Placement options
        arPlacement: "floor" // or "wall"
    },

    // Interaction Settings
    interaction: {
        // Enable camera controls (rotate, zoom, pan)
        cameraControls: true,
        
        // Enable auto-rotation
        autoRotate: true,
        autoRotateDelay: 1000, // milliseconds
        rotationPerSecond: "40deg",
        
        // Touch interaction
        touchAction: "pan-y",
        
        // Disable zoom (optional)
        disableZoom: false,
        
        // Disable pan (optional)
        disablePan: false
    },

    // Visual Settings
    appearance: {
        // Environment lighting
        environmentImage: "neutral", // or "studio", "city", etc.
        
        // Exposure (brightness)
        exposure: 1,
        
        // Shadow intensity
        shadowIntensity: 1,
        
        // Field of view
        fieldOfView: "auto",
        
        // Camera orbit limits
        minCameraOrbit: "auto auto auto",
        maxCameraOrbit: "auto auto auto"
    },

    // UI Customization
    ui: {
        // App title
        title: "🚀 AR Model Viewer",
        
        // Subtitle
        subtitle: "Tap the AR button to view in your space",
        
        // AR button text
        arButtonText: "👁️ View in AR",
        
        // Loading text
        loadingText: "Loading 3D Model...",
        
        // Colors (CSS values)
        primaryColor: "#4285f4",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        containerBackground: "white",
        
        // Instructions
        instructions: [
            "Tap \"View in AR\" button",
            "Point your camera at a flat surface",
            "Tap to place the 3D model", 
            "Move around to view from different angles",
            "Pinch to resize (if supported)"
        ]
    },

    // Performance Settings
    performance: {
        // Enable progressive loading for large models
        reveal: "interaction",
        
        // Loading strategy - lazy for large files
        loading: "lazy",
        
        // Animation mixing
        animationCrossfadeDuration: 300
    },

    // Custom Models Array (for multiple model support)
    customModels: [
        {
            name: "Robot",
            src: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb", 
            poster: "https://modelviewer.dev/shared-assets/models/RobotExpressive.webp",
            description: "Animated Robot"
        },
        {
            name: "Shoe",
            src: "https://modelviewer.dev/shared-assets/models/NikeAirZoom.glb",
            poster: "https://modelviewer.dev/shared-assets/models/NikeAirZoom.webp", 
            description: "Nike Air Zoom Sneaker"
        }
        // Add your own models here:
        // {
        //     name: "My Model",
        //     src: "./models/my-model.glb",
        //     poster: "./models/my-model-poster.jpg",
        //     description: "My custom 3D model"
        // }
    ]
};

// Apply configuration to model-viewer (if running in browser)
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        const modelViewer = document.getElementById('model-viewer');
        if (modelViewer) {
            // Apply model settings
            modelViewer.src = ARConfig.model.src;
            modelViewer.poster = ARConfig.model.poster;
            modelViewer.alt = ARConfig.model.alt;
            
            // Apply AR settings
            modelViewer.setAttribute('ar-modes', ARConfig.ar.modes.join(' '));
            modelViewer.setAttribute('ar-scale', ARConfig.ar.arScale);
            
            // Apply interaction settings
            if (ARConfig.interaction.cameraControls) {
                modelViewer.setAttribute('camera-controls', '');
            }
            if (ARConfig.interaction.autoRotate) {
                modelViewer.setAttribute('auto-rotate', '');
                modelViewer.setAttribute('auto-rotate-delay', ARConfig.interaction.autoRotateDelay);
                modelViewer.setAttribute('rotation-per-second', ARConfig.interaction.rotationPerSecond);
            }
            
            // Apply appearance settings
            modelViewer.setAttribute('environment-image', ARConfig.appearance.environmentImage);
            modelViewer.setAttribute('exposure', ARConfig.appearance.exposure);
            modelViewer.setAttribute('shadow-intensity', ARConfig.appearance.shadowIntensity);
            
            // Update UI elements
            const title = document.querySelector('h1');
            if (title) title.textContent = ARConfig.ui.title;
            
            const subtitle = document.querySelector('.subtitle');
            if (subtitle) subtitle.textContent = ARConfig.ui.subtitle;
            
            const arButton = document.querySelector('#ar-button');
            if (arButton) arButton.textContent = ARConfig.ui.arButtonText;
            
            // Update instructions
            const instructions = document.querySelector('.instructions');
            if (instructions && ARConfig.ui.instructions.length > 0) {
                instructions.innerHTML = '<strong>How to use:</strong><br>' +
                    ARConfig.ui.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('<br>');
            }
        }
    });
}

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ARConfig;
}