// inputNode.js

import { createNode, Position } from './BaseNode';

// InputNode configuration
const inputNodeConfig = {
  title: "Input",
  subtitle: "Data source entry point",
  className: "bg-gradient-to-b from-indigo-700 to-indigo-900 border-indigo-500",
  handles: [
    {
      type: "source",
      position: Position.Right,
      id: "{id}-value"
    }
  ],
  fields: [
    {
      name: "inputName",
      label: "Name",
      type: "text",
      description: "Auto-generated unique identifier for referencing this input elsewhere",
      defaultValue: (id, data) => {
        if (data?.inputName) {
          return data.inputName;
        }
        // Extract the number from the node ID (e.g., "customInput-1" -> "1")
        const nodeNumber = id.split('-')[1] || '0';
        return `input_${parseInt(nodeNumber) - 1}`; // Make it 0-based
      }
    },
    {
      name: "inputType",
      label: "Type",
      type: "select",
      defaultValue: (id, data) => data?.inputType || 'Text',
      description: "Choose the format of data this input node will provide to the pipeline",
      options: [
        { value: "Text", label: "Text" },
        { value: "Image", label: "Image" },
        { value: "File", label: "File" }
      ]
    },
    {
      name: "defaultValue",
      label: "Default Value",
      type: "textarea",
      description: "Optional default value for this input (leave empty if not needed)",
      defaultValue: (id, data) => data?.defaultValue || ''
    }
  ]
};

export const InputNode = createNode(inputNodeConfig);
