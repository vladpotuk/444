document.addEventListener("DOMContentLoaded", function () {
  const usersList = document.getElementById("usersList");
  const userInfo = document.getElementById("userInfo");
  const userName = document.getElementById("userName");
  const userUsername = document.getElementById("userUsername");
  const userAddress = document.getElementById("userAddress");
  const userEmail = document.getElementById("userEmail");
  const showPostsButton = document.getElementById("showPosts");
  const postsList = document.getElementById("postsList");

  let currentUserId = null;

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        const userItem = document.createElement("div");
        userItem.className = "user-item";
        userItem.textContent = user.name;
        userItem.addEventListener("click", () => {
          showUserInfo(user);
        });
        usersList.appendChild(userItem);
      });
    });

  function showUserInfo(user) {
    currentUserId = user.id;
    userName.textContent = user.name;
    userUsername.textContent = user.username;
    userAddress.textContent = `${user.address.street}, ${user.address.suite}, ${user.address.city}`;
    userEmail.textContent = user.email;
    userInfo.style.display = "block";
    showPostsButton.style.display = "block";
    postsList.style.display = "none";
  }

  showPostsButton.addEventListener("click", function () {
    if (currentUserId) {
      fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${currentUserId}`
      )
        .then((response) => response.json())
        .then((posts) => {
          postsList.innerHTML = "";
          posts.forEach((post) => {
            const postItem = document.createElement("div");
            postItem.className = "post-item";
            postItem.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
            postsList.appendChild(postItem);
          });
          postsList.style.display = "block";
        });
    }
  });
});
