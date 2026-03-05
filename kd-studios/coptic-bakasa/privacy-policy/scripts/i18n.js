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
            pageTitle: 'سياسة الخصوصية | بكاسة قبطي — KD Studios',
            title: 'سياسة <span class="accent">الخصوصية</span>',
            meta: 'آخر تحديث: 11 فبراير 2026',
            toggleLabel: 'EN',
        },
        en: {
            pageTitle: 'Privacy Policy | Bakasa Coptic — KD Studios',
            title: 'Privacy <span class="accent">Policy</span>',
            meta: 'Last Updated: February 11, 2026',
            toggleLabel: 'عربي',
        },
    };

    // ── Private Methods ────────────────────────────────────

    function _cacheDom() {
        els.langToggle = document.getElementById('lang-toggle');
        els.langText = els.langToggle?.querySelector('.lang-text');
        els.contentAr = document.getElementById('content-ar');
        els.contentEn = document.getElementById('content-en');
        els.pageTitle = document.getElementById('page-title');
        els.metaText = document.getElementById('meta-text');
    }

    function _apply() {
        const t = translations[currentLang];
        const isAr = currentLang === 'ar';

        // Direction & lang attribute
        document.documentElement.lang = currentLang;
        document.documentElement.dir = isAr ? 'rtl' : 'ltr';
        document.title = t.pageTitle;

        // Toggle button text
        if (els.langText) els.langText.textContent = t.toggleLabel;

        // Header texts
        if (els.pageTitle) els.pageTitle.innerHTML = t.title;
        if (els.metaText) els.metaText.textContent = t.meta;

        // Crossfade content panels
        _crossfade(
            isAr ? els.contentEn : els.contentAr,
            isAr ? els.contentAr : els.contentEn
        );
    }

    function _crossfade(outEl, inEl) {
        if (!outEl || !inEl) return;

        outEl.classList.add('fade-out');
        outEl.classList.remove('fade-in');

        setTimeout(() => {
            outEl.style.display = 'none';
            outEl.classList.remove('fade-out');

            inEl.style.display = 'block';
            inEl.classList.add('fade-in');

            // Re-trigger section reveal animations
            _revealSections(inEl);
        }, 250);
    }

    function _revealSections(container) {
        const blocks = container.querySelectorAll('.section-block');
        blocks.forEach((block, i) => {
            block.classList.remove('visible');
            setTimeout(() => block.classList.add('visible'), 60 * i);
        });
    }

    // ── Public API ─────────────────────────────────────────

    function init() {
        _cacheDom();
        _apply();

        // First-load reveal
        const defaultPanel = els.contentAr;
        if (defaultPanel) {
            defaultPanel.classList.add('fade-in');
            _revealSections(defaultPanel);
        }

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
