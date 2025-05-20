// script.js - Specifically for dashboard.html functionalities

// --- DOM Elements Cache (Specific to Dashboard) ---
const domDashboardElements = {
    projectForm: document.getElementById('projectForm'),
    projectNameInput: document.getElementById('projectName'),
    projectUrlInput: document.getElementById('projectUrl'),
    projectDescriptionInput: document.getElementById('projectDescription'),
    addProjectResponseMessage: document.getElementById('addProjectResponseMessage'),
    submitProjectButton: document.getElementById('submitProjectButton'), // Also used for in-progress text
    
    projectsListContainer: document.getElementById('projectsListContainer'),
    loadingProjectsMessage: document.getElementById('loadingProjectsMessage'),
    noProjectsMessage: document.getElementById('noProjectsMessage'),
    refreshProjectsButton: document.getElementById('refreshProjectsButton'),
    deleteConfirmMessage: document.getElementById('deleteConfirmMessage')
};

const DASHBOARD_BACKEND_BASE_URL = 'http://127.0.0.1:5000'; // Ensure this is correct

// --- Utility Functions (Specific or adapted for Dashboard) ---
function displayDashboardMessage(message, type, isPermanent = false) {
    // Uses the global currentGlobalLanguage from common-script.js for translation context
    const trans = siteTranslations[currentGlobalLanguage]; // Access global translations
    let messageText = message; 

    // Check if message is a key from alerts (for dashboard specific alerts)
    if (trans.alerts && trans.alerts[message]) {
        messageText = trans.alerts[message];
    }
    
    if (domDashboardElements.addProjectResponseMessage) {
        domDashboardElements.addProjectResponseMessage.innerHTML = messageText;
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
    const trans = siteTranslations[currentGlobalLanguage].alerts; // Use dashboard alerts
    const generalTrans = siteTranslations[currentGlobalLanguage]; // For general button text

    const projectName = domDashboardElements.projectNameInput.value.trim();
    const projectUrl = domDashboardElements.projectUrlInput.value.trim();
    const projectDescription = domDashboardElements.projectDescriptionInput.value.trim();

    if (domDashboardElements.addProjectResponseMessage) domDashboardElements.addProjectResponseMessage.style.display = 'none';

    if (!projectName || !projectUrl || !projectDescription) {
        displayDashboardMessage(trans.allFieldsRequiredDashboard || "All fields are required.", 'error');
        return;
    }
    try {
        new URL(projectUrl);
        if (!['http:', 'https:'].includes(new URL(projectUrl).protocol)) throw new Error('Invalid protocol');
    } catch (_) {
        displayDashboardMessage(trans.urlInvalid, 'error');
        return;
    }

    if (domDashboardElements.submitProjectButton) {
        updateTextContentGlobal('submitProjectButton', generalTrans.addingProjectInProgress || "Adding...", generalTrans); // Use global for button text
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
            displayDashboardMessage(trans.projectAddedSuccessDashboard || "Project added!", 'success');
            if(domDashboardElements.projectForm) domDashboardElements.projectForm.reset(); 
            fetchAndDisplayProjectsDashboard();
        } else {
            displayDashboardMessage(result.message || trans.errorAdding, 'error');
        }
    } catch (error) {
        console.error('Fetch Error (Add Project):', error);
        displayDashboardMessage(trans.networkError, 'error');
    } finally {
        if (domDashboardElements.submitProjectButton) {
            updateTextContentGlobal('submitProjectButton', generalTrans.submitProjectButtonDashboard || "Add Project", generalTrans);
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
        domDashboardElements.deleteConfirmMessage.className = 'alert alert-warning text-center fs-5';
        domDashboardElements.deleteConfirmMessage.style.display = 'block';

        document.getElementById('confirmDeleteActualBtnDashboard').onclick = async () => {
            if(domDashboardElements.deleteConfirmMessage) domDashboardElements.deleteConfirmMessage.style.display = 'none';
            await deleteProjectFromServerDashboard(projectId, projectName);
        };
        document.getElementById('cancelDeleteActualBtnDashboard').onclick = () => {
            if(domDashboardElements.deleteConfirmMessage) domDashboardElements.deleteConfirmMessage.style.display = 'none';
        };
    } else { 
        if (!confirm(trans.deleteConfirmMessage.replace("{projectName}", projectName).replace(/<[^>]*>?/gm, ''))) { // Strip HTML for basic confirm
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
            displayDashboardMessage(trans.projectDeletedSuccess.replace("{projectName}", projectName), 'success');
            fetchAndDisplayProjectsDashboard();
        } else {
            displayDashboardMessage(result.message || trans.errorDeletingProject.replace("{projectName}", projectName), 'error');
        }
    } catch (error) {
        console.error('Fetch Error (Delete Project):', error);
        displayDashboardMessage(trans.alerts.networkError, 'error');
    }
}

function createProjectCardDashboard(project) {
    const trans = siteTranslations[currentGlobalLanguage];
    const col = document.createElement('div');
    col.className = 'col project-card-item';

    const card = document.createElement('div');
    card.className = 'card project-card h-100';

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
    visitLink.innerHTML = trans.visitProjectBtnText; // Assuming this key exists in siteTranslations now
    cardFooter.appendChild(visitLink);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    col.appendChild(card);
    return col;
}

async function fetchAndDisplayProjectsDashboard() {
    if (!domDashboardElements.projectsListContainer || !domDashboardElements.loadingProjectsMessage || !domDashboardElements.noProjectsMessage) return;

    const trans = siteTranslations[currentGlobalLanguage]; // Use global language
    const dashboardTrans = trans; // For specific dashboard texts if needed, or use trans.alerts for dashboard-specific alerts

    if(domDashboardElements.loadingProjectsMessage) domDashboardElements.loadingProjectsMessage.style.display = 'block';
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
                    }, index * 100);
                });
            } else {
                if(domDashboardElements.noProjectsMessage) {
                     updateTextContentGlobal('noProjectsText', 'noProjectsTextDashboard', dashboardTrans); // Use the dashboard specific key
                    domDashboardElements.noProjectsMessage.style.display = 'block';
                }
            }
        } else {
             if(domDashboardElements.noProjectsMessage) {
                updateTextContentGlobal('noProjectsText', 'alerts.errorFetching', dashboardTrans.alerts);
                domDashboardElements.noProjectsMessage.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Fetch Error (Get Projects):', error);
        if(domDashboardElements.noProjectsMessage) {
            updateTextContentGlobal('noProjectsText', 'alerts.networkError', dashboardTrans.alerts);
            domDashboardElements.noProjectsMessage.style.display = 'block';
        }
    } finally {
        if(domDashboardElements.loadingProjectsMessage) domDashboardElements.loadingProjectsMessage.style.display = 'none';
    }
}

