// webhookNode.js

import { createNode, Position } from './BaseNode';

// Webhook Node configuration
const webhookNodeConfig = {
  title: "Webhook",
  subtitle: "Handle webhook events",
  className: "bg-gradient-to-b from-blue-800 to-blue-700 border-blue-600",
  handles: [
    {
      type: "target",
      position: Position.Left,
      id: "{id}-trigger",
      style: { top: "30%" }
    },
    {
      type: "target",
      position: Position.Left,
      id: "{id}-config",
      style: { top: "70%" }
    },
    {
      type: "source",
      position: Position.Right,
      id: "{id}-success",
      style: { top: "30%" }
    },
    {
      type: "source",
      position: Position.Right,
      id: "{id}-payload",
      style: { top: "50%" }
    },
    {
      type: "source",
      position: Position.Right,
      id: "{id}-error",
      style: { top: "70%" }
    }
  ],
  fields: [
    {
      name: "webhookName",
      label: "Name",
      type: "text",
      description: "Unique identifier for this webhook",
      defaultValue: (id, data) => {
        if (data?.webhookName) {
          return data.webhookName;
        }
        const nodeNumber = id.split('-')[1] || '0';
        return `webhook_${parseInt(nodeNumber) - 1}`;
      }
    },
    {
      name: "endpointURL",
      label: "URL",
      type: "text",
      description: "Full URL for the webhook endpoint",
      defaultValue: "https://api.example.com/webhook"
    },
    {
      name: "webhookType",
      label: "Type",
      type: "select",
      description: "Type of webhook to handle",
      defaultValue: (id, data) => data?.webhookType || 'incoming',
      options: [
        { value: "incoming", label: "Receive" },
        { value: "outgoing", label: "Send" }
      ]
    },
    {
      name: "method",
      label: "Method",
      type: "select",
      description: "HTTP method to use",
      defaultValue: (id, data) => data?.method || 'POST',
      options: [
        { value: "GET", label: "GET" },
        { value: "POST", label: "POST" },
        { value: "PUT", label: "PUT" },
        { value: "DELETE", label: "DELETE" }
      ]
    }
  ]
};

// Export the webhook node
export const WebhookNode = createNode(webhookNodeConfig);

