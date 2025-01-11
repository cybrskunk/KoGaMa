// ==UserScript==
// @name         Find My Token
// @namespace    DVRKZ DISTRIBUTION
// @version      1.2
// @description  Quickly find information about account's token by joining the game through webgl.
// @author       Simon
// @match        https://www.kogama.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    const apiBaseURL = 'https://api-www.kgoma.com/v1/api/reward/game-data/?';
    let modalVisible = false;

    const createModal = () => {
        const modal = document.createElement('div');
        modal.className = 'data-modal';
        modal.style.position = 'fixed';
        modal.style.top = '10px';
        modal.style.right = '10px';
        modal.style.width = '500px';
        modal.style.maxHeight = '300px';
        modal.style.overflow = 'auto';
        modal.style.backgroundColor = 'rgba(40, 40, 40, 0.95)';
        modal.style.color = 'white';
        modal.style.border = '2px solid #FFAA00';
        modal.style.borderRadius = '10px';
        modal.style.zIndex = '9999';
        modal.style.padding = '20px';
        modal.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
        modal.style.display = 'none';

        const header = document.createElement('div');
        header.style.cursor = 'move';
        header.style.backgroundColor = '#FFAA00';
        header.style.color = 'black';
        header.style.padding = '12px';
        header.style.fontSize = '18px';
        header.style.fontWeight = 'bold';
        header.style.borderRadius = '10px 10px 0 0';
        header.textContent = 'Game Data';
        modal.appendChild(header);

        const content = document.createElement('div');
        content.className = 'content';
        content.style.marginTop = '10px';
        content.style.fontSize = '16px';
        content.style.whiteSpace = 'pre-wrap';
        content.style.wordWrap = 'break-word';
        modal.appendChild(content);

        const infoText = document.createElement('div');
        infoText.style.marginTop = '15px';
        infoText.style.fontSize = '12px';
        infoText.style.color = 'lightgray';
        infoText.textContent = 'This is the easiest approach to find account token.';
        modal.appendChild(infoText);

        document.body.appendChild(modal);
        return modal;
    };
    const displayData = (gameId, userId, userToken) => {
        const modal = document.querySelector('.data-modal') || createModal();
        const content = modal.querySelector('.content');

        content.innerHTML = `
            <strong>User ID:</strong> ${userId}<br>
            <strong>Game ID:</strong> ${gameId}<br>
            <strong>Token:</strong> ${userToken}<br>
        `;

        modal.style.display = 'block';
        modalVisible = true;
    };

    const dragElement = (element) => {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        element.querySelector('div').onmousedown = (e) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };

        const elementDrag = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        };

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
    };
    const monitorRequests = () => {
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function (method, url) {
            this._url = url;
            return originalOpen.apply(this, arguments);
        };

        XMLHttpRequest.prototype.send = function () {
            this.addEventListener('load', () => {
                if (this._url.startsWith(apiBaseURL)) {
                    const urlParams = new URLSearchParams(new URL(this._url).search);
                    const userId = urlParams.get('profile_id');
                    const gameId = urlParams.get('planet_id');
                    const userToken = urlParams.get('token');

                    displayData(gameId, userId, userToken);
                }
            });
            return originalSend.apply(this, arguments);
        };
        const originalFetch = window.fetch;
        window.fetch = function (...args) {
            const url = args[0];
            return originalFetch.apply(this, args).then(response => {
                if (typeof url === 'string' && url.startsWith(apiBaseURL)) {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    const userId = urlParams.get('profile_id');
                    const gameId = urlParams.get('planet_id');
                    const userToken = urlParams.get('token');

                    displayData(gameId, userId, userToken);
                }
                return response;
            });
        };
    };
    window.addEventListener('load', () => {
        const modal = createModal();
        dragElement(modal);
        monitorRequests();
    });
})();
