
(function() {
    'use strict';
    function isProfilePage() {
        return /^https?:\/\/(?:www\.)?kogama\.com\/profile\/\d+\/?$/.test(window.location.href);
    }
    function extractUIDFromURL() {
        const match = window.location.href.match(/^https?:\/\/(?:www\.)?kogama\.com\/profile\/(\d+)\/?$/);
        return match ? match[1] : null;
    }

    function waitForDOMContent() {
        return new Promise(resolve => {
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                resolve();
            } else {
                document.addEventListener('DOMContentLoaded', resolve);
            }
        });
    }

  function waitAdditional(delay) {
        return new Promise(resolve => {
            setTimeout(resolve, delay);
        });
    }

    function printDivContentWithoutSVG() {
        let usernameElement = document.querySelector('div._2IqY6 h1 a');
        if (!usernameElement) {
            usernameElement = document.querySelector('div._13UrL ._23KvS ._25Vmr ._2IqY6 h1');
        }

        const username = usernameElement ? usernameElement.textContent.trim() : 'N/A';
        const uid = extractUIDFromURL();

        const div = document.querySelector('div._2IqY6');
        if (div) {
            const leaderboardElement = div.querySelector('a[href*="/leaderboard/"] ._2ydTi');
            let xpElement = div.querySelector('a[href*="/levels/"] ._2ydTi');
            if (!xpElement) {
                const xpContainer = div.querySelector('.vKjpS:nth-child(3) ._2ydTi');
                if (xpContainer) {
                    xpElement = xpContainer;
                }
            }
            const friendsElement = div.querySelector('a[href*="/friends/"] ._2ydTi');
            const goldElement = div.querySelector('a[href*="/purchase/"] ._2ydTi');

            const leaderboard = leaderboardElement ? leaderboardElement.textContent.trim() : 'N/A';
            const xp = xpElement ? xpElement.textContent.trim().replace(/\s/g, '') : 'N/A';
            const friends = friendsElement ? friendsElement.textContent.trim() : 'N/A';
            const gold = goldElement ? goldElement.textContent.trim() : 'N/A';

            createOverlay(username, uid, leaderboard, xp, friends, gold);
        } else {
            console.log('Div ._2IqY6 not found');
        }
    }
    function createOverlay(username, uid, leaderboard, xp, friends, gold) {
        const overlayDiv = document.createElement('div');
        overlayDiv.style.position = 'fixed';
        overlayDiv.style.bottom = '2%';
        overlayDiv.style.left = '50%';
        overlayDiv.style.transform = 'translate(-50%, -50%)';
        overlayDiv.style.zIndex = '999';
        overlayDiv.style.background = '#333';
        overlayDiv.style.color = '#fff';
        overlayDiv.style.padding = '10px';
        overlayDiv.style.border = '1px solid #ccc';
        overlayDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        overlayDiv.style.textAlign = 'center';
        overlayDiv.style.maxWidth = '300px';

        const usernameHeading = document.createElement('h1');
        const usernameLink = document.createElement('a');
        usernameLink.textContent = username;
        usernameLink.href = `https://www.kogama.com/profile/${uid}/`;
        usernameLink.style.color = '#fff';
        usernameLink.style.textDecoration = 'underline';
        usernameHeading.appendChild(usernameLink);
        usernameHeading.style.fontSize = '18px';
        overlayDiv.appendChild(usernameHeading);

        const linksContainer = document.createElement('div');
        linksContainer.style.marginTop = '5px';

        const createLink = (text, href) => {
            const linkElement = document.createElement('a');
            linkElement.textContent = text;
            linkElement.href = `https://www.kogama.com/profile/${uid}${href}`;
            linkElement.style.color = '#fff';
            linkElement.style.textDecoration = 'underline';
            linkElement.style.margin = '0 10px';
            return linkElement;
        };

        const avatarsLink = createLink('Avatars', '/avatars/');
        const marketplaceLink = createLink('Marketplace', '/marketplace/');
        const gamesLink = createLink('Games', '/games/');

        linksContainer.appendChild(avatarsLink);
        linksContainer.appendChild(marketplaceLink);
        linksContainer.appendChild(gamesLink);
        overlayDiv.appendChild(linksContainer);

        const dataContainer = document.createElement('div');
        dataContainer.style.display = 'flex';
        dataContainer.style.justifyContent = 'center';
        dataContainer.style.flexWrap = 'wrap';
        dataContainer.style.marginTop = '10px';

        const createDataItem = (label, data, href) => {
            const labelElement = document.createElement('p');
            labelElement.textContent = `${label}:`;
            labelElement.style.fontSize = '12px';
            labelElement.style.margin = '0 5px';

            const dataElement = document.createElement('a');
            dataElement.textContent = data;
            dataElement.href = `https://www.kogama.com/profile/${uid}${href}`;
            dataElement.style.fontSize = '14px';
            dataElement.style.color = '#fff';
            dataElement.style.textDecoration = 'underline';

            const itemContainer = document.createElement('div');
            itemContainer.style.margin = '5px';
            itemContainer.appendChild(labelElement);
            itemContainer.appendChild(dataElement);

            return itemContainer;
        };

        const leaderboardHref = '/leaderboard/';
        const goldHref = '/purchase/';
        const friendsHref = '/friends/';
        const xpHref = '/levels/';

        dataContainer.appendChild(createDataItem('L', leaderboard, leaderboardHref));
        dataContainer.appendChild(createDataItem('G', gold, goldHref));
        dataContainer.appendChild(createDataItem('F', friends, friendsHref));
        dataContainer.appendChild(createDataItem('XP', xp, xpHref));

        overlayDiv.appendChild(dataContainer);

        document.body.appendChild(overlayDiv);
    }

    function addCustomCSS() {
        const customCSS = `
            .MuiPaper-root._23KvS.MuiPaper-rounded {
                display: none !important;
            }
        `;
        GM_addStyle(customCSS);
    }

    async function main() {
        if (!isProfilePage()) {
            return;
        }

        await waitForDOMContent();
        await waitAdditional(1000);
        addCustomCSS();
        printDivContentWithoutSVG();
    }
    main();

})();
