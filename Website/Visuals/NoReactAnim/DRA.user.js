// ==UserScript==
// @name         Disable React Animations
// @namespace    discord.gg/C2ZJCZXKTu
// @version      1.4
// @description  Fix performance
// @author       Simon
// @match        *://www.kogama.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const animationClasses = ['fade', 'slide', 'bounce', 'zoom'];
    const disableCssAnimations = () => {
        GM_addStyle(`
            * {
                transition: none !important;
                animation: none !important;
                animation-duration: 0s !important;
                animation-delay: 0s !important;
                animation-fill-mode: none !important;
                will-change: auto !important;
            }
        `);
    };
    const disableInlineAnimations = () => {
        document.querySelectorAll('*').forEach(el => {
            el.style.transition = 'none';
            el.style.animation = 'none';
        });
    };
    const removeAnimationClasses = () => {
        document.querySelectorAll('*').forEach(el => {
            animationClasses.forEach(cls => {
                el.classList.remove(cls);
            });
        });
    };
    const disableAnimations = () => {
        disableCssAnimations();
        disableInlineAnimations();
        removeAnimationClasses();
    };
    disableAnimations();
    const observer = new MutationObserver(() => {
        disableAnimations();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
