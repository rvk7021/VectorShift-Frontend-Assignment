import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { submitPipeline } from './services';
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

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

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

  const clearAll = useCallback(() => {
    if (window.confirm("Are you sure you want to clear the entire pipeline?")) {
      useStore.setState({ nodes: [], edges: [], nodeIDs: {} });
    }
  }, []);

  return (
    <>
      <div className="h-full">
        <div ref={reactFlowWrapper} className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-transparent relative">
          <div className="absolute top-4 right-4 z-50 flex space-x-2">
            <button
              type="button"
              onClick={clearAll}
              className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-medium py-1.5 px-4 rounded-md shadow-md border border-purple-500 transition-all duration-200 flex items-center space-x-1.5 text-sm"
            >
              <span>Clear</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => submitPipeline(nodes, edges)}
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-medium py-1.5 px-4 rounded-md shadow-md border border-emerald-500 transition-all duration-200 flex items-center space-x-1.5 text-sm"
            >
              <span>Run</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            edgeOptions={{
              animated: true,
              style: { stroke: '#06b6d4', strokeWidth: 2.5 },
              type: 'smoothstep'
            }}
            defaultViewport={{ zoom: 1.0, x: 0, y: 0 }}
          >
            <Background variant="dots" gap={gridSize} size={1.5} color="rgba(255, 255, 255, 0.8)" />
            <Controls className="bg-slate-900 text-slate-100 border border-slate-600 shadow-md" />
            <MiniMap
              nodeColor={(node) => {
                return node.data?.nodeType?.includes('webhook') ? '#3b82f6' : '#06b6d4';
              }}
              maskColor="rgba(6, 182, 212, 0.2)"
              className="border border-slate-600 shadow-md"
            />
          </ReactFlow>
        </div>
      </div>
    </>
  )
}
