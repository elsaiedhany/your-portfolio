// script.js - Specifically for dashboard.html functionalities

// --- DOM Elements Cache (Specific to Dashboard) ---
// These IDs must exist in dashboard.html
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
    deleteConfirmMessage: document.getElementById('deleteConfirmMessage')
};

const DASHBOARD_BACKEND_BASE_URL = 'http://127.0.0.1:5000'; // Ensure this is correct

// --- Utility Functions (Specific or adapted for Dashboard) ---
function displayDashboardMessage(messageKeyOrText, type, isPermanent = false, replacements = {}) {
    // Uses the global currentGlobalLanguage and siteTranslations from common-script.js
    const transAlerts = siteTranslations[currentGlobalLanguage].alerts;
    let messageText = transAlerts[messageKeyOrText] || messageKeyOrText; // Try to get from alerts, or use as is

    // Replace placeholders like {projectName}
    for (const key in replacements) {
        messageText = messageText.replace(`{${key}}`, replacements[key]);
    }
    
    if (domDashboardElements.addProjectResponseMessage) {
        domDashboardElements.addProjectResponseMessage.innerHTML = messageText; // Use innerHTML for potential icons
        domDashboardElements.addProjectResponseMessage.className = 'mb-3 alert';
        domDashboardElements.addProjectResponseMessage.classList.add(type === 'success' ? 'alert-success' : 'alert-danger');
        domDashboardElements.addProjectResponseMessage.style.display = 'block';
        
        if (!isPermanent && type === 'success') {
            setTimeout(() => {
                if (domDashboardElements.addProjectResponseMessage) {
                    domDashboardElements.addProjectResponseMessage.style.display = 'none';
                    domDashboardElements.addProjectResponseMessage.innerHTML = '';
                    domDashboardElements.addProjectResponseMessage.className = 'mb-3';
                }
            }, 4000);
        }
    }
}


// --- Dashboard Core Logic ---
async function handleAddProjectSubmitDashboard(event) {
    event.preventDefault();
    // currentGlobalLanguage and siteTranslations are from common-script.js
    const trans = siteTranslations[currentGlobalLanguage];
    const alertsTrans = trans.alerts;

    const projectName = domDashboardElements.projectNameInput.value.trim();
    const projectUrl = domDashboardElements.projectUrlInput.value.trim();
    const projectDescription = domDashboardElements.projectDescriptionInput.value.trim();

    if (domDashboardElements.addProjectResponseMessage) domDashboardElements.addProjectResponseMessage.style.display = 'none';

    if (!projectName || !projectUrl || !projectDescription) {
        displayDashboardMessage('allFieldsRequiredDashboard', 'error'); // Use key from alerts
        return;
    }
    try {
        new URL(projectUrl); // Basic validation
        if (!['http:', 'https:'].includes(new URL(projectUrl).protocol)) throw new Error('Invalid protocol');
    } catch (_) {
        displayDashboardMessage('urlInvalid', 'error');
        return;
    }

    if (domDashboardElements.submitProjectButton) {
        domDashboardElements.submitProjectButton.innerHTML = trans.addingProjectInProgress || "Adding..."; // Use translated text
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
            fetchAndDisplayProjectsDashboard();
        } else {
            // Try to match backend message with a translation key
            let backendMessageKey = result.message; // Assume message is a key or direct text
            if (result.message === "No URL provided") backendMessageKey = 'noUrlProvided';
            else if (result.message === "URL cannot be empty") backendMessageKey = 'urlCannotBeEmpty';
            else if (result.message === "Invalid URL format. Must start with http:// or https://") backendMessageKey = 'invalidUrlFormatBackend';
            
            displayDashboardMessage(alertsTrans[backendMessageKey] || result.message || 'errorAdding', 'error');
        }
    } catch (error) {
        console.error('Fetch Error (Add Project):', error);
        displayDashboardMessage('networkError', 'error');
    } finally {
        if (domDashboardElements.submitProjectButton) {
            domDashboardElements.submitProjectButton.innerHTML = trans.submitProjectButtonDashboard || "Add Project";
            domDashboardElements.submitProjectButton.disabled = false;
        }
    }
}

async function confirmAndDeleteProjectDashboard(projectId, projectName) {
    const trans = siteTranslations[currentGlobalLanguage];
    if(domDashboardElements.deleteConfirmMessage) domDashboardElements.deleteConfirmMessage.style.display = 'none';

    const confirmationMessage = trans.deleteConfirmMessage.replace("{projectName}", `<strong>${projectName}</strong>`);
    
    if (domDashboardElements.deleteConfirmMessage) {
        domDashboardElements.deleteConfirmMessage.innerHTML = `
            <p>${confirmationMessage}</p>
            <button class="btn btn-danger btn-sm me-2" id="confirmDeleteActualBtnDashboard">${trans.confirmDeleteBtn}</button>
            <button class="btn btn-secondary btn-sm" id="cancelDeleteActualBtnDashboard">${trans.cancelDeleteBtn}</button>
        `;
        domDashboardElements.deleteConfirmMessage.className = 'alert alert-warning text-center fs-5 shadow-sm';
        domDashboardElements.deleteConfirmMessage.style.display = 'block';

        document.getElementById('confirmDeleteActualBtnDashboard').onclick = async () => {
            if(domDashboardElements.deleteConfirmMessage) domDashboardElements.deleteConfirmMessage.style.display = 'none';
            await deleteProjectFromServerDashboard(projectId, projectName);
        };
        document.getElementById('cancelDeleteActualBtnDashboard').onclick = () => {
            if(domDashboardElements.deleteConfirmMessage) domDashboardElements.deleteConfirmMessage.style.display = 'none';
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
            fetchAndDisplayProjectsDashboard();
        } else {
            displayDashboardMessage(result.message || 'errorDeletingProject', 'error', false, {projectName: projectName});
        }
    } catch (error) {
        console.error('Fetch Error (Delete Project):', error);
        displayDashboardMessage('networkError', 'error');
    }
}

