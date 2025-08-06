/**
 * Model Configuration and Management System
 * 
 * This file manages all 3D models for client AR viewing.
 * Each model can have its own page and QR code.
 */

const ModelManager = {
    // Default AR settings applied to all models
    defaults: {
        arScale: "1 1 1",           // Default AR scale (can be overridden per model)
        arPlacement: "floor",        // floor or wall
        autoRotate: true,
        autoRotateDelay: 1000,
        rotationSpeed: "30deg",
        cameraControls: true,
        shadowIntensity: 1,
        exposure: 1,
        environmentImage: "neutral"
    },

    // Client models database
    models: {
        // Your Terraced Scene Model
        "terraced-scene": {
            id: "terraced-scene",
            name: "Terraced Garden Scene",
            description: "Professional landscape architecture visualization with detailed terrain modeling",
            client: "CMMG Design Studio",
            
            // File paths
            src: "./models/TerracedScene.glb",
            poster: "", // Add "./models/TerracedScene.jpg" if you create a preview image
            
            // AR-specific settings (adjust scale as needed)
            arScale: "0.1 0.1 0.1",    // 10% scale - good for large landscape models
            arPlacement: "floor",
            
            // Display settings
            autoRotate: true,
            rotationSpeed: "15deg",     // Slower rotation for detailed viewing
            cameraOrbit: "0deg 60deg 120%",
            
            // Client information
            projectInfo: {
                date: "2024",
                type: "Landscape Architecture",
                status: "Design Presentation"
            },
            
            // Custom styling
            theme: {
                primaryColor: "#2E7D32",
                backgroundColor: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
                title: "🌿 Terraced Landscape"
            }
        },

        // Template for adding new client models
        "client-model-template": {
            id: "client-model-template",
            name: "Client Model Name",
            description: "Brief description of the model",
            client: "Client Company Name",
            
            src: "./models/client-model.glb",
            poster: "./models/client-model.jpg",
            
            // Scale the model to real-world size in AR
            arScale: "1 1 1",          // Adjust as needed
            arPlacement: "floor",       // or "wall"
            
            autoRotate: true,
            rotationSpeed: "30deg",
            cameraOrbit: "0deg 75deg 105%",
            
            projectInfo: {
                date: "2024",
                type: "Project Type",
                status: "Design Phase"
            },
            
            theme: {
                primaryColor: "#1976D2",
                backgroundColor: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
                title: "📐 Your Project"
            }
        }

        // Add more models here following the same pattern:
        // "model-id": { ... }
    },

    /**
     * Get model by ID
     */
    getModel(modelId) {
        const model = this.models[modelId];
        if (!model) {
            console.warn(`Model '${modelId}' not found`);
            return null;
        }

        // Merge with defaults
        return {
            ...this.defaults,
            ...model
        };
    },

    /**
     * Get all models
     */
    getAllModels() {
        return Object.values(this.models).filter(model => 
            model.id !== "client-model-template"
        );
    },

    /**
     * Add a new model
     */
    addModel(modelConfig) {
        const model = {
            ...this.defaults,
            ...modelConfig
        };
        
        this.models[model.id] = model;
        return model;
    },

    /**
     * Generate individual page URL for a model
     */
    getModelUrl(modelId, baseUrl = "") {
        return `${baseUrl}model.html?id=${modelId}`;
    },

    /**
     * Generate QR code URL for a model
     */
    getQRUrl(modelId, baseUrl) {
        return this.getModelUrl(modelId, baseUrl);
    },

    /**
     * Scale utilities for AR
     */
    scale: {
        // Convert real-world measurements to AR scale
        fromMeters(meters) {
            return `${meters} ${meters} ${meters}`;
        },
        
        fromCentimeters(cm) {
            const meters = cm / 100;
            return this.fromMeters(meters);
        },
        
        fromFeet(feet) {
            const meters = feet * 0.3048;
            return this.fromMeters(meters);
        },
        
        // Predefined scales for common use cases
        architectural: "0.1 0.1 0.1",    // 1:10 scale
        furniture: "1 1 1",              // Full size
        product: "1 1 1",                // Full size
        building: "0.01 0.01 0.01",      // 1:100 scale
        landscape: "0.05 0.05 0.05"      // 1:20 scale
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModelManager;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.ModelManager = ModelManager;
}