
(function() {
    'use strict';

    GM_addStyle(`
    /* root page */
body#root-page-mobile.summer,
body#root-page-mobile.spring,
body#root-page-mobile.autumn,
body#root-page-mobile.winter {
    background-image: linear-gradient(184deg, #761e51, #2b2a2a 50%);
}
#pageheader {
    display: none;
}
.pageheader-inner {
    display: none !important;
    }
    body#root-page-mobile {
    padding-top: 0px !important;
    padding-left: 80px !important;
    }
#root-page-mobile #content #chat-extended-side {
top: 0px !important;
height: 100% !important;
}

._3TORb {
  position: relative;
  background: transparent;
  right: -70%; /* Start position outside the screen */
  transition: right 0.3s ease-in-out;
}

._3TORb:hover {
  right: 0; /* Slide in from the right */
}

/* Mui paper React */
.MuiPaper-root {
  background-color: transparent !important;
  border-radius: 13px !important;
  border-color: #4e303e80 !important;
  backdrop-filter: blur(7px) !important;
}

/*posts*/
.MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-12 MuiGrid-grid-lg-12 MuiGrid-grid-xl-12 {
box-shadow: 0 0 3px #fff !important;

}


/* main profile stuff */

._9smi2 { display: none !important; }

.UA3TP ._3TOEv {
opacity: 0.1 !important;
}
/* Friends List: Profile Picture */
.UA3TP ._3tYRU,
.UA3TP rect {
    clip-path: circle();
}
/* Friends List: Elite Frame */
.UA3TP img[src$="svg"] {
    transform: scale(1.1);
    top: 2px;
}


/* bs */
body#root-page-mobile footer { display: none !important; }
    `);
})();


(function() {
    'use strict';

    function removeElementsAndUpdateStyles() {
        var rectElements = document.querySelectorAll('.UA3TP rect');
        rectElements.forEach(function(rectElement) {
            rectElement.parentNode.removeChild(rectElement);
        });

        var nestedElements = document.querySelectorAll('.UA3TP ._11RkC');
        nestedElements.forEach(function(nestedElement) {
            nestedElement.style.stroke = 'transparent';
        });

        var svgElements = document.querySelectorAll('.Hkdag');
        svgElements.forEach(function(svgElement) {
            svgElement.parentNode.removeChild(svgElement);
        });
    }

    function handleMutations(mutationsList) {
        mutationsList.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    var rectElements = node.querySelectorAll('.UA3TP rect');
                    rectElements.forEach(function(rectElement) {
                        rectElement.parentNode.removeChild(rectElement);
                    });

                    var nestedElements = node.querySelectorAll('.UA3TP ._11RkC');
                    nestedElements.forEach(function(nestedElement) {
                        nestedElement.style.stroke = 'transparent';
                    });

                    var svgElements = node.querySelectorAll('.Hkdag');
                    svgElements.forEach(function(svgElement) {
                        svgElement.parentNode.removeChild(svgElement);
                    });
                }
            });
        });
    }

    var observer = new MutationObserver(handleMutations);

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('load', function() {
        removeElementsAndUpdateStyles();
    });
})();

(function() {
    'use strict';
    const overlay = document.createElement('div');
    overlay.id = 'interactive-overlay';
    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = `
        #interactive-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.03);
            border: 2px solid #000;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            pointer-events: none; /* Allow interaction with elements underneath */
        }
    `;
    document.head.appendChild(style);
})();

(function() {
    'use strict';

    function createInfoDiv(nickname, rank, xp, gold) {
        const infoDiv = document.createElement('div');
        infoDiv.id = 'profile-info';
        infoDiv.style.position = 'fixed';
        infoDiv.style.top = '10px';
        infoDiv.style.left = '50%';
        infoDiv.style.transform = 'translateX(-50%)';
        infoDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        infoDiv.style.color = 'white';
        infoDiv.style.padding = '10px';
        infoDiv.style.borderRadius = '10px';
        infoDiv.style.zIndex = '9999';
        infoDiv.style.fontSize = '14px';
        infoDiv.style.textAlign = 'center';
        infoDiv.innerHTML = `
            <h1>${nickname}</h1>
            <h3>R: ${rank} | XP: ${xp} | G: ${gold}</h3>
        `;
        document.body.appendChild(infoDiv);
    }

    function scrapeProfileInfo() {
        const profileDiv = document.querySelector('div._2IqY6');
        if (!profileDiv) {
            return null;
        }

        const nicknameElem = profileDiv.querySelector('h1 a');
        const rankElem = profileDiv.querySelector('div.vKjpS:nth-of-type(1) ._2ydTi');
        const xpElem = profileDiv.querySelector('div.vKjpS:nth-of-type(2) ._2ydTi');
        const goldElem = profileDiv.querySelector('div._33wIU.vKjpS ._2ydTi');

        if (!nicknameElem || !rankElem || !xpElem || !goldElem) {
            return null;
        }

        const nickname = nicknameElem.textContent.trim();
        const rank = rankElem.textContent.trim();
        const xp = xpElem.textContent.trim();
        const gold = goldElem.textContent.trim();

        return {
            nickname: nickname,
            rank: rank,
            xp: xp,
            gold: gold
        };
    }

    window.addEventListener('load', () => {
        const profileInfo = scrapeProfileInfo();
        if (profileInfo) {
            createInfoDiv(profileInfo.nickname, profileInfo.rank, profileInfo.xp, profileInfo.gold);
        } else {
            console.log('Profile info not found.');
        }
    });

})();
