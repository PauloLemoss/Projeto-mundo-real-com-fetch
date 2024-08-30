const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user, followersCount, following){
         this.userProfile.innerHTML = `<div class ="info">
            <img src = "${user.avatarUrl}" alt = "foto do perfil do usuário" />
            <div class = "data">
            <h1> ${user.name ?? 'não possui nome cadastrado'} </h1>
            <p> ${user.bio ?? 'Não possui bio cadastrada'}</p>
            <p> Followers: ${followersCount} </p>
            <p> Following: ${following } </p> 

            </div>
            </div>
            `

            let repositoriesItens = ''
            user.repositories.forEach(repo => repositoriesItens += `<li> <a href= "${repo.html_url}"  target = "_blank"> ${repo.name}</a> 
                <p>Forks: ${repo.forks_count}</p>
                <p>Stars: ${repo.stargazers_count}</p>
                <p>Watchers: ${repo.watchers_count}</p>
                <p>Linguagem: ${repo.language ?? 'Não especificado'}</p>
                
                </li>`)

           
            if(user.repositories.length > 0){
                this.userProfile.innerHTML += `<div class = "repositories section"
                <h2> Repositórios </h2>

                <ul> ${repositoriesItens} </ul>
                
                </div>`
            }
    },

    renderNotFound(){
        this.userProfile.innerHTML = "<h3> usuário não encontrado </h3>"
    }
}

export {screen}