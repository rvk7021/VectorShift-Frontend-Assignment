# Node Abstraction System

## Overview
This abstraction eliminates code duplication across node types by providing a flexible, configuration-based approach to creating nodes.

## Architecture

### BaseNode.js
- **BaseNode**: Core component that handles common UI patterns and state management
- **createNode**: Higher-order component that creates specific node types from configuration
- **NODE_STYLES**: Centralized styling constants for consistency

### Key Benefits
1. **Reduced Code Duplication**: ~70% reduction in code across nodes
2. **Consistent Styling**: All nodes use the same style constants
3. **Easy Node Creation**: New nodes can be created with just configuration
4. **Maintainable**: Changes to base functionality apply to all nodes
5. **Type Safety**: Structured configuration reduces errors

## Configuration Structure

```javascript
const nodeConfig = {
  title: "Node Title",           // Required: Display name
  subtitle: "Description",       // Optional: Additional info
  className: "extra-classes",    // Optional: Additional CSS classes
  handles: [                     // Optional: Connection points
    {
      type: "source|target",
      position: Position.Left|Right|Top|Bottom,
      id: "{id}-handleName",     // {id} gets replaced with node ID
      style: {}                  // Optional: Custom handle styling
    }
  ],
  fields: [                      // Optional: Input fields
    {
      name: "fieldName",         // State key
      label: "Field Label",      // Display label
      type: "text|select",       // Input type
      defaultValue: "value" | (id, data) => "computed",
      options: [                 // For select fields
        { value: "val", label: "Label" }
      ]
    }
  ]
};
```

## Creating New Nodes

### Simple Display Node
```javascript
import { createNode, Position } from './BaseNode';

const displayNodeConfig = {
  title: "Display",
  subtitle: "Shows data",
  handles: [
    { type: "target", position: Position.Left, id: "{id}-input" }
  ]
};

export const DisplayNode = createNode(displayNodeConfig);
```

### Complex Form Node
```javascript
import { createNode, Position } from './BaseNode';

const complexNodeConfig = {
  title: "Complex Node",
  handles: [
    { type: "target", position: Position.Left, id: "{id}-input" },
    { type: "source", position: Position.Right, id: "{id}-output" }
  ],
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      defaultValue: "default name"
    },
    {
      name: "mode",
      label: "Mode",
      type: "select",
      defaultValue: "auto",
      options: [
        { value: "auto", label: "Automatic" },
        { value: "manual", label: "Manual" }
      ]
    }
  ]
};

export const ComplexNode = createNode(complexNodeConfig);
```

### Context Node
```javascript
import { createNode, Position } from './BaseNode';

const contextNodeConfig = {
  title: "Context",
  subtitle: "Store and share context data",
  handles: [
    { type: "target", position: Position.Left, id: "{id}-input", style: { top: "25%" } },
    { type: "target", position: Position.Left, id: "{id}-update", style: { top: "75%" } },
    { type: "source", position: Position.Right, id: "{id}-context", style: { top: "33%" } },
    { type: "source", position: Position.Right, id: "{id}-output", style: { top: "66%" } }
  ],
  fields: [
    {
      name: "contextKey",
      label: "Context Key", 
      type: "text",
      defaultValue: "global_context"
    },
    {
      name: "storageType",
      label: "Storage Type",
      type: "select",
      defaultValue: "memory",
      options: [
        { value: "memory", label: "In Memory" },
        { value: "session", label: "Session Storage" },
        { value: "local", label: "Local Storage" },
        { value: "shared", label: "Shared State" }
      ]
    },
    {
      name: "mergeStrategy", 
      label: "Merge Strategy",
      type: "select",
      defaultValue: "replace",
      options: [
        { value: "replace", label: "Replace" },
        { value: "merge", label: "Merge Objects" },
        { value: "append", label: "Append Arrays" },
        { value: "combine", label: "Smart Combine" }
      ]
    }
  ]
};

export const ContextNode = createNode(contextNodeConfig);
```

## Migration Summary

### Before (InputNode example)
- **53 lines** of code
- Manual state management
- Repeated styling classes
- Copy-paste development

### After (InputNode example)
- **25 lines** of configuration
- Automatic state management
- Centralized styling
- Declarative development

## Usage in ui.js
No changes needed - the abstraction maintains the same interface:

```javascript
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};
```
