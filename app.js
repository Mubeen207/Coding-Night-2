let postsArray = [];

let postIdCounter = 2;
function getLocalImageUrl(file) {
  if (file) {
    return URL.createObjectURL(file);
  }
  return "";
}
function createNewPost() {
  let imageInput = document.getElementById("postImage");
  let description = document.getElementById("postDescription").value.trim();

  if (!description) {
    console.error("Please write a description for your post.");
    return;
  }

  let file = imageInput.files[0];
  let imageUrl = getLocalImageUrl(file);

  let newPostId = postIdCounter++;
  let postFeed = document.getElementById("post-feed");

  let newPostHTML = `
                <article class="post-card bg-white p-4 rounded-xl shadow-md border border-gray-200 animate-fadeIn" data-post-id="${newPostId}">
                    
                    <!-- User Info (Dynamic Placeholder) -->
                    <div class="flex items-center mb-3">
                        <div class="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center font-bold text-green-800 text-sm">U${newPostId}</div>
                        <div class="ml-3">
                            <p class="font-semibold text-gray-900">Current User (${newPostId})</p>
                            <p class="text-xs text-gray-500">1 minute ago</p>
                        </div>
                    </div>

                    <!-- Post Description -->
                    <div class="description-area mb-4">
                        <p class="text-gray-800 text-base" id="description-${newPostId}">${description.replace(
    /\n/g,
    "<br>"
  )}</p>
                    </div>

                    <!-- Post Image -->
                    ${
                      file
                        ? `
                        <div class="mb-4">
                        <img src="${imageUrl}" alt="Post Image" class="w-full h-auto object-cover rounded-lg max-h-96">
                        </div>
                        `
                        : ""
                    }

                    <!-- Action Bar: Like/Edit/Delete -->
                    <div class="flex justify-between items-center border-t pt-3 mt-2 text-gray-500">
                        
                        <!-- Like/Dislike Button (Toggle) -->
                        <button onclick="toggleLike(${newPostId})" class="like-button hover:text-red-500 transition duration-150 flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                            <i class="far fa-heart text-xl" id="like-icon-${newPostId}"></i>
                            <span class="font-semibold text-sm" id="like-count-${newPostId}">0</span>
                            <span class="text-sm hidden sm:inline">Like</span>
                        </button>

                        <!-- Read/Write (Edit/Delete) Options -->
                        <div class="flex space-x-2">
                            <!-- Edit Button (Read/Write Option) -->
                            <button onclick="editPost(${newPostId})" class="text-blue-500 hover:text-blue-700 font-medium transition duration-150 flex items-center p-2 rounded-lg hover:bg-gray-100">
                                <i class="fas fa-edit text-lg"></i>
                                <span class="ml-1 text-sm hidden sm:inline">Edit</span>
                            </button>
                            <!-- Delete Button -->
                            <button onclick="deletePost(${newPostId})" class="text-red-500 hover:text-red-700 font-medium transition duration-150 flex items-center p-2 rounded-lg hover:bg-gray-100">
                                <i class="fas fa-trash-alt text-lg"></i>
                                <span class="ml-1 text-sm hidden sm:inline">Delete</span>
                            </button>
                        </div>
                    </div>
                </article>
            `;

  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = newPostHTML.trim();
  postFeed.insertBefore(tempDiv.firstChild, postFeed.children[1]);

  document.getElementById("postImage").value = "";
  document.getElementById("postDescription").value = "";
  postsArray.push({
    id: newPostId,
    description: description,
    imageUrl: file ? imageUrl : null,
    timestamp: new Date(),
  });

  postFeed.insertBefore(tempDiv.firstChild, postFeed.children[1]);
}

