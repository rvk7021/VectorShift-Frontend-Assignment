import { API_ENDPOINTS } from '../config/api';

const BACKEND_URL = API_ENDPOINTS.PARSE_PIPELINE;

export const submitPipeline = async (nodes, edges) => {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-30';
    loadingElement.style.cssText = 'backdrop-filter: blur(2px);';

    const spinner = document.createElement('div');
    spinner.className = 'bg-white dark:bg-purple-900 text-purple-900 dark:text-white rounded-lg shadow-xl p-6 flex flex-col items-center space-y-3';
    spinner.innerHTML = `
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        <p class="text-sm font-medium">Analyzing pipeline...</p>
    `;
    loadingElement.appendChild(spinner);
    document.body.appendChild(loadingElement);

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nodes, edges }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        try {
            if (document.body.contains(loadingElement)) {
                document.body.removeChild(loadingElement);
            }
        } catch (err) {
            console.warn("Error removing loading element:", err);
        }

        displayResults(data);
        return data;
    } catch (error) {
        try {
            if (document.body.contains(loadingElement)) {
                document.body.removeChild(loadingElement);
            }
        } catch (err) {
            console.warn("Error removing loading element:", err);
        }

        console.error("Error submitting pipeline:", error);

        const errorElement = document.createElement('div');
        errorElement.className = 'fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-30';
        errorElement.style.cssText = 'backdrop-filter: blur(2px);';

        const errorContent = document.createElement('div');
        errorContent.className = 'bg-white dark:bg-purple-900 text-red-500 rounded-lg shadow-xl p-6 max-w-md w-full mx-4';
        errorContent.innerHTML = `
            <div class="flex items-center space-x-3 mb-3">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <h3 class="font-bold">Error Analyzing Pipeline</h3>
            </div>
            <p class="mb-4">${error.message}</p>
            <div class="flex justify-end">
                <button class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors">Close</button>
            </div>
        `;
        errorElement.appendChild(errorContent);
        document.body.appendChild(errorElement);

        // Close error message when button is clicked
        const closeButton = errorContent.querySelector('button');
        closeButton.addEventListener('click', () => {
            try {
                // Check if element is still in document before removing
                if (document.body.contains(errorElement)) {
                    document.body.removeChild(errorElement);
                }
            } catch (error) {
                console.warn("Error removing error element:", error);
            }
        });

        throw error;
    }
};

export const displayResults = (results) => {
    const { num_nodes, num_edges, is_dag } = results;

    const alertElement = document.createElement('div');
    alertElement.className = 'fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-50';
    alertElement.style.cssText = 'backdrop-filter: blur(3px);';

    const alertContent = document.createElement('div');
    alertContent.className = 'bg-white dark:bg-purple-900 text-purple-900 dark:text-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4';

    const header = document.createElement('div');
    header.className = 'flex items-center justify-between mb-4 pb-2 border-b border-purple-200 dark:border-purple-700';
    header.innerHTML = `
        <h3 class="text-lg font-bold text-purple-800 dark:text-purple-200">Pipeline Analysis Results</h3>
        <button class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
        </button>
    `;

    const body = document.createElement('div');
    body.className = 'space-y-4';

    const results_container = document.createElement('div');
    results_container.className = 'grid grid-cols-2 gap-4';
    results_container.innerHTML = `
        <div class="flex flex-col">
            <span class="text-sm text-purple-600 dark:text-purple-300">Nodes</span>
            <span class="text-2xl font-bold">${num_nodes}</span>
        </div>
        <div class="flex flex-col">
            <span class="text-sm text-purple-600 dark:text-purple-300">Edges</span>
            <span class="text-2xl font-bold">${num_edges}</span>
        </div>
        <div class="col-span-2 flex items-center space-x-2 ${is_dag ? 'text-green-600' : 'text-red-500'}">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                ${is_dag
            ? '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>'
            : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>'
        }
            </svg>
            <span class="font-medium">${is_dag ? 'Valid DAG' : 'Not a valid DAG'}</span>
        </div>
    `;

    if (!is_dag && num_nodes > 0) {
        const warning = document.createElement('div');
        warning.className = 'bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 dark:border-red-600 p-4 text-sm text-red-700 dark:text-red-200';
        warning.innerHTML = `
            <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Warning:</strong> This pipeline contains cycles, which may cause infinite loops during execution.</span>
            </div>
        `;
        body.appendChild(warning);
    }

    body.appendChild(results_container);

    // Add a note about DAGs
    const note = document.createElement('div');
    note.className = 'text-xs text-gray-500 dark:text-gray-400 mt-4 border-t border-purple-100 dark:border-purple-800 pt-3';
    note.innerHTML = `
        <p><strong>Note:</strong> A Directed Acyclic Graph (DAG) is a graph with no cycles, which ensures that pipeline execution can complete without infinite loops.</p>
    `;
    body.appendChild(note);

    const footer = document.createElement('div');
    footer.className = 'flex justify-end mt-6';
    const closeButton = document.createElement('button');
    closeButton.className = 'bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors';
    closeButton.textContent = 'Close';
    footer.appendChild(closeButton);

    alertContent.appendChild(header);
    alertContent.appendChild(body);
    alertContent.appendChild(footer);
    alertElement.appendChild(alertContent);

    document.body.appendChild(alertElement);

    const closeAlert = () => {
        try {
            if (document.body.contains(alertElement)) {
                document.body.removeChild(alertElement);
            }
        } catch (error) {
            console.warn("Error removing alert element:", error);
        }
    };

    closeButton.addEventListener('click', closeAlert);
    header.querySelector('button').addEventListener('click', closeAlert);
    alertElement.addEventListener('click', (e) => {
        if (e.target === alertElement) {
            closeAlert();
        }
    });

    setTimeout(closeAlert, 15000);
};

export const SubmitButton = () => {
    return (
        <div className="flex items-center justify-center py-4">
            <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-3 px-8 rounded-lg shadow-lg border border-purple-400 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
                <span>Run Pipeline</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}
