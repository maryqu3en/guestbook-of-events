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
   
const profile = document.querySelector('nav .profile');
const account = document.querySelector('.account');
const closeSpan = document.querySelector('.container span');
let isClicked=true;

function toggleAccount(){
  if(isClicked){
    account.style.display='block';
  }
  else{
    account.style.display='none';
  }
  isClicked=!isClicked;
 }

 profile.addEventListener('click',toggleAccount);
 closeSpan.addEventListener('click',toggleAccount);

 
 

  const hurtImage = document.querySelector('.left img');
  const addReactionImages = document.querySelectorAll('.reactions img');
  const reactionsDiv = document.querySelector('.left .reactions');
  const reactions2Divs = document.querySelectorAll('.reactions2');
  const addReactionIcons = document.querySelectorAll('form img');

  let isClicked2 = true;
  let isReactions2Visible = true;

  // Add click event listener to hurt image
  hurtImage.addEventListener('click', function () {
    if (isClicked2) reactionsDiv.style.display = 'flex';
    else {
      reactionsDiv.style.display = 'none';
    }
    isClicked2 = !isClicked2;
  });

  // Add click event listeners to reaction images
  addReactionImages.forEach((image, index) => {
    image.addEventListener('click', function () {
      const selectedImageSrc = this.src;
      hurtImage.src = selectedImageSrc; 
      reactionsDiv.style.display = 'none';
    });
  });

  // Add click event listener to "add-reaction" image for "reactions2"
  addReactionIcons.forEach((icon, index) => {
    icon.addEventListener('click', function () {
      // Toggle the visibility of "reactions2" when clicked
      if (isReactions2Visible) reactions2Divs[index].style.display = 'none';
      else {
        reactions2Divs[index].style.display = 'flex';
      }
      isReactions2Visible = !isReactions2Visible;
    });
  });

  // Add click event listeners to "reactions2" images
  reactions2Divs.forEach((reactions2Div, index) => {
    const reactions2Images = reactions2Div.querySelectorAll('img');
    reactions2Images.forEach((image) => {
      image.addEventListener('click', function () {
        const selectedImageSrc = this.src;
        addReactionIcons[index].src = selectedImageSrc;
        reactions2Div.style.display = 'none';
      });
    });
  });

 