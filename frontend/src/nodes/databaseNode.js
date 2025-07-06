// databaseNode.js

import { createNode, Position } from './BaseNode';

// Database Node configuration
const databaseNodeConfig = {
  title: "Database",
  subtitle: "Connect and query databases",
  className: "bg-gradient-to-b from-purple-900 to-purple-800 border-purple-700",
  handles: [
    {
      type: "target",
      position: Position.Left,
      id: "{id}-query",
      style: { top: "20%" }
    },
    {
      type: "target",
      position: Position.Left,
      id: "{id}-params",
      style: { top: "50%" }
    },
    {
      type: "target",
      position: Position.Left,
      id: "{id}-connection",
      style: { top: "80%" }
    },
    {
      type: "source",
      position: Position.Right,
      id: "{id}-result",
      style: { top: "30%" }
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
      name: "databaseType",
      label: "Type",
      type: "select",
      description: "Database engine type",
      defaultValue: (id, data) => data?.databaseType || 'postgresql',
      options: [
        { value: "postgresql", label: "PostgreSQL" },
        { value: "mysql", label: "MySQL" },
        { value: "sqlite", label: "SQLite" }
      ]
    },
    {
      name: "query",
      label: "Query",
      type: "textarea",
      description: "SQL query to execute",
      defaultValue: (id, data) => data?.query || 'SELECT * FROM table'
    },
    {
      name: "connectionURL",
      label: "Connection",
      type: "text",
      description: "Database connection URL",
      defaultValue: "localhost:5432/mydb"
    }
  ]
};

export const DatabaseNode = createNode(databaseNodeConfig);
