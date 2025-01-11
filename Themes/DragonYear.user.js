// ==UserScript==
// @name         Year Of The Dragon - Unfinished
// @namespace    discord/@------
// @version      0.1
// @description  Snippet reinvented into T@ for Flavius
// @author       ⛧ simon
// @match        https://www.kogama.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    document.body.appendChild(confettiContainer);
    const shadowLayer = document.createElement('div');
    shadowLayer.style.position = 'absolute';
    shadowLayer.style.top = '0';
    shadowLayer.style.left = '0';
    shadowLayer.style.width = '100%';
    shadowLayer.style.height = '100%';
    shadowLayer.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))';
    confettiContainer.appendChild(shadowLayer);

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = `${getRandom(5, 20)}px`;
        confetti.style.height = `${getRandom(5, 20)}px`;
        confetti.style.background = `rgb(${Math.floor(getRandom(100, 255))}, ${Math.floor(getRandom(100, 255))}, ${Math.floor(getRandom(100, 255))})`;
        confetti.style.borderRadius = `${getRandom(0, 50)}%`;
        confettiContainer.appendChild(confetti);
        const startX = getRandom(0, window.innerWidth);
        const startY = getRandom(-500, 0);
        confetti.style.transform = `translate(${startX}px, ${startY}px) rotate(${getRandom(0, 360)}deg)`;

        const endX = getRandom(0, window.innerWidth);
        const endY = window.innerHeight + getRandom(100, 500);

        const duration = getRandom(4, 8);
        confetti.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;

        setTimeout(() => {
            confetti.style.transform = `translate(${endX}px, ${endY}px) rotate(${getRandom(0, 360)}deg)`;
            confetti.style.opacity = '0';
        }, 0);

        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
    function generateConfetti() {
        for (let i = 0; i < 600; i++) {
            setTimeout(createConfetti, getRandom(0, 4300));
        }
    }
    generateConfetti();

})();

(function() {
    'use strict';
    function convertTextToLinks(text) {
        return text.replace(/\[(.*?)\]\((.*?)\)/g, function(match, title, link) {
            if (link.startsWith('http://') || link.startsWith('https://')) {
                return '<a href="' + link + '" target="_blank" style="text-decoration: underline; color: #FDDC5C;">' + title + '</a>';
            } else {
                return '<a href="http://' + link + '" target="_blank" style="text-decoration: underline; color: #FDDC5C;">' + title + '</a>';
            }
        });
    }

    function formatInlineCode(text) {
        return text.replace(/`(.*?)`/g, '<code>$1</code>');
    }
    function addMarkdownFormatting(element) {
        var originalText = element.innerHTML;
        var formattedText = convertTextToLinks(originalText);
        formattedText = formatInlineCode(formattedText);
        if (originalText !== formattedText) {
            element.innerHTML = formattedText;
        }
    }
    function scanSiteForMarkdown() {
        var elements = document.querySelectorAll('body *:not(script):not(style):not(iframe):not(textarea):not(meta):not(title)');

        elements.forEach(function(element) {
            if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
                addMarkdownFormatting(element);
            }
        });
        var targetElement = document.querySelector('#mobile-page #profile-page .creations-feed section.creations-custom .section-description .description-container .text');
        if (targetElement) {
            addMarkdownFormatting(targetElement);
        }
    }
    function checkForChanges() {
        scanSiteForMarkdown();
        setTimeout(checkForChanges, 500);
    }
    window.addEventListener('load', checkForChanges);

})();

