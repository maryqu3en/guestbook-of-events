document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailBox = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const alertBox = document.getElementById("alert-box");
  const alertMsg = document.getElementById("alert-msg");
  const closeBtn = document.getElementById("close-button");

  const loginURL = "http://localhost:8080/Auth/check";

  console.log("connected");

  closeBtn.addEventListener("click", () => {
    alertBox.style.display = "none";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = emailBox.value;
    let password = passwordInput.value;

    console.log("emailbox.value");
    if (!email || !password) {
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
    passwordInput.value = "";
    emailBox.value = "";
    emailBox.style.border = "1px solid #ccc";

    userCheck(email, password);
  });

  async function userCheck(email, password) {
    try {
      const response = await fetch(`${loginURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password}),
      });
      const data = await response.json();
      console.log("awaiting response");
      if (response.ok) {
        console.log("Logged in successfully");
      } else {
        alertMsg.textContent = data.message;
        alertBox.style.display = "flex";
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
