let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    toyFormContainer.style.display = addToy ? "block" : "none";
  });

  // GitHub User Search
  const form = document.querySelector("#github-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchQuery = document.querySelector("#search").value;
    searchGitHubUsers(searchQuery);
  });
});

function searchGitHubUsers(query) {
  fetch(`https://api.github.com/search/users?q=${query}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      displayUsers(data.items);
    })
    .catch((error) => console.error("Error fetching users:", error));
}

function displayUsers(users) {
  const userList = document.querySelector("#user-list");
  userList.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${user.avatar_url}" alt="${user.login}" width="50">
      <a href="${user.html_url}" target="_blank">${user.login}</a>
      <button onclick="fetchUserRepos('${user.login}')">View Repos</button>
    `;
    userList.appendChild(li);
  });
}

function fetchUserRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then((repos) => {
      displayRepos(repos);
    })
    .catch((error) => console.error("Error fetching repos:", error));
}

function displayRepos(repos) {
  const repoList = document.querySelector("#repos-list");
  repoList.innerHTML = "";

  repos.forEach((repo) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
    repoList.appendChild(li);
  });
}