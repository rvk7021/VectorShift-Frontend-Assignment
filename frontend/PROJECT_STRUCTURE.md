# Project Structure Documentation

## Folder Organization

### `/src`
Main source directory with organized subdirectories:

#### `/abstract`
Base classes and abstract components
- `BaseNode.js` - Base node implementation

#### `/components`
Reusable UI components
- `CategoryButton.js` - Button component for categories
- `NodesContainer.js` - Container for node elements
- `index.js` - Component exports

#### `/config`
Configuration files
- `nodeConfig.js` - Node configuration settings

#### `/constants`
Application constants
- `constants.js` - Global constants (animations, breakpoints, etc.)
- `index.js` - Constants exports

#### `/hooks`
Custom React hooks
- `useToolbar.js` - Toolbar functionality hook

#### `/lib`
Main library exports (barrel exports for the entire app)
- `index.js` - Central export hub

#### `/nodes`
Individual node implementations
- `inputNode.js`, `outputNode.js`, `textNode.js`, etc.

#### `/services`
API calls and external services
- `pipelineService.js` - Pipeline submission service
- `index.js` - Service exports

#### `/types`
Type definitions and interfaces
- `index.js` - Type constants and definitions

#### `/utils`
Utility functions
- `index.js` - Utility function exports

## Import Strategy

### Barrel Exports
Each major folder has an `index.js` file that exports its contents, enabling clean imports:

```javascript
// Instead of:
import { submitPipeline } from './services/pipelineService';

// Use:
import { submitPipeline } from './services';
```

### Central Hub
The `/lib/index.js` serves as a central export hub for the entire application.

## Benefits of This Structure

1. **Clear Separation of Concerns**: Each folder has a specific responsibility
2. **Easy to Navigate**: Developers can quickly find what they need
3. **Scalable**: Easy to add new components, services, or utilities
4. **Clean Imports**: Barrel exports make imports cleaner
5. **Maintainable**: Changes are localized to specific areas
