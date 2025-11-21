'use strict';

// Initialize the extension when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeExtension();
});

function initializeExtension() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const listEl = document.getElementById('datasource-list');

    // Initialize the Tableau Extensions API
    tableau.extensions.initializeAsync().then(function() {
        loadingEl.style.display = 'none';
        loadDatasources();
    }).catch(function(err) {
        loadingEl.style.display = 'none';
        showError('Failed to initialize extension: ' + err.message);
    });
}

async function loadDatasources() {
    const listEl = document.getElementById('datasource-list');
    const dashboard = tableau.extensions.dashboardContent.dashboard;

    // Clear the list
    listEl.innerHTML = '';

    // Handle case where there are no worksheets
    if (dashboard.worksheets.length === 0) {
        listEl.innerHTML = '<li class="no-data">No worksheets found in dashboard</li>';
        return;
    }

    // Collect all unique datasources from all worksheets
    const datasourcesMap = new Map();

    try {
        // Get all datasources from all worksheets
        for (const worksheet of dashboard.worksheets) {
            const datasources = await worksheet.getDataSourcesAsync();

            for (const datasource of datasources) {
                if (!datasourcesMap.has(datasource.id)) {
                    datasourcesMap.set(datasource.id, {
                        name: datasource.name,
                        isExtract: datasource.isExtract
                    });
                }
            }
        }

        renderDatasourceList(datasourcesMap);
    } catch (err) {
        console.error('Error getting datasources:', err);
        showError('Error loading datasources: ' + err.message);
    }
}

function renderDatasourceList(datasourcesMap) {
    const listEl = document.getElementById('datasource-list');
    listEl.innerHTML = '';

    if (datasourcesMap.size === 0) {
        listEl.innerHTML = '<li class="no-data">No datasources found</li>';
        return;
    }

    datasourcesMap.forEach(function(datasource, id) {
        const li = document.createElement('li');
        li.className = 'datasource-item';

        // Datasource name
        const nameSpan = document.createElement('span');
        nameSpan.className = 'datasource-name';
        nameSpan.textContent = datasource.name;

        // Extract/Live badge
        const badgeSpan = document.createElement('span');
        badgeSpan.className = 'datasource-badge';
        badgeSpan.textContent = datasource.isExtract ? 'Extract' : 'Live';

        li.appendChild(nameSpan);
        li.appendChild(badgeSpan);
        listEl.appendChild(li);
    });
}

function showError(message) {
    const errorEl = document.getElementById('error');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
}
