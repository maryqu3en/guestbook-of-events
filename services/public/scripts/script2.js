const profile = document.querySelector("nav .profile");
const account = document.querySelector(".account");
const closeSpan = document.querySelector(".account .container span");
let isClicked = true;

function toggleAccount() {
  if (isClicked) {
    account.style.display = "block";
  } else {
    account.style.display = "none";
  }
  isClicked = !isClicked;
}

profile.addEventListener("click", toggleAccount);
closeSpan.addEventListener("click", toggleAccount);

const deletePost = document.getElementById("post-delete");

deletePost.addEventListener("click", function (event) {
  event.preventDefault();

  const form = document.querySelector("form[method='DELETE']");

  // Define the form submission options, including the method
  const options = {
    method: "DELETE",
    // You can add headers or other options here if needed
  };

  // Send the DELETE request to the form's action URL
  fetch(form.action, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      location.reload();
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const deleteComment = document.querySelectorAll(".delete-comment");
const editComment = document.querySelectorAll(".edit-comment");

async function deleteComments(postId) {
  try {
    const response = await fetch(`${API_URL}/delete-post/${postId}`, {
      method: "POST",
    });

    if (response.ok) {
      console.log("Post deleted successfully");
      fetchPosts();
      location.reload();
    } else {
      const data = await response.json();
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

// deleteComment.forEach(function (deleteComment) {
//   closeButton.addEventListener("click", function () {
//     const formId = deleteComment.closest("form").id;
//     document.getElementById(formId).submit();
//   });
// });

// editButtons.forEach(function (editComment) {
//   editComment.addEventListener("click", function () {
//     const formId = editButton.closest("form").id;

//     document.getElementById(formId).submit();
//   });
// });
