// transformNode.js

import { createNode, Position } from './BaseNode';

// Transform Node configuration
const transformNodeConfig = {
  title: "Transform",
  subtitle: "Convert data between formats",
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
      name: "transformName",
      label: "Name",
      type: "text",
      description: "Unique identifier for this transformation",
      defaultValue: (id, data) => {
        if (data?.transformName) {
          return data.transformName;
        }
        const nodeNumber = id.split('-')[1] || '0';
        return `transform_${parseInt(nodeNumber) - 1}`;
      }
    },
    {
      name: "transformType",
      label: "Transform Type",
      type: "select",
      description: "Type of transformation to apply",
      defaultValue: (id, data) => data?.transformType || 'format_conversion',
      options: [
        { value: "format_conversion", label: "Format Conversion" },
        { value: "data_mapping", label: "Data Mapping" },
        { value: "aggregation", label: "Aggregation" },
        { value: "normalization", label: "Normalization" },
        { value: "enrichment", label: "Data Enrichment" },
        { value: "custom", label: "Custom Transform" }
      ]
    },
    {
      name: "sourceFormat",
      label: "Source Format",
      type: "select",
      description: "Input data format",
      defaultValue: (id, data) => data?.sourceFormat || 'json',
      options: [
        { value: "json", label: "JSON" },
        { value: "csv", label: "CSV" },
        { value: "xml", label: "XML" },
        { value: "yaml", label: "YAML" },
        { value: "text", label: "Plain Text" },
        { value: "binary", label: "Binary" }
      ]
    },
    {
      name: "targetFormat",
      label: "Target Format",
      type: "select",
      description: "Output data format",
      defaultValue: (id, data) => data?.targetFormat || 'json',
      options: [
        { value: "json", label: "JSON" },
        { value: "csv", label: "CSV" },
        { value: "xml", label: "XML" },
        { value: "yaml", label: "YAML" },
        { value: "text", label: "Plain Text" },
        { value: "binary", label: "Binary" }
      ]
    },
    {
      name: "transformTemplate",
      label: "Transform Template",
      type: "text",
      description: "Template or expression for transformation",
      defaultValue: "{ output: input.data }"
    }
  ]
};

export const TransformNode = createNode(transformNodeConfig);
