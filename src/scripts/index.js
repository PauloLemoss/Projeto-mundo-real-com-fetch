
import { getUser } from './services/user.js';
import { getRepositories } from './services/repositories.js';
import { user } from './objects/user.js';
import { screen } from './objects/screen.js';

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value.trim();  
    if(validateEmptyInput(userName)) return
    getUserData(userName);
   
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value.trim(); 
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if (isEnterKeyPressed && userName) {
        if(validateEmptyInput(userName)) return
        getUserData(userName);
    }
});

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o nome do usuário do git hub')
        return true
    }
}
async function getUserData(userName) {
   const userResponse = await getUser(userName)

   if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
   }
   const repositoriesResponse = await getRepositories(userName)

   const followersCount = userResponse.followers;

   const following = userResponse.following;

   user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user, followersCount, following )

    const events = await getUserEvents(userName);
    renderUserEvents(events);
}

async function getUserEvents(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/events`);
    const events = await response.json();
    return events.filter(event => event.type === 'CreateEvent' || event.type === 'PushEvent').slice(0, 10); 
}


function renderUserEvents(events) {
    let eventsHTML = '<h2>Últimos Eventos</h2><ul>';

    events.forEach(event => {
        if (event.type === 'CreateEvent') {
            eventsHTML += `<li><strong>${event.repo.name}</strong>: Sem mensagem de commit</li>`;
        } else if (event.type === 'PushEvent') {
            event.payload.commits.forEach(commit => {
                eventsHTML += `<li><strong>${event.repo.name}</strong>: ${commit.message}</li>`;
            });
        }
    });

    eventsHTML += '</ul>';
    document.querySelector('.profile-data').innerHTML += eventsHTML;
}


