import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

export { Position };

export const NODE_STYLES = {
  container: "w-[260px] min-h-[120px] border border-purple-800 rounded-md overflow-hidden flex flex-col relative shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-purple-600",
  nodeHeader: "px-3 pt-3 pb-2 bg-purple-900 border-b border-purple-700",
  nodeBody: "p-3 pt-2 bg-gradient-to-b from-purple-800 to-purple-800",
  title: "font-bold text-lg text-white mb-0 flex items-center justify-between",
  subtitle: "text-xs text-purple-300 mt-1",
  formContainer: "space-y-3 mt-2",
  label: "flex flex-col space-y-1.5 text-sm font-medium text-white group",
  input: "border border-purple-600 rounded px-2 py-2 text-base w-full bg-purple-700 text-white placeholder-purple-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-colors duration-200",
  select: "border border-purple-600 rounded px-2 py-2 text-base w-full bg-purple-700 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-colors duration-200",
  textarea: "border border-purple-600 rounded px-2 py-2 text-base w-full bg-purple-700 text-white placeholder-purple-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-400 resize-none min-h-[45px] max-h-[90px] overflow-y-auto transition-colors duration-200",
  description: "text-xs text-purple-200 mt-1 opacity-90 group-hover:opacity-100 transition-opacity duration-200"
};