function toggleLike(postId) {
  let iconElement = document.getElementById(`like-icon-${postId}`);
  let countElement = document.getElementById(`like-count-${postId}`);
  let currentCount = parseInt(countElement.innerText);

  if (iconElement.classList.contains("far")) {
    iconElement.classList.replace("far", "fas");
    iconElement.classList.add("text-red-500");
    countElement.innerText = currentCount + 1;
  } else {
    iconElement.classList.replace("fas", "far");
    iconElement.classList.remove("text-red-500");
    countElement.innerText = currentCount - 1;
  }
}
function editPost(postId) {
  let descriptionP = document.getElementById(`description-${postId}`);
  let currentText = descriptionP.innerText;
  let article = descriptionP.closest("article");
  let descriptionArea = article.querySelector(".description-area");

  if (article.querySelector("textarea.editing")) {
    return;
  }

  let textarea = document.createElement("textarea");
  textarea.className =
    "editing w-full p-2 border border-blue-400 rounded-lg focus:ring-blue-500 focus:ring-1";
  textarea.value = currentText;
  textarea.rows = 4;

  descriptionP.style.display = "none";
  descriptionArea.insertBefore(textarea, descriptionP);

  let saveButton = document.createElement("button");
  saveButton.innerText = "Save Changes";
  saveButton.className =
    "bg-green-500 text-white font-semibold py-2 px-4 rounded-lg mt-3 hover:bg-green-600 transition duration-150";
  saveButton.onclick = () =>
    saveEdit(postId, textarea, descriptionP, saveButton);

  descriptionArea.appendChild(saveButton);
}
function saveEdit(postId, textarea, descriptionP, saveButton) {
  descriptionP.innerText = textarea.value;
  descriptionP.style.display = "block";
  textarea.remove();
  saveButton.remove();
}
function deletePost(postId) {
  // Using console.log instead of alert for message box replacement
  if (confirm("Are you sure you want to delete this post?")) {
    let postElement = document.querySelector(`[data-post-id="${postId}"]`);
    postElement.remove();
  }
}
function signUp(e) {
  e.preventDefault();

  let name = document.querySelector('input[placeholder="Name"]').value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("All fields are required!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exists = users.find((u) => u.email === email);
  if (exists) {
    alert("Email already registered! Try signin.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign up successful! Redirecting to Signin page...");
  document.querySelector("form").reset();

  setTimeout(() => {
    window.location.href = "./signin.html";
  }, 1000);
}

function login(e) {
  e.preventDefault();

  let usernameInput = document
    .querySelector('input[placeholder="Username"]')
    .value.trim();
  let passwordInput = document
    .querySelector('input[placeholder="Password"]')
    .value.trim();

  if (!usernameInput || !passwordInput) {
    alert("Please enter both username and password!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let found = users.find(
    (u) => u.name === usernameInput && u.password === passwordInput
  );

  if (found) {
    localStorage.setItem("loggedInUser", JSON.stringify(found));

    alert(`Login successful! Welcome, ${found.name}`);

    window.location.href = "./page.html";
  } else {
    alert("Invalid username or password!");
  }
}

if (document.querySelector('input[placeholder="Name"]')) {
  document.querySelector("form").addEventListener("submit", signUp);
}

if (document.querySelector('input[placeholder="Username"]')) {
  document.querySelector("form").addEventListener("submit", login);
}

function renderPosts(data) {
  let postFeed = document.getElementById("post-feed");
  postFeed.innerHTML = `<h2 class="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Feed</h2>`;

  data.forEach((post) => {
    let newPostHTML = `
      <article class="post-card bg-white p-4 rounded-xl shadow-md border border-gray-200 animate-fadeIn" data-post-id="${
        post.id
      }">
        <div class="flex items-center mb-3">
            <div class="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center font-bold text-green-800 text-sm">U${
              post.id
            }</div>
            <div class="ml-3">
                <p class="font-semibold text-gray-900">Current User (${
                  post.id
                })</p>
                <p class="text-xs text-gray-500">1 minute ago</p>
            </div>
        </div>
        <div class="description-area mb-4">
            <p class="text-gray-800 text-base" id="description-${
              post.id
            }">${post.description.replace(/\n/g, "<br>")}</p>
        </div>
        ${
          post.imageUrl
            ? `<div class="mb-4"><img src="${post.imageUrl}" alt="Post Image" class="w-full h-auto object-cover rounded-lg max-h-96"></div>`
            : ""
        }
        <div class="flex justify-between items-center border-t pt-3 mt-2 text-gray-500">
            <button onclick="toggleLike(${
              post.id
            })" class="like-button hover:text-red-500 transition duration-150 flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <i class="far fa-heart text-xl" id="like-icon-${post.id}"></i>
                <span class="font-semibold text-sm" id="like-count-${
                  post.id
                }">0</span>
                <span class="text-sm hidden sm:inline">Like</span>
            </button>
            <div class="flex space-x-2">
                <button onclick="editPost(${
                  post.id
                })" class="text-blue-500 hover:text-blue-700 font-medium transition duration-150 flex items-center p-2 rounded-lg hover:bg-gray-100">
                    <i class="fas fa-edit text-lg"></i>
                    <span class="ml-1 text-sm hidden sm:inline">Edit</span>
                </button>
                <button onclick="deletePost(${
                  post.id
                })" class="text-red-500 hover:text-red-700 font-medium transition duration-150 flex items-center p-2 rounded-lg hover:bg-gray-100">
                    <i class="fas fa-trash-alt text-lg"></i>
                    <span class="ml-1 text-sm hidden sm:inline">Delete</span>
                </button>
            </div>
        </div>
      </article>
    `;
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = newPostHTML.trim();
    postFeed.appendChild(tempDiv.firstChild);
  });
}

let filterInput = document.getElementById("filterInput");
let sortNewest = document.getElementById("sortNewest");
let sortOldest = document.getElementById("sortOldest");

filterInput.addEventListener("input", () => {
  let searchText = filterInput.value.toLowerCase();
  let filteredPosts = postsArray.filter((post) =>
    post.description.toLowerCase().includes(searchText)
  );
  renderPosts(filteredPosts);
});

sortNewest.addEventListener("click", () => {
  let sortedPosts = [...postsArray].sort((a, b) => b.timestamp - a.timestamp);
  renderPosts(sortedPosts);
});

sortOldest.addEventListener("click", () => {
  let sortedPosts = [...postsArray].sort((a, b) => a.timestamp - b.timestamp);
  renderPosts(sortedPosts);
});
