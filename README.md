# VectorShift Pipeline Builder

A sophisticated drag-and-drop pipeline builder application that enables users to create, visualize, and analyze complex data processing workflows. The application provides an intuitive interface for building directed acyclic graphs (DAGs) with real-time validation and analysis capabilities.

## 🏗️ Architecture Overview

This application follows a modern full-stack architecture with clear separation of concerns:

### Frontend Architecture (React + React Flow)
- **Component-Based Architecture**: Modular React components with clear responsibilities
- **State Management**: Zustand for global state management
- **Visual Flow Editor**: React Flow for interactive node-based interface
- **Responsive Design**: Tailwind CSS for mobile-first responsive design

### Backend Architecture (FastAPI + Python)
- **RESTful API**: FastAPI for high-performance HTTP endpoints
- **Graph Analysis**: Custom DAG validation algorithms
- **CORS Support**: Cross-origin resource sharing for frontend integration

## 📊 System Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Interface│    │   State Manager │    │   API Service   │
│   (React Flow)  │◄──►│    (Zustand)    │◄──►│   (FastAPI)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Node Components│    │  Pipeline Data  │    │  DAG Analysis   │
│  (9 Node Types) │    │  (Nodes/Edges)  │    │  (Validation)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow Process:
1. **Node Creation**: Users drag nodes from the toolbar onto the canvas
2. **Connection Building**: Users connect nodes by dragging between handles
3. **State Management**: All changes are tracked in the global state
4. **Pipeline Submission**: User triggers pipeline analysis
5. **Backend Processing**: FastAPI validates the DAG structure
6. **Result Display**: Frontend shows analysis results (node count, edge count, DAG validity)

## 🧩 Component Structure

### Frontend Components

#### Core Components
- **`App.js`**: Main application component with responsive layout
- **`ui.js`**: Pipeline canvas with React Flow integration
- **`toolbar.js`**: Node category toolbar with drag-and-drop functionality
- **`store.js`**: Zustand state management for nodes and edges

#### Node Types (9 Available)
- **Input Node**: Data entry point
- **Output Node**: Data exit point  
- **Text Node**: Text processing and manipulation
- **LLM Node**: Large Language Model integration
- **Context Node**: Context management
- **Database Node**: Database operations
- **Transform Node**: Data transformation
- **Filter Node**: Data filtering
- **Webhook Node**: External API integration

#### Abstract Layer
- **`BaseNode.js`**: Base class for all node implementations

#### Configuration
- **`nodeConfig.js`**: Central configuration for node types and categories
- **`constants.js`**: Application-wide constants

#### Services
- **`pipelineService.js`**: API communication for pipeline operations

## 🚀 Setup Guidelines

### Prerequisites
- **Node.js**: v16.0.0 or higher
- **Python**: v3.8.0 or higher
- **NPM/Yarn**: Latest version
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Installation Steps

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd VectorShift-Frontend-Assignment
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
```

#### 3. Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

#### Option 2: Development Mode
```bash
# Backend with auto-reload
cd backend
uvicorn main:app --reload --port 8000

# Frontend with hot-reload
cd frontend
npm run start
```

### Environment Configuration

#### Backend Environment Variables
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8000)
- `CORS_ORIGINS`: Allowed origins for CORS

#### Frontend Environment Variables
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:8000)

## 🔧 Development Workflow

### Project Structure
```
VectorShift-Frontend-Assignment/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── nodes/           # Node type implementations
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API communication
│   │   ├── config/          # Configuration files
│   │   ├── types/           # Type definitions
│   │   ├── utils/           # Utility functions
│   │   └── constants/       # Application constants
│   ├── public/              # Static assets
│   └── build/               # Production build
├── backend/                 # FastAPI backend application
│   ├── main.py             # Main application entry point
│   └── requirements.txt    # Python dependencies
└── README.md               # This file
```

### Key Features

#### 🎨 User Interface
- **Drag-and-Drop**: Intuitive node placement and connection
- **Responsive Design**: Mobile-friendly with device rotation hints
- **Category Filtering**: Organize nodes by I/O, Data, AI, and Integration categories
- **Real-time Validation**: Instant feedback on pipeline structure

#### 🔍 Pipeline Analysis
- **DAG Validation**: Ensures no cycles in the pipeline
- **Node Counting**: Tracks total nodes in the pipeline
- **Edge Counting**: Tracks total connections between nodes
- **Error Handling**: Graceful error handling and user feedback

#### 📱 Mobile Support
- **Responsive Layout**: Adapts to different screen sizes
- **Touch-Friendly**: Optimized for touch interactions
- **Rotation Hints**: Guides users for optimal experience

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
pytest  # (if test files are added)
```

## 🔧 Technologies Used

### Frontend Stack
- **React 18.3.1**: Modern React with hooks and concurrent features
- **React Flow 11.11.4**: Interactive node-based editor
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Zustand**: Lightweight state management

### Backend Stack
- **FastAPI 0.104.1**: High-performance Python web framework
- **Uvicorn 0.24.0**: ASGI server for FastAPI
- **Python-multipart 0.0.6**: File upload support

### Development Tools
- **React Scripts 5.0.1**: Development and build tools
- **ESLint**: Code linting and formatting
- **Create React App**: Project bootstrapping

## 📈 Performance Considerations

- **Lazy Loading**: Components load on demand
- **Memoization**: Optimized re-renders with React.memo
- **Efficient State Updates**: Zustand's shallow comparison
- **Debounced API Calls**: Prevents excessive backend requests

## 🔐 Security Features

- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: Server-side validation of pipeline data
- **Error Boundaries**: Graceful error handling in React

## 📋 What is a DAG?

A **Directed Acyclic Graph (DAG)** is a fundamental concept in this application:

- **Directed**: Each connection has a specific direction (source → target)
- **Acyclic**: No cycles or loops exist in the graph
- **Graph**: A collection of nodes connected by edges

**Why DAGs Matter:**
- **Deterministic Execution**: Ensures predictable pipeline execution order
- **Cycle Prevention**: Prevents infinite loops in data processing
- **Dependency Management**: Clear dependency relationships between pipeline stages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is part of the VectorShift Frontend Assignment.
