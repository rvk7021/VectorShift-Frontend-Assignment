// outputNode.js

import { createNode, Position } from '../abstract/BaseNode';

// OutputNode configuration
const outputNodeConfig = {
  title: "Output",
  subtitle: "Final data endpoint",
  className: "bg-gradient-to-b from-indigo-900 to-indigo-800 border-indigo-700",
  handles: [
    {
      type: "target",
      position: Position.Left,
      id: "{id}-value"
    }
  ],
  fields: [
    {
      name: "outputName",
      label: "Name",
      type: "text",
      description: "Name of this output for identifying results in the pipeline",
      defaultValue: (id, data) => {
        if (data?.outputName) {
          return data.outputName;
        }
        // Extract the number from the node ID (e.g., "customOutput-1" -> "1")
        const nodeNumber = id.split('-')[1] || '0';
        return `output_${parseInt(nodeNumber) - 1}`; // Make it 0-based
      }
    },
    {
      name: "outputType",
      label: "Type",
      type: "select",
      description: "Format of the data this output will receive and display",
      defaultValue: (id, data) => data?.outputType || 'Text',
      options: [
        { value: "Text", label: "Text" },
        { value: "Image", label: "Image" },
        { value: "File", label: "File" }
      ]
    }
  ]
};

export const OutputNode = createNode(outputNodeConfig);
