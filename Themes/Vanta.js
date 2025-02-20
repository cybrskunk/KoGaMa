// Theme under construction
(function () {
  "use strict";

  function removeBlueBackground(imageUrl, callback) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (b > 150 && b > r && b > g) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      callback(canvas.toDataURL());
    };
    img.src = imageUrl;
  }

  function processImages() {
    document.querySelectorAll("image._3tYRU").forEach((imageElement) => {
      removeBlueBackground(imageElement.getAttribute("xlink:href"), (newImageUrl) => {
        imageElement.setAttribute("xlink:href", newImageUrl);
      });
    });
  }

  window.addEventListener("load", processImages);
})();
(function() {
    'use strict';
    GM_addStyle(`
        :root {
        --reactpanels: rgba(18, 18, 18, 0.36);
        }
        /* Global Page */
        #root-page-mobile { /* Global Page */
        background-color: transparent !important;
        background-image: linear-gradient(113deg, #b25003, #581d56 80%) !important;
        }


        /* profile tab */
        ._2IqY6 h1::before {
        content: "| " !important;
        color: inherit !important;
        margin-right: 5px !important;
        }
        .UA3TP._2bUqU {
        top: 55px;
        }
        ._33DXe {
        background-image: none !important;
        }
        ._1z4jM {
        display: none !important;
        }
        ._1q4mD ._1sUGu ._3hI0M ._3WhKY.jdoNW a {
        display: none !important;
        }
        .UA3TP ._3tYRU, .UA3TP rect {
        clip-path: circle(50%) !important;
        }
        .UA3TP rect {
        display: none !important;
        }
        .css-zslu1c {
        background-color: var(--reactpanels) !important;
        border-radius: 9px !important;
        backdrop-filter: blur(4px) !important;
        }

        .css-1udp1s3 {
        background-color: var(--reactpanels)  !important;
        border-radius: 9px !important;
        backdrop-filter: blur(4px) !important;
        }
        ._2O_AH {
        opacity: 0 !important;
        transition: opacity 0.8s ease-in-out !important;
        }

        ._2IqY6:hover ._2O_AH {
        opacity: 0.7 !important;
        }
        .UA3TP ._11RkC {
        display: none !important;
        }
        ._2IqY6 {
        position: relative !important;
        bottom: 15px;
        }
        ._1Noq6 {
        display: none !important;
        }
        ._1q4mD ._1sUGu ._3hI0M ._3WhKY._18cmu, .css-rebkop, .css-bho9d5 {
        opacity: 0.1;
        transition: opacity ease-in-out 0.7s;
        }
        ._1q4mD ._1sUGu ._3hI0M ._3WhKY._18cmu:hover, .css-rebkop:hover, .css-bho9d5:hover {
        opacity: 0.9;
        }
        .css-1rbdj9p { /* Feed Comments */
        background-color: var(--reactpanels)  !important;
        border-radius: 9px !important;
        backdrop-filter: blur(4px) !important;
        }

        /* Friends Bar Section */
        ._3TORb {
        position: fixed !important;
        right: -192px !important;
        background-color: var(--reactpanels) ) !important;
        width: 250px !important;
        transition: all 0.8s ease-in-out !important;
        opacity: 0.4 !important;
        }

        ._3TORb:hover {
        opacity: 1 !important;
        right: 0px !important;
        }

        ._3TORb:not(:hover) {
        opacity: 0.4 !important;
        right: -192px !important;
        }
        ._1pEP2, .tRx6U {
        display: none !important;
        }

        /* Feed */
        .css-bho9d5 {
        background: linear-gradient(to right, #ff1d1d, #ff1eec, #fc22ea, #0f93ff, #00ffb3, #00ff00, #fffb21, #e69706, #ff1111);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent !important;
        animation: rainbow_animation 10s ease-in-out infinite;
        background-size: 400% 100%;
        }
        @keyframes rainbow_animation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
        }


        /* Website garbage */
        ._1RMYS {
         display: none !important;
        }
        .Hkdag {
        display: none !important;
        }
        ._21Sfe {
        color: #fff !important;
        }
        ._1q4mD {
        background-color: var(--reactpanels) !important;

        }
        ._1q4mD ._1sUGu ._1u05O {
        background-color: transparent !important;
        }
        .css-1xh9k1k {
        background-color: var(--reactpanels) !important;
        }

    `);
})();
