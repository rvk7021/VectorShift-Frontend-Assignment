// useToolbar.js - Custom hook for toolbar state management and logic

import { useState, useMemo } from 'react';
import { getNodesByCategory } from '../config/nodeConfig';

export const useToolbar = () => {
    const [activeCategory, setActiveCategory] = useState('');
    const [showAllNodes, setShowAllNodes] = useState(false);

    const filteredNodes = useMemo(() => {
        return getNodesByCategory(activeCategory);
    }, [activeCategory]);

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

    // Determine if nodes should be visible
    const shouldShowNodes = useMemo(() => {
        return (activeCategory !== 'all' && activeCategory !== '') || showAllNodes;
    }, [activeCategory, showAllNodes]);

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
