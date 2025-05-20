// script.js - Specifically for dashboard.html functionalities

// --- DOM Elements Cache (Specific to Dashboard) ---
const domDashboardElements = {
    projectForm: document.getElementById('projectForm'),
    projectNameInput: document.getElementById('projectName'),
    projectUrlInput: document.getElementById('projectUrl'),
    projectDescriptionInput: document.getElementById('projectDescription'),
    addProjectResponseMessage: document.getElementById('addProjectResponseMessage'),
    submitProjectButton: document.getElementById('submitProjectButton'),
    
    projectsListContainer: document.getElementById('projectsListContainer'),
    loadingProjectsMessage: document.getElementById('loadingProjectsMessage'),
    noProjectsMessage: document.getElementById('noProjectsMessage'),
    refreshProjectsButton: document.getElementById('refreshProjectsButton'),
    deleteConfirmMessageContainer: document.getElementById('deleteConfirmMessage') // Renamed for clarity
};

const DASHBOARD_BACKEND_BASE_URL = 'http://127.0.0.1:5000';

// --- Utility Functions (Specific or adapted for Dashboard) ---
function displayDashboardMessage(messageKeyOrText, type, isPermanent = false, replacements = {}) {
    // Uses the global currentGlobalLanguage and siteTranslations from common-script.js
    const alertsTrans = siteTranslations[currentGlobalLanguage]?.alerts || {}; // Ensure alertsTrans is defined
    let messageText = alertsTrans[messageKeyOrText] || messageKeyOrText;

    for (const key in replacements) {
        messageText = messageText.replace(new RegExp(`{${key}}`, 'g'), replacements[key]);
    }
    
    if (domDashboardElements.addProjectResponseMessage) {
        domDashboardElements.addProjectResponseMessage.innerHTML = messageText;
        domDashboardElements.addProjectResponseMessage.className = 'mb-3 alert p-2 fs-7'; // Smaller padding and font
        domDashboardElements.addProjectResponseMessage.classList.add(type === 'success' ? 'alert-success' : 'alert-danger');
        domDashboardElements.addProjectResponseMessage.style.display = 'block';
        
        if (!isPermanent && type === 'success') {
            setTimeout(() => {
                if (domDashboardElements.addProjectResponseMessage) {
                    domDashboardElements.addProjectResponseMessage.style.display = 'none';
                    domDashboardElements.addProjectResponseMessage.innerHTML = '';
                    domDashboardElements.addProjectResponseMessage.className = 'mb-3';
                }
            }, 3500);
        }
    }
}

// --- Dashboard Core Logic ---
async function handleAddProjectDashboard(event) { // Renamed for clarity
    event.preventDefault();
    const trans = siteTranslations[currentGlobalLanguage];
    const alertsTrans = trans.alerts;

    const projectName = domDashboardElements.projectNameInput.value.trim();
    const projectUrl = domDashboardElements.projectUrlInput.value.trim();
    const projectDescription = domDashboardElements.projectDescriptionInput.value.trim();

    if (domDashboardElements.addProjectResponseMessage) domDashboardElements.addProjectResponseMessage.style.display = 'none';

    if (!projectName || !projectUrl || !projectDescription) {
        displayDashboardMessage('allFieldsRequiredDashboard', 'danger'); // Use danger for consistency
        return;
    }
    try {
        new URL(projectUrl);
        if (!['http:', 'https:'].includes(new URL(projectUrl).protocol)) throw new Error('Invalid protocol');
    } catch (_) {
        displayDashboardMessage('urlInvalid', 'danger');
        return;
    }

    if (domDashboardElements.submitProjectButton) {
        domDashboardElements.submitProjectButton.innerHTML = trans.addingProjectInProgress || "<i class='fas fa-spinner fa-spin me-2'></i>Adding...";
        domDashboardElements.submitProjectButton.disabled = true;
    }

    try {
        const response = await fetch(`${DASHBOARD_BACKEND_BASE_URL}/add-project`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectName, projectUrl, projectDescription }),
        });
        const result = await response.json();
        if (response.ok && result.status === "success") {
            displayDashboardMessage('projectAddedSuccessDashboard', 'success');
            if(domDashboardElements.projectForm) domDashboardElements.projectForm.reset(); 
            await fetchAndDisplayProjectsDashboard(); // await for it to finish
        } else {
            let backendMessageKey = result.message;
            if (result.message === "No URL provided") backendMessageKey = 'noUrlProvided';
            else if (result.message === "URL cannot be empty") backendMessageKey = 'urlCannotBeEmpty';
            else if (result.message === "Invalid URL format. Must start with http:// or https://") backendMessageKey = 'invalidUrlFormatBackend';
            displayDashboardMessage(alertsTrans[backendMessageKey] || result.message || 'errorAdding', 'danger');
        }
    } catch (error) {
        console.error('Fetch Error (Add Project):', error);
        displayDashboardMessage('networkError', 'danger');
    } finally {
        if (domDashboardElements.submitProjectButton) {
            domDashboardElements.submitProjectButton.innerHTML = trans.submitProjectButtonDashboard || "Save Project";
            domDashboardElements.submitProjectButton.disabled = false;
        }
    }
}

