const form = document.querySelector("form");
const input = document.querySelector("input");
const output = document.querySelector("output");
const userOutput = output.querySelector("header");
const starredOutput = output.querySelector("#starredRepos > div");
const eventsOutput = output.querySelector("#eventsData");

const baseURL = 'https://api.github.com';


form.addEventListener("submit", profileSearch);


function profileSearch(e) {
    e.preventDefault();
    starredOutput.innerHTML = ''

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
    const avatar = userOutput.querySelector("img");

    if (userData !== undefined) { 
        title.textContent = userData.login;
        avatar.src = userData.avatar_url;
        avatar.alt = `Avatar of GitHub user ${userData.login}`        
    } else {
        title.textContent = "User Not Found"
    }

}

async function showStarred(userURL) {
    const starredRepos = await fetchFunc(`${userURL}/starred`);
    const template = document.querySelector("template");

    

    if (starredRepos !== undefined && starredRepos.length > 0) {
        
        for (repo of starredRepos) {
            const domFragment = template.content.cloneNode(true);

            const name = domFragment.querySelector("h4");
            const description = domFragment.querySelector("p")
            const link = domFragment.querySelectorAll("a")[0]
            const deployment = domFragment.querySelectorAll("a")[1]

            name.textContent = repo.name
            description.textContent = repo.description
            link.href = repo.html_url
            deployment.href = repo.homepage
            starredOutput.appendChild(domFragment)
        }
    } else {
        const noRepos = document.createElement("h4");
        noRepos.textContent = `No Starred Repositories Found!`
        starredOutput.appendChild(noRepos)
    }
}

async function showEvents(userURL) {
    const events = await fetchFunc(`${userURL}/events`);

}

async function fetchFunc(url) {
    try{
        const response = await fetch(url);
        const json = await response.json();
        if (!response.ok) {
            throw new Error(`Somethings gone wrong: ${response.status} ${json.message}`);
        }
        return json;
    } catch (error) {
        console.error(error)
    }
}

