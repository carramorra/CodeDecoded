import { WALKTHROUGHS } from './data.js';
import { highlight } from './highlighter.js';

let currentWalkthrough = 'python';
let observer = null;

const header = document.getElementById('app-header');
const contentArea = document.getElementById('content-area');
const explanationBox = document.getElementById('explanation-box');
const explanationText = document.getElementById('explanation-text');
const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
const btnPython = document.getElementById('btn-python');
const btnC = document.getElementById('btn-c');

/**
 * Renders the chosen walkthrough content into the DOM
 */
function render(key) {
    const data = WALKTHROUGHS[key];
    
    // Update Header
    header.innerHTML = `
        <h1 class="serif-font text-6xl font-bold text-zinc-900 mb-6 tracking-tight">${data.title}</h1>
        <p class="text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed">${data.subtitle}</p>
    `;

    // Render sections
    contentArea.innerHTML = data.sections.map(section => {
        const isCode = section.type === 'code';
        return `
            <section id="${section.id}" data-explanation="${section.explanation}" class="section-focus opacity-20 transform translate-y-4">
                ${isCode ? `
                    <div class="bg-white rounded-2xl border border-zinc-200 shadow-xl shadow-zinc-200/50 p-8 lg:p-10 overflow-hidden">
                        <div class="flex items-center justify-between mb-6 border-b border-zinc-50 pb-4">
                            <span class="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">
                                Source / ${section.language || 'generic'}
                            </span>
                            <div class="flex space-x-2">
                                <div class="w-1.5 h-1.5 rounded-full bg-zinc-100"></div>
                                <div class="w-1.5 h-1.5 rounded-full bg-zinc-100"></div>
                                <div class="w-1.5 h-1.5 rounded-full bg-zinc-100"></div>
                            </div>
                        </div>
                        <pre class="code-font text-base leading-loose overflow-x-auto whitespace-pre-wrap text-zinc-700"><code>${highlight(section.content, section.language)}</code></pre>
                    </div>
                ` : `
                    <div class="prose prose-zinc lg:prose-xl max-w-3xl">
                        <p class="text-zinc-600 leading-[1.8] font-light text-xl">${section.content}</p>
                    </div>
                `}
            </section>
        `;
    }).join('');

    setupObserver();
}

/**
 * Monitors scroll position to detect which block is active
 */
function setupObserver() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            const explanation = el.getAttribute('data-explanation');

            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
                el.classList.remove('opacity-20', 'translate-y-4');
                el.classList.add('opacity-100', 'translate-y-0');
                showExplanation(explanation);
            } else if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
                el.classList.add('opacity-20', 'translate-y-4');
                el.classList.remove('opacity-100', 'translate-y-0');
            }
        });
    }, {
        root: null, // use viewport
        rootMargin: '-10% 0px -40% 0px', // Focus window
        threshold: [0.1, 0.4, 0.7]
    });

    document.querySelectorAll('.section-focus').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Smoothly updates the sidebar explanation
 */
function showExplanation(text) {
    if (explanationText.textContent === text) return;

    // Fade out current
    explanationBox.classList.add('opacity-0', 'translate-y-8');
    sidebarPlaceholder.classList.remove('opacity-0');

    setTimeout(() => {
        explanationText.textContent = text;
        explanationBox.classList.remove('opacity-0', 'translate-y-8');
        sidebarPlaceholder.classList.add('opacity-0');
    }, 450);
}

/**
 * Handle tab switching logic
 */
function setupNavigation() {
    const handleNav = (key, activeBtn, inactiveBtn) => {
        if (currentWalkthrough === key) return;
        currentWalkthrough = key;
        
        // UI Update
        activeBtn.classList.add('text-zinc-900', 'border-zinc-900');
        activeBtn.classList.remove('text-zinc-400');
        inactiveBtn.classList.remove('text-zinc-900', 'border-zinc-900');
        inactiveBtn.classList.add('text-zinc-400');
        
        render(key);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    btnPython.onclick = () => handleNav('python', btnPython, btnC);
    btnC.onclick = () => handleNav('c', btnC, btnPython);
}

// Start
render(currentWalkthrough);
setupNavigation();
