// CategoryButton.js - Reusable category button component

import React from 'react';

export const CategoryButton = ({ 
    category, 
    isActive, 
    onClick, 
    className = '' 
}) => {
    const buttonClass = `category-btn ${isActive ? 'active' : 'inactive'} ${className}`;
    
    return (
        <button
            className={buttonClass}
            onClick={() => onClick(category.id)}
            title={category.description}
            aria-label={`${category.label} category`}
            role="tab"
            aria-selected={isActive}
        >
            {category.label}
        </button>
    );
};
