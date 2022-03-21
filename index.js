const form = document.querySelector("form");
const input = document.querySelector("input");
const output = document.querySelector("output");
const userOutput = output.querySelector("header");
const starredOutput = output.querySelector("#starredRepos");
const eventsOutput = output.querySelector("#eventsData");

const baseURL = 'https://api.github.com';


form.addEventListener("submit", profileSearch);


async function profileSearch(e) {
    e.preventDefault();
    
    const userName = input.value;
    const userNameURL = `${baseURL}/users/${userName}`;

    showUser(userNameURL)
    showStarred(userNameURL);
    showEvents(userNameURL);
    
    form.reset();
}

async function showUser(userURL) {
    const userData = await fetchFunc(userURL);
    
    const title = userOutput.querySelector("h2");
    title.textContent = userData['login'];

    const avatar = userOutput.querySelector("img");
    avatar.src = userData['avatar_url'];
    avatar.alt = `Avatar of GitHub user ${userData['login']}`
}

async function showStarred(userURL) {
    const starredRepos = await fetchFunc(`${userURL}/starred`);
    
}

async function showEvents(userURL) {
    const events = await fetchFunc(`${userURL}/events`);
    
}

async function fetchFunc(url) {
    try{
        const response = await fetch(url);
        const json = response.json();
        console.log(json)
        if (!response.ok) {
            throw new Error(`Somethings gone wrong: ${response.status}`);
        }
        return json;
    } catch (error) {
        console.error(error)
    }
}