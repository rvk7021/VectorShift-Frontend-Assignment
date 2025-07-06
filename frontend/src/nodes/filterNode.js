// filterNode.js

import { createNode, Position } from '../abstract/BaseNode';

// Filter Node configuration
const filterNodeConfig = {
  title: "Filter",
  subtitle: "Filter data",
  className: "from-purple-800 to-purple-900 border-purple-300",
  handles: [
    {
      type: "target",
      position: Position.Left,
      id: "{id}-input",
      style: { top: "50%" }
    },
    {
      type: "source",
      position: Position.Right,
      id: "{id}-output",
      style: { top: "50%" }
    }
  ],
  fields: [
    {
      name: "filterName",
      label: "Name",
      type: "text",
      defaultValue: (id, data) => data?.filterName || `filter_${id.split('-')[1] || '0'}`
    },
    {
      name: "condition",
      label: "Condition",
      type: "text",
      description: "Filter condition",
      defaultValue: ""
    }
  ]
};

export const FilterNode = createNode(filterNodeConfig);