(function() {
    'use strict';
    function convertTextToLinks(text) {
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, function(match, title, link) {
            if (link.startsWith('http://') || link.startsWith('https://')) {
                return '<a href="' + link + '" target="_blank">' + title + '</a>';
            } else {
                return '<a href="http://' + link + '" target="_blank">' + title + '</a>';
            }
        });

        return text;
    }

    function formatInlineCode(text) {
        return text.replace(/`(.*?)`/g, '<code>$1</code>');
    }

    function addMarkdownFormatting(text) {
        text = convertTextToLinks(text);
        text = formatInlineCode(text);
        return text;
    }

    function checkForChanges() {
        var elements = document.querySelectorAll('body *:not(script)');

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
                var formattedText = addMarkdownFormatting(element.innerHTML);
                element.innerHTML = formattedText;
            }
        }

        setTimeout(checkForChanges, 500);
    }

    window.addEventListener('load', checkForChanges);

})();
GM_addStyle(`
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap');
    @import url('https://fonts.cdnfonts.com/css/anurati');

    * {
        font-family: 'Comfortaa', cursive;
    }

    .MuiPaper-root { background-color: transparent !important; }

    /* Website Outlook Gradient */
    body#root-page-mobile.winter,
    body#root-page-mobile.summer,
    body#root-page-mobile.autumn,
    body#root-page-mobile.spring {
        background-image: linear-gradient(183deg, rgb(10, 18, 31), rgb(96, 42, 6) 95%);
    }

    /* Friendlist Transparency */
    ._3TORb { background-color: transparent; }
    ._3zDi- {
        background-image: linear-gradient(to right,#ee9ca7,#ee9ca7,#ffc3a0,#ee9ca7,#ffc3a0,#ffafbd);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: rainbow-animations 2000s linear infinite;
    }

    @keyframes rainbow-animations {
        to {
            background-position: 4500vh;
        }
    }

    @keyframes breathingGradient {
        0% {
            background-position: 100% 0;
        }
        50% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 0;
        }
    }

    /* User Icons */
    /* Shape */
    .UA3TP ._3tYRU, .UA3TP rect {
        clip-path: circle();
    }
    /* Custom Border Effect */
    .UA3TP::before {
        content: '';
        width: 40px;
        height: 40px;
        background: url("https://i.imgur.com/QwuDBf3.gif") center/cover;
        transform: translate(-4px, -2px);
        z-index: 99999;
        position: absolute;
        pointer-events: none;
    }

    /* Smoothen and hide nuisances */
    .Hkdag { display: none; }
    ._11RkC { display: none; }

    /* User banner */
    #mobile-page #profile-page .section-top .section-top-background {
        background-image: url('https://i.imgur.com/HqnPHz0.png');
        filter: blur(7px);
    }

    .background-avatar {
        display: none;
    }

    /* Username on banner - selfportrait */
    @keyframes combinedAnimation {
        0% {
            color: #db5d51;
            text-shadow: -5px 0 10px rgba(255, 255, 255, 0.5);
            transform: translateX(-100%);
        }
        25% {
            color: #db4b3d;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            transform: translateX(-50%);
        }
        50% {
            color: #fff;
            text-shadow: 5px 0 10px rgba(255, 255, 255, 0.5);
            transform: translateX(0);
        }
        75% {
            color: #db4b3d;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            transform: translateX(50%);
        }
        100% {
            color: #db5d51;
            text-shadow: -5px 0 10px rgba(255, 255, 255, 0.5);
            transform: translateX(100%);
        }
    }

    #mobile-page #profile-page .section-top .username h1 a {
        animation: combinedAnimation 8s linear infinite;
    }

    .MuiGrid-spacing-xs-2 > .MuiGrid-item {
        background-color: transparent;
    }

    @keyframes dragonbreathing {
        0% {
            box-shadow: 0 3px 6px rgba(254, 122, 33, 0.4);
        }
        50% {
            box-shadow: 0 8px 14px rgba(234, 12, 16, 0.5);
        }
        100% {
            box-shadow: 0 3px 6px rgba(254, 122, 33, 0.4);
        }
    }

    .MuiCard-root {
        background-color: rgba(10, 18, 31, 0.5) !important;
        border-radius: 65px !important;
        padding: 16px;
        color: #fff;
        box-shadow: 0 4px 8px rgba(254, 122, 33, 0.4);
        animation: dragonbreathing 6s infinite; /* Adjust the duration as needed */
    }
`);
