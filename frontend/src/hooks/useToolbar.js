// useToolbar.js - Custom hook for toolbar state management and logic

import { useState, useMemo } from 'react';
import { getNodesByCategory } from '../config/nodeConfig';

export const useToolbar = () => {
    const [activeCategory, setActiveCategory] = useState('');
    const [showAllNodes, setShowAllNodes] = useState(false);

    // Memoized filtered nodes for performance
    const filteredNodes = useMemo(() => {
        return getNodesByCategory(activeCategory);
    }, [activeCategory]);

    // Handle category click with improved logic
    const handleCategoryClick = (categoryId) => {
        if (categoryId === 'all') {
            if (activeCategory === 'all') {
                // Toggle show/hide for "All" category
                setShowAllNodes(!showAllNodes);
            } else {
                // Switch to "All" category and show nodes
                setActiveCategory('all');
                setShowAllNodes(true);
            }
        } else {
            if (activeCategory === categoryId) {
                // Collapse current category
                setActiveCategory('');
                setShowAllNodes(false);
            } else {
                // Switch to new category
                setActiveCategory(categoryId);
                setShowAllNodes(false);
            }
        }
    };

    // Determine if nodes should be visible
    const shouldShowNodes = useMemo(() => {
        return (activeCategory !== 'all' && activeCategory !== '') || showAllNodes;
    }, [activeCategory, showAllNodes]);

    // Get button state for a category
    const getCategoryButtonState = (categoryId) => {
        return {
            isActive: activeCategory === categoryId,
            isVisible: shouldShowNodes && activeCategory === categoryId
        };
    };

    return {
        activeCategory,
        showAllNodes,
        filteredNodes,
        shouldShowNodes,
        handleCategoryClick,
        getCategoryButtonState
    };
};
