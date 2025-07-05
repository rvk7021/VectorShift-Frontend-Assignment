// filterNode.js

import { createNode, Position } from './BaseNode';

// Filter Node configuration
const filterNodeConfig = {
  title: "Filter",
  subtitle: "Filter data by conditions",
  className: "from-purple-800 to-purple-900 border-purple-300",
  handles: [
    {
      type: "target",
      position: Position.Left,
      id: "{id}-input",
      style: { top: "35%" }
    },
    {
      type: "target",
      position: Position.Left,
      id: "{id}-criteria",
      style: { top: "65%" }
    },
    {
      type: "source",
      position: Position.Right,
      id: "{id}-matched",
      style: { top: "35%" }
    },
    {
      type: "source",
      position: Position.Right,
      id: "{id}-unmatched",
      style: { top: "65%" }
    }
  ],
  fields: [
    {
      name: "filterName",
      label: "Name",
      type: "text",
      description: "Unique identifier for this filter",
      defaultValue: (id, data) => {
        if (data?.filterName) {
          return data.filterName;
        }
        const nodeNumber = id.split('-')[1] || '0';
        return `filter_${parseInt(nodeNumber) - 1}`;
      }
    },
    {
      name: "filterType",
      label: "Filter Type",
      type: "select",
      description: "Type of filtering to apply",
      defaultValue: (id, data) => data?.filterType || 'condition',
      options: [
        { value: "condition", label: "Condition Based" },
        { value: "regex", label: "Regular Expression" },
        { value: "range", label: "Range Based" },
        { value: "statistical", label: "Statistical" },
        { value: "custom", label: "Custom Logic" }
      ]
    },
    {
      name: "filterField",
      label: "Field Path",
      type: "text",
      description: "Path to the field to filter (e.g., user.name)",
      defaultValue: "data.field"
    },
    {
      name: "operator",
      label: "Operator",
      type: "select",
      description: "Comparison operator",
      defaultValue: (id, data) => data?.operator || 'equals',
      options: [
        { value: "equals", label: "Equals (=)" },
        { value: "not_equals", label: "Not Equals (!=)" },
        { value: "greater_than", label: "Greater Than (>)" },
        { value: "less_than", label: "Less Than (<)" },
        { value: "contains", label: "Contains" },
        { value: "starts_with", label: "Starts With" },
        { value: "ends_with", label: "Ends With" },
        { value: "regex", label: "Matches Regex" }
      ]
    },
    {
      name: "filterValue",
      label: "Filter Value",
      type: "text",
      description: "Value to compare against",
      defaultValue: ""
    },
    {
      name: "caseSensitive",
      label: "Case Sensitive",
      type: "select",
      description: "Whether string comparison is case sensitive",
      defaultValue: (id, data) => data?.caseSensitive || 'false',
      options: [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" }
      ]
    }
  ]
};

export const FilterNode = createNode(filterNodeConfig);
