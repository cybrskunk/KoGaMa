// ==UserScript==
// @name         HeavenFever - A KoGaMa Theme
// @namespace    github.com/exserta
// @version      0.5b
// @description  A light blue theme for kogama website made for a request.
// @author       Simon <3
// @match        *://www.kogama.com/*
// @grant        GM_addStyle
// @grant        GM.getValue
// @grant        GM.registerMenuCommand
// @grant        GM.setValue
// @require      https://greasyfork.org/scripts/465955-oneko-webmate/code/oneko-webmate.js
// ==/UserScript==

(function() {
    GM_addStyle(`
/* IMPORTS */
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

:root {
  /* Global variables for easy editing */

  /* Colors */
  --WebsiteGradient: linear-gradient(90deg, #ffffff, #688cdadf) !important;
  --PanelReact: linear-gradient(218deg, #306d6e, #76a59ef5) !important;
  --PanelGradient: rgba(125, 132, 210, 0.328) !important;
  --UserdataPanel: rgba(109, 116, 189, 0.595) !important;
  --NavGradient: rgba(109, 116, 189, 0.595) !important;

  /* Other Variables */
  --FontFace: "Quicksand", sans-serif;
}

/* Website Body Structure */
* {
  font-family: var(--FontFace) !important;
}

#root-page-mobile {
  background: var(--WebsiteGradient);
  background-color: none !important;
}

#root-page-mobile #content.authenticated #content-container #main-content {
  width: 100% !important;
}

.MuiInputLabel-root.Mui-focused,
.MuiFormLabel-root.Mui-focused,
.css-9wxmof.Mui-focused,
.MuiInputLabel-outlined.Mui-focused {
  color: rgba(44, 101, 108, 0.658) !important;
}

.MuiOutlinedInput-notchedOutline,
.css-nqlg3w {
  border-color: rgba(44, 101, 108, 0.658) !important;
}

/* Profile Pages Structure */

._33DXe {
  /* useless skin double banner img */
  background-image: none !important;
}
._3BKw5 {
  display: none !important;
}
.css-zslu1c {
  /* Profile and description panel props */
  background-color: var(--PanelGradient) !important;
  background-image: none !important;
  box-shadow: 5px 10px #0000 !important;
  border-radius: 19px !important;
  backdrop-filter: blur(4px);
}

._2IqY6 {
  /* Player base information panel */
  background-color: var(--UserdataPanel);
  border-color: rgba(44, 101, 108, 0.658) !important;
  border: 1px solid rgba(44, 101, 108, 0.658) !important;
  border-radius: 13px !important;
  padding: 12px !important;
  backdrop-filter: blur(4px);
}

.css-1udp1s3 {
  /* Post Object */
  background-color: transparent !important;
  background: var(--PanelGradient) !important;
  border-color: rgba(44, 101, 108, 0.658) !important;
  border: 1px solid rgba(44, 101, 108, 0.658) !important;
  border-radius: 13px !important;
}

.css-1udp1s3 {
  /* Post visible text */
  color: rgb(68, 65, 160) !important;
}

.css-16fidy5 {
  /* Post Button */
  background-color: transparent;
  background: var(--PanelReact) !important;
}

.CDEQQ a[href^="/profile/"] {
  /* Text elements par  I */
  color: #4f51bc !important;
}

.MuiCardHeader-title > span > a[href^="/profile/"] {
  /* Text elements par  II */
  color: #4f51bc !important;
}

.css-bho9d5 {
  /* Text elements par  III */
  color: rgb(255, 255, 255) !important;
  text-shadow: 0 0 3px inherit !important;
}

.css-cisn0m {
  /* Block button */
  background-color: transparent;
  background: var(--PanelReact) !important;
}

.css-fw2tbd {
  /* Report button */
  color: #fff !important;
  background-color: transparent;
  background: var(--PanelReact) !important;
}

.css-100me8t {
  /* Accept button */
  color: #fff !important;
  background-color: transparent;
  background: var(--PanelReact) !important;
}

.css-k9ok3b {
  /* Write  post panel */
  background-color: var(--PanelGradient);
  background-image: none !important;
  box-shadow: 5px 10px #0000 !important;
  border-radius: 19px !important;
  backdrop-filter: blur(4px);
}
.css-1rbdj9p {
  /* Comment container */
  background-color: transparent !important;
  background: var(--PanelGradient) !important;
  border-color: rgba(44, 101, 108, 0.658) !important;
  border: 1px solid rgba(44, 101, 108, 0.658) !important;
  border-radius: 13px !important;
}
.css-qr6c39 {
  /* Post Comment button */
  color: #fff !important;
  background-color: transparent;
  background: var(--PanelReact) !important;
}
.css-1xh9k1k {
  /* Amount notice */
  background-color: transparent !important;
}
._3TORb {
  /* Friendslist navbar (side-bar) */
  background-color: transparent !important;
  box-shadow: none !important;
  outline: none !important;
  position: relative !important;
  z-index: 0 !important;
  width: 100% !important;
  max-width: 312px !important;
}

._3TORb ._1lvYU ._1taAL ._3zDi-._1mEz4 {
  /* usrn color */
  color: #fff !important;
}

._3TORb ._1lvYU ._1taAL ._40qZj._1mEz4 {
  /* status color */
  color: #000000 !important;
}

._2E1AL,
._1RMYS {
  display: none !important;
}

/* Main nav-bar (top) */

._3QJqR .ZyrQG {
color: #0d54d9 !important;
}

.css-x84yyj {
  /* Navbar Coloring */
  background-color: var(--UserdataPanel) !important;
  backdrop-filter: blur(8px) !important;
}
._290sk,
._1u05O {
  /* Fix navbar coloring */
  background: none !important;
  background-color: transparent !important;
}
._290sk {
  /* navbar text color */
  color: #fff !important;
}
._3RptD a[href="/news/"],
._3RptD a[href="/purchase/"],
._3RptD a[href="/leaderboard/"],
._3RptD a[href="/subscription/subscribe/"] {
  /* Bloat be gone */
  display: none !important;
}

._34V3h {
  /* don't display xp progress bar */
  display: none !important;
}
._1q4mD ._1sUGu ._3hI0M ._3WhKY.jdoNW a {
  width: 35px !important;
}

/* Direct Messages Conainer */
.uwn5j,
._375XK .F3PyX,
._2XaOw,
._375XK textarea {
  /* Main Coloring */
  background-color: var(--UserdataPanel) !important;
}
._375XK textarea {
  /* Input text coloring */
  color: #fff !important;
  border: none !important;
  border-top: none !important;
}
.zU .zUJzi .o_DA6 .uwn5j,
.zUJzi .o_DA6 .uwn5j,
._375XK .F3PyX,
.zUJzi {
  /* Bad border begone */
  border: none !important;
  border-right: none !important;
  border-bottom: none !important;
  border-top: none !important;
}


    `);




    function replaceImageAndTooltip() {
        const targetElement = document.querySelector('div._2Jlgl a');

        if (targetElement) {
            const newImageUrl = 'https://i.pinimg.com/736x/67/27/cb/6727cba14bf10a879f3dd8621101158c.jpg';
            const imgElement = targetElement.querySelector('img');
            if (imgElement) {
                imgElement.src = newImageUrl;
                imgElement.srcset = newImageUrl + ' 2x';
            }
            const newTooltipText = 'HeavenFever Created by Simon';
            targetElement.setAttribute('title', newTooltipText);
            const newHref = 'https://github.com/exserta/HeavenFever';
            targetElement.setAttribute('href', newHref);
        }
    }
    window.addEventListener('load', replaceImageAndTooltip);


    function changePlaceholderText() {
        const relaxarea = document.querySelector('._375XK textarea');
        if (relaxarea) {
            relaxarea.placeholder = 'Let them know they are loved <3...';
        }
        const relaxarea2 = document.querySelector('.zUJzi ._2BvOT ._375XK textarea');
        if (relaxarea2) {
            relaxarea2.placeholder = 'Let them know they are loved <3...';
        }
    }
    window.addEventListener('load', changePlaceholderText);
})();
