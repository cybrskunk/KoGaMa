const userId = "12345";
const username = "NewUsername";

fetch(`https://www.kogama.com/user/${userId}/username/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ username }),
    credentials: "include"
});
// credits to Amine/Zpayer for help.
