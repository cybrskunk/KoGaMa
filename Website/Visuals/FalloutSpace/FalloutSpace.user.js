// ==UserScript==
// @name         Fallout Space
// @namespace    @ ctaah
// @version      0.5
// @description  Green. That's all there is to it.
// @author       ctaah
// @match        *://*.kogama.com/*
// @grant        GM_addStyle
// ==/UserScript==
// Private theme specifically created for use of  ' 👁ω👁 '.
// Fully created by ctaah (Simon)


(function() {
    'use strict';

    GM_addStyle(`
/* imports */
@import url("https://fonts.googleapis.com/css2?family=PT+Mono&display=swap");

/* global variables */
:root {
  --falloutcursor: url("https://i.imgur.com/wf87JtE.png"), default;
  --rust: linear-gradient(135deg, hsla(145, 57%, 8%, 0.944), hsl(0, 0%, 0%));
  --rustaccent: #4373232e;
  --rustblur: blur(6px);
  --rustborder: 13px;
  --ptmono: "PT Mono", monospace;
  --terhue: #688b68da;
  --terhuehover: #64c364da;
  --actionhue: #0d400dda;
  --actionhuehover: #3c6a3cda;
}

/* global website tweaks */
* {
  /* cursor: var(--falloutcursor) !important; */
  font-family: var(--ptmono) !important;
  font-weight: 400;
  font-style: normal;
}
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}

::-webkit-scrollbar-thumb {
  background: transparent;
}

::-webkit-scrollbar-track {
  background: transparent;
}

footer.authenticated {
  display: none;
}

body#root-page-mobile {
  background-color: transparent !important;
  background-image: var(--rust) !important;
}

.MuiPaper-root {
  background-color: var(--rustaccent) !important;
  backdrop-filter: var(--rustblur);
  border-radius: var(--rustborder);
}

._1q4mD ._1sUGu ._1u05O {
  background-color: transparent !important;
}

._13UrL ._23KvS ._25Vmr ._2IqY6 h1 {
  color: var(--terhue);
}

._2IqY6 > h1 > a {
  color: var(--terhue) !important;
  text-decoration: none !important;
  transition: color 0.7s ease-in-out;
}

._2IqY6 > h1 > a:hover {
  color: var(--terhuehover) !important;
}
a:hover {
  text-decoration: none !important;
}

.MuiTypography-root.MuiLink-root.MuiLink-underlineHover.MuiTypography-colorPrimary,
.MuiTypography-colorPrimary {
  color: var(--terhue) !important;
  transition: color 0.7s ease-in-out;
}

.MuiTypography-root.MuiLink-root.MuiLink-underlineHover.MuiTypography-colorPrimary:hover,
.MuiTypography-colorPrimary:hover {
  color: var(--terhuehover) !important;
}
.MuiButton-textPrimary {
  color: var(--terhue) !important;
}
.MuiButton-containedPrimary {
  background-color: var(--rustaccent) !important;
  transition: all 0.7s ease-in-out;
}
.MuiButton-containedPrimary:hover {
  background-color: var(--actionhuehover) !important;
}
.MuiButton-contained {
  background-color: var(--actionhue) !important;
  color: #fff !important;
  transition: all 0.7s ease-in-out;
}
.MuiButton-contained:hover {
  background-color: var(--actionhuehover) !important;
}
._3TORb {
  transition: right 0.7s ease-in-out;
  background-color: transparent !important;
  position: relative !important;
  right: -214px;
}

._3TORb:hover {
  right: 0;
}
._2E1AL {
  display: none !important;
}
.zUJzi {
  background-image: var(--rust) !important;
}

.zUJzi .o_DA6 .uwn5j,
._375XK,
._375XK .F3PyX,
._375XK textarea {
  background-color: transparent !important;
}

.zUJzi .o_DA6 .uwn5j {
  border-right: none !important;
}

._375XK .F3PyX {
  border-bottom: none !important;
}
._375XK textarea {
  border: none !important;
  color: #9b9898;
  text-shadow: 0 0 1px #fff;
}
._375XK textarea:focus,
._375XK textarea::active {
  border: none !important;
  outline: none !important;
}
._375XK ._2XaOw ._1j2Cd._1Xzzq p {
  background-color: #5b856184 !important;
  backdrop-filter: var(--rustblur);
  color: #9b9898;
  text-shadow: 0 0 1px #fff;
}
._375XK ._2XaOw ._1j2Cd p {
  background-color: #2d543384 !important;
  backdrop-filter: var(--rustblur);
  color: #9b9898;
  text-shadow: 0 0 1px #fff;
}
.uwn5j ._3DYYr ._1j2Cd {
  display: none;
}
.uwn5j ._3DYYr ._28mON header {
  color: var(--terhue) !important;
  transition: all 0.7s ease-in-out;
}
.zUJzi .o_DA6 .uwn5j ._3DYYr:hover,
.uwn5j ._3DYYr ._28mON header:hover {
  background-color: transparent !important;
  color: var(--actionhuehover) !important;
}
#react-ingame-mini-profile,
._3PFfW ._2qsAY {
  display: none !important;
}
#unity-player-frame {
  width: 1200px !important;
  height: 100% !important;
}

    `);
    function replaceImageAndTooltip() {
        const targetElement = document.querySelector('div._2Jlgl a');

        if (targetElement) {
            const newImageUrl = 'https://i.imgur.com/1xFE7zH.jpeg';
            const imgElement = targetElement.querySelector('img');
            if (imgElement) {
                imgElement.src = newImageUrl;
                imgElement.srcset = newImageUrl + ' 2x';
            }
            const newTooltipText = 'Fallout Space';
            targetElement.setAttribute('title', newTooltipText);
        }
    }
    function changePlaceholderText() {
        const relaxarea = document.querySelector('._375XK textarea');
        if (relaxarea) {
            relaxarea.placeholder = '> Ask them about their day ...';
        }
        const relaxarea2 = document.querySelector('.zUJzi ._2BvOT ._375XK textarea');
        if (relaxarea2) {
            relaxarea2.placeholder = '> Ask them about their day ...';
        }
    }
    window.addEventListener('load', () => {
        replaceImageAndTooltip();
        changePlaceholderText();
    });
    setInterval(changePlaceholderText, 2000);
})();