function createProjectCardDashboard(project) {
    // currentGlobalLanguage and siteTranslations are from common-script.js
    const trans = siteTranslations[currentGlobalLanguage];
    const col = document.createElement('div');
    col.className = 'col project-card-item'; // For animation

    const card = document.createElement('div');
    card.className = 'card project-card h-100 interactive-card'; // Added interactive-card

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header project-card-header d-flex justify-content-between align-items-center';
    
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title mb-0';
    cardTitle.textContent = project.name;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-delete-project';
    deleteButton.title = trans.deleteButtonTitle;
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.setAttribute('data-project-id', project.id);
    deleteButton.setAttribute('data-project-name', project.name);
    deleteButton.onclick = () => confirmAndDeleteProjectDashboard(project.id, project.name);

    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(deleteButton);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const cardText = document.createElement('p');
    cardText.className = 'card-text project-description';
    cardText.textContent = project.description;
    cardBody.appendChild(cardText);

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer project-card-footer';
    const visitLink = document.createElement('a');
    visitLink.href = project.url;
    visitLink.className = 'btn btn-visit-project btn-sm';
    visitLink.target = '_blank';
    visitLink.rel = 'noopener noreferrer';
    visitLink.innerHTML = trans.visitProjectBtnText || "Visit Project";
    cardFooter.appendChild(visitLink);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    col.appendChild(card);
    return col;
}

async function fetchAndDisplayProjectsDashboard() {
    if (!domDashboardElements.projectsListContainer || !domDashboardElements.loadingProjectsMessage || !domDashboardElements.noProjectsMessage) {
        // console.log("Dashboard specific elements for project list not found. Not fetching.");
        return;
    }

    const trans = siteTranslations[currentGlobalLanguage]; // Use global language
    const alertsTrans = trans.alerts;

    if(domDashboardElements.loadingProjectsMessage) {
        domDashboardElements.loadingProjectsMessage.style.display = 'block';
        updateTextContentGlobal('loadingProjectsText', 'loadingProjectsTextDashboard', trans); // Update loading text
    }
    if(domDashboardElements.noProjectsMessage) domDashboardElements.noProjectsMessage.style.display = 'none';
    if(domDashboardElements.deleteConfirmMessage) domDashboardElements.deleteConfirmMessage.style.display = 'none';
    if(domDashboardElements.projectsListContainer) domDashboardElements.projectsListContainer.innerHTML = '';

    try {
        const response = await fetch(`${DASHBOARD_BACKEND_BASE_URL}/get-projects`);
        const result = await response.json();
        if (response.ok && result.status === "success") {
            if (result.projects && result.projects.length > 0) {
                result.projects.forEach((project, index) => {
                    const projectCardElement = createProjectCardDashboard(project);
                    domDashboardElements.projectsListContainer.appendChild(projectCardElement);
                    setTimeout(() => {
                        projectCardElement.style.opacity = '1';
                        projectCardElement.style.transform = 'translateY(0)';
                    }, index * 120); // Slightly slower animation
                });
            } else {
                if(domDashboardElements.noProjectsMessage) {
                    updateTextContentGlobal('noProjectsText', 'noProjectsTextDashboard', trans);
                    domDashboardElements.noProjectsMessage.style.display = 'block';
                }
            }
        } else {
             if(domDashboardElements.noProjectsMessage) {
                updateTextContentGlobal('noProjectsText', alertsTrans[result.message] || result.message || alertsTrans.errorFetching, alertsTrans);
                domDashboardElements.noProjectsMessage.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Fetch Error (Get Projects):', error);
        if(domDashboardElements.noProjectsMessage) {
            updateTextContentGlobal('noProjectsText', 'networkError', alertsTrans);
            domDashboardElements.noProjectsMessage.style.display = 'block';
        }
    } finally {
        if(domDashboardElements.loadingProjectsMessage) domDashboardElements.loadingProjectsMessage.style.display = 'none';
    }
}

// --- Event Listeners for Dashboard (called after common-script.js's DOMContentLoaded) ---
function initializeDashboard() {
    // This function will be called by common-script.js if it detects it's on the dashboard page.
    // OR, we can ensure these are attached if the specific dashboard elements exist.
    if (domDashboardElements.projectForm) {
        domDashboardElements.projectForm.addEventListener('submit', handleAddProjectDashboard);
    }
    if (domDashboardElements.refreshProjectsButton) {
        domDashboardElements.refreshProjectsButton.addEventListener('click', fetchAndDisplayProjectsDashboard);
    }
    // Language buttons are handled by common-script.js

    // Initial fetch for projects on dashboard load (will be called by applyGlobalTranslations)
    // fetchAndDisplayProjectsDashboard(); //This is now called from applyGlobalTranslations in common-script.js
}

// Self-check if this script is on the dashboard page and initialize
if (document.getElementById('projectForm') && document.getElementById('projectsListContainer')) {
    // console.log("Dashboard specific script loaded and initializing.");
    // The initial fetch and display is now handled by applyGlobalTranslations in common-script.js,
    // which in turn calls fetchAndDisplayProjectsDashboard if on the dashboard page.
    // We just need to ensure the event listeners for form submission and refresh button are set up.
     if (domDashboardElements.projectForm) {
        domDashboardElements.projectForm.addEventListener('submit', handleAddProjectDashboard);
    }
    if (domDashboardElements.refreshProjectsButton) {
        domDashboardElements.refreshProjectsButton.addEventListener('click', fetchAndDisplayProjectsDashboard);
    }
}
