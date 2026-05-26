// --- SUPABASE CONFIGURATION ---
// Reemplaza estas credenciales con las de tu proyecto en Supabase (supabase.com)
// ¡Las llamadas a Supabase se degradarán a LocalStorage si dejas esto vacío!
const SUPABASE_URL = "https://ynxhmhbzwyzvfelnujaa.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlueGhtaGJ6d3l6dmZlbG51amFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NTQxMjYsImV4cCI6MjA5NTMzMDEyNn0.uEZ8ECKMoOCR0DSTuGLO23nlGdPNxItLKzUeaRXsafY";

let supabaseClient = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
        if (window.supabase) {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        } else {
            console.warn("Supabase CDN no está cargado. Se usará LocalStorage.");
        }
    } catch (e) {
        console.error("Error al inicializar Supabase:", e);
    }
}

// State Management
let currentChallengeIndex = 0;
let workMode = 'web'; // 'web' or 'local'
let completedChallenges = JSON.parse(localStorage.getItem('phpcamp_completed') || '{}');
let currentUser = null;
let isRegisterMode = false;

// DOM Elements
const sidebarChallengesList = document.getElementById('sidebar-challenges-list');
const lessonTitle = document.getElementById('lesson-title');
const instructionsContent = document.getElementById('instructions-content');
const codeEditorTextarea = document.getElementById('code-editor-textarea');
const consoleBody = document.getElementById('console-body');
const testsPanel = document.getElementById('tests-panel');
const progressCompleted = document.getElementById('progress-completed');
const progressTotal = document.getElementById('progress-total');
const btnRunTests = document.getElementById('btn-run-tests');
const btnResetCode = document.getElementById('btn-reset-code');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const modalOverlay = document.getElementById('modal-overlay');
const btnModalNext = document.getElementById('btn-modal-next');
const btnToggleWeb = document.getElementById('btn-toggle-web');
const btnToggleLocal = document.getElementById('btn-toggle-local');
const guideContainer = document.getElementById('guide-container');
const workspaceContainer = document.getElementById('workspace-container');
const btnShowGuide = document.getElementById('btn-show-guide');

// Auth DOM Elements
const btnOpenAuth = document.getElementById('btn-open-auth');
const userProfileWidget = document.getElementById('user-profile-widget');
const userEmailDisplay = document.getElementById('user-email-display');
const btnLogout = document.getElementById('btn-logout');
const authModalOverlay = document.getElementById('auth-modal-overlay');
const btnCloseAuthModal = document.getElementById('btn-close-auth-modal');
const authForm = document.getElementById('auth-form');
const authEmailInput = document.getElementById('auth-email');
const authPasswordInput = document.getElementById('auth-password');
const authErrorMsg = document.getElementById('auth-error-msg');
const btnAuthSubmit = document.getElementById('btn-auth-submit');
const authModalTitle = document.getElementById('auth-modal-title');
const authToggleLink = document.getElementById('auth-toggle-link');
const authToggleText = document.getElementById('auth-toggle-text');

// Initialize App
function init() {
    loadChallengesSidebar();
    updateProgressHeader();
    loadChallenge(currentChallengeIndex);
    setupEventListeners();
    checkAuthSession();
    
    // Default show guide first on startup
    showGuide();
}

// Sidebar loader
function loadChallengesSidebar() {
    sidebarChallengesList.innerHTML = '';
    
    const isGuideVisible = guideContainer.style.display === 'block';

    // Inject "Guía de Inicio" at the top of the sidebar dynamically
    const guideLi = document.createElement('li');
    guideLi.className = `challenge-item guide-sidebar-item ${isGuideVisible ? 'active' : ''}`;
    guideLi.innerHTML = `
        <div class="challenge-info">
            <span class="challenge-level-tag" style="background: rgba(59, 130, 246, 0.2); color: #60a5fa; font-weight: 700;">INICIO</span>
            <span class="challenge-title" style="font-weight: 600; color: #e2e8f0;">🚀 Guía de Inicio</span>
        </div>
    `;
    guideLi.addEventListener('click', () => {
        showGuide();
    });
    sidebarChallengesList.appendChild(guideLi);
    
    PHP_CHALLENGES.forEach((challenge, index) => {
        const li = document.createElement('li');
        li.className = `challenge-item ${completedChallenges[challenge.id] ? 'completed' : ''} ${index === currentChallengeIndex && !isGuideVisible ? 'active' : ''}`;
        li.dataset.index = index;
        
        li.innerHTML = `
            <div class="challenge-info">
                <span class="challenge-level-tag">${challenge.levelTitle.split(':')[0]}</span>
                <span class="challenge-title">${challenge.title}</span>
            </div>
            <span class="challenge-status-icon">✓</span>
        `;
        
        li.addEventListener('click', () => {
            currentChallengeIndex = index;
            loadChallenge(index);
            hideGuide();
            // Highlight active in sidebar
            document.querySelectorAll('.challenge-item').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
        });
        
        sidebarChallengesList.appendChild(li);
    });
}

