// ==UserScript==
// @name         View games of deleted profiles
// @namespace    discord.gg/@simonvhs
// @version      1.0
// @description  It's way easier to do than it sounds
// @author       Simon 
// @match        https://www.kogama.com/profile/*/games/
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const UID = window.location.pathname.match(/\/profile\/(\d+)\/games\//)[1];
    const API_URL = `https://www.kogama.com/user/${UID}/game/?count=12`;

    fetch(API_URL)
        .then(res => res.json())
        .then(data => createGameOverlay(data.data))
        .catch(err => console.error('Error fetching games:', err));

    function createGameOverlay(games) {
        let overlay = document.createElement('div');
        overlay.id = 'kogama-overlay';
        overlay.innerHTML = `
            <div class="kogama-header">User Games <span id="close-overlay">✖</span></div>
            <div class="kogama-content">
                ${games.map(game => `
                    <div class="kogama-game">
                        <img src="${game.image_medium}" class="kogama-game-icon">
                        <div class="kogama-game-info">
                            <strong><a href="https://www.kogama.com/games/play/${game.id}/" target="_blank" class="kogama-game-link">${game.name}</a></strong>
                            <div>Published: ${new Date(game.published).toLocaleDateString()}</div>
                            <div>Created: ${new Date(game.created).toLocaleDateString()}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('close-overlay').addEventListener('click', () => {
            overlay.remove();
        });
    }

    GM_addStyle(`
        #kogama-overlay {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            max-height: 500px;
            overflow-y: auto;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 10px;
            border-radius: 10px;
            z-index: 9999;
        }
        .kogama-header {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
            position: relative;
        }
        #close-overlay {
            position: absolute;
            right: 10px;
            cursor: pointer;
        }
        .kogama-content {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .kogama-game {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.1);
            padding: 5px;
            border-radius: 5px;
        }
        .kogama-game-icon {
            width: 50px;
            height: 28px;
            border-radius: 3px;
        }
        .kogama-game-info {
            flex-grow: 1;
            font-size: 12px;
        }
        .kogama-game-link {
            color: #ffcc00;
            text-decoration: none;
        }
        .kogama-game-link:hover {
            text-decoration: underline;
        }
    `);
})();
