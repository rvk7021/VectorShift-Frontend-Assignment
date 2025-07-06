// llmNode.js

import { createNode, Position } from './BaseNode';

// LLMNode configuration
const llmNodeConfig = {
  title: "OpenAI",
  subtitle: "AI language processing",
  className: "bg-gradient-to-b from-slate-800 to-slate-900 border-slate-600 items-center",
  handles: [
    {
      type: "target",
      position: Position.Left,
      id: "{id}-system",
      style: { top: `${100 / 3}%` }
    },
    {
      type: "target",
      position: Position.Left,
      id: "{id}-prompt",
      style: { top: `${200 / 3}%` }
    },
    {
      type: "source",
      position: Position.Right,
      id: "{id}-response"
    }
  ],
  fields: [
    {
      name: "model",
      label: "Model",
      type: "select",
      description: "Select AI model",
      defaultValue: (id, data) => data?.model || 'gpt-3.5-turbo',
      options: [
        { value: "gpt-3.5-turbo", label: "GPT-3.5" },
        { value: "gpt-4", label: "GPT-4" }
      ]
    },
    {
      name: "temperature",
      label: "Temp",
      type: "text",
      description: "0.0-1.0",
      defaultValue: (id, data) => data?.temperature || '0.7'
    }
  ]
};

export const LLMNode = createNode(llmNodeConfig);