export const BaseNode = ({
  id,
  data,
  title,
  subtitle,
  handles = [],
  fields = [],
  className = "",
  children
}) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    return initialValues;
  });

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const nodeGlowStyle = {
    boxShadow: '0 0 15px rgba(126, 34, 206, 0.4), 0 0 5px rgba(126, 34, 206, 0.2)',
    position: 'relative',
    minWidth: '260px',
    maxWidth: '280px',
    minHeight: '120px'
  };

  const renderField = (field) => {
    const { name, label, type, options, description, ...fieldProps } = field;
    const value = fieldValues[name] || '';

    const renderDescription = () => {
      if (description) {
        return <div className={NODE_STYLES.description}>{description}</div>;
      }
      return null;
    };

    switch (type) {
      case 'text':
        return (
          <div key={name} className="w-full">
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(name, e.target.value)}
              className={NODE_STYLES.input}
              {...fieldProps}
            />
            {renderDescription()}
          </div>
        );

      case 'textarea':
        const adjustHeight = (e) => {
          e.target.style.height = 'auto';
          const newHeight = Math.min(e.target.scrollHeight, 150);
          e.target.style.height = `${newHeight}px`;
          handleFieldChange(name, e.target.value);
        };

        return (
          <div key={name} className="w-full">
            <textarea
              value={value}
              onChange={adjustHeight}
              className={NODE_STYLES.textarea}
              {...fieldProps}
            />
            {renderDescription()}
          </div>
        );

      case 'select':
        return (
          <div key={name} className="w-full">
            <select
              value={value}
              onChange={(e) => handleFieldChange(name, e.target.value)}
              className={NODE_STYLES.select}
              {...fieldProps}
            >
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {renderDescription()}
          </div>
        );

      default:
        return null;
    }
  };

  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className={`${NODE_STYLES.container} ${className}`} style={nodeGlowStyle}>
      <button
        type="button"
        className="absolute -right-7 top-3 w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-br from-white to-purple-300 hover:from-white hover:to-purple-200 transition-colors cursor-help border border-purple-400 shadow-md"
        onMouseEnter={() => setShowHelp(true)}
        onMouseLeave={() => setShowHelp(false)}
        onClick={() => setShowHelp(!showHelp)}
        aria-label="Node information"
        style={{ zIndex: 10 }}
      >
        <span className="text-purple-900 text-xs font-bold">i</span>
      </button>

      {handles.map((handle, index) => {
        const baseStyle = {
          backgroundColor: handle.type === 'source' ? '#a855f7' : '#c084fc',
          width: 12,
          height: 12,
          border: handle.type === 'source' ? '2px solid #8b5cf6' : '2px solid #a78bfa',
          zIndex: 5,
          boxShadow: '0 0 8px rgba(126, 34, 206, 0.8)',
          borderRadius: '4px'
        };

        return (
          <React.Fragment key={index}>
            <Handle
              type={handle.type}
              position={handle.position}
              id={handle.id}
              style={{ ...baseStyle, ...handle.style }}
              className="hover:scale-125 transition-transform"
            />
          </React.Fragment>
        );
      })}

      <div className={NODE_STYLES.nodeHeader}>
        <div className={NODE_STYLES.title}>
          <span>{title}</span>
        </div>

        {subtitle && (
          <div className={NODE_STYLES.subtitle}>
            <span>{subtitle}</span>
          </div>
        )}
      </div>

      <div className={NODE_STYLES.nodeBody}>
        {fields.length > 0 && (
          <div className={NODE_STYLES.formContainer}>
            {fields.map(field => (
              <label key={field.name} className={NODE_STYLES.label}>
                <span>{field.label}:</span>
                {renderField(field)}
              </label>
            ))}
          </div>
        )}

        {children}
      </div>

      {showHelp && (
        <div
          className="fixed bg-gray-900 text-white p-4 rounded-md shadow-2xl text-xs w-72 border border-gray-700"
          style={{
            zIndex: 9999,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-sm text-white">{title} Node</p>
            <button
              onClick={() => setShowHelp(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-300 mb-3">{subtitle || 'This node processes the input data.'}</p>

          {fields.length > 0 && (
            <>
              <p className="text-xs text-blue-400 font-medium mb-2 border-t border-gray-700 pt-2">NODE FIELDS</p>
              <ul className="list-disc list-inside text-xs text-gray-200 space-y-2 ml-1">
                {fields.map(field => (
                  <li key={field.name}><span className="font-medium text-white">{field.label}:</span> {field.description}</li>
                ))}
              </ul>
            </>
          )}

          {handles.length > 0 && (
            <>
              <p className="text-xs text-blue-400 font-medium mt-3 mb-2 border-t border-gray-700 pt-2">CONNECTIONS</p>
              <ul className="list-disc list-inside text-xs text-gray-200 space-y-1 ml-1">
                {handles.filter(h => h.type === 'target').length > 0 && (
                  <li><span className="font-medium text-white">Inputs:</span> {handles.filter(h => h.type === 'target').length}</li>
                )}
                {handles.filter(h => h.type === 'source').length > 0 && (
                  <li><span className="font-medium text-white">Outputs:</span> {handles.filter(h => h.type === 'source').length}</li>
                )}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const createNode = (nodeConfig) => {
  return ({ id, data }) => {
    const handles = nodeConfig.handles?.map(handle => ({
      ...handle,
      id: handle.id.replace('{id}', id)
    })) || [];

    const fields = nodeConfig.fields?.map(field => ({
      ...field,
      description: field.description || getDefaultDescription(field.name, nodeConfig.title),
      defaultValue: typeof field.defaultValue === 'function'
        ? field.defaultValue(id, data)
        : field.defaultValue
    })) || [];

    return (
      <BaseNode
        id={id}
        data={data}
        title={nodeConfig.title}
        subtitle={nodeConfig.subtitle || getDefaultSubtitle(nodeConfig.title)}
        handles={handles}
        fields={fields}
        className={nodeConfig.className}
      >
        {nodeConfig.children}
      </BaseNode>
    );
  };
};

const getDefaultDescription = (fieldName, nodeType) => {
  const descriptions = {
    text: "Enter text that will be processed by this node",
    prompt: "Enter your prompt for the AI model",
    model: "Select the AI model to use for processing",
    apiKey: "Your API key for authentication",
    url: "The URL endpoint for this webhook",
    query: "Database query to execute",
    filter: "Filter criteria to apply to the data"
  };

  return descriptions[fieldName] || `Input for the ${nodeType} node`;
};

const getDefaultSubtitle = (nodeType) => {
  const subtitles = {
    "Text": "Process and manipulate text data",
    "Input": "Starting point for your pipeline",
    "Output": "Final output of your pipeline",
    "LLM": "Large Language Model processing",
    "Database": "Connect and query databases",
    "Filter": "Filter and process data based on conditions",
    "Transform": "Transform and modify data structure",
    "Webhook": "Connect to external APIs",
    "Context": "Store and retrieve contextual data"
  };

  return subtitles[nodeType] || "Process your pipeline data";
};
