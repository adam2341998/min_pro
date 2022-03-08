const APIURL = 'https://api.github.com/users/';

// getUser('bradtraversy');

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    creatUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard('No profile with this username');
    }
  }
}
async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + '/repos?sort=created');
    addReposToCard(data);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard('Probmlem fetching repos');
    }
  }
}

function creatUserCard(user) {
  const cardHTML = `
  <div class="card">
        <img
          src="${user.avatar_url}"
          alt="${user.name}"
          class="avatar"
        />
        <div class="user-info">
          <h2>${user.name}</h2>
          <p>
            ${user.bio}
          </p>
          <ul>
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos}<strong>Repos</strong></li>
          </ul>
          <div id="repos"></div>
        </div>
      </div>
      `;
  main.innerHTML = cardHTML;
}
function createErrorCard(msg) {
  const cardHTML = `
    <div class='card'>
    <h1>${msg}</h1>
    </div>
    `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');
  repos.forEach(repo => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerHTML = repo.name;
    reposEl.appendChild(repoEl);
  });
}
11;
form.addEventListener('submit', e => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = '';
  }
});
