// types/index.js - Type definitions and interfaces

export const NodeTypes = {
  INPUT: 'input',
  OUTPUT: 'output',
  TEXT: 'text',
  LLM: 'llm',
  FILTER: 'filter',
  TRANSFORM: 'transform',
  CONTEXT: 'context',
  DATABASE: 'database',
  WEBHOOK: 'webhook'
};

export const HandleTypes = {
  SOURCE: 'source',
  TARGET: 'target'
};

export const FieldTypes = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  NUMBER: 'number'
};

export const Position = {
  Top: 'top',
  Right: 'right',
  Bottom: 'bottom',
  Left: 'left'
};
