// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { submitPipeline } from './submit';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { ContextNode } from './nodes/contextNode';
import { DatabaseNode } from './nodes/databaseNode';
import { TransformNode } from './nodes/transformNode';
import { FilterNode } from './nodes/filterNode';
import { WebhookNode } from './nodes/webhookNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  context: ContextNode,
  database: DatabaseNode,
  transform: TransformNode,
  filter: FilterNode,
  webhook: WebhookNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = ({ isMobile }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        // Calculate exact position where the node was dropped
        // Use the correct method for converting screen coordinates to flow coordinates
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        
        // Add a small offset to prevent nodes from stacking exactly on top of each other
        position.x = Math.round(position.x / gridSize) * gridSize;
        position.y = Math.round(position.y / gridSize) * gridSize;

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          draggable: true,
          selectable: true,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Function to clear all nodes and edges
  const clearAll = useCallback(() => {
    if (window.confirm("Are you sure you want to clear the entire pipeline?")) {
      useStore.setState({ nodes: [], edges: [], nodeIDs: {} });
    }
  }, []);

  return (
    <>
      <div className="h-full">
        <div ref={reactFlowWrapper} className="w-full h-full rounded-lg overflow-hidden border border-purple-500 shadow-lg bg-transparent relative">
          {/* Action buttons positioned inside the ReactFlow area */}
          <div className="absolute top-4 right-4 z-50 flex space-x-3">
            <button 
              type="button"
              onClick={clearAll}
              className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg border border-red-400 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Clear All</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button 
              type="button"
              onClick={() => submitPipeline(nodes, edges)}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-2 px-6 rounded-lg shadow-lg border border-purple-400 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Run Pipeline</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
          nodeDraggable={true}
          nodesDraggable={true}
          elementsSelectable={true}
          selectNodesOnDrag={false}
          zoomOnScroll={true}
          panOnDrag={true}
          className="bg-gradient-to-br from-purple-800 to-purple-700"
          edgeOptions={{
            animated: true,
            style: { stroke: '#a78bfa', strokeWidth: 2.5 },
            type: 'smoothstep'
          }}
          defaultViewport={{ zoom: 1.0, x: 0, y: 0 }}
        >
          <Background variant="dots" gap={gridSize} size={1.2} color="rgba(255, 255, 255, 0.55)" />
          <Controls className="bg-purple-900 text-purple-100 border border-purple-500 shadow-md" />
          <MiniMap
            nodeColor={(node) => {
              return node.data?.nodeType?.includes('webhook') ? '#3b82f6' : '#9333ea';
            }}
            maskColor="rgba(147, 51, 234, 0.2)"
            className="border border-purple-500 shadow-md"
          />
        </ReactFlow>
        </div>
      </div>
    </>
  )
}
