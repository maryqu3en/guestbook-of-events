document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailBox = document.getElementById("email");
  const nameInput = document.getElementById("name");
  const imageInput = document.getElementById("image");
  const passwordInput = document.getElementById("password");
  const alertBox = document.getElementById("alert-box");
  const alertMsg = document.getElementById("alert-msg");
  const closeBtn = document.getElementById("close-button");

  const registerURL = "http://localhost:8080/Auth/create";

  console.log("connected");

  closeBtn.addEventListener("click", () => {
    alertBox.style.display = "none";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = emailBox.value;
    let username = nameInput.value;
    let imgUrl = imageInput.value;
    let password = passwordInput.value;

    console.log("emailbox.value");
    if (!username || !imgUrl || !password) {
      alertMsg.textContent = "Please fill in all required fields.";
      alertBox.style.display = "flex";
      event.preventDefault();
      return;
    }
    if (!validateEmail(email)) {
      emailBox.classList.add("invalid");
      emailBox.style.border = "2px solid red";
      alertMsg.textContent = "Please enter a valid email address.";
      alertBox.style.display = "flex";
      return;
    }
    alertBox.style.display = "none";
    nameInput.value = "";
    imageInput.value = "";
    passwordInput.value = "";
    emailBox.value = "";
    emailBox.style.border = "1px solid #ccc";

    createAccount(username, email, password, imgUrl);
  });

  async function createAccount(name, email, password, image) {
    try {
      console.log("inside createpost function");
      const response = await fetch(`${registerURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, image }),
      });
      const data = await response.json();
      console.log("awaiting response");
      if (response.ok) {
        console.log("Account created successfully");
        alertMsg.textContent = "Account created successfully! You can now log in to your account.";
        alertBox.style.display = "flex";
        closeBtn.addEventListener("click", () => {
          if (response.ok) {
            window.location.href = "/login";
          }
        });
        
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  }

  function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
