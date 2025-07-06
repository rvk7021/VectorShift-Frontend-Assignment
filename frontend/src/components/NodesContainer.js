// NodesContainer.js - Container for displaying nodes with animation

import React from 'react';
import { DraggableNode } from '../draggableNode';

export const NodesContainer = ({ 
    nodes, 
    isVisible, 
    className = '' 
}) => {
    const containerClass = `nodes-container ${isVisible ? 'visible' : 'hidden'} ${className}`;
    
    return (
        <div className={containerClass} role="tabpanel">
            {nodes.map((node) => (
                <DraggableNode 
                    key={node.type} 
                    type={node.type} 
                    label={node.label}
                    title={node.description}
                />
            ))}
        </div>
    );
};
