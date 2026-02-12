/**
 * i18n.js — Internationalization Module
 * Handles language switching between Arabic (default) and English
 * with smooth crossfade transitions.
 */

const I18n = (() => {
    // ── State ──────────────────────────────────────────────
    let currentLang = 'ar';

    // ── DOM Cache ──────────────────────────────────────────
    const els = {};

    // ── Translations ───────────────────────────────────────
    const translations = {
        ar: {
            pageTitle: 'سياسة الخصوصية | بكاسة قبطي',
            policyTitle: 'سياسة الخصوصية',
            policyMeta: '<i class="far fa-calendar-alt"></i> آخر تحديث: 11 فبراير 2026',
            backBtn: 'العودة للمعرض',
            toggleLabel: 'EN',
        },
        en: {
            pageTitle: 'Privacy Policy | Bakasa Coptic',
            policyTitle: 'Privacy Policy',
            policyMeta: '<i class="far fa-calendar-alt"></i> Last Updated: February 11, 2026',
            backBtn: 'Back to Portfolio',
            toggleLabel: 'عربي',
        },
    };

    // ── Private Methods ────────────────────────────────────

    /** Cache frequently-accessed DOM elements */
    function _cacheDom() {
        els.langToggle = document.getElementById('lang-toggle');
        els.langText = els.langToggle?.querySelector('.lang-text');
        els.contentAr = document.getElementById('content-ar');
        els.contentEn = document.getElementById('content-en');
        els.backBtnText = document.querySelector('[data-i18n="back"]');
        els.backBtnIcon = document.querySelector('.back-icon');
        els.policyTitle = document.querySelector('.policy-title');
        els.policyMeta = document.querySelector('.policy-meta');
    }

    /** Apply the current language to the DOM */
    function _apply() {
        const t = translations[currentLang];
        const isAr = currentLang === 'ar';

        // Direction & lang attribute
        document.documentElement.lang = currentLang;
        document.body.dir = isAr ? 'rtl' : 'ltr';
        document.title = t.pageTitle;

        // Toggle button text
        if (els.langText) els.langText.textContent = t.toggleLabel;

        // Header texts
        if (els.backBtnText) els.backBtnText.textContent = t.backBtn;
        if (els.backBtnIcon) {
            els.backBtnIcon.className = isAr
                ? 'fas fa-arrow-right back-icon'
                : 'fas fa-arrow-left back-icon';
        }
        if (els.policyTitle) els.policyTitle.textContent = t.policyTitle;
        if (els.policyMeta) els.policyMeta.innerHTML = t.policyMeta;

        // Crossfade content panels
        _crossfade(
            isAr ? els.contentEn : els.contentAr,
            isAr ? els.contentAr : els.contentEn
        );
    }

    /**
     * Smooth crossfade between two content containers.
     * @param {HTMLElement} outEl  — element fading out
     * @param {HTMLElement} inEl   — element fading in
     */
    function _crossfade(outEl, inEl) {
        if (!outEl || !inEl) return;

        // Fade out the current panel
        outEl.classList.add('fade-out');
        outEl.classList.remove('fade-in');

        setTimeout(() => {
            outEl.style.display = 'none';
            outEl.classList.remove('fade-out');

            // Fade in the new panel
            inEl.style.display = 'block';
            inEl.classList.add('fade-in');

            // Re-trigger section reveal animations
        }, 250); // matches CSS transition duration
    }

    // ── Public API ─────────────────────────────────────────

    function init() {
        _cacheDom();
        _apply();

        // First-load reveal
        if (els.contentAr) {
            els.contentAr.classList.add('fade-in');
        }

        // Click handler
        els.langToggle?.addEventListener('click', toggle);
    }

    function toggle() {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        _apply();
    }

    function getLang() {
        return currentLang;
    }

    return { init, toggle, getLang };
})();
