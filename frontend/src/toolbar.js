// toolbar.js - Clean, modular toolbar component
import React from 'react';
import { NODE_CATEGORIES } from './config/nodeConfig';
import { useToolbar } from './hooks/useToolbar';
import { CategoryButton, NodesContainer } from './components';

export const PipelineToolbar = () => {
    const {
        filteredNodes,
        shouldShowNodes,
        handleCategoryClick,
        getCategoryButtonState
    } = useToolbar();

    return (
        <div className="node-div">
            <div className="node-div-header">
                <div 
                    className="flex flex-wrap gap-2 justify-start" 
                    role="tablist"
                    aria-label="Node categories"
                >
                    {NODE_CATEGORIES.map((category) => {
                        const { isActive } = getCategoryButtonState(category.id);
                        return (
                            <CategoryButton
                                key={category.id}
                                category={category}
                                isActive={isActive}
                                onClick={handleCategoryClick}
                            />
                        );
                    })}
                </div>
            </div>

            <NodesContainer 
                nodes={filteredNodes}
                isVisible={shouldShowNodes}
            />
        </div>
    );
};