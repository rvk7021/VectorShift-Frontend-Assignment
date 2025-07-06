from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import json
from collections import defaultdict, deque
import uvicorn
import os

# Load environment variables (optional)
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # dotenv is optional

app = FastAPI()

# Get CORS origins from environment
cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes, edges):
    if not nodes or not edges:
        return True
    
    graph = defaultdict(list)
    indegree = {node['id']: 0 for node in nodes}
    
    for edge in edges:
        source = edge['source']
        target = edge['target']
        graph[source].append(target)
        indegree[target] = indegree.get(target, 0) + 1
    
    queue = deque([node_id for node_id, degree in indegree.items() if degree == 0])
    visited_count = 0
    
    while queue:
        node_id = queue.popleft()
        visited_count += 1
        
        for neighbor in graph[node_id]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    
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

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=False
    )
