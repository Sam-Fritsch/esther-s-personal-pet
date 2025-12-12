const pet = document.querySelector('.pet');
const wrapper = document.querySelector('.pet-wrapper');


let dailyMessage = ""; // Default fallback

async function loadDailyMessage() {
    try {
        const res = await fetch('/api/fetch_message'); 
        const data = await res.json();
        dailyMessage = data.dailyMessage;
    } catch (err) {
        console.error("Failed to load message:", err);
    }
}


loadDailyMessage();

// async function fetchMessages() {
//   try {
//     const response = await fetch('/api/getMessages');
//     const data = await response.json();
//     console.log('Messages from server:', data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchMessages();


pet.addEventListener('click', () => {
  const existingHeart = wrapper.querySelector('.heart');
  if (existingHeart) {
    existingHeart.remove();
  }
  const heart = document.createElement('div');
  heart.classList.add('heart');
  wrapper.appendChild(heart);
  console.log(pet, wrapper);



  if (currentFrame < barFrames.length - 1) {
    currentFrame++;
    loveBar.style.backgroundImage = `url(${barFrames[currentFrame]})`;
  }  
  
  if (currentFrame >= 5) {
    const dialog = document.createElement('div');
    dialog.classList.add('dialog');
    dialog.textContent = dailyMessage;
    wrapper.appendChild(dialog);
  }


});

const loveBar = document.createElement('div');
loveBar.classList.add('love-bar');
wrapper.appendChild(loveBar);

const barFrames = [
  './heart-bar-1.png.png',
  './heart-bar-2.png.png',
  './heart-bar-3.png.png',
  './heart-bar-4.png.png',
  './heart-bar-5.png.png',
  './heart-bar-6.png.png'
];

let currentFrame = 0;
loveBar.style.backgroundImage = `url(${barFrames[currentFrame]})`;
loveBar.style.width = '128px';
loveBar.style.height = '128px';
loveBar.style.backgroundSize = 'cover';
loveBar.style.cursor = 'pointer';




// Below is functions specific to the editor.html file:


document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('saveMessageButton');
  const messageInput = document.getElementById('messageInput');

  if (saveButton && messageInput) {
    saveButton.addEventListener('click', async () => {
      const message = messageInput.value.trim();
      if (!message) return alert("Enter a message");

      try {
        await fetch('/api/set_message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dailyMessage: message })
        });

        alert("Saved ❤️");
        messageInput.value = "";
      } catch (err) {
        console.error(err);
      }
    });
  }
});