async function confirmAndDeleteProjectDashboard(projectId, projectName) {
    const trans = siteTranslations[currentGlobalLanguage];
    if(domDashboardElements.deleteConfirmMessageContainer) domDashboardElements.deleteConfirmMessageContainer.style.display = 'none';

    const confirmationMessage = trans.deleteConfirmMessage.replace("{projectName}", `<strong>${projectName}</strong>`);
    
    if (domDashboardElements.deleteConfirmMessageContainer) {
        domDashboardElements.deleteConfirmMessageContainer.innerHTML = `
            <div class="p-3">
                <p class="mb-3">${confirmationMessage}</p>
                <button class="btn btn-danger btn-sm me-2" id="confirmDeleteActualBtnDashboard">${trans.confirmDeleteBtn}</button>
                <button class="btn btn-secondary btn-sm" id="cancelDeleteActualBtnDashboard">${trans.cancelDeleteBtn}</button>
            </div>
        `;
        domDashboardElements.deleteConfirmMessageContainer.className = 'alert alert-warning text-center fs-6 shadow-sm'; // Smaller font
        domDashboardElements.deleteConfirmMessageContainer.style.display = 'block';

        document.getElementById('confirmDeleteActualBtnDashboard').onclick = async () => {
            if(domDashboardElements.deleteConfirmMessageContainer) domDashboardElements.deleteConfirmMessageContainer.style.display = 'none';
            await deleteProjectFromServerDashboard(projectId, projectName);
        };
        document.getElementById('cancelDeleteActualBtnDashboard').onclick = () => {
            if(domDashboardElements.deleteConfirmMessageContainer) domDashboardElements.deleteConfirmMessageContainer.style.display = 'none';
        };
    } else { 
        if (!confirm(trans.deleteConfirmMessage.replace("{projectName}", projectName).replace(/<[^>]*>?/gm, ''))) {
            return;
        }
        await deleteProjectFromServerDashboard(projectId, projectName);
    }
}

