(function(){
    // Estado y persistencia
    const STORAGE_KEY = 'stack_app_state_v1';
    const THEME_KEY = 'stack_app_theme_v1';

    let state = {
        stack: [],
        mode: 'dynamic',
        maxCapacity: 10
    };
    let history = [];
    let future = [];


    // Elementos del DOM
    const stackVisual = document.getElementById('stackVisual');
    const elementInput = document.getElementById('elementInput');
    const stackSize = document.getElementById('stackSize');
    const stackStatus = document.getElementById('stackStatus');
    const stackMode = document.getElementById('stackMode');
    const staticSettings = document.getElementById('staticSettings');
    const capacityBar = document.getElementById('capacityBar');
    const capacityFill = document.getElementById('capacityFill');
    const capacityText = document.getElementById('capacityText');
    const arrayListContainer = document.getElementById('arrayListContainer');
    const linkedListContainer = document.getElementById('linkedListContainer');
    const capacityInput = document.getElementById('capacityInput');

    const btnDynamic = document.getElementById('btnDynamic');
    const btnStatic = document.getElementById('btnStatic');
    const btnUpdateCapacity = document.getElementById('btnUpdateCapacity');
    const btnPush = document.getElementById('btnPush');
    const btnPop = document.getElementById('btnPop');
    const btnClear = document.getElementById('btnClear');
    const btnTheme = document.getElementById('btnTheme');
    const inputError = document.getElementById('inputError');
    const langSelect = document.getElementById('langSelect');
    const labelLang = document.getElementById('labelLang');
    const titleEl = document.getElementById('title');
    const labelMode = document.getElementById('labelMode');
    const labelSize = document.getElementById('labelSize');
    const labelStatus = document.getElementById('labelStatus');
    const visualizerTitle = document.getElementById('visualizerTitle');
    const labelCapacity = document.getElementById('labelCapacity');
    const githubLink = document.getElementById('githubLink');
    const labelGithub = document.getElementById('labelGithub');
    const starRepoLink = document.getElementById('starRepoLink');
    const DEFAULT_GITHUB_URL = 'https://github.com/ANONIMO432HZ';
    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('langMenu');
    // Botones secundarios declarados temprano para que existan antes de applyLang
    const btnUndo = document.getElementById('btnUndo');
    const btnRedo = document.getElementById('btnRedo');
    const btnExport = document.getElementById('btnExport');
    const btnImport = document.getElementById('btnImport');
    const fileImport = document.getElementById('fileImport');
    const btnReset = document.getElementById('btnReset');

    // Utilidades de persistencia
    function snapshot(){
        // Guardar copia profunda mínima
        history.push({
            stack: [...state.stack],
            mode: state.mode,
            maxCapacity: state.maxCapacity
        });
        // Limpiar futuros al crear nueva acción
        future = [];
    }
    function saveState(){
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch(_) {}
    }
    function loadState(){
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if(!raw) return;
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.stack)) state.stack = parsed.stack;
            if (parsed.mode === 'dynamic' || parsed.mode === 'static') state.mode = parsed.mode;
            if (Number.isFinite(parsed.maxCapacity)) state.maxCapacity = Math.min(Math.max(1, parsed.maxCapacity), 50);
            // Inicializa primer snapshot para permitir undo
            history = [{ stack:[...state.stack], mode: state.mode, maxCapacity: state.maxCapacity }];
            future = [];
        } catch(_) {}
    }

    function saveTheme(theme){
        try { localStorage.setItem(THEME_KEY, theme); } catch(_) {}
    }
    function loadTheme(){
        try { return localStorage.getItem(THEME_KEY); } catch(_) { return null; }
    }
    const LANG_KEY = 'stack_app_lang_v1';
    const GITHUB_KEY = 'stack_app_github_v1';
    const PROJECT_KEY = 'stack_app_project_v1';
    function saveLang(lang){ try { localStorage.setItem(LANG_KEY, lang); } catch(_) {} }
    function loadLang(){ try { return localStorage.getItem(LANG_KEY); } catch(_) { return null; } }
    function saveGithub(url){ try { localStorage.setItem(GITHUB_KEY, url); } catch(_) {} }
    function loadGithub(){ try { return localStorage.getItem(GITHUB_KEY); } catch(_) { return null; } }
    function saveProject(url){ try { localStorage.setItem(PROJECT_KEY, url); } catch(_) {} }
    function loadProject(){ try { return localStorage.getItem(PROJECT_KEY); } catch(_) { return null; } }

    // Tema (claro/oscuro)
    function getCurrentLang(){ return loadLang() || (langSelect && langSelect.value) || 'es'; }

    function updateThemeMeta(theme){
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta){
            meta.setAttribute('content', theme === 'dark' ? '#111827' : '#ffffff');
        }
    }

    function updateThemeButton(dict){
        if (!btnTheme) return;
        const isDark = document.documentElement.classList.contains('theme-dark');
        const title = isDark ? dict.themeLight : dict.themeDark;
        btnTheme.setAttribute('aria-label', title);
        btnTheme.title = title;
        const sun = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zm10.48 14.32l1.79 1.8 1.79-1.8-1.79-1.79-1.79 1.79zM12 4V1h-0v3h0zm0 19v-3h0v3h0zM4 12H1v0h3v0zm19 0h-3v0h3v0zM6.76 19.16l-1.8 1.8-1.8-1.8 1.8-1.79 1.8 1.79zM19.16 6.64l1.8-1.8-1.8-1.8-1.79 1.8 1.79 1.8zM12 6a6 6 0 100 12 6 6 0 000-12z"/></svg>';
        const moon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21.64 13.64A9 9 0 1110.36 2.36 7 7 0 1021.64 13.64z"/></svg>';
        btnTheme.innerHTML = isDark ? sun : moon;
    }

    function applyTheme(theme){
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('theme-dark');
        } else {
            root.classList.remove('theme-dark');
        }
        updateThemeMeta(theme);
        const lang = getCurrentLang();
        const dict = getDict(lang);
        updateThemeButton(dict);
    }

    function initTheme(){
        const savedUrl = loadGithub();
        if (savedUrl && githubLink) githubLink.href = savedUrl;

        const saved = loadTheme();
        if (saved) {
            applyTheme(saved);
        } else {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }
        // Inicializar GitHub link
        const gh = loadGithub() || DEFAULT_GITHUB_URL;
        if (githubLink) githubLink.href = gh;
        saveGithub(gh);
        const proj = loadProject() || 'https://github.com/ANONIMO432HZ/stack-simulator';
        if (starRepoLink) starRepoLink.href = proj;
    }

    // Cálculo de tamaño de nodo
    function calculateNodeSize(elementCount) {
        if (elementCount <= 3) return 45;
        if (elementCount <= 6) return 35;
        if (elementCount <= 10) return 28;
        return 24;
    }

    // UI: actualizar barra y texto de capacidad
    function updateCapacityBar() {
        if (state.mode === 'static') {
            const percentage = state.maxCapacity > 0 ? (state.stack.length / state.maxCapacity) * 100 : 0;
            capacityFill.style.width = `${Math.min(100, percentage)}%`;
            capacityFill.classList.toggle('warning', percentage >= 90);
            if (capacityText) capacityText.textContent = `${state.stack.length} / ${state.maxCapacity}`;
        }
    }

    // UI: actualizar botones habilitados/disabled y errores
    function updateControls(){
        const inputEmpty = !elementInput.value.trim();
        // push deshabilitar cuando input vacío o cuando modo estático y lleno
        const staticFull = state.mode === 'static' && state.stack.length >= state.maxCapacity;
        if (btnPush) btnPush.disabled = inputEmpty || staticFull;
        if (btnPop) btnPop.disabled = state.stack.length === 0;
        if (btnUpdateCapacity) btnUpdateCapacity.disabled = !isValidCapacity(capacityInput.value);

        // error de input
        if (inputError){
            if (inputEmpty) {
                inputError.textContent = '';
            } else {
                inputError.textContent = '';
            }
        }

        // toggle botones de modo activos
        if (btnDynamic && btnStatic){
            btnDynamic.classList.toggle('active', state.mode === 'dynamic');
            btnStatic.classList.toggle('active', state.mode === 'static');
        }
    }

    function isValidCapacity(val){
        const n = parseInt(val, 10);
        return Number.isFinite(n) && n >= 1 && n <= 50;
    }

    // Render pila principal
    function updateStackVisual() {
        stackVisual.innerHTML = '';

        const dict = getDict(getCurrentLang());
        if (state.stack.length === 0) {
            stackVisual.innerHTML = `<div class="stack-empty">${dict.empty}</div>`;
            stackStatus.textContent = dict.empty;
        } else {
            state.stack.forEach((element, index) => {
                const elementDiv = document.createElement('div');
                elementDiv.className = 'stack-element';

                if (state.mode === 'static' && index === state.stack.length - 1 && state.stack.length >= state.maxCapacity) {
                    elementDiv.classList.add('full');
                }

                elementDiv.textContent = element;
                elementDiv.style.animationDelay = `${index * 0.05}s`;
                stackVisual.appendChild(elementDiv);
            });
            stackStatus.textContent = dict.withElements;
        }

        stackSize.textContent = state.stack.length;
        capacityBar.style.display = state.mode === 'static' ? 'block' : 'none';
        staticSettings.classList.toggle('show', state.mode === 'static');
        const d2 = getDict(getCurrentLang());
        stackMode.textContent = state.mode === 'dynamic' ? d2.dynamic : d2.static;
        updateCapacityBar();
        updateControls();
    }

    // Render visualizaciones auxiliares
    function updateImplementations() {
        const nodeSize = calculateNodeSize(state.stack.length);
        document.documentElement.style.setProperty('--node-size', `${nodeSize}px`);

        // ArrayList
        arrayListContainer.innerHTML = '';
        if (state.stack.length > 0) {
            state.stack.forEach((element, index) => {
                const node = document.createElement('div');
                node.className = 'array-node';

                const circle = document.createElement('div');
                circle.className = 'array-node-circle';
                circle.textContent = element;

                const indexLabel = document.createElement('div');
                indexLabel.className = 'array-node-index';
                indexLabel.textContent = index;

                node.appendChild(indexLabel);
                node.appendChild(circle);

                if (index === state.stack.length - 1) {
                    const pointer = document.createElement('div');
                    pointer.className = 'array-pointer';
                    pointer.textContent = 'TOP';
                    node.appendChild(pointer);
                }

                arrayListContainer.appendChild(node);
            });
        }

        // Linked List
        linkedListContainer.innerHTML = '';
        if (state.stack.length > 0) {
            const rows = Math.ceil(state.stack.length / 4);
            for (let row = 0; row < rows; row++) {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'linked-list-row';

                const startIdx = row * 4;
                const endIdx = Math.min(startIdx + 4, state.stack.length);

                for (let i = startIdx; i < endIdx; i++) {
                    const node = document.createElement('div');
                    node.className = 'linked-node';

                    const circle = document.createElement('div');
                    circle.className = 'linked-node-circle';
                    circle.textContent = state.stack[i];

                    node.appendChild(circle);
                    rowDiv.appendChild(node);

                    if (i < endIdx - 1) {
                        const arrow = document.createElement('div');
                        arrow.className = 'linked-arrow';
                        rowDiv.appendChild(arrow);
                    }
                }

                linkedListContainer.appendChild(rowDiv);
            }
        }
    }

    // Mensajes flotantes
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 2000);
    }

    // Acciones
    function setMode(newMode) {
        if (newMode !== 'dynamic' && newMode !== 'static') return;
        snapshot();
        state.mode = newMode;
        saveState();
        updateStackVisual();
        updateImplementations();
    }

    function updateCapacity() {
        const newCapacity = parseInt(capacityInput.value, 10);

        if (!isValidCapacity(newCapacity)) {
            const d = getDict(getCurrentLang());
            showMessage(d.msgCapacityRange, 'error');
            return;
        }
        snapshot();
        state.maxCapacity = newCapacity;
        saveState();
        updateStackVisual();
        const d = getDict(getCurrentLang());
        showMessage(d.msgCapacityUpdated.replace('{n}', state.maxCapacity), 'success');
    }

    function pushElement() {
        const element = elementInput.value.trim();

        if (element === '') {
            const d = getDict(getCurrentLang());
            showMessage(d.msgEnterElement, 'error');
            return;
        }

        if (state.mode === 'static' && state.stack.length >= state.maxCapacity) {
            const d = getDict(getCurrentLang());
            showMessage(d.msgStackFull.replace('{n}', state.maxCapacity), 'warning');
            return;
        }

        snapshot();
        state.stack.push(element);
        elementInput.value = '';
        saveState();
        updateStackVisual();
        updateImplementations();
        const d = getDict(getCurrentLang());
        showMessage(d.msgPushed.replace('{x}', element), 'success');
    }

    function popElement() {
        if (state.stack.length === 0) {
            const d = getDict(getCurrentLang());
            showMessage(d.msgStackEmptyCannotPop, 'error');
            return;
        }

        snapshot();
        const poppedElement = state.stack.pop();
        saveState();
        updateStackVisual();
        updateImplementations();
        const d = getDict(getCurrentLang());
        showMessage(d.msgPopped.replace('{x}', poppedElement), 'success');
    }

    function clearAll() {
        snapshot();
        state.stack = [];
        elementInput.value = '';
        capacityInput.value = '10';
        state.maxCapacity = 10;
        state.mode = 'dynamic';
        saveState();
        updateStackVisual();
        updateImplementations();
        const d = getDict(getCurrentLang());
        showMessage(d.msgCleared, 'success');
    }

    // Eventos
    btnDynamic && btnDynamic.addEventListener('click', () => setMode('dynamic'));
    btnStatic && btnStatic.addEventListener('click', () => setMode('static'));
    btnUpdateCapacity && btnUpdateCapacity.addEventListener('click', updateCapacity);
    btnPush && btnPush.addEventListener('click', pushElement);
    btnPop && btnPop.addEventListener('click', popElement);
    btnClear && btnClear.addEventListener('click', clearAll);

    function resetApp(){
        try {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(THEME_KEY);
            localStorage.removeItem(LANG_KEY);
            localStorage.removeItem(GITHUB_KEY);
            localStorage.removeItem(PROJECT_KEY);
        } catch(_) {}
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(regs => {
                return Promise.all(regs.map(r => r.unregister()));
            }).finally(() => {
                location.reload(true);
            });
        } else {
            location.reload(true);
        }
    }
    btnReset && btnReset.addEventListener('click', resetApp);

    function applySnapshot(snap){
        state.stack = [...snap.stack];
        state.mode = snap.mode;
        state.maxCapacity = snap.maxCapacity;
        if (capacityInput) capacityInput.value = String(state.maxCapacity);
        saveState();
        updateStackVisual();
        updateImplementations();
    }

    function undo(){
        if (history.length <= 1) return; // nothing to undo
        const current = history.pop();
        future.push(current);
        const prev = history[history.length - 1];
        applySnapshot(prev);
    }

    function redo(){
        if (future.length === 0) return;
        const next = future.pop();
        history.push({ stack:[...next.stack], mode: next.mode, maxCapacity: next.maxCapacity });
        applySnapshot(next);
    }

    btnUndo && btnUndo.addEventListener('click', undo);
    btnRedo && btnRedo.addEventListener('click', redo);

    function exportJSON(){
        const data = JSON.stringify(state, null, 2);
        const blob = new Blob([data], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'stack_state.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function importJSONFromFile(file){
        const reader = new FileReader();
        reader.onload = () => {
            try{
                const parsed = JSON.parse(reader.result);
                if (!Array.isArray(parsed.stack)) throw new Error('stack inválido');
                if (!(parsed.mode === 'dynamic' || parsed.mode === 'static')) throw new Error('modo inválido');
                if (!Number.isFinite(parsed.maxCapacity)) throw new Error('capacidad inválida');
                snapshot();
                state.stack = parsed.stack.map(v => String(v));
                state.mode = parsed.mode;
                state.maxCapacity = Math.min(Math.max(1, parsed.maxCapacity), 50);
                if (capacityInput) capacityInput.value = String(state.maxCapacity);
                saveState();
                updateStackVisual();
                updateImplementations();
                const d = getDict(getCurrentLang());
                showMessage(d.msgImportOk, 'success');
            }catch(err){
                const d = getDict(getCurrentLang());
                showMessage(d.msgImportError, 'error');
            }
        };
        reader.readAsText(file);
    }

    btnExport && btnExport.addEventListener('click', exportJSON);
    btnImport && btnImport.addEventListener('click', () => fileImport && fileImport.click());
    fileImport && fileImport.addEventListener('change', (e) => {
        const f = e.target.files && e.target.files[0];
        if (f) importJSONFromFile(f);
        e.target.value = '';
    });

    function getDict(lang){
        const t = {
            es: {
                title: 'Simulador de Pila (Stack)',
                dynamic: 'Dinámica',
                static: 'Estática',
                mode: 'Modo:',
                size: 'Tamaño:',
                status: 'Estado:',
                empty: 'La pila está vacía',
                withElements: 'Con elementos',
                visualizerTitle: 'Visualización de Implementaciones en Tipos de Datos Abstractos (TDA)',
                arrayTitle: 'ArrayList',
                linkedTitle: 'Lista Enlazada',
                push: 'Push', pop: 'Pop', clear: 'Limpiar Todo', update: 'Aplicar',
                themeDark: 'Modo oscuro',
                themeLight: 'Modo claro',
                github: 'Mi GitHub',
                project: 'Proyecto',
                tooltipGithub: 'Abrir GitHub',
                tooltipStar: 'Dar estrella al repositorio',
                msgProjectUpdated: 'Repositorio configurado',
                lang: 'Idioma:',
                export: 'Exportar JSON', import: 'Importar JSON', undo: 'Deshacer', redo: 'Rehacer',
                capacity: 'Capacidad Máxima:',
                placeholder: 'Ingresa un elemento',
                msgImportOk: 'Estado importado correctamente',
                msgImportError: 'Error al importar JSON',
                msgGithubUpdated: 'Enlace de GitHub actualizado',
                msgCapacityRange: 'La capacidad debe estar entre 1 y 50',
                msgCapacityUpdated: 'Capacidad actualizada a {n}',
                msgEnterElement: 'Por favor, ingresa un elemento',
                msgStackFull: 'La pila está llena (máximo {n} elementos)',
                msgPushed: 'Elemento "{x}" añadido a la pila',
                msgStackEmptyCannotPop: 'La pila está vacía, no se puede eliminar',
                msgPopped: 'Elemento "{x}" eliminado de la pila',
                msgCleared: 'Todos los campos han sido limpiados',
                reset: 'Resetear y recargar'
            },
            en: {
                title: 'Stack Simulator',
                dynamic: 'Dynamic',
                static: 'Static',
                mode: 'Mode:',
                size: 'Size:',
                status: 'Status:',
                empty: 'The stack is empty',
                withElements: 'With elements',
                visualizerTitle: 'Visualization of Implementations in ADTs',
                arrayTitle: 'ArrayList',
                linkedTitle: 'Linked List',
                push: 'Push', pop: 'Pop', clear: 'Clear All', update: 'Apply',
                themeDark: 'Dark mode',
                themeLight: 'Light mode',
                github: 'My GitHub',
                project: 'Project',
                tooltipGithub: 'Open GitHub',
                tooltipStar: 'Star this repository',
                msgProjectUpdated: 'Repository set',
                lang: 'Language:',
                export: 'Export JSON', import: 'Import JSON', undo: 'Undo', redo: 'Redo',
                capacity: 'Max Capacity:',
                placeholder: 'Enter an element',
                msgImportOk: 'State imported successfully',
                msgImportError: 'Error importing JSON',
                msgGithubUpdated: 'GitHub link updated',
                msgCapacityRange: 'Capacity must be between 1 and 50',
                msgCapacityUpdated: 'Capacity updated to {n}',
                msgEnterElement: 'Please enter an element',
                msgStackFull: 'The stack is full (max {n} elements)',
                msgPushed: 'Element "{x}" added to the stack',
                msgStackEmptyCannotPop: 'The stack is empty, cannot pop',
                msgPopped: 'Element "{x}" removed from the stack',
                msgCleared: 'All fields have been cleared',
                msgProjectUpdated: 'Project link updated',
                reset: 'Reset and reload'
            }
        };
        return t[lang] || t.es;
    }

    function applyLang(lang){
        const dict = getDict(lang);
        if (titleEl) titleEl.textContent = dict.title;
        if (btnDynamic) btnDynamic.textContent = dict.dynamic;
        if (btnStatic) btnStatic.textContent = dict.static;
        if (labelMode) labelMode.textContent = dict.mode;
        if (labelSize) labelSize.textContent = dict.size;
        if (labelStatus) labelStatus.textContent = dict.status;
        if (visualizerTitle) visualizerTitle.textContent = dict.visualizerTitle;
        const labelArrayTitle = document.getElementById('labelArrayTitle');
        const labelLinkedTitle = document.getElementById('labelLinkedTitle');
        if (labelArrayTitle) labelArrayTitle.textContent = dict.arrayTitle;
        if (labelLinkedTitle) labelLinkedTitle.textContent = dict.linkedTitle;
        if (labelCapacity) labelCapacity.textContent = dict.capacity;
        if (btnPush) btnPush.textContent = dict.push;
        if (btnPop) btnPop.textContent = dict.pop;
        if (btnClear) btnClear.textContent = dict.clear;
        if (btnUpdateCapacity) btnUpdateCapacity.textContent = dict.update;
        updateThemeButton(dict);
        if (labelGithub) labelGithub.textContent = dict.github;
        if (githubLink) githubLink.title = dict.tooltipGithub;
        if (starRepoLink) starRepoLink.title = dict.tooltipStar;
        if (labelLang) labelLang.textContent = dict.lang;
        if (btnUndo) btnUndo.textContent = dict.undo;
        if (btnRedo) btnRedo.textContent = dict.redo;
        if (btnExport) btnExport.textContent = dict.export;
        if (btnImport) btnImport.textContent = dict.import;
        if (btnReset) btnReset.textContent = dict.reset;
        if (elementInput) elementInput.placeholder = dict.placeholder;
        const optEs = langSelect && langSelect.querySelector('option[value="es"]');
        const optEn = langSelect && langSelect.querySelector('option[value="en"]');
        if (optEs) optEs.textContent = 'Español';
        if (optEn) optEn.textContent = 'English';
        if (langBtn) langBtn.textContent = lang === 'en' ? 'English' : 'Español';
        const capEmpty = dict.empty;
        const capWith = dict.withElements;
        if (stackStatus) stackStatus.textContent = state.stack.length === 0 ? capEmpty : capWith;
    }

    if (btnTheme){
        btnTheme.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('theme-dark');
            const next = isDark ? 'light' : 'dark';
            applyTheme(next);
            saveTheme(next);
        });
    }

    // Permitir configurar el link de GitHub con Ctrl+G (opcional)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && (e.key === 'g' || e.key === 'G')){
            const current = (githubLink && githubLink.href) || DEFAULT_GITHUB_URL;
            const url = prompt('URL de tu perfil de GitHub:', current);
            if (url){
                if (githubLink) githubLink.href = url;
                saveGithub(url);
                const d = getDict(getCurrentLang());
                showMessage(d.msgGithubUpdated, 'success');
            }
        }
    });

    // Configurar URL del repositorio (estrella dorada)
    if (starRepoLink){
        starRepoLink.addEventListener('click', (e) => {
            const current = loadProject() || 'https://github.com/ANONIMO432HZ/stack-simulator';
            if (!loadProject()) {
                saveProject(current);
            }
            // No prevenir por defecto: permite navegar
        });
   }

    if (elementInput){
        elementInput.addEventListener('input', updateControls);
        elementInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                pushElement();
            }
        });
    }

    if (capacityInput){
        capacityInput.addEventListener('input', () => {
            updateControls();
        });
    }

    function setLangUI(lang){
        if (langSelect) langSelect.value = lang;
        if (langBtn) {
            langBtn.textContent = lang === 'en' ? 'English' : 'Español';
            langBtn.appendChild(document.createElement('span'));
        }
       
        if (langMenu){
            langMenu.querySelectorAll('li').forEach(li => {
                li.setAttribute('aria-selected', li.dataset.lang === lang ? 'true' : 'false');
            });
        }
    }

    // Portal del menú a body para evitar ser tapado por otras capas
    let langMenuOriginalParent = null;
    let langMenuScrollHandler = null;
    function positionLangMenu(){
        if (!langBtn || !langMenu) return;
        const wasHidden = langMenu.classList.contains('hidden');
        if (wasHidden) langMenu.classList.remove('hidden');

        // calcular posición base debajo del botón
        const btnRect = langBtn.getBoundingClientRect();
        const top = btnRect.bottom + window.scrollY + 6;
        let left = btnRect.left + window.scrollX;

       
        let idealWidth = 0;
        const items = langMenu.querySelectorAll('li');
        items.forEach(li => {
            const w = li.getBoundingClientRect().width;
            if (w > idealWidth) idealWidth = w;
        });
       
        idealWidth = Math.ceil(idealWidth + 16);
       
        const maxWidth = Math.min(window.innerWidth - 24, 260);
        idealWidth = Math.max(120, Math.min(idealWidth, maxWidth));

        langMenu.style.width = `${idealWidth}px`;
        langMenu.style.minWidth = '';
        langMenu.style.position = 'absolute';
        langMenu.style.zIndex = '9999';
        langMenu.style.top = `${top}px`;

       
        const right = left + idealWidth;
        const overflow = right - (window.scrollX + window.innerWidth - 12);
        if (overflow > 0) {
            left = Math.max(12 + window.scrollX, left - overflow);
        }
        langMenu.style.left = `${left}px`;

        if (wasHidden) langMenu.classList.add('hidden');
    }
    function attachLangMenuPortal(){
        if (!langMenu || langMenuOriginalParent) return;
        langMenuOriginalParent = langMenu.parentElement; // .dropdown
        document.body.appendChild(langMenu);
        positionLangMenu();
        langMenuScrollHandler = () => positionLangMenu();
        window.addEventListener('scroll', langMenuScrollHandler, true);
        window.addEventListener('resize', langMenuScrollHandler, true);
    }
    function detachLangMenuPortal(){
        if (!langMenu) return;
        if (langMenuOriginalParent){
            langMenu.style.position = '';
            langMenu.style.top = '';
            langMenu.style.left = '';
            langMenu.style.zIndex = '';
            langMenuOriginalParent.appendChild(langMenu);
            langMenuOriginalParent = null;
        }
        if (langMenuScrollHandler){
            window.removeEventListener('scroll', langMenuScrollHandler, true);
            window.removeEventListener('resize', langMenuScrollHandler, true);
            langMenuScrollHandler = null;
        }
    }
    function openLangMenu(){ if (langMenu){ attachLangMenuPortal(); langMenu.classList.remove('hidden'); if (langBtn) langBtn.setAttribute('aria-expanded','true'); } }
    function closeLangMenu(){ if (langMenu){ langMenu.classList.add('hidden'); if (langBtn) langBtn.setAttribute('aria-expanded','false'); detachLangMenuPortal(); } }

    function getLangItems(){ return Array.from(langMenu ? langMenu.querySelectorAll('li[role="option"]') : []); }
    function focusItem(index){ const items = getLangItems(); if (!items.length) return; const i = Math.max(0, Math.min(items.length-1, index)); items[i].focus(); }
    function getFocusedIndex(){ const items = getLangItems(); return items.findIndex(el => el === document.activeElement); }

    if (langBtn){
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const willOpen = langMenu && langMenu.classList.contains('hidden');
            if (willOpen){ openLangMenu(); focusItem(0); } else { closeLangMenu(); }
        });
        langBtn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' '){
                e.preventDefault();
                openLangMenu();
                focusItem(0);
            } else if (e.key === 'Escape'){
                closeLangMenu();
            }
        });
    }
    if (langMenu){
        langMenu.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (!li) return;
            const lng = li.dataset.lang;
            applyLang(lng);
            saveLang(lng);
            setLangUI(lng);
            closeLangMenu();
            langBtn && langBtn.focus();
        });
        langMenu.addEventListener('keydown', (e) => {
            const items = getLangItems();
            if (!items.length) return;
            let idx = getFocusedIndex();
            if (e.key === 'ArrowDown'){
                e.preventDefault();
                focusItem(idx < 0 ? 0 : idx + 1);
            } else if (e.key === 'ArrowUp'){
                e.preventDefault();
                focusItem(idx <= 0 ? items.length - 1 : idx - 1);
            } else if (e.key === 'Home'){
                e.preventDefault();
                focusItem(0);
            } else if (e.key === 'End'){
                e.preventDefault();
                focusItem(items.length - 1);
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const li = document.activeElement && document.activeElement.closest('li[role="option"]');
                if (li){
                    const lng = li.dataset.lang;
                    applyLang(lng);
                    saveLang(lng);
                    setLangUI(lng);
                    closeLangMenu();
                    langBtn && langBtn.focus();
                }
            } else if (e.key === 'Escape'){
                e.preventDefault();
                closeLangMenu();
                langBtn && langBtn.focus();
            }
        });
    }
    document.addEventListener('click', () => closeLangMenu());

    if (langSelect){
        const savedLang = loadLang() || 'es';
        applyLang(savedLang);
        setLangUI(savedLang);
        langSelect.addEventListener('change', () => { applyLang(langSelect.value); saveLang(langSelect.value); setLangUI(langSelect.value); });
    }

    // Inicialización
    initTheme();
    loadState();
    // Si no hay snapshot inicial, crear uno
    if (history.length === 0){
        history.push({ stack:[...state.stack], mode: state.mode, maxCapacity: state.maxCapacity });
    }
    // Sincronizar UI con estado
    if (capacityInput) capacityInput.value = String(state.maxCapacity);
    updateStackVisual();
    updateImplementations();

    // Registrar Service Worker con versionado
    if ('serviceWorker' in navigator && (location.protocol === 'http:' || location.protocol === 'https:')) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js?v=4').catch(() => {});
        });
    }
})();