// --- Event Listeners for Dashboard ---
document.addEventListener('DOMContentLoaded', () => {
    // Only run dashboard specific logic if we are on dashboard.html
    // A simple way to check is if a core dashboard element exists
    if (document.getElementById('projectForm')) {
        // Initialize dashboard specific language elements (already done by common-script.js applyGlobalTranslations)
        // The global applyGlobalTranslations will handle setting text for dashboard elements if their IDs are in siteTranslations

        if (domDashboardElements.projectForm) {
            domDashboardElements.projectForm.addEventListener('submit', handleAddProjectDashboard);
        }
        if (domDashboardElements.refreshProjectsButton) {
            domDashboardElements.refreshProjectsButton.addEventListener('click', fetchAndDisplayProjectsDashboard);
        }
        
        // Fetch projects on dashboard load (after language is set by common-script.js)
        // The fetchAndDisplayProjectsDashboard will be called by setLanguage in common-script.js
        // if we ensure it's called correctly for the dashboard context.
        // Forcing a call here might be redundant or could be timed if common-script is slow.
        // A better approach: `applyGlobalTranslations` in `common-script.js` should call
        // `WorkspaceAndDisplayProjectsDashboard` if it detects it's on the dashboard page.
        // For now, setLanguage in common-script.js calls fetchAndDisplayProjects (needs renaming or conditional logic)
        // Let's ensure the global setLanguage calls the right fetch function.

        // The fetchAndDisplayProjectsDashboard will be called initially by applyGlobalTranslations in common-script.js
        // if we rename its internal call or make it conditional
    }
});
