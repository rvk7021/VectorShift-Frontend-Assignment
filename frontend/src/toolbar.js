// toolbar.js
import React, { useState } from 'react';
import { DraggableNode } from './draggableNode';

// Define node categories and their related nodes
const NODE_CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'io', label: 'I/O' },
    { id: 'data', label: 'Data' },
    { id: 'ai', label: 'AI' },
    { id: 'integration', label: 'Integration' }
];

// Mapping of node types to their categories
const NODE_TYPES = [
    { type: 'customInput', label: 'Input', categories: ['io'] },
    { type: 'customOutput', label: 'Output', categories: ['io'] },
    { type: 'text', label: 'Text', categories: ['data'] },
    { type: 'transform', label: 'Transform', categories: ['data'] },
    { type: 'filter', label: 'Filter', categories: ['data'] },
    { type: 'llm', label: 'LLM', categories: ['ai'] },
    { type: 'context', label: 'Context', categories: ['ai'] },
    { type: 'database', label: 'Database', categories: ['integration'] },
    { type: 'webhook', label: 'Webhook', categories: ['integration'] }
];

export const PipelineToolbar = () => {
    const [activeCategory, setActiveCategory] = useState('io');

    // Filter nodes based on selected category
    const filteredNodes = NODE_TYPES.filter(node =>
        activeCategory === 'all' || node.categories.includes(activeCategory)
    );

    return (
        <div className="py-2 px-4 flex flex-col items-center">
            {/* Category tabs */}
            <div className="mb-4 flex flex-wrap gap-2 justify-center">
                {NODE_CATEGORIES.map((category) => (
                    <button
                        key={category.id}
                        className={`px-4 py-1.5 rounded-full text-white text-sm transition-colors duration-200 min-w-[70px]
                            ${activeCategory === category.id
                                ? 'bg-purple-700 font-bold shadow-md'
                                : 'bg-purple-900 hover:bg-purple-800'
                            }`}
                        onClick={() => setActiveCategory(category.id)}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Node items */}
            <div className="flex flex-wrap gap-2 justify-center">
                {filteredNodes.map((node) => (
                    <div key={node.type} className="text-xs">
                        <DraggableNode type={node.type} label={node.label} />
                    </div>
                ))}
            </div>
        </div>
    );
};