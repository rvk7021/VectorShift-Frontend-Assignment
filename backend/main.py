from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import json
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes, edges):
    """
    Check if a graph is a Directed Acyclic Graph (DAG) using BFS.
    Returns True if the graph is a DAG, False otherwise.
    """
    if not nodes or not edges:
        return True  # Empty graph is considered a DAG
    
    # Create an adjacency list
    graph = defaultdict(list)
    indegree = {node['id']: 0 for node in nodes}
    
    # Fill the adjacency list and count indegrees
    for edge in edges:
        source = edge['source']
        target = edge['target']
        graph[source].append(target)
        indegree[target] = indegree.get(target, 0) + 1
    
    # Initialize queue with nodes that have no incoming edges
    queue = deque([node_id for node_id, degree in indegree.items() if degree == 0])
    visited_count = 0
    
    # Process the queue
    while queue:
        node_id = queue.popleft()
        visited_count += 1
        
        # Process neighbors
        for neighbor in graph[node_id]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, then there's no cycle
    return visited_count == len(nodes)

@app.post('/pipelines/parse')
async def parse_pipeline(data: dict = Body(...)):
    try:
        nodes = data.get('nodes', [])
        edges = data.get('edges', [])
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        is_dag_result = is_dag(nodes, edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag_result
        }
    except Exception as e:
        return {'error': str(e)}
