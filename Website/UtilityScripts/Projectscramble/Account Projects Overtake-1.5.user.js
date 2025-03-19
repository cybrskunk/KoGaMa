// ==UserScript==
// @name         Account Projects Overtake
// @namespace    DVRKZ_DISTRIBUTION_TOOL
// @version      1.5
// @description  Scramble projects, shoo!
// @author       SIMMY
// @match        https://www.kogama.com/*
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    const prefixes = ['Dirty', 'Crazy', 'Wild', 'Epic', 'Mega', 'Super', 'Extreme', 'Hyper', 'Rapid', 'Furious', 'Stealth', 'Funky', 'Mystic', 'Thunder', 'Electric'];
    const suffixes = ['Alligator', 'Parkour', 'Racer', 'Hunter', 'Rider', 'Warrior', 'Ninja', 'Knight', 'Champion', 'Gladiator', 'Predator', 'Savior', 'Hero', 'Legend', 'Master'];

    function generateRandomName() {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        return `${prefix} ${suffix}`;
    }

    function showNotification(type, message) {
        const notificationTypeStyles = {
            'delete': { backgroundColor: '#ff5555', borderColor: '#ff79c6' },
            'co-owner': { backgroundColor: '#ff79c6', borderColor: '#ff79c6' },
            'rename': { backgroundColor: '#bd93f9', borderColor: '#ff79c6' }
        };

        const notification = $('<div>')
            .text(message)
            .css({
                position: 'fixed',
                bottom: type === 'delete' ? '70px' : type === 'co-owner' ? '110px' : '150px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                padding: '10px 20px',
                fontSize: '14px',
                backgroundColor: notificationTypeStyles[type].backgroundColor,
                color: '#f8f8f2',
                border: `2px solid ${notificationTypeStyles[type].borderColor}`,
                borderRadius: '8px',
                boxShadow: `0 0 15px ${notificationTypeStyles[type].borderColor}`,
                textAlign: 'center',
                opacity: 0,
                transition: 'opacity 0.5s',
                width: '300px',
            })
            .appendTo('body');

        setTimeout(() => notification.css('opacity', 1), 100);
        setTimeout(() => notification.css('opacity', 0), 4000);
        setTimeout(() => notification.remove(), 4500);
    }

    const button = $('<button>')
        .html('<3 Manage Games <3')
        .css({
            position: 'fixed',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 999,
            padding: '12px 24px',
            fontSize: '18px',
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            backgroundColor: '#282a36',
            color: '#ff79c6',
            border: '2px solid #ff79c6',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 0 20px #ff79c6',
            textShadow: '0 0 5px #ff79c6'
        })
        .hover(
            function() { $(this).css('boxShadow', '0 0 30px #ff79c6'); },
            function() { $(this).css('boxShadow', '0 0 20px #ff79c6'); }
        )
        .appendTo('body');

    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    button.on('click', async function() {
        const memberUserId = prompt("Enter the User ID for member deletion:");

        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://www.kogama.com/game/?page=1&count=1400&filter=owner',
            onload: async function(response) {
                const data = JSON.parse(response.responseText);
                const games = data.data;

                for (const game of games) {
                    const projectId = game.id;

                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: `https://www.kogama.com/game/${projectId}/member/?include-friends=true`,
                        onload: async function(memberResponse) {
                            const memberData = JSON.parse(memberResponse.responseText);
                            const members = memberData.data;

                            for (const member of members) {
                                if (member.type === 'co_owner') {
                                    const coOwnerId = member.member_user_id;

                                    GM_xmlhttpRequest({
                                        method: 'DELETE',
                                        url: `https://www.kogama.com/game/${projectId}/member/${coOwnerId}/`,
                                        onload: function(deleteResponse) {
                                            showNotification('co-owner', `Member ${coOwnerId} deleted <3`);
                                        }
                                    });

                                    await delay(500);
                                }
                            }

                            const newName = generateRandomName();
                            GM_xmlhttpRequest({
                                method: 'PUT',
                                url: `https://www.kogama.com/game/${projectId}/`,
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: JSON.stringify({
                                    name: newName,
                                    description: ''
                                }),
                                onload: function(putResponse) {
                                    showNotification('rename', `Title ${projectId} renamed to: ${newName}`);
                                }
                            });

                            await delay(500);
                        }
                    });

                    await delay(500);
                }
            }
        });

        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://www.kogama.com/game/?page=1&count=1400&filter=member',
            onload: async function(response) {
                const data = JSON.parse(response.responseText);
                const games = data.data;

                for (const game of games) {
                    const projectId = game.id;

                    GM_xmlhttpRequest({
                        method: 'DELETE',
                        url: `https://www.kogama.com/game/${projectId}/member/${memberUserId}`,
                        onload: function(deleteResponse) {
                            showNotification('delete', `Project ${projectId} deleted <3`);
                        }
                    });

                    await delay(500);
                }
            }
        });
    });
})();
