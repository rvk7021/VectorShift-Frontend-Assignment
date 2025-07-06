// textNode.js

import { createNode, Position } from '../abstract/BaseNode';

// TextNode configuration
const textNodeConfig = {
  title: "Text",
  subtitle: "Text processing node",
  className: "bg-white border-purple-400",
  handles: [
    {
      type: "source",
      position: Position.Right,
      id: "{id}-output"
    }
  ],
  fields: [
    {
      name: "text",
      label: "Text",
      type: "textarea",
      description: "Enter your text content here. The field will grow as you type and add a scrollbar when needed.",
      defaultValue: (id, data) => data?.text || '{{input}}'
    }
  ]
};

export const TextNode = createNode(textNodeConfig);
