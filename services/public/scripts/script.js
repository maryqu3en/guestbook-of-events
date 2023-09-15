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
   


 const more = document.querySelectorAll('.title span');
 const  UpDel= document.querySelector('.update-delete');
 const closeMore = document.querySelectorAll('.update-delete .container span');
 let isClicked3=true;
 
 function toggleMore(){
   if(isClicked3){
    UpDel.style.display='block';
   }
   else{
    UpDel.style.display='none';
   }
   isClicked3=!isClicked3;
  }

  // Add event listeners for each element in the "more" NodeList
more.forEach((element) => {
  element.addEventListener('click', toggleMore);
});

// Add event listeners for each element in the "closeMore" NodeList
closeMore.forEach((element) => {
  element.addEventListener('click', toggleMore);
});
 

document.addEventListener('DOMContentLoaded', function () {
  const addReactionImages = document.querySelectorAll('.reactions2 img');
  const addReactionIcons = document.querySelectorAll('form[action="/add-reaction"] img');



  // Add click event listener to "add-reaction" images in comments
  addReactionIcons.forEach((icon) => {
    icon.addEventListener('click', function () {
      const reactions2Div = this.nextElementSibling;

      if (reactions2Div) {
        // Toggle the visibility of "reactions2" when clicked
        if (reactions2Div.style.display === 'flex') {
          reactions2Div.style.display = 'none';
        } else {
          reactions2Div.style.display = 'flex';
        }
      }
    });
  });

// Add click event listeners to "reactions2" images in comments
addReactionImages.forEach((image) => {
  image.addEventListener('click', function () {
    const selectedImageSrc = this.src;
    const reactionForm = this.closest('form[action="/add-reaction"]');
    const reactionIcon = reactionForm.querySelector('img');
    reactionIcon.src = selectedImageSrc;

    // Check if reactions2Div exists before trying to access its style
    const reactions2Div = reactionForm.querySelector('.reactions2');
    if (reactions2Div) {
      reactions2Div.style.display = 'none';
    }
  });
});

});



document.addEventListener('DOMContentLoaded', function () {
  const addReactionImages = document.querySelectorAll('.reactions img');
  const addReactionIcons = document.querySelectorAll('.left img');



  // Add click event listener to "add-reaction" images in comments
  addReactionIcons.forEach((icon) => {
    icon.addEventListener('click', function () {
      const reactions2Div = this.nextElementSibling;

      if (reactions2Div) {
        // Toggle the visibility of "reactions2" when clicked
        if (reactions2Div.style.display === 'flex') {
          reactions2Div.style.display = 'none';
        } else {
          reactions2Div.style.display = 'flex';
        }
      }
    });
  });

// Add click event listeners to "reactions2" images in comments
addReactionImages.forEach((image) => {
  image.addEventListener('click', function () {
    const selectedImageSrc = this.src;
    const reactionForm = this.closest('.left');
    const reactionIcon = reactionForm.querySelector('img');
    reactionIcon.src = selectedImageSrc;

    // Check if reactions2Div exists before trying to access its style
    const reactions2Div = reactionForm.querySelector('.reactions');
    if (reactions2Div) {
      reactions2Div.style.display = 'none';
    }
  });
});

});
