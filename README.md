# Pipeline Builder Application

This application allows you to create and analyze directed graph pipelines. 

## Features

- Drag and drop interface for creating pipeline nodes and connections
- Backend analysis to determine if your pipeline forms a Directed Acyclic Graph (DAG)
- Interactive UI for building complex workflows
- Real-time feedback on pipeline structure

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- NPM or Yarn

### Installation

1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Running the Application

#### Option 1: Using the start script

On Windows, simply run the start.bat file:
```
start.bat
```

#### Option 2: Manual startup

1. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. In a separate terminal, start the frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Using the Application

1. Drag nodes from the toolbar into the canvas
2. Connect nodes by dragging from one handle to another
3. Click the "Run Pipeline" button to analyze your pipeline
4. Review the results to see if your pipeline forms a valid DAG

## Technologies Used

- **Frontend**:
  - React
  - React Flow
  - Tailwind CSS

- **Backend**:
  - FastAPI
  - Python

## What is a DAG?

A Directed Acyclic Graph (DAG) is a directed graph with no cycles. In the context of pipelines:

- **Directed**: Connections between nodes have a specific direction (from source to target)
- **Acyclic**: There are no loops in the graph (you cannot follow connections and return to a starting point)
- **Graph**: A collection of nodes and edges

DAGs are important for pipeline execution because they ensure that data flows in one direction without infinite loops.
