// nodeConfig.js - Central configuration for all node types and categories

export const NODE_CATEGORIES = [
    { 
        id: 'all', 
        label: 'All',
        description: 'Show all available nodes' 
    },
    { 
        id: 'io', 
        label: 'I/O',
        description: 'Input and output nodes for data flow' 
    },
    { 
        id: 'data', 
        label: 'Data',
        description: 'Data processing and transformation nodes' 
    },
    { 
        id: 'ai', 
        label: 'AI',
        description: 'Artificial intelligence and machine learning nodes' 
    },
    { 
        id: 'integration', 
        label: 'Integration',
        description: 'External service and API integration nodes' 
    }
];

export const NODE_TYPES = [
    { 
        type: 'customInput', 
        label: 'Input', 
        categories: ['io'],
        description: 'Starting point for your pipeline data'
    },
    { 
        type: 'customOutput', 
        label: 'Output', 
        categories: ['io'],
        description: 'Final output destination for your pipeline'
    },
    { 
        type: 'text', 
        label: 'Text', 
        categories: ['data'],
        description: 'Process and manipulate text data'
    },
    { 
        type: 'transform', 
        label: 'Transform', 
        categories: ['data'],
        description: 'Transform and modify data structure'
    },
    { 
        type: 'filter', 
        label: 'Filter', 
        categories: ['data'],
        description: 'Filter data based on conditions'
    },
    { 
        type: 'llm', 
        label: 'LLM', 
        categories: ['ai'],
        description: 'Large Language Model processing'
    },
    { 
        type: 'context', 
        label: 'Context', 
        categories: ['ai'],
        description: 'Store and retrieve contextual data'
    },
    { 
        type: 'database', 
        label: 'Database', 
        categories: ['integration'],
        description: 'Connect and query databases'
    },
    { 
        type: 'webhook', 
        label: 'Webhook', 
        categories: ['integration'],
        description: 'Connect to external APIs and webhooks'
    }
];

// Helper functions for node filtering and management
export const getNodesByCategory = (categoryId) => {
    if (categoryId === 'all') {
        return NODE_TYPES;
    }
    return NODE_TYPES.filter(node => node.categories.includes(categoryId));
};

export const getCategoryById = (categoryId) => {
    return NODE_CATEGORIES.find(category => category.id === categoryId);
};

export const getNodeByType = (nodeType) => {
    return NODE_TYPES.find(node => node.type === nodeType);
};
