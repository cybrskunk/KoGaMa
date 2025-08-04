// ==UserScript==
// @name         Comment Scraper
// @namespace    discord.gg/@-------
// @version      4
// @description  I just want a fast way of checking comments to find stuff....
// @author       Simon (dork)
// @match        https://www.kogama.com/games/play/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const MAX_FILE_SIZE = 8 * 1024 * 1024; // 9mb Webhook file limit | DO NOT CHANGE
  let processedRequests = 0;
  let totalPages = 0;
  let isMenuVisible = true;
  let filterOutText = "";
  let separateURLs = false;

  const extractGameIdFromUrl = () => {
    const match = window.location.pathname.match(/\/games\/play\/([^/]+)\//);
    return match ? match[1] : null;
  };

  const extractGameTitle = () => {
    const titleElement = document.querySelector("section._10ble h1.game-title");
    return titleElement ? titleElement.textContent.trim() : "Unknown Game";
  };

  const createMenu = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');

      #hypr-scraper {
        position: fixed;
        top: 20px;
        left: 20px;
        width: 300px;
        background: rgba(30, 30, 46, 0.9);
        color: #cdd6f4;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        font-family: 'Fira Code', monospace;
        z-index: 9999;
        transition: all 0.3s ease;
        display: block;
        padding: 20px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(108, 112, 134, 0.2);
      }

      #hypr-scraper .title-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(108, 112, 134, 0.3);
      }

      #hypr-scraper .title {
        font-size: 16px;
        font-weight: 500;
        color: #89b4fa;
      }

      #hypr-scraper .controls {
        display: flex;
        gap: 8px;
      }

      #hypr-scraper .control-btn {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      #hypr-scraper .close-btn {
        background-color: #f38ba8;
      }

      #hypr-scraper .min-btn {
        background-color: #f9e2af;
      }

      #hypr-scraper .max-btn {
        background-color: #a6e3a1;
      }

      #hypr-scraper .control-btn:hover {
        transform: scale(1.1);
      }

      #hypr-scraper input, #hypr-scraper button, #hypr-scraper select {
        width: 100%;
        padding: 10px 12px;
        margin: 8px 0;
        border-radius: 6px;
        border: none;
        box-sizing: border-box;
        font-family: 'Fira Code', monospace;
        font-size: 13px;
        transition: all 0.2s ease;
      }

      #hypr-scraper input, #hypr-scraper select {
        background: rgba(49, 50, 68, 0.8);
        color: #cdd6f4;
        border: 1px solid rgba(108, 112, 134, 0.3);
      }

      #hypr-scraper input:focus, #hypr-scraper select:focus {
        outline: none;
        border-color: #89b4fa;
        box-shadow: 0 0 0 2px rgba(137, 180, 250, 0.2);
      }

      #hypr-scraper input::placeholder {
        color: #6c7086;
      }

      #hypr-scraper button {
        background: linear-gradient(135deg, #89b4fa 0%, #74c7ec 100%);
        color: #1e1e2e;
        font-weight: 500;
        cursor: pointer;
        border: none;
      }

      #hypr-scraper button:hover {
        background: linear-gradient(135deg, #89b4fa 0%, #94e2d5 100%);
        transform: translateY(-1px);
      }

      #hypr-scraper button:active {
        transform: translateY(0);
      }

      #hypr-scraper #progress {
        font-size: 12px;
        text-align: center;
        margin-top: 15px;
        color: #a6adc8;
        font-family: 'Fira Code', monospace;
      }

      #hypr-scraper .status {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 8px;
        background: #6c7086;
      }

      #hypr-scraper .status.active {
        background: #a6e3a1;
        box-shadow: 0 0 5px #a6e3a1;
      }

      #hypr-scraper .select-wrapper {
        position: relative;
      }

      #hypr-scraper .select-wrapper::after {
        content: "▼";
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
        color: #6c7086;
        pointer-events: none;
        font-size: 10px;
      }
    `;
    document.head.appendChild(style);

    const menu = document.createElement("div");
    menu.id = "hypr-scraper";
    menu.innerHTML = `
      <div class="title-bar">
        <div class="title">Comment Scraper</div>
        <div class="controls">
          <div class="control-btn min-btn" title="Minimize"></div>
          <div class="control-btn max-btn" title="Maximize"></div>
          <div class="control-btn close-btn" title="Close"></div>
        </div>
      </div>
      <input id="webhook-url" type="text" placeholder="Webhook URL">
      <input id="filter-out" type="text" placeholder="Filter out text (case sensitive)">
      <input id="total-pages" type="number" placeholder="Total Pages">
      <div class="select-wrapper">
        <select id="url-separation">
          <option value="no">Don't separate URLs</option>
          <option value="yes">Separate URLs to another file</option>
        </select>
      </div>
      <button id="start-button">Start Scraping</button>
      <div id="progress"><span class="status"></span> Ready</div>
    `;
    document.body.appendChild(menu);

    makeDraggable(menu);

    document.getElementById("total-pages").addEventListener("input", (e) => {
      totalPages = parseInt(e.target.value, 10);
      updateProgress();
    });

    document.getElementById("filter-out").addEventListener("input", (e) => {
      filterOutText = e.target.value;
    });

    document.getElementById("url-separation").addEventListener("change", (e) => {
      separateURLs = e.target.value === "yes";
    });

    document
      .querySelector(".close-btn")
      .addEventListener("click", () => toggleMenuVisibility(false));
    document
      .querySelector(".min-btn")
      .addEventListener("click", () => toggleMenuVisibility(true));
  };

  const toggleMenuVisibility = (isVisible) => {
    const menu = document.getElementById("hypr-scraper");
    menu.style.display = isVisible ? "block" : "none";
    isMenuVisible = isVisible;
  };

  const makeDraggable = (element) => {
    let isDragging = false,
      startX,
      startY,
      initialX,
      initialY;
    const titleBar = element.querySelector(".title-bar");
    titleBar.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = element.offsetLeft;
      initialY = element.offsetTop;
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", onStopDrag);
    });

    const onDrag = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      element.style.left = `${initialX + dx}px`;
      element.style.top = `${initialY + dy}px`;
    };

    const onStopDrag = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", onStopDrag);
    };
  };

  const fetchPage = async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      processedRequests++;
      updateProgress();
      return await response.json();
    } else {
      throw new Error(`Failed to fetch ${url}`);
    }
  };

  const sendFileToWebhook = async (webhookUrl, fileData, fileName) => {
    const blob = new Blob([fileData], { type: "text/plain" });
    const formData = new FormData();
    formData.append("file", blob, fileName);

    const response = await fetch(webhookUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to send file");
    }

    console.log("File sent successfully");
  };

  const formatCommentData = (comment) => {
    const content = JSON.parse(comment._data).data || "No Content";
    const createdAt = new Date(comment.created).toLocaleString();
    return `[${createdAt}] ${comment.profile_username} (${comment.profile_id}): ${content}`;
  };

  const generateMetadata = (type = "all") => {
    const date = new Date().toLocaleString();
    const gameId = extractGameIdFromUrl();
    let header = `Date: ${date}\nGame ID: ${gameId}\nTotal Pages: ${totalPages}\nFilter (Ignored): ${filterOutText || "None"}\n`;

    if (type === "urls") {
      header += "File Type: URL-only comments\n";
    } else {
      header += "File Type: All comments\n";
    }

    return header + "\n▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃\n\n";
  };

  const updateProgress = () => {
    const progressElement = document.getElementById("progress");
    const statusElement = progressElement.querySelector(".status");

    if (processedRequests > 0 && processedRequests < totalPages) {
      progressElement.innerHTML = `<span class="status active"></span> Processing: ${processedRequests}/${totalPages}`;
    } else if (processedRequests >= totalPages && totalPages > 0) {
      progressElement.innerHTML = `<span class="status"></span> Completed: ${processedRequests}/${totalPages}`;
    } else {
      progressElement.innerHTML = `<span class="status"></span> Ready`;
    }
  };

  const shouldFilterComment = (comment) => {
    if (!filterOutText) return false;
    const content = JSON.parse(comment._data).data || "";
    return content.includes(filterOutText);
  };

  const containsURL = (comment) => {
    const content = JSON.parse(comment._data).data || "";
    // Regex to match URLs with or without protocol, www, etc.
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/;
    return urlRegex.test(content);
  };

  const processAllComments = async (webhookUrl) => {
    const fetchPromises = [];
    let currentPage = 1;

    while (currentPage <= totalPages) {
      const pageUrl = `https://www.kogama.com/game/${extractGameIdFromUrl()}/comment/?page=${currentPage}&count=400`;
      fetchPromises.push(fetchPage(pageUrl));
      currentPage++;
    }

    try {
      const allPageResults = await Promise.all(fetchPromises);
      let allComments = [];
      let urlComments = [];

      allPageResults.forEach((result) => {
        if (result.data) {
          allComments = allComments.concat(result.data);
        }
      });

      allComments = allComments.filter(comment => !shouldFilterComment(comment));
      if (separateURLs) {
        urlComments = allComments.filter(comment => containsURL(comment));
        allComments = allComments.filter(comment => !containsURL(comment));
      }

      allComments.sort((a, b) => new Date(b.created) - new Date(a.created));
      urlComments.sort((a, b) => new Date(b.created) - new Date(a.created));

      const formattedData = allComments.map(formatCommentData).join("\n");
      const formattedURLData = urlComments.map(formatCommentData).join("\n");

      const gameTitle = extractGameTitle().replace(/[\/\\?%*:|"<>]/g, "_");
      if (formattedData) {
        await sendFileToWebhook(
          webhookUrl,
          generateMetadata("all") + formattedData,
          `${gameTitle}_comments.txt`
        );
      }
      if (separateURLs && formattedURLData) {
        await sendFileToWebhook(
          webhookUrl,
          generateMetadata("urls") + formattedURLData,
          `${gameTitle}_url_comments.txt`
        );
      }

      console.log("All comments processed and files sent!");
    } catch (err) {
      console.error("Error processing comments:", err);
    }
  };

  const startProcess = async () => {
    const webhookUrl = document.getElementById("webhook-url").value;

    if (!webhookUrl || isNaN(totalPages) || totalPages <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    processedRequests = 0;
    updateProgress();

    await processAllComments(webhookUrl);
  };

  createMenu();
  document
    .getElementById("start-button")
    .addEventListener("click", startProcess);
})();
