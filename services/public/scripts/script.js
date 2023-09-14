const menuBtn = document.querySelector('.menu');
const closeBtn = document.querySelector('.close');
const navMenu = document.querySelector('.list');
// Function to toggle the navigation menu
function toggleMenu() {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuBtn.style.display = 'block';
      closeBtn.style.display = 'none';
    } else {
      navMenu.classList.add('active');
      menuBtn.style.display = 'none';
      closeBtn.style.display = 'block';
    }
  }

   // Event listeners for the menu button and close button
   menuBtn.addEventListener('click', toggleMenu);
   closeBtn.addEventListener('click', toggleMenu);

   