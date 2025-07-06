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
    const [activeCategory, setActiveCategory] = useState('');
    const [showAllNodes, setShowAllNodes] = useState(false);

    // Filter nodes based on selected category
    const filteredNodes = NODE_TYPES.filter(node =>
        activeCategory === 'all' || node.categories.includes(activeCategory)
    );

    // Handle category click - make all categories collapsible
    const handleCategoryClick = (categoryId) => {
        if (categoryId === 'all') {
            if (activeCategory === 'all') {
                setShowAllNodes(!showAllNodes);
            } else {
                setActiveCategory('all');
                setShowAllNodes(true);
            }
        } else {
            if (activeCategory === categoryId) {
                setActiveCategory('');
                setShowAllNodes(false);
            } else {
                setActiveCategory(categoryId);
                setShowAllNodes(false);
            }
        }
    };

    // Determine if nodes should be shown
    const shouldShowNodes = (activeCategory !== 'all' && activeCategory !== '') || showAllNodes;

    return (
        <div className="node-div">
            <div className="node-div-header">
                <div className="flex flex-wrap gap-2 justify-start">
                    {NODE_CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            className={`category-btn ${activeCategory === category.id ? 'active' : 'inactive'}`}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Node items with collapsible behavior */}
            <div className={`nodes-container ${shouldShowNodes ? 'visible' : 'hidden'}`}>
                {filteredNodes.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                ))}
            </div>
        </div>
    );
};