// Helper to convert basic Markdown to safe HTML with translation protection, HTML escaping inside code, and recursive blockquotes/alerts
function parseMarkdown(text) {
    if (!text) return "";
    
    // Normalize newlines
    let html = text.replace(/\r\n/g, '\n');
    const placeholders = [];
    
    // 1. Extract multi-line code blocks into placeholders to protect them
    html = html.replace(/```(?:[a-zA-Z0-9]+)?\n([\s\S]*?)\n```/g, function(match, code) {
        let escapedCode = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const placeholder = `__PRE_CODE_BLOCK_${placeholders.length}__`;
        placeholders.push({
            placeholder: placeholder,
            html: `<pre translate="no" class="notranslate"><code>${escapedCode}</code></pre>`
        });
        return placeholder;
    });
    
    // 2. Extract inline code blocks into placeholders to protect them
    html = html.replace(/`([^`]+)`/g, function(match, code) {
        let escapedCode = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const placeholder = `__INLINE_CODE_BLOCK_${placeholders.length}__`;
        placeholders.push({
            placeholder: placeholder,
            html: `<code translate="no" class="notranslate">${escapedCode}</code>`
        });
        return placeholder;
    });
    
    // 3. Parse blockquotes and alerts, then replace with placeholders to protect them
    html = html.replace(/(?:^>.*\n?)+/gm, function(match) {
        let innerContent = match.split('\n').map(line => {
            if (line.startsWith('> ')) return line.substring(2);
            if (line.startsWith('>')) return line.substring(1);
            return line;
        }).join('\n');
        
        let alertType = null;
        let alertTitle = "";
        let alertIcon = "";
        
        let trimmedInner = innerContent.trim();
        if (trimmedInner.startsWith("[!TIP]")) {
            alertType = "tip";
            alertTitle = "Sugerencia";
            alertIcon = "💡";
            innerContent = trimmedInner.substring(6);
        } else if (trimmedInner.startsWith("[!NOTE]")) {
            alertType = "note";
            alertTitle = "Nota";
            alertIcon = "ℹ️";
            innerContent = trimmedInner.substring(7);
        } else if (trimmedInner.startsWith("[!IMPORTANT]")) {
            alertType = "important";
            alertTitle = "Importante";
            alertIcon = "📢";
            innerContent = trimmedInner.substring(12);
        } else if (trimmedInner.startsWith("[!WARNING]")) {
            alertType = "warning";
            alertTitle = "Advertencia";
            alertIcon = "⚠️";
            innerContent = trimmedInner.substring(10);
        } else if (trimmedInner.startsWith("[!CAUTION]")) {
            alertType = "caution";
            alertTitle = "Cuidado";
            alertIcon = "🛑";
            innerContent = trimmedInner.substring(10);
        }
        
        let parsedInner = parseMarkdown(innerContent);
        let alertHtml = "";
        if (alertType) {
            alertHtml = `<div class="markdown-alert markdown-alert-${alertType}"><div class="markdown-alert-title">${alertIcon} ${alertTitle}</div>${parsedInner}</div>`;
        } else {
            alertHtml = `<blockquote>${parsedInner}</blockquote>`;
        }
        
        const placeholder = `__BLOCKQUOTE_BLOCK_${placeholders.length}__`;
        placeholders.push({
            placeholder: placeholder,
            html: alertHtml
        });
        return placeholder;
    });
    
    // 4. Escape remaining raw HTML characters in the body text (comparison operators, stray tags)
    // We replace & first, then < and > to prevent double-escaping
    html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // 5. Parse headers, bold, and list items in the safe body text
    html = html.replace(/### (.*)/g, '<h3>$1</h3>');
    html = html.replace(/## (.*)/g, '<h2>$1</h2>');
    html = html.replace(/# (.*)/g, '<h1>$1</h1>');
    
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    html = html.replace(/^\s*-\s+(.*)/gm, '<li>$1</li>');
    
    // 6. Restore all placeholders in a loop until all are fully resolved
    let resolved = true;
    do {
        resolved = true;
        for (let i = 0; i < placeholders.length; i++) {
            if (html.includes(placeholders[i].placeholder)) {
                // Use a functional replacement or split/join to avoid replacement pattern ($) issues
                html = html.split(placeholders[i].placeholder).join(placeholders[i].html);
                resolved = false;
            }
        }
    } while (!resolved);
    
    return html;
}

// Load a single challenge
function loadChallenge(index) {
    const challenge = PHP_CHALLENGES[index];
    if (!challenge) return;

    lessonTitle.textContent = challenge.title;
    
    // Convert basic markdown tags to HTML
    let htmlContent = parseMarkdown(challenge.instructions);
    
    // Local File Hint Card
    let localHint = '';
    if (workMode === 'local') {
        localHint = `
            <div class="local-path-hint">
                <span>📁 Tu Archivo Local en Herd</span>
                <p>Crea este archivo en tu PC:</p>
                <code>${challenge.localPath}</code>
                <p style="font-size: 0.8rem; margin-top: 0.4rem; color: var(--text-muted);">
                    Escríbelo en VS Code, y cuando funcione en tu navegador local (http://localhost/${challenge.localPath.split('/').pop()}), copia el código aquí para validarlo.
                </p>
            </div>
        `;
    }
    
    instructionsContent.innerHTML = htmlContent + localHint;
    
    // Set Editor starter code (only if not modified or reset)
    const savedCode = localStorage.getItem(`phpcamp_code_${challenge.id}`);
    codeEditorTextarea.value = savedCode || challenge.initialCode;
    
    // Clear console
    consoleBody.textContent = 'Presiona "Ejecutar Pruebas" para compilar tu PHP.';
    consoleBody.className = 'console-body';
    
    // Render tests
    renderTests(challenge);
    
    // Update navigation buttons
    btnPrev.disabled = index === 0;
    btnNext.disabled = index === PHP_CHALLENGES.length - 1;
    
    // Highlight sidebar item
    document.querySelectorAll('.challenge-item').forEach((el, idx) => {
        if (idx === index) {
            el.classList.add('active');
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            el.classList.remove('active');
        }
    });
}

// Render tests checklist
function renderTests(challenge) {
    testsPanel.innerHTML = '<span class="tests-title">Requisitos del Reto</span>';
    
    challenge.tests.forEach((test, idx) => {
        const div = document.createElement('div');
        div.className = 'test-item';
        div.id = `test-item-${idx}`;
        div.innerHTML = `
            <span class="test-checkbox"></span>
            <span class="test-text">${test.description}</span>
        `;
        testsPanel.appendChild(div);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Mode toggle switcher
    btnToggleWeb.addEventListener('click', () => {
        workMode = 'web';
        btnToggleWeb.classList.add('active');
        btnToggleLocal.classList.remove('active');
        loadChallenge(currentChallengeIndex);
    });
    
    btnToggleLocal.addEventListener('click', () => {
        workMode = 'local';
        btnToggleLocal.classList.add('active');
        btnToggleWeb.classList.remove('active');
        loadChallenge(currentChallengeIndex);
    });

    // Run tests execution button
    btnRunTests.addEventListener('click', runCurrentChallengeTests);
    
    // Reset code
    btnResetCode.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres restablecer el código inicial de este reto?')) {
            const challenge = PHP_CHALLENGES[currentChallengeIndex];
            localStorage.removeItem(`phpcamp_code_${challenge.id}`);
            codeEditorTextarea.value = challenge.initialCode;
            runCurrentChallengeTests();
        }
    });
    
    // Prev / Next buttons
    btnPrev.addEventListener('click', () => {
        if (currentChallengeIndex > 0) {
            currentChallengeIndex--;
            loadChallenge(currentChallengeIndex);
            hideGuide();
        }
    });
    
    btnNext.addEventListener('click', () => {
        if (currentChallengeIndex < PHP_CHALLENGES.length - 1) {
            currentChallengeIndex++;
            loadChallenge(currentChallengeIndex);
            hideGuide();
        }
    });
    
    // Modal Next Challenge
    btnModalNext.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        if (currentChallengeIndex < PHP_CHALLENGES.length - 1) {
            currentChallengeIndex++;
            loadChallenge(currentChallengeIndex);
        }
    });
    
    // Guide toggle
    btnShowGuide.addEventListener('click', () => {
        showGuide();
    });

    // --- AUTHENTICATION EVENTS ---
    btnOpenAuth.addEventListener('click', () => {
        if (!supabaseClient) {
            alert("⚠️ Supabase no está configurado. Abre el archivo 'app.js' e ingresa tu SUPABASE_URL y SUPABASE_ANON_KEY en la parte superior.");
            return;
        }
        authModalOverlay.classList.add('active');
    });

    btnCloseAuthModal.addEventListener('click', () => {
        authModalOverlay.classList.remove('active');
    });

    authToggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        isRegisterMode = !isRegisterMode;
        if (isRegisterMode) {
            authModalTitle.textContent = "Crear Cuenta";
            btnAuthSubmit.textContent = "Registrarse";
            authToggleText.textContent = "¿Ya tienes cuenta?";
            authToggleLink.textContent = "Iniciar Sesión";
        } else {
            authModalTitle.textContent = "Iniciar Sesión";
            btnAuthSubmit.textContent = "Entrar";
            authToggleText.textContent = "¿No tienes cuenta?";
            authToggleLink.textContent = "Registrarse";
        }
    });

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = authEmailInput.value;
        const password = authPasswordInput.value;
        authErrorMsg.style.display = 'none';

        btnAuthSubmit.disabled = true;
        btnAuthSubmit.textContent = isRegisterMode ? "Registrando..." : "Entrando...";

        try {
            if (isRegisterMode) {
                // Register
                const { data, error } = await supabaseClient.auth.signUp({ email, password });
                if (error) throw error;
                alert("¡Registro exitoso! Ya puedes iniciar sesión con tu cuenta.");
                isRegisterMode = false;
                authToggleLink.click();
            } else {
                // Login
                const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
                if (error) throw error;
                authModalOverlay.classList.remove('active');
            }
        } catch (error) {
            authErrorMsg.textContent = error.message;
            authErrorMsg.style.display = 'block';
        } finally {
            btnAuthSubmit.disabled = false;
            btnAuthSubmit.textContent = isRegisterMode ? "Registrarse" : "Entrar";
        }
    });

    btnLogout.addEventListener('click', async () => {
        if (supabaseClient) {
            await supabaseClient.auth.signOut();
        }
    });
}

function showGuide() {
    guideContainer.style.display = 'block';
    workspaceContainer.style.display = 'none';
    loadChallengesSidebar();
}

function hideGuide() {
    guideContainer.style.display = 'none';
    workspaceContainer.style.display = 'flex';
    loadChallengesSidebar();
}

// Execute current code and validate tests
function runCurrentChallengeTests() {
    const challenge = PHP_CHALLENGES[currentChallengeIndex];
    const code = codeEditorTextarea.value;
    
    // Save current code draft to local storage
    localStorage.setItem(`phpcamp_code_${challenge.id}`, code);
    
    // Run Simulated PHP Interpreter
    consoleBody.textContent = 'Compilando y ejecutando PHP... \n';
    const result = evalPHP(code);
    
    if (result.success) {
        consoleBody.textContent = result.output || '(El script se ejecutó correctamente sin imprimir nada en pantalla)';
        consoleBody.className = 'console-body';
    } else {
        consoleBody.textContent = `❌ Error de Sintaxis / Ejecución PHP:\n\n${result.error}`;
        consoleBody.className = 'console-body console-error';
    }
    
    // Evaluate individual tests
    let allPassed = true;
    
    challenge.tests.forEach((test, idx) => {
        const testEl = document.getElementById(`test-item-${idx}`);
        let passed = false;
        
        try {
            passed = test.validate(code, result.output);
        } catch(e) {
            passed = false;
        }
        
        if (passed) {
            testEl.className = 'test-item passed';
        } else {
            testEl.className = 'test-item failed';
            allPassed = false;
        }
    });
    
    // If all tests passed!
    if (allPassed && result.success) {
        // Save completion status
        completedChallenges[challenge.id] = true;
        saveUserProgress();
        
        // Update UI
        loadChallengesSidebar();
        updateProgressHeader();
        
        // Show celebratory Modal
        setTimeout(() => {
            modalOverlay.classList.add('active');
        }, 600);
    }
}

// Progress header math
function updateProgressHeader() {
    const total = PHP_CHALLENGES.length;
    const completed = Object.keys(completedChallenges).length;
    
    progressCompleted.textContent = completed;
    progressTotal.textContent = total;
}

// --- SUPABASE DATA SYNC LOGIC ---

async function checkAuthSession() {
    if (!supabaseClient) return;

    // Read current user
    const { data: { user } } = await supabaseClient.auth.getUser();
    handleUserChange(user);

    // Subscribe to auth state changes
    supabaseClient.auth.onAuthStateChange((event, session) => {
        handleUserChange(session?.user || null);
    });
}

function handleUserChange(user) {
    currentUser = user;
    if (user) {
        // Logged in
        btnOpenAuth.style.display = 'none';
        userProfileWidget.style.display = 'flex';
        userEmailDisplay.textContent = user.email;
        fetchUserProgress(user.id);
    } else {
        // Logged out
        btnOpenAuth.style.display = 'block';
        userProfileWidget.style.display = 'none';
        completedChallenges = JSON.parse(localStorage.getItem('phpcamp_completed') || '{}');
        loadChallengesSidebar();
        updateProgressHeader();
    }
}

async function fetchUserProgress(userId) {
    if (!supabaseClient) return;
    
    try {
        const { data, error } = await supabaseClient
            .from('user_progress')
            .select('completed_challenges')
            .eq('user_id', userId)
            .single();
            
        if (error && error.code !== 'PGRST116') throw error; // PGRST116 is Row Not Found, which is fine
        
        if (data && data.completed_challenges) {
            completedChallenges = data.completed_challenges;
            localStorage.setItem('phpcamp_completed', JSON.stringify(completedChallenges));
            loadChallengesSidebar();
            updateProgressHeader();
        }
    } catch (e) {
        console.error("Error al obtener progreso de Supabase:", e);
    }
}

async function saveUserProgress() {
    // Save to LocalStorage first as backup
    localStorage.setItem('phpcamp_completed', JSON.stringify(completedChallenges));
    
    // Save to Supabase Cloud PostgreSQL DB if logged in
    if (supabaseClient && currentUser) {
        try {
            const { error } = await supabaseClient
                .from('user_progress')
                .upsert({ 
                    user_id: currentUser.id, 
                    completed_challenges: completedChallenges,
                    updated_at: new Date()
                });
            if (error) throw error;
        } catch (e) {
            console.error("Error al guardar progreso en Supabase:", e);
        }
    }
}

// Start application safely supporting DOM race conditions
function startApp() {
    // Inject Guide text
    let guideHtml = parseMarkdown(INITIAL_GUIDE)
        .replace(/📁 (.*)/g, '<h4>📁 $1</h4>')
        .replace(/🛠️ (.*)/g, '<h4>🛠️ $1</h4>')
        .replace(/🔄 (.*)/g, '<h4>🔄 $1</h4>')
        .replace(/☁️ (.*)/g, '<h4>☁️ $1</h4>')
        .replace(/📂 (.*)/g, '<h4>📂 $1</h4>');
    
    const guideEl = document.getElementById('guide-content');
    if (guideEl) {
        guideEl.innerHTML = guideHtml;
    }
    init();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}