async function deleteProjectFromServerDashboard(projectId, projectName) {
    const trans = siteTranslations[currentGlobalLanguage];
    try {
        const response = await fetch(`${DASHBOARD_BACKEND_BASE_URL}/delete-project/${projectId}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        if (response.ok && result.status === "success") {
            displayDashboardMessage('projectDeletedSuccess', 'success', false, {projectName: projectName});
            await fetchAndDisplayProjectsDashboard(); // await for it to finish
        } else {
            displayDashboardMessage(result.message || 'errorDeletingProject', 'danger', false, {projectName: projectName});
        }
    } catch (error) {
        console.error('Fetch Error (Delete Project):', error);
        displayDashboardMessage('networkError', 'danger');
    }
}

function createProjectCardDashboard(project) {
    const trans = siteTranslations[currentGlobalLanguage];
    const col = document.createElement('div');
    col.className = 'col project-card-item';

    const card = document.createElement('div');
    card.className = 'card project-card h-100 interactive-card';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header project-card-header d-flex justify-content-between align-items-center py-2 px-3'; // Reduced padding
    
    const cardTitle = document.createElement('h6'); // h6 for smaller title
    cardTitle.className = 'card-title mb-0 fw-bold';
    cardTitle.textContent = project.name;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-delete-project p-1'; // Smaller padding
    deleteButton.title = trans.deleteButtonTitle;
    deleteButton.innerHTML = '<i class="fas fa-trash-alt fa-sm"></i>'; // Smaller icon
    deleteButton.setAttribute('data-project-id', project.id);
    deleteButton.setAttribute('data-project-name', project.name);
    deleteButton.onclick = () => confirmAndDeleteProjectDashboard(project.id, project.name);

    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(deleteButton);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body p-3'; // Standard padding
    const cardText = document.createElement('p');
    cardText.className = 'card-text project-description fs-7'; // Smaller font for description
    cardText.textContent = project.description;
    cardBody.appendChild(cardText);

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer project-card-footer bg-transparent border-top-0 pt-0 pb-3 px-3 text-end'; // Align button to end
    const visitLink = document.createElement('a');
    visitLink.href = project.url;
    visitLink.className = 'btn btn-visit-project btn-sm py-1 px-2'; // Smaller button
    visitLink.target = '_blank';
    visitLink.rel = 'noopener noreferrer';
    visitLink.innerHTML = trans.visitProjectBtnText || "<i class='fas fa-external-link-alt me-1'></i>Visit";
    cardFooter.appendChild(visitLink);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    col.appendChild(card);
    return col;
}

async function fetchAndDisplayProjectsDashboard() {
    if (!domDashboardElements.projectsListContainer || !domDashboardElements.loadingProjectsMessage || !domDashboardElements.noProjectsMessage) {
        return;
    }
    const trans = siteTranslations[currentGlobalLanguage];
    const alertsTrans = trans.alerts;

    if(domDashboardElements.loadingProjectsMessage) {
        domDashboardElements.loadingProjectsMessage.style.display = 'block';
        const loadingTextEl = document.getElementById('loadingProjectsText'); // Assuming ID exists
        if(loadingTextEl) loadingTextEl.innerHTML = trans.loadingProjectsTextDashboard || "Loading...";
    }
    if(domDashboardElements.noProjectsMessage) domDashboardElements.noProjectsMessage.style.display = 'none';
    if(domDashboardElements.deleteConfirmMessageContainer) domDashboardElements.deleteConfirmMessageContainer.style.display = 'none';
    if(domDashboardElements.projectsListContainer) domDashboardElements.projectsListContainer.innerHTML = '';

    try {
        const response = await fetch(`${DASHBOARD_BACKEND_BASE_URL}/get-projects`);
        if (!response.ok) { // Handle HTTP errors like 404, 500 directly
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (result.status === "success") {
            if (result.projects && result.projects.length > 0) {
                result.projects.forEach((project, index) => {
                    const projectCardElement = createProjectCardDashboard(project);
                    domDashboardElements.projectsListContainer.appendChild(projectCardElement);
                    // Staggered animation
                    setTimeout(() => {
                        projectCardElement.style.opacity = '1';
                        projectCardElement.style.transform = 'translateY(0)';
                    }, index * 100); 
                });
            } else {
                if(domDashboardElements.noProjectsMessage) {
                    const noProjTextEl = domDashboardElements.noProjectsMessage.querySelector('span'); // Assuming span holds the text
                    if (noProjTextEl) noProjTextEl.innerHTML = trans.noProjectsTextDashboard;
                    domDashboardElements.noProjectsMessage.style.display = 'block';
                }
            }
        } else { // Backend returned success:false or other non-OK status
             if(domDashboardElements.noProjectsMessage) {
                const noProjTextEl = domDashboardElements.noProjectsMessage.querySelector('span');
                if (noProjTextEl) noProjTextEl.innerHTML = alertsTrans[result.message] || result.message || alertsTrans.errorFetching;
                domDashboardElements.noProjectsMessage.style.display = 'block';
            }
        }
    } catch (error) { // Catches network errors and HTTP errors from throw
        console.error('Fetch Error (Get Projects):', error);
        if(domDashboardElements.noProjectsMessage) {
            const noProjTextEl = domDashboardElements.noProjectsMessage.querySelector('span');
            if (noProjTextEl) noProjTextEl.innerHTML = alertsTrans.networkError || "Network error!";
            domDashboardElements.noProjectsMessage.style.display = 'block';
        }
    } finally {
        if(domDashboardElements.loadingProjectsMessage) domDashboardElements.loadingProjectsMessage.style.display = 'none';
    }
}

// --- Event Listeners for Dashboard ---
// common-script.js's DOMContentLoaded will call applyGlobalTranslations, 
// which then calls fetchAndDisplayProjectsDashboard if on the dashboard page.
// We just need to attach listeners for form submit and refresh button here.
if (document.getElementById('projectForm') && document.getElementById('projectsListContainer')) {
    if (domDashboardElements.projectForm) {
        domDashboardElements.projectForm.addEventListener('submit', handleAddProjectDashboard);
    }
    if (domDashboardElements.refreshProjectsButton) {
        domDashboardElements.refreshProjectsButton.addEventListener('click', () => {
            // Ensure message displays are cleared before re-fetching
             if(domDashboardElements.addProjectResponseMessage) domDashboardElements.addProjectResponseMessage.style.display = 'none';
             if(domDashboardElements.deleteConfirmMessageContainer) domDashboardElements.deleteConfirmMessageContainer.style.display = 'none';
            fetchAndDisplayProjectsDashboard();
        });
    }
}
