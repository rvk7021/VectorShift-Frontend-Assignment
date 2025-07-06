import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { FieldTypes } from '../types';

export { Position };

export const NODE_STYLES = {
  container: "w-[260px] min-h-[120px] border border-slate-600 rounded-md overflow-hidden flex flex-col relative shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-blue-400",
  nodeHeader: "px-3 pt-3 pb-2 bg-gradient-to-r from-slate-700 to-slate-800 border-b border-slate-600",
  nodeBody: "p-3 pt-2 bg-slate-800",
  title: "font-bold text-lg text-white mb-0 flex items-center justify-between",
  subtitle: "text-xs text-slate-300 mt-1",
  formContainer: "space-y-3 mt-2",
  label: "flex flex-col space-y-1.5 text-sm font-medium text-slate-200 group",
  input: "border border-slate-600 rounded px-2 py-2 text-base w-full bg-slate-700 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-colors duration-200",
  select: "border border-slate-600 rounded px-2 py-2 text-base w-full bg-slate-700 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-colors duration-200",
  textarea: "border border-slate-600 rounded px-2 py-2 text-base w-full bg-slate-700 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none min-h-[60px] max-h-[200px] overflow-y-auto transition-colors duration-200",
  description: "text-xs text-slate-400 mt-1 opacity-90 group-hover:opacity-100 transition-opacity duration-200"
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

  const [nodeTitle, setNodeTitle] = useState(data?.customTitle || title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const validateAndUpdateTitle = (newTitle) => {
    const trimmedTitle = newTitle.trim();
    
    if (!trimmedTitle) {
      setTitleError('Node name cannot be empty');
      return false;
    }
    
    if (trimmedTitle.length > 50) {
      setTitleError('Node name cannot exceed 50 characters');
      return false;
    }
    
    setTitleError('');
    setNodeTitle(trimmedTitle);
    if (data && typeof data.onTitleChange === 'function') {
      data.onTitleChange(id, trimmedTitle);
    }
    return true;
  };

  const handleTitleDoubleClick = () => {
    setIsEditingTitle(true);
    setTempTitle(nodeTitle);
    setTitleError('');
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (validateAndUpdateTitle(tempTitle)) {
        setIsEditingTitle(false);
      }
    }
    if (e.key === 'Escape') {
      setTempTitle(nodeTitle);
      setTitleError('');
      setIsEditingTitle(false);
    }
  };

  const handleTitleBlur = () => {
    if (validateAndUpdateTitle(tempTitle)) {
      setIsEditingTitle(false);
    }
  };

  const handleTitleInputChange = (e) => {
    setTempTitle(e.target.value);
    if (titleError) {
      setTitleError('');
    }
  };

  const handleDeleteNode = () => {
    if (data && typeof data.onDeleteNode === 'function') {
      data.onDeleteNode(id);
    }
  };

  const nodeGlowStyle = {
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.3), 0 5px 15px rgba(59, 130, 246, 0.15)',
    position: 'relative',
    minWidth: '260px',
    maxWidth: '280px',
    minHeight: '120px',
    backgroundColor: '#ffffff',
    cursor: 'grab'
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
          const newHeight = Math.min(e.target.scrollHeight, 200);
          e.target.style.height = `${newHeight}px`;
          handleFieldChange(name, e.target.value);
        };

        return (
          <div key={name} className="w-full">
            <textarea
              value={value}
              onChange={adjustHeight}
              onFocus={(e) => adjustHeight(e)}
              className={NODE_STYLES.textarea}
              rows={3}
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
    <div
      className={`${NODE_STYLES.container} ${className}`}
      style={nodeGlowStyle}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          e.currentTarget.style.cursor = 'grabbing';
        }
      }}
      onMouseUp={(e) => {
        if (e.target === e.currentTarget) {
          e.currentTarget.style.cursor = 'grab';
        }
      }}
      onMouseLeave={(e) => {
        if (e.target === e.currentTarget) {
          e.currentTarget.style.cursor = 'grab';
        }
      }}>
      <button
        type="button"
        className="absolute -right-10 top-3 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-all duration-300 cursor-help shadow-lg"
        onMouseEnter={() => setShowHelp(true)}
        onMouseLeave={() => setShowHelp(false)}
        onClick={() => setShowHelp(!showHelp)}
        aria-label="Node information"
        style={{
          zIndex: 9000,
          animation: 'pulse 2s infinite'
        }}
      >
        <span className="text-white text-base font-bold">i</span>
      </button>

      <button
        type="button"
        className="absolute -right-10 top-14 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition-all duration-300 cursor-pointer shadow-lg hover:scale-110"
        onClick={handleDeleteNode}
        aria-label="Delete node"
        title="Delete node"
        style={{
          zIndex: 9000
        }}
      >
        <span className="text-white text-lg font-bold leading-none">×</span>
      </button>

      {handles.map((handle, index) => {
        const baseStyle = {
          backgroundColor: handle.type === 'source' ? '#9333ea' : '#a855f7',
          width: 12,
          height: 12,
          border: handle.type === 'source' ? '2px solid #d8b4fe' : '2px solid #d8b4fe',
          zIndex: 5,
          boxShadow: '0 0 8px rgba(147, 51, 234, 0.6)',
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
          {isEditingTitle ? (
            <div className="w-full">
              <input
                type="text"
                value={tempTitle}
                onChange={handleTitleInputChange}
                onKeyDown={handleTitleKeyDown}
                onBlur={handleTitleBlur}
                className={`bg-transparent border-b text-white font-bold text-lg outline-none w-full transition-colors ${
                  titleError ? 'border-red-400 focus:border-red-400' : 'border-slate-400 focus:border-blue-400'
                }`}
                autoFocus
                maxLength={50}
              />
              {titleError && (
                <div className="text-red-400 text-xs mt-1 absolute z-10 bg-slate-800 px-2 py-1 rounded border border-red-400">
                  {titleError}
                </div>
              )}
            </div>
          ) : (
            <span
              onDoubleClick={handleTitleDoubleClick}
              className="cursor-pointer hover:text-blue-300 transition-colors"
              title="Double-click to rename"
            >
              {nodeTitle}
            </span>
          )}
          <div className="flex items-center space-x-1">
            <button
              type="button"
              className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition-all duration-300 cursor-pointer shadow-lg hover:scale-110"
              onClick={handleDeleteNode}
              aria-label="Delete node"
              title="Delete node"
              style={{
                zIndex: 9000
              }}
            >
              <span className="text-white text-sm font-bold leading-none">×</span>
            </button>
          </div>
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
          className="fixed bg-white text-purple-900 p-5 rounded-md shadow-2xl text-xs w-80 border-2 border-purple-400"
          style={{
            zIndex: 9999,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: '80vh',
            overflowY: 'auto',
            backdropFilter: 'blur(5px)'
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-sm text-purple-900">{nodeTitle} Node</p>
            <button
              onClick={() => setShowHelp(false)}
              className="text-purple-400 hover:text-purple-900"
            >
              ✕
            </button>
          </div>
          <p className="text-purple-700 mb-3">{subtitle || 'This node processes the input data.'}</p>

          {fields.length > 0 && (
            <>
              <p className="text-xs text-purple-900 font-bold mb-2 border-t border-purple-200 pt-2">NODE FIELDS</p>
              <ul className="list-disc list-inside text-xs text-purple-700 space-y-2 ml-1">
                {fields.map(field => (
                  <li key={field.name}><span className="font-medium text-purple-900">{field.label}:</span> {field.description}</li>
                ))}
              </ul>
            </>
          )}

          {handles.length > 0 && (
            <>
              <p className="text-xs text-purple-900 font-bold mt-3 mb-2 border-t border-purple-200 pt-2">CONNECTIONS</p>
              <ul className="list-disc list-inside text-xs text-purple-700 space-y-1 ml-1">
                {handles.filter(h => h.type === 'target').length > 0 && (
                  <li><span className="font-medium text-purple-900">Inputs:</span> {handles.filter(h => h.type === 'target').length}</li>
                )}
                {handles.filter(h => h.type === 'source').length > 0 && (
                  <li><span className="font-medium text-purple-900">Outputs:</span> {handles.filter(h => h.type === 'source').length}</li>
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
