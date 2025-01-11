Highly customizable snippet to scrape comments from a chosen game (object-id). <br>
> ![image](https://github.com/user-attachments/assets/0947cfc0-410b-49d2-96bb-a4c790148203)



<details>
<summary> <b>[ CLICK TO EXPAND THE SNIPPET ] </b> </summary>

```js
(async function() {
    const config = {
        gameId: '2593313', // OBJECT ID
        totalPages: 300, // YOUR AMOUNT OF PAGES
        webhookUrl: 'WEBHOOK', // YOUR WBHK
        count: 13, // BATCH OF PAGES PER ACTION. CHANGE ON YOUR OWN EXPERIMENTATIONAL RISK.
        baseUrl: 'https://www.kogama.com/game/$gameid/comment/' // DO NOT CHANGE
    };

    const titleElement = document.querySelector('title');
    function getPageTitle() {
        if (titleElement) {
            const titleText = titleElement.innerText;
            const titleParts = titleText.split(' - KoGaMa')[0];
            return titleParts.trim() || 'GameTitle';
        }
        return 'GameTitle';
    }

    function getDynamicFileName() {
        const gameTitle = getPageTitle();
        return `${gameTitle}.txt`;
    }

    async function fetchPage(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
    }

    try {
        let allComments = [];
        const baseUrlWithGameId = config.baseUrl.replace('$gameid', config.gameId);

        console.log('Fetching data, please wait...');

        const fetchPromises = [];
        for (let page = 1; page <= config.totalPages; page++) {
            const url = `${baseUrlWithGameId}?page=${page}&count=${config.count}`;
            fetchPromises.push(fetchPage(url).then(responseData => {
                const comments = responseData.data || [];
                allComments = allComments.concat(comments);
                if (page % 250 === 0) {
                    console.log(`Progress: Fetched ${page} pages`);
                }
                config.totalPages = responseData.paging?.pages || config.totalPages;
            }));
        }

        await Promise.all(fetchPromises);

        const formattedData = allComments.map((entry, index) => {
            const created = entry.created || 'N/A';
            const username = entry.profile_username || 'Unknown';
            const profileId = entry.profile_id || 'Unknown';
            const commentId = entry.id || 'Unknown';
            let content;

            try {
                const parsedData = JSON.parse(entry._data || '{}');
                content = parsedData.data || 'No content';
            } catch {
                content = 'No content';
            }

            return `${index + 1}. [${created}] ${username} (${profileId}) #${commentId}: ${content}`;
        });

        const formattedString = formattedData.join('\n');
        const textBlob = new Blob([formattedString], { type: 'text/plain' });

        const formData = new FormData();
        formData.append('file', textBlob, getDynamicFileName());
        formData.append('content', 'Here is the formatted data file:');

        const webhookResponse = await fetch(config.webhookUrl, {
            method: 'POST',
            body: formData
        });

        if (!webhookResponse.ok) {
            throw new Error(`Error sending file to webhook: ${webhookResponse.statusText}`);
        }

        console.log('File successfully sent to Discord webhook');
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();




```


</details>
