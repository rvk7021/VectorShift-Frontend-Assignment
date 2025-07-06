// contextNode.js

import { createNode, Position } from './BaseNode';

// Context Node configuration
const contextNodeConfig = {
  title: "Chat memory",
  subtitle: "Store and retrieve context",
  className: "from-purple-700 to-purple-900 border-purple-300",
  handles: [
    {
      type: "target",
      position: Position.Left,
      id: "{id}-input",
      style: { top: "25%" }
    },
    {
      type: "target",
      position: Position.Left,
      id: "{id}-update",
      style: { top: "75%" }
    },
    {
      type: "source",
      position: Position.Right,
      id: "{id}-context",
      style: { top: "33%" }
    },
    {
      type: "source",
      position: Position.Right,
      id: "{id}-output",
      style: { top: "66%" }
    }
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
